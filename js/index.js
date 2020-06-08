// 文档加载事件
$(function () {
    // 公告垂直方向滚动轮播
    function autoScroll(obj) {
        // 每次向上运动20px
        $(".title ul").animate({
            marginTop: "-20px"
        }, 800, function () {
            $(this).css({ marginTop: "0px" }).find("li:first").appendTo(this);
        })
    }
    $(function () {
        if ($(".title ul li").length > 2) {
            setInterval('autoScroll(".title")', 2000);
        }
    })
    // 开启计时器，两秒执行一次
    setInterval(function () {
        autoScroll()
    }, 2000)

})