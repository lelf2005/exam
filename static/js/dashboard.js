$(document).ready(function () {
    getCount()
    function getCount() {
  
            var post_url = "/dashboard/count";
            $.ajax({
                url: post_url,
                data: {
                },
                type: "POST",
                timeout: 36000,
                dataType: "text",
                success: function (data, textStatus) {
                    var dataJson = eval("(" + data + ")");
                    if (dataJson.code == 200) {
                        $("#q_count").html(dataJson.q_count);
                        $("#e_count").html(dataJson.e_count);
                        $("#u_count").html(dataJson.u_count);
                        $("#t_count").html(dataJson.t_count);
                    } else if (dataJson.code == 400) {
                        alert("查询失败！" + dataJson.msg);
                    } else {
                        alert("查询出错！未知错误！");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("error:" + textStatus);
                }
            });
        }
    
});