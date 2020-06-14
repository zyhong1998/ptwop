$(function () {
    // console.log('as');
    // 事件委派
      
    $('.content').on('click', '.btn', function () {
        if (!(localStorage.getItem("uid") && localStorage.getItem("username"))) {
            alert("请先登录！！！");
            location.href = "/login.html";
            return false
        } 
        // 将自定义属性放在会话存储
        // $(this).data('type')
        var type = $(this).data('type')
        sessionStorage.setItem('type', type)
        location.href='#personal/borrow_apply'
    })

})