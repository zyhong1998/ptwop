// 文档加载事件
$(function () {
    // 定义变量保存id
    var $username = $('#username')
    var $pwd = $('#pwd')
    var $email = $('#email')
    var $nickname = $('#nickname')
    // 定义标杆
    var uFlag = false;
    var pFlag = false;
    var eFlag = false;
    var nFlag = false;
    // 用户名验证
    $username.blur(function () {
        // 获取输入值
        var uVal = $(this).val()
        // var that = $('this')
        // 用户名验证
        if (uVal) {
            // 不为空时
            // 验证合法性 用户名正则，4到16位（字母，数字，下划线，减号）
            if (/^[a-zA-Z]\w{2,11}$/.test(uVal)) {
                // 合法
                // console.log('hefa');
                $(this).css({ 'border': '1px solid green' }).next().addClass('error')
                // 发送ajax验证用户名重复  
                $.ajax({
                    url: "http://127.0.0.1:8848/accrepeat.php?username=hhha",
                    type: "GET",
                    data: "username=" + uVal,
                    success: function (yes) {

                        if (yes == "fail") {//重复
                            // console.log(yes);
                            // 生成三位随机数,(max-min)+min
                            var num = Math.floor((Math.random() * 899) + 100)
                            // console.log(num);
                            // 更改样式                            
                            // usernameErr('用户名重复：' + uVal + num)
                            titleErr($username, '用户名重复：' + uVal + num)

                            uFlag = false
                        } else {//未重复
                            titleYes($username)
                            uFlag = true
                        }

                    },
                    error: function (no) {
                    }
                })
            } else {
                // 不合法                
                // usernameErr('用户名不合法')
                titleErr($username, '用户名不合法')
                uFlag = false
            }
        } else {
            // 为空时            
            titleErr($username, '用户名不能为空')
            uFlag = false
        }
    })    
    // 密码
    $pwd.blur(function () {
        var pVal = $pwd.val()
        if (pVal) {//有值
            if (/^\w{4,12}$/.test(pVal)) {//合法   
                titleYes($pwd)
                pFlag = true
                // console.log(flag);
            } else {//不合法
                titleErr($pwd, '请输入合法密码')
                pFlag = false
            }
        } else {//没有值
            titleErr($pwd, '请输入密码')
            pFlag = false
        }
    })
    // 邮箱
    $email.blur(function () {
        var eVal = $email.val()
        if (eVal) {//有值
            if (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(eVal)) {//合法    
                titleYes($email)
                eFlag = true
            } else {//不合法
                // console.log(2);
                titleErr($email, '请输入合法邮箱')
                eFlag = false
            }
        } else {//没有值
            titleErr($email, '请输入邮箱')
            eFlag = false
        }
    })
    // 昵称
    $nickname.blur(function () {
        var nVal = $nickname.val()
        if (nVal) {//有值
            if (/^[a-zA-Z]\w{2,11}$/.test(nVal)) {//合法
                titleYes($nickname)
                nFlag = true
            } else {//不合法
                titleErr($nickname, '请输入合法昵称')
                nFlag = false
            }
        } else {//没有值
            titleErr($nickname, '请输入昵称')
            nFlag = false
        }
    })   

    // 封装验证失败后的提示信息
    function titleErr(name, title) {
        name.css({ 'border': '1px solid red' }).next().removeClass('error').text(title).css({ 'color': 'red' })
    }
    // 封装验证成功后的提示信息
    function titleYes(name) {
        name.css({ 'border': '1px solid green' }).next().addClass('error')
    }
    // 点击注册按钮
    $('#regBtn').click(function () {
        // 判断是否勾选用户协议
        var exampleCheck1 = $('#exampleCheck1').prop("checked");//获取值
        if (exampleCheck1 == false) {//未勾选
            alert('你未勾选用户协议')
            return false
        } else {//勾选
            // 判断标杆            
            // console.log(uFlag);
            // console.log(pFlag);
            // console.log(eFlag);
            // console.log(nFlag);
            if (uFlag && pFlag && eFlag && nFlag) {//都为true时
                console.log(11);
                // return false
                // 向后台发送ajax验证
                $.ajax({
                    url: "http://127.0.0.1:8848/reg.php",
                    type: "POST",
                    data: {
                        username: $username.val(),
                        pwd: $pwd.val(),
                        email: $email.val(),
                        nickname: $nickname.val()
                    },
                    success: function (yes) {
                        // 判断是否成功
                        if (yes == 'ok') {//成功
                            alert("恭喜您！" + $username.val());
                            location.href = "./login.html";
                        } else {//失败
                            alert('注册失败，请稍后重试')
                        }
                    }
                })
            } else {//有一个不为true时
                return false
                // console.log(2);
            }

        }
    })

})

