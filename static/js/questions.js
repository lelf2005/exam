$(document).ready(function() {

    var qlist = $('#qlist').DataTable({
		"processing": true,
         "ajax": {
            "url": "/qlist/qlist",
            "type": "POST"
          },
        columns: [
            { data: 'id',title: "编号", width: "5%"},
            { data: 'item',title: "题目", width: "85%" },
            { data: 'type',title: "题型", width: "5%" },
            { data: 'rank',title: "难度", width: "5%" }
            
        ],
		paging: true,
		searching: true,
        autoWidth: false,
        searchHighlight: true,
        lengthChange: false,
        "dom": '<"top"i>rt<"bottom"lp><"clear">'
      });

      $('#global_filter').on( 'keyup click', function (event) {
			filterGlobal();       
    } );

      function filterGlobal () {
        $('#qlist').DataTable().search(
            $('#global_filter').val()
        ).draw();

    }
} );