var dataSet = [];

$(document).ready(function () {
    var exam_qlist = $('#exam_qlist').DataTable({
        data: dataSet,
        autoWidth: false,
        ordering: false,
        columns: [
            { data: "seq", title: "序号", width: "5%", className: 'reorder' },
            { data: "id", title: "编号", width: "5%" },
            { data: "item", title: "内容", width: "80%" },
            { data: "type", title: "类型", width: "5%" },
            { data: "rank", title: "难度", width: "5%" }
        ],
        rowReorder: {
            dataSrc: 'seq'
        },

    });

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
        var content="";
        data.sort(sortId);
        data.each( function (d) {
            content+=d.item+"\n";
        } );
        exam.setMarkdown(content);
    });

    function sortId(a,b){  
        return a.seq-b.seq;
     }

     var qlist = $('#qlist').DataTable({
        "processing": false,
        "ajax": {
            "url": "/qlist/qlist",
            "type": "POST"
        },
        columns: [
            { data: 'id', title: "编号", width: "8%" },
            { data: 'item', title: "题目", width: "76%" },
            { data: 'type', title: "题型", width: "8%" },
            { data: 'rank', title: "难度", width: "8%" }
        ],
        paging: true,
        searching: true,
        autoWidth: false,
        searchHighlight: true,
        lengthChange: true,
        //"dom": '<"top"i>rt<"bottom"lp><"clear">',
        columnDefs: [{
            targets: 4,
            render: function (data, type, row, meta) {
                var html = '<button type="button" class="btn btn-sm btn-outline-primary btn_add">加入</button>';
                return html;
            }
        },
        { "orderable": false, "targets": 4 },
        ],
        createdRow: function (row, data, index) {
            if (data["type"] == 1) {
                $('td:eq(2)', row).html('填空');
            } else if (data["type"] == 2) {
                $('td:eq(2)', row).html('选择');
            } else if (data["type"] == 3) {
                $('td:eq(2)', row).html('判断');
            } else if (data["type"] == 4) {
                $('td:eq(2)', row).html('解答');
            }
        }
    });
    

    qlist.on('click', '.btn_add', function (e) {
        var data = qlist.row($(this).closest('tr')).data();
        data["seq"]=getnextseq();
        exam_qlist.row.add( data ).draw();
    });

    function getnextseq(){
        var data = exam_qlist.data();
        var maxseq = 1;
        data.each( function (d) {
            if(d.seq > maxseq){
                maxseq=d.seq;
            }
        } );
        return maxseq+1;
    }

    var exam = editormd("exam", {
		width: "100%",
		height: 200,
		delay: 600,
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
			return ["undo", "redo", "image", "watch"]
		}
	});

	exam.katexURL = {
		js: "js/katex.min",
		css: "css/katex.min"
	};
    

});

