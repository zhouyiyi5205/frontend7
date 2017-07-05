 define(["jquery","form","cookie"], function($) {
    //  动态获取头像
    var userinfo = $.cookie("userinfo");
    userinfo = userinfo && JSON.parse(userinfo);
    $(".avatar>img").attr("src", userinfo?userinfo.tc_avatar:"/views/static/uploads/monkey.png");
    
    $("#login-form").submit(function(){
        $(this).ajaxSubmit({
            url:"/api/login",
            type:"post",
            success:function(data){
                if(data.code == 200 ){
                    $.cookie("userinfo",JSON.stringify(data.result),{path:"/"});
                    location.href = "/";
                }
            }
        });
        return false;
    });
 }); 

 
//  第一种方法
// $(function () {
//      // 获取登录按钮并点击注册事件
//     $("#login-form").submit(function () {
//         // 获取到用户传入的值
//         var userName = $("#username").val();
//         var passWord = $("#password").val();
//         // 用户点击按钮，向后台发送请求
//         $.ajax({
//             url:"/api/login",
//             type:"post",
//             data:{
//                 tc_name:userName,
//                 tc_pass:passWord
//             },
//             success:function(data){ 
//                 console.log(data);   
//                 if(data.code == 200){
//                     // 将用户的头像和用户信息放入cookie中，首页中使用
//                     // $.cookie("userinfo") 直接存储数据到cookie中打印出来的是[object Object]
//                     $.cookie("userinfo",JSON.stringify(data.result),{path:"/"});
//                     // 跳转页面
//                     location.href = "/";
//                 }         
//             }      
//         });
//         return false;
//     });
// }); 