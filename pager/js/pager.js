let commonPagerObj;

$(function () {

    $(document).ready(function () {
        commonPagerObj = new Pager();
        commonPagerObj.CreatePager();
    });

    /* ページャの数字部分がクリックされた時の処理 */
    $(document).on('click', '.page-num',
        function () {
            commonPagerObj.CreatePager(this.innerText);
        });

    /* ページャの先送りボタンがクリックされた時の処理 */
    $(document).on('click', '.page-ejection',
        function () {
            commonPagerObj.ForwardPage();
        });

    /* ページャの後送りボタンがクリックされた時の処理 */
    $(document).on('click', '.page-back',
        function () {
            commonPagerObj.BackPage();
        });

    /* データ数か1ページ当たりのデータ数が変更された時の処理 */
    $('.data-count, .data-count-per-page, .display-page-count').change(function () {
        commonPagerObj = new Pager();
        commonPagerObj.CreatePager();
    });
});

/* ページ数を求める */
let GetPageCount = function () {
    /* ページ数を求める */
    let dataCount = $('.data-count')[0].value;
    let dataCountPerPage = $('.data-count-per-page')[0].value;
    return Math.ceil(dataCount / dataCountPerPage);
}

/* ページャ用クラス */
function Pager(selectedPageNum) {
    this.selectedPageNum = isNaN(selectedPageNum) ? 1 : Number(selectedPageNum);
    this.contents = $('.pager-contents');
    this.contentsList = $('.pager-contents-list');
    this.pagerLength = $('.display-page-count')[0].value;
    this.pageCount = GetPageCount();
    this.pagerTag = '<li class="page-num pager-contents"  num="{num}">{num}</li>';
    this.selectedPagerTag = '<li class="page-num pager-contents selected"  num="{num}">{num}</li>';
    this.pagerPrevButtonTag = '<li class="pager-contents page-back">&#x25C1;';
    this.pagerNextButtonTag = '<li class="pager-contents page-ejection">&#x25B7;';
    this.pagerNanTag = '<li class="pager-contents not-num"><span>...</span></li>';
}

/* タグ追加用関数 */
Pager.prototype.appendPagerTag = function (tagString) {
    this.contentsList.append(tagString);
};

/* ページャの作成処理 */
Pager.prototype.CreatePager = function (selectedPageNum) {
    this.selectedPageNum = isNaN(selectedPageNum) ? this.selectedPageNum : Number(selectedPageNum);

    /* 現存するページャを削除する */
    this.contents.remove();
    /* 作成する必要がないときそのまま返却する。 */
    if (this.pageCount < 1) {
        return;
    }
    /* ページ戻りのボタン作成 */
    this.appendPagerTag(this.pagerPrevButtonTag);

    /* 数字部分の追加 */
    this.CreatePageNumTag(selectedPageNum);

    /* ページ送りのボタンを作成 */
    this.appendPagerTag(this.pagerNextButtonTag);

    // 情報を更新
    commonPagerObj = new Pager(this.selectedPageNum);
};

Pager.prototype.CreatePageNumTag = function () {

    let halfPagerLength = Math.floor(Number(this.pagerLength / 2));
    let centerPartMinNum = this.selectedPageNum - halfPagerLength;
    let centerPartMaxNum = this.selectedPageNum + halfPagerLength;

    if(this.pageCount - 1 <= Math.max(this.pagerLength)) // 省略不要な場合
    {
        this.CreateContinuityTag(1, this.pageCount);
        return;    
    }

    /* ページャの前半部分 */
    if (centerPartMinNum <= 2) { //小島が存在しない場合
        this.CreateContinuityTag(1, this.pagerLength);
        this.appendPagerTag(this.pagerNanTag);
        this.CreateContinuityTag(this.pageCount);
        return;
    }
    else {
        this.CreateContinuityTag(1);
    }

    /* ページャの最大長を超えていることが保証されているため・・・を追加する */
    this.appendPagerTag(this.pagerNanTag);

    /* ページャの後半部分 */
    /* ページャの中央に小島部分(1...[小島]...100)ができるかを判定する */
    if (this.pageCount - 1 <= centerPartMaxNum) //小島が存在しない場合
    {
        this.CreateContinuityTag(this.pageCount-this.pagerLength+1, this.pageCount);
        return
    }

    //小島ができる場合
    this.CreateContinuityTag(this.selectedPageNum - halfPagerLength + 1,
         this.selectedPageNum + halfPagerLength - 1);
    this.appendPagerTag(this.pagerNanTag);
    this.CreateContinuityTag(this.pageCount, this.pageCount);
    return;
}

Pager.prototype.CreateContinuityTag = function (startNum, endNum) {
    endNum = isNaN(endNum) ? startNum : endNum;
    for (i = startNum; i <= endNum; ++i) {
        if (i === this.selectedPageNum) {
            this.appendPagerTag(this.selectedPagerTag.replace(/{num}/g, String(i)));
        }
        else {
            this.appendPagerTag(this.pagerTag.replace(/{num}/g, String(i)));
        }
    }
}

Pager.prototype.ForwardPage = function (){
    if(this.selectedPageNum === this.pageCount)
    {
        return ;
    }
    this.selectedPageNum++;
    this.CreatePager();
}

Pager.prototype.BackPage = function (){
    if(this.selectedPageNum === 1)
    {
        return;
    } 
    this.selectedPageNum--;
    this.CreatePager();
}
