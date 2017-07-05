define(["jquery","util","form"],function($,util){
    // 发送ajax
    $("form").submit(function(){
        $(this).ajaxSubmit({
            url:"/api/course/create",
            type:"post",
            success:function(data){
                if(data.code == 200){
                    location.href = "/course/step1?id="+data.result.cs_id;                   
                }
            }
        });
        return false;
    });
});