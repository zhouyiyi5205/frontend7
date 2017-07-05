define(['jquery','util','template','uploadify','jcrop'], function($, util,template) { 
    // 1.获取地址栏参数，ajax发送请求加载课程图片信息
    var csid = util.getQuery("id");
    var x = 0;
    var y = 0;
    var w = 0;
    var h = 0;     
    $.ajax({
		url: "/api/course/picture",
		data: {cs_id: csid},
		success: function(data){
			var html = template("step2-tpl", data.result);
			$(".steps").html(html);

			//初始化图片上传插件
			$("#uploadBtn").uploadify({
				swf: "/views/assets/uploadify/uploadify.swf",
				uploader: "/api/uploader/cover",
				buttonText: "选择图片",
				buttonClass: "btn btn-sm btn-success",
				width: 70,
				itemTemplate: "<p></p>",
				fileObjName: "cs_cover_original",
				formData: {
					cs_id: csid
				},
				onUploadSuccess: function(file, data, response){
					data = JSON.parse(data);
					$(".preview>img").attr("src", data.result.path);
					$("#cropBtn").prop("disabled", false);
				},
			});
			//修复插件样式的小问题
			$("#uploadBtn-button").css("line-height", "1.5")
		}
	})
    // 点击图片裁切按钮，注册点击事件
    $(".steps").on("click","#cropBtn",function(){
        // 让图片开始切，初始化jcrop插件
        var text = $(this).text();
        if(text == "裁切图片"){
            // 将按钮上的 裁切图片 文字变成 保存
            $(".thumb>img").remove();
            $(".preview>img").Jcrop({
                boxWidth:400,
                aspectRatio:2,                
                setSelect:[0,0,400,200],
            },function(){
                // 同步加载
                var jcrop_api = this,
                thumbnail = this.initComponent('Thumbnailer', { width: 240, height: 120, thumbnail: ".thumb"});
            });
            // 获取截取图片的位置
            $(".preview").on("cropmove",function(a,b,c){
                console.log(c);
                x = c.x;
                y = c.y;
                w = c.w;
                h = c.h;
            }),
            // 进入裁切功能的时候，改变按钮的文字变成点击保存
            $(this).text("保存图片");
        }else{
            // $(this).text("裁切图片");
            $(this).prop("disabled", true);
         
            $that =$(this);            
            // 向服务器保存当前裁切好的区域
			$.ajax({
				url: "/api/course/update/picture",
				type: "post",
				data: {
					cs_id: csid,
					x: x,
					y: y,
					w: w,
					h: h
				},
				success: function(data){
					if(data.code == 200){
						// $that.prop("disabled", false);
						location.href = "/course/step3?id=" + data.result.cs_id;
					}
				}
			})
        }       
    })    
});

