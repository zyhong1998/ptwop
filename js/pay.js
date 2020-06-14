$(function () {
    var page = 1//当前页
    var row = 2//每页显示的条数
    load()
    function load() {
        // 发送ajax
        $.ajax({
            url: "http://127.0.0.1:8848/getborrow.php",
            type: "GET",
            data: {
                page: page,
                row: row
            },
            dataType: "json",
            success: function (yes) {
                var total = yes.total //总条数
                var list = yes.list //数据
                var totalPage = Math.ceil(total / row)
                //分页插件
                $('#page').pagenation({
                    nowPage: page, //当前页
                    pageNum: totalPage, //总页数
                    callback: function (p) {
                        // p当前页码
                        page = p;
                        load();
                    }
                });
                // console.log(list);
                var reHtml = ''
                for (var i = 0, len = list.length; i < len; i++) {
                    // console.log(list[i].id);
                    reHtml += '<tr>'
                    reHtml += '<td scope="row">' + list[i].userid + '</td>'
                    reHtml += "<td>" + list[i].title + "</td>"
                    reHtml += '<td>' + ((list[i].interest) * 1).toFixed(2) + '%</td>'
                    reHtml += '<td>￥:  ' + ((list[i].borrowmoney) * 1).toFixed(2) + '</td>'
                    reHtml += '<td>' + (list[i].repaytype == '0' ? '按月分期' : '按月到期') + '</td>'
                    reHtml += '<td>' + (((list[i].ownmoney / list[i].borrowmoney) * 100) == 100 ? '已完成' : (list[i].ownmoney / list[i].borrowmoney) * 100 +'%') + '</td>'
                    reHtml += '<td><a href="#" data-payid=' + list[i].id + '>查看</a></td>'
                    reHtml += '</tr>'
                }
                // 渲染
                $('#payList').html(reHtml)
            }
        })
    }

    // 查看 添加到本地存储
    $('#payList').on('click', 'a', function () {
        // console.log(2);
        if (!(localStorage.getItem("uid") && localStorage.getItem("username"))) {
            alert("请先登录！！！");
            location.href = "/login.html";
            return false
        } else {
            sessionStorage.setItem('payid', $(this).data('payid'))
            location.href = '/borrow_info.html'
            return false
        }
    })



    // function isLogin() {
    //     if (!(localStorage.getItem("uid") && localStorage.getItem("username"))) {
    //         alert("请先登录！！！");
    //         location.href = "/login.html";
    //         return false
    //     }

    // }

})