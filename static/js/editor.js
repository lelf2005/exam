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
		js: "js/katex.min",
		css: "css/katex.min"
	};

	var answer = editormd("answer", {
		width: "100%",
		height: 150,
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

	answer.katexURL = {
		js: "js/katex.min",
		css: "css/katex.min"
	};

	var solution = editormd("solution", {
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

	solution.katexURL = {
		js: "js/katex.min",
		css: "css/katex.min"
	};

	var qtype = $("#qtype");
    var qrank = $("#qrank");
	var qid = $("#qid");
	var qsave = $("#qsave");
	var qadd = $("#qadd");
	var btn_qadd = $("#btn_qadd");

	qadd.on('shown.bs.modal', function () {
		$(window).resize();
		question.setCursor({ line: 0, ch: 0 });
		//question.setMarkdown("### hello");
	})

	btn_qadd.click(function () {
		qid.val("");
	});
	

    qsave.click(function () {
      if (qtype.val() == "" || qrank.val() == "" || question.getMarkdown() == "" || answer.getMarkdown() == "" ) {
        alert("有*字段不能为空！");
      }  else {
		var post_url ="/qlist/qadd";
		  if(qid.val() != ""){
			post_url ="/qlist/qupdate";
		  }
		  
        $.ajax({
          url: post_url,
          data: {
            qtype: qtype.val(),
            qrank: qrank.val(),
            qid: qid.val(),
			question: question.getMarkdown(),
			answer: answer.getMarkdown(),
			solution: solution.getMarkdown()
          },
          type: "POST",
          timeout: 36000,
          dataType: "text",
          success: function (data, textStatus) {
            var dataJson = eval("(" + data + ")");
            if (dataJson.code == 200) {
              alert(" 添加成功");
            } else if (dataJson.code == 400) {
				alert("添加失败！");
            } else {
				alert("添加出错！未知错误！");
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("error:" + textStatus);
          }
        });
      }
	});
	
});