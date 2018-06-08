$(document).ready(function () {
    console.log("mathtype");
    var editor;
    editor = com.wiris.jsEditor.JsEditor.newInstance({ 'language': 'en' });
    editor.insertInto(document.getElementById('editorContainer'));
});