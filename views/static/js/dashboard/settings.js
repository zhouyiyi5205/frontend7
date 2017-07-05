define(["jquery", "ckeditor","nprogress", "template","datepicker", "uploadify","datepicker-zh", "region","form"], function($, CKEDITOR,NProgress,template) {
    // 向后台发送请求获得个人资料
    $.ajax({
        url:"/api/teacher/profile",    
        success:function(data){  
            // console.log(data);       
            var html = template("settings",data.result);
            $(".settings").html(html);            
            // 时间插件
            $("input[name=tc_birthday]").datepicker({
                format: "yyyy-mm-dd",
                language: "zh-CN"
            });
            $("input[name=tc_join_date]").datepicker({
                format: "yyyy-mm-dd",
                language: "zh-CN"
            }); 
            //富文本编辑
            CKEDITOR.replace("introduce",{
                toolbarGroups: [
                    { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
                    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                    { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
                    { name: 'styles' },
                    { name: 'colors' },
                    { name: 'about' }
                ]
            });
            // 全国省市区三级联动
            $("#region").region({
                url:"/views/assets/jquery-region/region.json"
            });
            // 上传头像[uploadify需要支持flash动画才可以]
            $("#upfile").uploadify({
                swf:"/views/assets/uploadify/uploadify.swf",
                uploader:"/api/uploader/avatar",
                width:120,
                height:120,
                buttonText:"",
                fileObjName:"tc_avatar", 
                itemTemplate:"<p></p>",
                onUploadStart:function(){
                    NProgress.start();            
                }, 
                onUploadSuccess:function(file,data){
                    // console.log(data);
                    var data = JSON.parse(data)
                    if(data.code ==200){
                        $(".preview>img").attr("src",data.result.path);
                    }
                },      
                onUploadComplete:function(){
                    NProgress.done();
                }
            });
        }
    });
    // 提交注册事件,点击提交表单
    $(".settings").on("submit","form",function(){
        $(this).ajaxSubmit({
            url:"/api/teacher/modify",
            type:"post",
            success:function(data){
                if(data.code == 200){
                    alert("资料修改成功");
                }
            }
        })
        return false;
    })
});





