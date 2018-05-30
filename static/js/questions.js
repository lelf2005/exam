$(document).ready(function () {

    var qlist = $('#qlist').DataTable({
        "processing": true,
        "ajax": {
            "url": "/qlist/qlist",
            "type": "POST"
        },
        columns: [
            { data: 'id', title: "编号", width: "5%" },
            { data: 'item', title: "题目", width: "75%" },
            { data: 'type', title: "题型", width: "5%" },
            { data: 'rank', title: "难度", width: "5%" }
        ],
        paging: true,
        searching: true,
        autoWidth: false,
        searchHighlight: true,
        lengthChange: false,
        "dom": '<"top"i>rt<"bottom"lp><"clear">',
        columnDefs: [{
            targets: 4,
            render: function (data, type, row, meta) {
                var html = '<button type="button" class="btn btn-sm btn-outline-primary" onclick=alert(' + row.id + ') >修改</button>';
                html += ' <button type="button" class="btn btn-sm btn-outline-danger" onclick=alert(' + row.id + ') >删除</button>';
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

    $('#global_filter').on('keyup click', function (event) {
        filterGlobal();
    });

    function filterGlobal() {
        $('#qlist').DataTable().search(
            $('#global_filter').val()
        ).draw();

    }



});