$(document).ready(function() {
	var editor = editormd("editormd", {
                    width   : "90%",
                    height  : 640,
                    syncScrolling : "single",
                    path    : "vendors/editormd/lib/",
					tex  : true,
					imageUpload    : true,
					imageFormats   : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
					imageUploadURL : "/upload/fileUpload",
                });

	editormd.katexURL = {
		js  : "js/katex.min",  
		css : "css/katex.min"  
	};

} );