$(function () {
    // 发送ajax获取详情列表
    $.ajax({
        url: "http://127.0.0.1:8848/getborrowinfo.php",
        type: "GET",
        data: {
            borrowid: sessionStorage.getItem('payid')
        },
        dataType: "json",
        success: function (yes) {
            for (var key in yes) {
                $("#" + key).text(yes[key])
            }
        }
    })

    // 定义标杆
    var cFlag = false
    $('#chargemoney').blur(function () {
        var bVal = $(this).val()
        var that = $(this)
        // 获取最大投资数
        var borrowmoney = $("#borrowmoney").text()
        var ownmoney = $("#ownmoney").text()
        // console.log(borrowmoney);
        // console.log(ownmoney);
        var price = borrowmoney - ownmoney
        // console.log(price);
        if (!(bVal)) {
            // 没值
            err(that, '请输入数额')
            cFlag = false
            return false
        } else {
            if (bVal <= 0) {
                that.val('')
                err(that, '请输入正确的数额')
                cFlag = false
                return false
            } else {
                if (bVal > price) {
                    alert('最大投资数为' + price + '元')
                    that.val(price)
                    cFlag = true

                } else {
                    that.val(parseInt(Number(bVal)))
                    yes(that)
                    cFlag = true
                }

            }
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


    // 点击投资
    $('.btn').click(function () {

        var username = localStorage.getItem('username')
        var  userid = $("#userid").text()
       if(username==userid){
           alert('禁止刷单')
           return
       }
        if (!cFlag) {
            alert('请填写完整信息')
        } else {
            // 发送ajax进行投资
            $.ajax({
                url: "http://127.0.0.1:8848/invest.php",
                type: "POST",
                data: {
                    id: localStorage.getItem('uid'),
                    borrowid: sessionStorage.getItem('payid'),
                    chargemoney: $("#chargemoney").val()
                },
                success: function (yes) {
                    if (yes == '10001') {
                        alert('余额不足，请先充值')
                        location.href = '/recharge.html'
                    } else if (yes == 'ok') {
                        alert('恭喜投资成功')
                        location.href = '/#personal'
                    } else {
                        alert('请稍后再试')
                    }
                }
            })
        }


    })
})