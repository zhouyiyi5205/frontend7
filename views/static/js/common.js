define(["jquery","template","cookie"],function($,template){
    $(function(){
        // 1.头像部分：利用cookie和template把值渲染进去
        // 完善登录页，如果当前没有登录，那就退回登录页，
        // 如果登录了，就获取登录页$.cookie的值，进行模板渲染。
        // 那么就不用if( "/dashboard/login"  != location.pathname){}这个来判断
        // 而是通过cookie的值里面有没有PHPSESSID。如果有就是登录过的，反之没登录过
        if(!$.cookie("PHPSESSID")){
            location.href ="/dashboard/login"
        }else{
            //从cookie中获取登录成功后存储的用户信息。
            var userInfo = JSON.parse($.cookie("userinfo"));
            //模板引擎
            var html = template("profile-tpl",userInfo);
            $("#userinfo").html(html);
        }         

        // 2.点击按钮退出功能：
        $("#logout").click(function(){
            $.ajax({
                url:"api/logout",
                type:"post",
                success:function(data){
                    if(data.code == 200){
                        location.href = "/dashboard/login";
                    }
                }
            });
        });
        // 3.给导航栏所有的li加上点击事件，在点击的时候，让当前背景色变暗
        $(".navs>ul>li").click(function(){
            $(this).children("a").addClass("active");
            $(this).siblings().children("a").removeClass("active");
        })

        // 4.导航栏二级显示功能
        $(".navs>ul>li>ul").parent().click(function(){
            // $(this).children("ul").slideToggle(); 
            var $ul = $(this).children("ul");
            $ul.slideToggle();              
            //判断如果进入下面的ul下面的a则去掉上面li的active样式
            if($ul.find("a.active").length > 0){
                $(this).children("a").removeClass("active");
            }         
        });
        
        // 当前对应的页面，导航栏变暗
        $(".navs a").each(function(i,v){
            if($(v).attr("href") == location.pathname){
                $(v).addClass("active");
                $(v).parent().parent().slideDown();
            }
        })
    })
})
