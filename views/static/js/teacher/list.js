define(["jquery","template","bootstrap"], function($, template) {
    // 1.请求数据添加进来
    $.ajax({
        url:"/api/teacher",
        type:"get",        
        success:function(data){
            if(data.code == 200){
                console.log(data);
                var html = template("template_list_tpl",data);
                $("#teacherlist").html(html);
            }
        }
    });
    // 2.注册事件委托，点击查看按钮可以查看
    $("#teacherlist").on("click",".btn-check",function(){
        var id = $(this).parent().data("id");
        $.ajax({
            url:"/api/teacher/view",
            type:"get",
            data:{
                tc_id:id
            },
            success:function(data){
                if(data.code == 200){
                    console.log(data);
                    var html = template("teacherModaltpl",data.result);
                    $("#teacherModal").html(html);
                    $("#teacherModal").modal("show");
                }
            }
        });
    });
    // 3.给注销启用按钮添加点击事件事件委托
    $("#teacherlist").on("click",".btn-onoff",function(){        
        var tcid = $(this).parent().data("id");
        var tcstatus = $(this).data("status");
        var $that = $(this);
        $.ajax({
            url:"/api/teacher/handle",
            type:"post",
            data:{
                tc_id:tcid,
                tc_status:tcstatus
            },
            success:function(data){
                if(data.code == 200 ){ 
                    // 保存一份目前的状态               
                    $that.data("status",data.result.tc_status);
                    if(data.result.tc_status == 1){
                        $that.removeClass("btn-warning");
                        $that.addClass("btn-success");
                        $that.text("启 用");
                    }else{
                        $that.removeClass("btn-success");
                        $that.addClass("btn-warning");
                        $that.text("注 销");
                    }
                }
            }
        })

    })
});