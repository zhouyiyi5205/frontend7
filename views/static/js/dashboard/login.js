 define(["jquery","form","cookie"], function($) {
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

// $(function(){
//     //1. 获取登录按钮并且注册点击事件
//     $("#login-form").submit(function(){
//         //2. 获取用户输入的用户名和密码
//         var userName = $("#username").val();
//         var password = $("#password").val();
//         //3. 发送ajax请求进行登录验证
//         $.ajax({
//             url: "/api/login",
//             type: "post",
//             data: {
//                 tc_name: userName,
//                 tc_pass: password
//             },
//             success: function(data){
//                 if(data.code == 200){
//                     //将用户的头像以及用户名信息存储到cookie当中
//                     //方便首页进行使用

//                     //cookie中只能存储字符串信息，
//                     //直接存储对象，会发生 将[object Object]作为数据存储到cookie当中

//                     //所以我们首先要将对象转成字符串，存入到cookie
//                     $.cookie("userinfo", JSON.stringify(data.result), {path: "/"});
//                     //跳转页面
//                     location.href = "/";
//                 }
//             }
//         })

//         //阻止表单的默认提交
//         return false;
//     })

// })
