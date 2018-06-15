$(document).ready(function () {
    var parent_win = window.opener;
    var txt = "";
    if (parent_win) {
        txt = parent_win.document.getElementById("preview_content");
        $("#exam").val(txt.value);
    }

    


    marked.setOptions({
		gfm: true,
		breaks: true,
		latexRender: katex.renderToString.bind(katex),
	});
    
    function mdRender(){
        var text = $("#exam").val();
        
        $("#preview").html(marked(text));
    }
	mdRender();
});
