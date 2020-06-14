// 文档加载事件
$(function () {
    // 通知垂直方向轮播
    function autoScroll() {
        $('.title').find('ul').animate({
            marginTop: '-21px'
        }, 1000, function () {
            $(this).css({ marginTop: "0px" });
            var li = $(".title ul").children().first().clone()
            $(".title ul li:last").after(li);
            $(".title ul li:first").remove();
        })
    }
    setInterval(autoScroll, 2000);

    // hash改变时
    window.onhashchange = loadPages;
    // 调用一次
    loadPages()
    function loadPages() {
        // 获取hash
        var hash = location.hash
        // console.log(hash);
        switch (hash) {
            case "":
                $("#main").load("../../pages/home.html");
                break;
            case "#home":
                $("#main").load("../../pages/home.html");
                break;
            case "#pay":
                $("#main").load("../../pages/pay.html");
                break;
            case "#personal":
                loadPersonalPage('#personal/getuserinfo')
                break;
            case "#personal/getuserinfo":
                loadPersonalPage(hash)

                break;
            case "#personal/updateuser":
                loadPersonalPage(hash)
                break;
            case "#personal/borrow_apply":
                loadPersonalPage(hash)
                break;
            case "#borrow":
                $("#main").load("../../pages/borrow.html");
                break;
            default:
                $("#main").load("../../pages/404.html");
        }
        // 调用
        navActive(hash)
    }
    // 封装函数 加载个人中心二级页面
    function loadPersonalPage(hash) {
        hash = hash.substr(1);
        // console.log(hash);  
        // console.log($("#perContent").length);

        if ($("#perContent").length) {//点击
            $("#perContent").load("../../pages/" + hash + ".html");
            activePersonal(hash)
        } else {//刷新
            $("#main").load("../../pages/personal.html", function () {
                $("#perContent").load("../../pages/" + hash + ".html");
                activePersonal(hash)
            });
        }
    }
    // 个人中心二级路由激活样式
    function activePersonal(hash) {
        $('.leftActive a').removeClass('active')
        $(".leftActive a[href='#" + hash + "']").addClass('active')
    }

    // 激活样式
    function navActive(hash) {
        // 点击增加当前激活样式，删除其他激活样式
        if (hash == '') hash = "#home";
        if (hash.includes('personal')) hash = "#personal";

        $(".main-top .nav-active a[href='" + hash + "']").addClass('active').closest('li').siblings().find('a').removeClass("active")
    }

    // 判断用户是否登陆
    isLogin()
    function isLogin() {
        // 获取本地用户名和用户id
        var username = localStorage.getItem('username')
        var uid = localStorage.getItem('uid')
        // 判断
        if (username && uid) {
            // 有值时为登录
            $('#login').html('<a href="#">' + username + '</a>')
            $('#reg').html('<a href="#" id="loginOut">注销</a>')
        } else {
            // 不是登录
            $('#login').html('<a href="./login.html">立即登录</a>')
            $('#reg').html('<a href="./regiter.html">立即注册</a>')
        }
    }
    // 点击注销按钮，清空本地用户名和用户id
    $('#reg').on('click', '#loginOut', function () {
        if (confirm('你确定退出吗？')) {
            // 删除本地数据
            localStorage.removeItem('username')
            localStorage.removeItem('uid')
            // 直接改页面
            $('#login').html('<a href="./login.html">立即登录</a>')
            $('#reg').html('<a href="./regiter.html">立即注册</a>')
        }
    })
    $('a[href="#personal"]').click(function(){       
            if (!(localStorage.getItem("uid") && localStorage.getItem("username"))) {
                alert("请先登录！！！");
                location.href = "/login.html";
                return false
            }    
    })
})