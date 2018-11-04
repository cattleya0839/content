/// <reference path="./jquery-3.3.1.js" />

function getJson() {
    var method = $("#http_method")[0].value;
    var url = "http://localhost:62515/ResponseJson";
    var param = {};
    param.file = "client";
    param.callback = "hoge";

    $.ajax({
        url:url,
        type:method,
        data:param,
        // contentType: 'application/json',
        xhrFields: {
            withCredentials: false
        }
    })
    .done((response) => {
        $('.result').html(response);
        console.log(response);
    });
}