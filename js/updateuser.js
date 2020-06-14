$(function () {
    isLogin()
    function isLogin() {
        if (!(localStorage.getItem("uid") && localStorage.getItem("username"))) {
            alert("请先登录！！！");
            location.href = "/login.html";
            return false
        }
    }
    // 定义标杆
    var nicknameFlag = false
    var emailFlag = false
    var phoneFlag = false
    // 昵称验证
    $('#nickname').blur(function(){
        var tVal = $(this).val()
        if(!tVal){
            err($(this), '请输入昵称')
            nicknameFlag = false
        }else{
            if(/^[a-zA-Z]\w{2,11}$/.test(tVal)){
                yes($(this))
                nicknameFlag = true
            }else{
                err($(this), '请输入合法昵称')
                nicknameFlag = false
            }
        }
    })
    // 邮箱验证
    $('#email').blur(function(){
        var tVal = $(this).val()
        if(!tVal){
            err($(this), '请输入邮箱')
            emailFlag = false
        }else{
            if(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(tVal)){
                yes($(this))
                emailFlag = true
            }else{
                err($(this), '请输入合法邮箱')
                emailFlag = false
            }
        }
    })
    // 电话验证
    $('#phone').blur(function(){
        var tVal = $(this).val()
        if(!tVal){
            err($(this), '请输入电话')
            phoneFlag = false
        }else{
            if(/\d{11}/.test(tVal)){
                yes($(this))
                phoneFlag = true
            }else{
                err($(this), '请输入合法电话')
                phoneFlag = false
            }
        }
    })
    // 封装验证失败提示信息的函数
    function err(name, title) {
        name.css('border', '1px solid red').siblings('.error').text(title).css('color', 'red')
    }
    // 封装验证成功提示信息的函数
    function yes(name) {
        name.css('border', '1px solid green').siblings('.error').text('')
    }
    // console.log('dsadsa');
    $('#saveBtn').click(function () {
        // 获取输入值
        var nickname = $('#nickname').val()
        var email = $('#email').val()
        var phone = $('#phone').val()
        var id = localStorage.getItem('uid')
        $.ajax({
            url:"http://127.0.0.1:8848/updateuser.php",
            type:"POST",
            data:{
                id:id,
                nickname:nickname,
                email:email,
                phone:phone
            },
            success:function(yes){
                if(yes == 'ok'){
                    alert('保存成功')
                    location.href='#personal/getuserinfo'
                }else{
                    alert('保存失败，请稍后重试')
                }
            }
        })
    })


})