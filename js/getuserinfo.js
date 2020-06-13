$(function () {
    // console.log('11dsad1');
    // 获取用户名信息
    $.ajax({
        url: "http://127.0.0.1:8848/getuserinfo.php?id=273",
        type: "GET",
        data: {
            id: localStorage.getItem('uid')
        },
        dataType: "json",
        success: function (yes) {
            // 渲染
            for (var key in yes) {
                // console.log(key);
                $('#' + key).text(yes[key])
            }
        }
    })

})