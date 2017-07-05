define(['jquery','template','util','bootstrap','form'], function($, template,util) {
   //1.向后台发送ajax请求，模板渲染课时添加
   var csid = util.getQuery("id");
   $.ajax({
       url:"/api/course/lesson",
       data:{
           cs_id:csid
       },
       success:function(data){
           console.log(data);
           if(data.code == 200){
                var html = template("steps3-tpl",data.result);
                $(".steps").html(html);
           }
       }
   }); 
   //2.点击课时添加，跳出模态框
   $(".steps").on("click","#addlessonbtn",function(){
        var html = template("lesson-tpl",{
            ct_cs_id:csid,
            title:"添加课时",
            buttonText:"添 加",
            type:"add"
        });
        $(".modal-content").html(html);
        $("#chapterModal").modal("show");
   });
    //3.点击保存按钮，将内容渲染到页面上
    $(".modal-content").on("click","#saveBtn",function(){
        var isfree =0
        // 判断免费课时是否是选中的
        if($("#isfree").prop("checked")){
            isfree=1;
        }
        $("form").ajaxSubmit({
            url:"/api/course/chapter/add",
            type:"post",
            data:{
                ct_is_free:isfree
            },            
            success:function(data){
                if(data.code == 200){
                    $("#chapterModal").modal("hide");
                    // location.reload(); //history.go(0);
                    // 向后台发送请求,重新获取课时列表内容。
                   $.ajax({
                       url:"/api/course/lesson",
                       data:{cs_id:csid},
                       success:function(data){
                           if(data.code ==200){
                               var html = template("lessons-list-tpl",data.result);
                               $(".lessons").html(html);
                               // 动态填写课时                             
                               $("dd:contains(课时：)").text("课时：" + data.result.lessons.length);
                           }
                       }
                   });              
                }              
            }
        })
    });
    // 4.点击编辑按钮。
    $(".steps").on("click",".edit-btn",function(){
        // 获取当前点击的id
        var ctid = $(this).data("id");
        $.ajax({
            url:"/api/course/chapter/edit",
            data:{
                ct_id:ctid
            },
            success:function(data){
                if(data.code == 200){
                    // 渲染模态框的模板
                    data.result.title = "编辑课时";
                    data.result.type = "edit";
                    data.result.buttonText = "保 存";
                    var html = template("lesson-tpl",data.result);
                    $(".modal-content").html(html);
                    $("#chapterModal").modal("show");
                }
            }
        })
    })
});