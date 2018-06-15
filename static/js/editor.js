$(document).ready(function () {
	var question = editormd("question", {
		width: "100%",
		height: 200,
		delay: 600,
		//autoHeight: true,
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

	question.katexURL = {
		js: "vendors/katex",
		css: "css/katex.min"
	};

	katex.render(String.raw`\textbf{Ab}`, ktest);
});