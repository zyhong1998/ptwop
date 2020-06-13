$(function () {
    // 定义标杆
    var bankcodeFlag = true
    var chargemoneyFlag = false
    var inputPasswordFlag = false
    // 银行验证
    $('#bankcode').blur(function () {
        yes($(this))
        bankcodeFlag = true
    })
    // 充值金额验证
    $('#chargemoney').blur(function () {
        var bVal = $(this).val()
        if (!(bVal)) {
            // 没值
            err($(this), '请输入数额')
            chargemoneyFlag = false
            return false
        } else {

            if (bVal <= 0) {
                $(this).val('')
                err($(this), '请输入正确的数额')
                chargemoneyFlag = false
                return false
            } else {
                $(this).val(Number(bVal))
                yes($(this))
                chargemoneyFlag = true
            }
        }
    })
    // 描述验证
    $('.textarea').blur(function () {
        var bVal = $(this).val()
        if (!(bVal)) {
            // 没值
            err($(this), '请输入描述')
            inputPasswordFlag = false
            return false
        } else {
            yes($(this))
            inputPasswordFlag = true
        }
    })
    // 封装验证失败提示信息的函数
    function err(name, title) {
        name.css('border', '1px solid red').parent().siblings('.error').text(title).css('color', 'red')
    }
    // 封装验证成功提示信息的函数
    function yes(name) {
        name.css('border', '1px solid green').parent().siblings('.error').text('')
    }
    $('#rechargeBtn').click(function () {
        if (!(bankcodeFlag && chargemoneyFlag && inputPasswordFlag)) {
            alert('请输入完整信息')
        } else {
            // alert(1)
            // 获取输入值
            var id = localStorage.getItem('uid')
            var bankcode = $('#bankcode').val()
            var chargemoney = $('#chargemoney').val()
            console.log(id);

            if (!id) {
                alert('请先登录')
                location.href = 'login.html'
            }
            // console.log(bankcode);
            $.ajax({
                url: "http://127.0.0.1:8848/charge.php",
                type: "POST",
                data: {
                    id: id,
                    bankcode: bankcode,
                    chargemoney: chargemoney
                },
                success: function (yes) {
                    if (yes == 'ok') {
                        alert('恭喜您充值成功')
                        location.href = '/#personal/getuserinfo'
                    } else {
                        alert('充值失败，请稍后再试')
                    }
                }
            })

        }

    })

})