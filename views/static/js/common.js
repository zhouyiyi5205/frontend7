define(["jquery","template","cookie"],function($,template){
    if( "/dashboard/login"  != location.pathname){
        $(function(){
            //从cookie中获取登录成功后存储的用户信息。
            var userInfo = JSON.parse($.cookie("userinfo"));
            //模板引擎
            var html = template("profile-tpl",userInfo);
            $("#userinfo").html(html);
        }); 
    }
})