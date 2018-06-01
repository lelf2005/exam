function session_check(){
    $.ajax({
        url: "/session/session_check",
        type: "POST",
        timeout: 36000,
        dataType: "text",
        success: function (data, textStatus) {
            var dataJson = eval("(" + data + ")");
            if (dataJson.code == 200) {
            } else {
                window.location.href = "/";
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("unknown error");
        }
    });
}