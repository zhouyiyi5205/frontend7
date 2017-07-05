define(['jquery','template','uploadify'], function($, template) {
    
    // 课程图片信息加载
    $.ajax({
        url:"/api/course/picture",
        type:"get",
        success:function(data){
            console.log(data);
            if(data.code == 200){
                var html = template("step2",data.result);
                $(".steps").html(html);
                // 初始化图片上传
                $("#uploadBtn").uploadify({
                    swf:"/views/assets/uploadify/uploadify.swf",
                    uploader:"/api/uploader/cover",
                    buttonText:"选择图片",
                    buttonClass:"btn btn btn-sm btn-success ",
                    width:70,
                    itemTemplate:"<p></p>",
                    formDate:{
                        cs_id:"csid"
                    },
                    onUploadSuccess:function(file,data,response){
                        data = JSON.parse(data);
                        $(".preview>img").attr("src",data.result.path);
                        $("#cropBtn").prop("disabled",false)
                    },
                });
                // 修复插件样式的小问题
                $("#uploadBtn-button").css("line-height","1.5");
            }
        }
    });
    // 表单提交按钮事件
    $(".steps").on("clikc","cropBtn",function(){
        // 让图片开始切，初始化jcrop插件
        var text = $(this).text();
        if(text == "裁切图片");
       
    })
    
});