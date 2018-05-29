$(document).ready(function () {
    var username = $("#username");
    var password = $("#password");
    var password1 = $("#password1");
    var name = $("#name");
    var email = $("#email");
    var register = $("#register");
    var msg = $("#msg");
    register.click(function () {
      if (username.val() == "" || password.val() == "" || password1.val() == "" || name.val() == "" || email.val() == "") {
        msg.html("注册信息不能为空！");
      } else if (password.val() !== password1.val()) {
        msg.html("两次输入的密码不一样！");
      } else {
        //访问服务器，将注册信息写入数据库
        $.ajax({
          url: "/register/userRegister",
          data: {
            username: $("#username").val(),
            password: $("#password").val(),
            name: $("#name").val(),
            email: $("#email").val()
          },
          type: "POST",
          timeout: 36000,
          dataType: "text",
          success: function (data, textStatus) {
            var dataJson = eval("(" + data + ")");
            if (dataJson.code == 200) {
              alert("注册成功");
              window.location.href = "/login.html";
            } else if (dataJson.code == 300) {
              msg.html("该账号已存在！");
            } else if (dataJson.code == 400) {
              msg.html("注册失败，请重新注册！");
            } else {
              msg.html("注册出错！未知错误！");
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("error:" + textStatus);
          }
        });
      }
    });
  });