$(function () {
    isLogin()
    function isLogin() {
        if (!(localStorage.getItem("uid") && localStorage.getItem("username"))) {
            alert("请先登录！！！");
            location.href = "/login.html";
            return false
        }
    }
    // 获取当前会话值
    var type = sessionStorage.getItem('type')
    // console.log(type);
    switch (type) {
        case '1':
            $('.btnBox').text('信用贷').addClass('btn-success')
            break
        case '2':
            $('.btnBox').text('车易贷').addClass('btn-warning text-white')
            break
        case '3':
            $('.btnBox').text('房易贷').addClass('btn-primary')
            break
        default:
            location.href = "/#borrow";
    }
    // 封装验证失败提示信息的函数
    function err(name, title) {
        name.css('border', '1px solid red').siblings('.error').text(title).css('color', 'red')
    }
    // 封装验证成功提示信息的函数
    function yes(name) {
        name.css('border', '1px solid green').siblings('.error').text('')
    }
    // 定义标杆
    var bFlag = false
    var iFlag = false
    var borFlag = true
    var minbidFlag = false
    var bounsFlag = false
    var daysFlag = true
    var titleFlag = false
    var infoFlag = false
    // 借款金额验证
    $('#borrowmoney').blur(function () {
        var bVal = $(this).val()
        if (!(bVal)) {
            // 没值
            err($(this), '请输入数额')
            bFlag = false
            return false
        } else {

            if (bVal <= 0) {
                $(this).val('')
                err($(this), '请输入正确的数额')
                bFlag = false
                return false
            } else {
                $(this).val(Number(bVal))
                yes($(this))
                bFlag = true
            }
        }
    })
    // 借款利息验证
    $('#interest').blur(function () {
        var bVal = $(this).val()
        if (!(bVal)) {
            // 没值
            err($(this), '请输入数额')
            iFlag = false
            return false
        } else {

            if (bVal <= 0) {
                $(this).val('')
                err($(this), '请输入正确的数额')
                iFlag = false
                return false
            } else {
                $(this).val(Number(bVal))
                yes($(this))
                iFlag = true
            }
        }
    })
    // 借款期限验证
    $('#borrowtime').blur(function () {
        yes($(this))
        borFlag = true
    })
    // 最小投标验证
    $('#minbid').blur(function () {
        var bVal = $(this).val()
        if (!(bVal)) {
            // 没值
            err($(this), '请输入数额')
            minbidFlag = false
            return false
        } else {

            if (bVal <= 0) {
                $(this).val('')
                err($(this), '请输入正确的数额')
                minbidFlag = false
                return false
            } else {
                $(this).val(Number(bVal))
                yes($(this))
                minbidFlag = true
            }
        }
    })
    // 投标奖金验证
    $('#bouns').blur(function () {
        var bVal = $(this).val()
        if (!(bVal)) {
            // 没值
            err($(this), '请输入数额')
            bounsFlag = false
            return false
        } else {

            if (bVal <= 0) {
                $(this).val('')
                err($(this), '请输入正确的数额')
                bounsFlag = false
                return false
            } else {
                $(this).val(Number(bVal))
                yes($(this))
                bounsFlag = true
            }
        }
    })
    // 招标天数验证
    $('#days').blur(function () {
        yes($(this))
        daysFlag = true
    })
    // 标题验证
    $('#title').blur(function () {
        var bVal = $(this).val()
        if (!(bVal)) {
            // 没值
            err($(this), '请输入标题')
            titleFlag = false
            return false
        } else {
            yes($(this))
            titleFlag = true
        }
    })
    // 描述验证
    $('#info').blur(function () {
        var bVal = $(this).val()
        if (!(bVal)) {
            // 没值
            err($(this), '请输入描述')
            infoFlag = false
            return false
        } else {
            yes($(this))
            infoFlag = true
        }
    })
    $('#borrowApplyBtn').click(function () {
        if (!(bFlag && iFlag && borFlag && minbidFlag && bounsFlag && daysFlag && titleFlag && infoFlag)) {
            // 没值
            alert('请填写完整信息')
            // return false
        } else {
            // alert(1)
            // 获取输入值
            var id = localStorage.getItem('username')
            var borrowmoney = $('#borrowmoney').val()
            var interest = $('#interest').val()
            var borrowtime = $('#borrowtime').val()
            var repaytype = $('input[type="radio"]:checked').val()
            var minbid = $('#minbid').val()
            var bouns = $('#bouns').val()
            var days = $('#days').val()
            var title = $('#title').val()
            var info = $('#info').val()
            // return false
            $.ajax({
                url: "http://127.0.0.1:8848/borrow.php",
                type: "POST",
                data: {
                    acc: id,
                    borrowmoney: borrowmoney,
                    interest: interest,
                    borrowtime: borrowtime,
                    repaytype: repaytype,
                    minbid: minbid,
                    bouns: bouns,
                    days: days,
                    title: title,
                    info: info
                },
                success: function (yes) {
                    if (yes == "ok") {
                        alert("提交成功，等待审核...");
                        location.href = "/";
                    } else {
                        alert("提交失败，请稍后再试~~~");
                    }
                }
            })
        }
    })

})