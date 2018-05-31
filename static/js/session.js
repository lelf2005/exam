function session_check(){
    $.ajax({
        url: "/session/session_check",
        type: "POST",
        timeout: 36000,
        dataType: "text",
        success: function (data, textStatus) {
            var dataJson = eval("(" + data + ")");
            if (dataJson.code == 200) {
                alert(dataJson.username);
            } else if (dataJson.code == 400) {
                window.location.href = "/";
            } else {
                window.location.href = "/";
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("unknown error");
        }
    });
}