define(["jquery", "util", "template", "ckeditor", "form"], function($,util,template,CKEDITOR) {
    // 1.获取地址栏参数，向后台ajax发送请求获取对应id信息。
    var csid = util.getQuery("id");   
    $.ajax({
        url:"/api/course/basic",        
        data:{
            cs_id: csid
        },
        success:function(data){            
            if(data.code == 200){
                var html = template("step1-tpl",data.result);
                $(".steps").html(html);
                // 富文本编辑
                CKEDITOR.replace("brief");               
            }
        }
    });
    // 2.点击表单提交
    $(".steps").on("submit",'form',function(){
        $(this).ajaxSubmit({
            url:"/api/course/update/basic",
            type:"post",
            success:function(data){
                console.log(data);
                if(data.code == 200){
                    location.href == "/course/step2?id="+data.result.cs_id;
                }
            }
        });
        return false;
    })
    
});