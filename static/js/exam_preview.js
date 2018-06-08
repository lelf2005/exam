$(document).ready(function () {
    var parent_win = window.opener;
    var txt = "";
    if (parent_win) {
        txt = parent_win.document.getElementById("preview_content");
        // console.log(txt.value);
    }

    exam = editormd.markdownToHTML("exam", {
        markdown: txt.value,//+ "\r\n" + $("#append-test").text(),
        htmlDecode: true,
        taskList: true,
        tex: true,  // 默认不解析
    });

    exam.katexURL = {
        js: "js/katex.min",
        css: "css/katex.min"
    };
});
