$(function(){$.ajax({url:"/web/api/user/user-info",dataType:"json"}).done(function(a){if(a.authenticated){var e=$($("#login-menu").html());e.find(".page-header__operation-avatar img").attr("src",a.imageURL),e.find(".page-header__operation-username").text(a.nickname),$(".header-account").html(e)}}),$(".switch-language").click(function(){var a=$(this).data("language");$.get("/web/api/switch-language/"+a).done(function(){window.location.reload()})})});