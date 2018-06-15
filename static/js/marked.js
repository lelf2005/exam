$(document).ready(function () {
	marked.setOptions({
		gfm: true,
		breaks: true,
		latexRender: katex.renderToString.bind(katex),
	});
    
    function mdRender(){
        var text = $("#source").val();
        $("#preview").html(marked(text));
    }
	mdRender();
});

function mdRender(){
    var text = $("#source").val();
    $("#preview").html(marked(text));
}