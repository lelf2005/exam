$(document).ready(function () {
    var examlist = $('#examlist').DataTable({
        "processing": false,
        "ajax": {
            "url": "/exam/examlist",
            "type": "POST"
        },
        columns: [
            { data: 'id', title: "编号", width: "5%" },
            { data: 'name', title: "名称", width: "75%" }
        ],
        paging: true,
        searching: true,
        autoWidth: false,
        searchHighlight: true,
        lengthChange: true,
        //"dom": '<"top"i>rt<"bottom"lp><"clear">',
        columnDefs: [{
            targets: 2,
            render: function (data, type, row, meta) {
                var html = '<button type="button" class="btn btn-sm btn-outline-primary" onclick="setqid(' + row.id + ');" >修改</button>';
                html += ' <button type="button" class="btn btn-sm btn-outline-danger" data-toggle="modal" data-target="#confirmdel" onclick="setqid(' + row.id + ');">删除</button>';
                return html;
            }
        },
        { "orderable": false, "targets": 2 },
        ]
    });

    var examdel = $("#examdel");
    var examid = $("#examid");
    var btn_examadd = $("#btn_examadd");

    btn_examadd.click(function () {
        $("#exam_edit").click();
    });

    examdel.click(function () {
        if (examid.val() == "") {
            alert("删除失败！");
        } else {
            var post_url = "/exam/examdel";

            $.ajax({
                url: post_url,
                data: {
                    examid: examid.val()
                },
                type: "POST",
                timeout: 36000,
                dataType: "text",
                success: function (data, textStatus) {
                    var dataJson = eval("(" + data + ")");
                    if (dataJson.code == 200) {
                        alert("删除成功");
                        $("#confirmdel").modal('hide');
                        examlist.ajax.reload();
                    } else if (dataJson.code == 400) {
                        alert("删除失败！" + dataJson.msg);
                    } else {
                        alert("删除出错！未知错误！");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("error:" + textStatus);
                }
            });
        }
    });
});

function setqid(examid) {
    $("#examid").val(examid);
}