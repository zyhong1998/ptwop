$(function () {
    // console.log('11dsad1');
    // 获取用户名信息
    if (!(localStorage.getItem("uid") && localStorage.getItem("username"))) {
        alert("请先登录！！！");
        location.href = "/login.html";
        return false
    }   
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
            // 调用饼状图
            drawPie(yes.totalmoney,yes.usablemoney,yes.blockedmoney)
        }
    })
    // 饼状图
    function drawPie(totalmoney,usablemoney,blockedmoney) {
        var myChart = echarts.init(document.getElementById("box"));
        var option = {
            title: {
                text: '资产占比统计',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['总金额', '可用金额', '冻结金额']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: totalmoney, name: '总金额' },
                        { value: usablemoney, name: '可用金额' },
                        { value: blockedmoney, name: '冻结金额' }

                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    }

})