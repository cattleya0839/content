$(function() {
    $('.page-num').on('click',
        function() {
            console.log(this.innerText);
            var pageList = $(".page-num");
            let pageLength = pageList.length;
            pageList.removeClass("selected");
            $(this).addClass("selected");
    });
});
