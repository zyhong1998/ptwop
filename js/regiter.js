// 文档加载事件
window.onload = function () {
    var validateCode = getId("inputPassword");
    var randomCode = getId("randomCode");
    var errorInfo = getId("errorInfo");
    var confirm = getId("confirm");
    randomCode.innerHTML = generateRandomCode();
    // 点击refresh按钮,重置验证码
    refresh.onclick = function () {
        randomCode.innerHTML = generateRandomCode();
    };
    // 进行验证
    randomCode.onclick = function () {
        var val = validateCode.value;
        errorInfo.style.display = 'block';
        if (val) {
            if (val !== randomCode.innerHTML) {
                errorInfo.innerHTML = '验证码有误，请重新输入！';
                randomCode.innerHTML = generateRandomCode();
            } else {
                errorInfo.style.display = "none";
                setTimeout(function () {
                    alert("验证成功");
                }, 80);

            }
        } else {

            errorInfo.innerHTML = '';
            randomCode.innerHTML = generateRandomCode();
        }
    };
    /**
 * 根据元素获取id
 * @param {String} id 需要获取的元素的id
 */
function getId(id) {
    return document.getElementById(id);
}
function generateRandomCode() {
    // 用于盛放随机数码的空数组
    var result = [];
    // 长度为62的数码数组
    var arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (var i = 0; i < 4; i++) {
        // 用于随机获取arr中的元素，产生[0,62]之间的随机整数
        var num = Math.floor(Math.random() * 62);
        result.push(arr[num]);
    }
    // console.log(result);
    return result.join('')    

}

$('.col-sm-10 .user').blur(function () {
    // 获取输入值
    var userVal = $(this).val()
    var that = $(this)
    // console.log(userVal);
    
    if (userVal) {//有值
        // js正则表达式验证
        if (/^[a-zA-Z0-9_-]{4,16}$/.test(userVal)) {
            console.log(1);
            // 合法时
            that.css({'border':'1px solid green'}).addClass('error')
            // 向后台发送数据验证是否重复
            // $.ajax({
            //     url: "http://139.9.177.51:3333/api/emailExist",
            //     type: "post",
            //     data: "email=" + emailVal,
            //     success: function (yes) {
            //         if (yes.code == 200) {//不重复
            //             // console.log(1);
            //             that.css({ 'border': '1px solid green' }).next().removeClass('erorr').css({ 'color': 'green' }).text('邮箱没被注册，可以使用')
            //             emailFlag = true
            //         } else {//重复
            //             // 推荐邮箱
            //             // 获取@号所在位置
            //             var index = emailVal.lastIndexOf('@')
            //             //获取@号之前的字符
            //             var val2 = emailVal.slice(0, index)
            //             // 获取@符号之后的字符
            //             var val3 = emailVal.slice(index)
            //             // console.log(val3);                                
            //             // 生成随机数
            //             var rand = Math.floor(Math.random () * 900) + 100;
            //             // 拼接@号前的字符串和随机数
            //             val2 = val2+rand
            //             // console.log(val2);
            //             $('#exampleInputEmail1').css({ 'border': '1px solid red' }).next().removeClass('erorr').css({ 'color': 'red' }).text('邮箱已被注册，请换一个如：' + val2 + val3)
            //             emailFlag = false
            //         }
            //     }
            // })
        } else {
            // 不合法时
            // console.log(2);
            that.css({ 'border': '1px solid red' }).removeClass('error').next().css('color','red').text('用户名不合法，重新输入')
            // emailFlag = false
            // return false
        }
    } else {//没值
        $('#title').removeClass('error')
        that.css({ 'border': '1px solid red' ,}).next().css('color','red').text('请输入用户名')
        // emailFlag = false
    }
})

};


