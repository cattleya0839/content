$(function() {
    /* ページャの数字部分がクリックされた時の処理 */
    $('.page-num').on('click',
        function() {
            var pageList = $(".page-num");
            let pageLength = pageList.length;
            pageList.removeClass("selected");
            $('[num=\'' + $(this).attr('num') + '\']').addClass("selected");
    });

    /* ページャの先送りボタンがクリックされた時の処理 */
    $('.page-ejection').on('click',
    function() {
        var pageList = $(".page-num");
        let pagerNum = $(".pager").length;
        let maxPageNum = pageList.length / pagerNum;
        let currentSelectedObj = $('.selected');
        let currentPageNum = Number(currentSelectedObj.attr('num'));
        /* 現在表示されているページが最後の時先送りを行わない */
        if(maxPageNum === currentPageNum)
        {
            return;
        } 
        pageList.removeClass('selected');
        currentSelectedObj.next('li').addClass('selected');
    });

        /* ページャの後送りボタンがクリックされた時の処理 */
    $('.page-back').on('click',
    function() {
        var pageList = $(".page-num");
        let minPageNum = 1;
        let currentSelectedObj = $('.selected');
        let currentPageNum = Number(currentSelectedObj.attr('num'));
        /* 現在表示されているページが最初の時先送りを行わない */
        if(currentPageNum === minPageNum)
        {
            return;
        } 
        pageList.removeClass('selected');
        currentSelectedObj.prev('li').addClass('selected');
    });
});
