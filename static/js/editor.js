$(document).ready(function() {
	var testEditor = editormd("editormd", {
                    width   : "90%",
                    height  : 640,
                    syncScrolling : "single",
                    path    : "vendors/editormd/lib/",
					tex  : true
                });

	editormd.katexURL = {
		js  : "js/katex.min",  
		css : "css/katex.min"  
	};

} );