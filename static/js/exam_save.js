var dataSet = [];

$(document).ready(function () {
    var exam_qlist = $('#exam_qlist').DataTable({
        data: dataSet,
        autoWidth: false,
        ordering: true,
        columns: [
            { data: "seq", title: "序号", width: "6%", className: 'reorder' },
            { data: "id", title: "编号", width: "6%","orderable": false },
            { data: "item", title: "内容", width: "75%","orderable": false },
            { data: "type", title: "类型", width: "6%","orderable": false },
            { data: "rank", title: "难度", width: "6%","orderable": false },
            { data: 'answer', title: "答案", width: "1%","orderable": false,"visible":false }
        ],
        rowReorder: {
            dataSrc: 'seq'
        },

    });

    var exam = editormd("exam", {
        width: "100%",
        height: 200,
        delay: 600,
        htmlDecode : true, 
        autoHeight: true,
        syncScrolling: "single",
        watch: false,
        placeholder: "type here",
        path: "vendors/editormd/lib/",
        tex: true,
        imageUpload: true,
        imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        imageUploadURL: "/upload/fileUpload",
        toolbarIcons: function () {
            return ["undo", "redo", "image","datetime","html-entities", "watch"]
        },
        onload : function() {
            getExamInfo(this);
        }
    });

    exam.katexURL = {
        js: "js/katex.min",
        css: "css/katex.min"
    };

    var exam_id = $("#exam_id");
    var exam_name = $("#exam_name");
function getExamInfo(mdeditor){
    if(exam_id.val() !=""){
        var post_url = "/exam/exam_info";
        $.ajax({
            url: post_url,
            data: {
                exam_id: exam_id.val(),
            },
            type: "POST",
            timeout: 36000,
            dataType: "text",
            success: function (data, textStatus) {
                var dataJson = eval("(" + data + ")");
                if (dataJson.code == 200) {
                        exam_name.val(dataJson.name);
                        mdeditor.setMarkdown(dataJson.content);
                        var seqs = (dataJson.qids).split(",");
                        for(var i=0;i<seqs.length;i++){
                            for(var j=0;j<dataJson.data.length;j++){
                                if(dataJson.data[j].id == seqs[i]){
                                    dataJson.data[j]["seq"]= i+1;
                                }
                            }
                        }
                        exam_qlist.rows.add(dataJson.data);
                        exam_qlist.draw();
                        
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
}
    

    $('#exam_qlist tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            exam_qlist.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $('#btn_qdel').click(function () {
        exam_qlist.row('.selected').remove().draw(false);
    });

    $('#btn_examgen').click(function () {
        var data = exam_qlist.data();
        var content = "# <center>"+$("#exam_name").val()+"</center>\n";
        data.sort(sortId);
        data.each(function (d) {
            content += d.seq+". "+d.item + "\n"+"答案: "+d.answer+"\n\n";
        });
        exam.setMarkdown(content);
    });

    function sortId(a, b) {
        return a.seq - b.seq;
    }

    var qlist = $('#qlist').DataTable({
        "processing": false,
        "ajax": {
            "url": "/qlist/qlist",
            "type": "POST"
        },
        columns: [
            { data: 'id', title: "编号", width: "8%" },
            { data: 'item', title: "题目", width: "68%" },
            { data: 'type', title: "题型", width: "8%" },
            { data: 'rank', title: "难度1", width: "8%" },
            { data: 'answer', title: "答案", width: "1%",visible:false }
        ],
        paging: true,
        searching: true,
        autoWidth: false,
        searchHighlight: true,
        lengthChange: true,
        //"dom": '<"top"i>rt<"bottom"lp><"clear">',
        columnDefs: [{
            targets: 5,
            render: function (data, type, row, meta) {
                var html = '<button type="button" class="btn btn-sm btn-outline-primary btn_add">加入</button>';
                return html;
            }
        },
        { "orderable": false, "targets": 5 },
        ],
        createdRow: function (row, data, index) {
           
        }
    });


    qlist.on('click', '.btn_add', function (e) {
        var data = qlist.row($(this).closest('tr')).data();
        data["seq"] = getnextseq();
        exam_qlist.row.add(data).draw();
    });

    function getnextseq() {
        var data = exam_qlist.data();
        var maxseq = 0;
        data.each(function (d) {
            if (d.seq > maxseq) {
                maxseq = d.seq;
            }
        });
        return maxseq + 1;
    }

    

    $("#exam_save,#exam_save1").on('click', function (e) {
        
        var data = exam_qlist.data();
        var qids = "";
        
        data.each(function (d) {
            qids += d.id + ",";
        });
        if(qids != ""){
            qids=qids.substring(0,qids.length-1);
        }
        if (exam_name.val() == "" || exam.getMarkdown() == "") {
            alert("有*字段不能为空！");
        } else {
            var post_url = "/exam/exam_add";
            if (exam_id.val() != "") {
                post_url = "/exam/exam_update";
            }

            $.ajax({
                url: post_url,
                data: {
                    name: exam_name.val(),
                    qids: qids,
                    exam_id: exam_id.val(),
                    content: exam.getMarkdown()
                },
                type: "POST",
                timeout: 36000,
                dataType: "text",
                success: function (data, textStatus) {
                    var dataJson = eval("(" + data + ")");
                    if (dataJson.code == 200) {
                        if(dataJson.exam_id>0){
                            exam_id.val(dataJson.exam_id);
                        }
                        alert("保存成功");
                    } else if (dataJson.code == 400) {
                        alert("保存失败！" + dataJson.msg);
                    } else {
                        alert("保存出错！未知错误！");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("error:" + textStatus);
                }
            });
        }
    });

    $("#exam_preview,#exam_preview1").on('click', function (e) {

        if (exam_name.val() == "" || exam.getMarkdown() == "") {
            alert("有*字段不能为空！");
        } else {
            $("#preview_content").val(exam.getMarkdown());
            window.open("preview.html");
        }
    });


});

