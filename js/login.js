// 文档加载事件
window.onload = function () {
    // 随机验证码
    // 定义一个随机数数组
    var result;
    var validateCode = getId("verify");
    var randomCode = getId("randomCode");
    var errorInfo = getId("errorInfo");
    var confirm = getId("confirm");
    randomCode.innerHTML = generateRandomCode();
    // 点击图片时，切换验证码
    randomCode.onclick = function () {
        refresh()
    }
    /**
 * 根据元素获取id
 * @param {String} id 需要获取的元素的id
 */
    function getId(id) {
        return document.getElementById(id);
    }
    //封装函数 用于盛放随机数码的空数组
    function generateRandomCode() {
        // 用于盛放随机数码的空数组
        result = []
        // 长度为62的数码数组
        var arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        for (var i = 0; i < 4; i++) {
            // 用于随机获取arr中的元素，产生[0,36]之间的随机整数
            var num = Math.floor(Math.random() * 36);
            result.push(arr[num]);
        }
        // console.log(result);            
        return result.join('')
        // console.log(result.join('')); 
    }
    //封装函数 刷新一下验证码
    function refresh() {
        // 刷新一次验证码
        randomCode.innerHTML = generateRandomCode()
    }
    //封装函数 表单验证，发送ajax
    function myLogin(){
         // 获取随机数
         var loginResult = result.join('')
         // console.log(result.join(''));
         // 获取用户名、密码、随机验证码、同意用户协议
         var username = $('#username').val();
         var pwd = $('#pwd').val();
         var verify = $('#verify').val();
         var exampleCheck1 = $('#exampleCheck1').prop("checked");
         // 数值为空不执行
         if (!(username && pwd)) return false;
         // console.log(verify );
         // 判断输入验证码是否正确
         if (loginResult == verify) {
             // 用户协议未勾选时
             if (exampleCheck1 == false) {
                 alert('你未勾选用户协议')
                 refresh()
                 return false
             }
             // 向后台发送验证
             $.ajax({
                 url: "http://127.0.0.1:8848/login.php",
                 type: "POST",
                 data: {
                     username: username,
                     pwd: pwd
                 },
                 success: function (yes) {
                     // 成功回调函数
                     if (yes === "fail") {
                         // 验证失败情况
                         alert('用户名或密码错误')
                         refresh()
                     } else {
                         // 验证成功情况
                         // 把用户名和用户id放进本地储存
                         localStorage.setItem("username", username)
                         localStorage.setItem("uid", yes)
                         alert(username + "欢迎回家。")
                         location.href = '/#'//跳转到首页
                     }
                 },
                 error: function (err) {
                     // 失败回调函数
                 }
             })
         } else {
             alert('验证码不正确，重新输入')
             refresh()
             return false
         }
    }
    // 点击登录事件
    $('#loginBtn').click(function () {
        myLogin()
    })
    // 敲击回车时
    $(document).keyup(function(event){
        if(event.keyCode ==13){          
            myLogin()
        }
      })
};


