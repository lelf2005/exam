$(document).ready(function () {
    var username = $("#username");
    var password = $("#password");
    var login = $("#login");
    var msg = $("#msg");

    login.click(function () {
      if (username.val() == "" || password.val() == "") {
        msg.html("账号或密码不能为空！");
      } else {
        $.ajax({
                  url: "/login/userLogin",
                  data: {
                    username: $("#username").val(),
                    password: $("#password").val()
                  },
                  type: "POST",
                  timeout: 36000,
                  dataType: "text",
                  success: function (data, textStatus) {
                    var dataJson = eval("(" + data + ")");
                    if (dataJson.code == 200) {
                      alert("登录成功");
                      window.location.href = "/";
                    } else if (dataJson.code == 300) {
                      msg.html("账号不存在，请重新输入！");
                    } else if (dataJson.code == 400) {
                      msg.html("密码有误，请重新输入！");
                    } else {
                      msg.html("登录出错！");
                    }
                  },
                  error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("error:" + textStatus);
                  }
                }
        );
      }
    })
    ;
  })  ;