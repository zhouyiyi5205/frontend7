define(["jquery", "template", "util", "form", "datepicker", "datepicker-zh", "validate"],function($,template,util){
    // 讲师列表中可以为编辑讲师地址栏中传入自定义属性id,
    // 这样编辑讲师中有id,添加讲师列表地址栏中没有参数，通过地址栏参数区分
    var query = util.getQueryObj();
    // 如果获取到id参数进入到编辑讲师列表中
    if(query.id){        
        $.ajax({
            url:"/api/teacher/edit",
            type:"get",
            data:{
                tc_id: query.id
            },
            success:function(data){  
                data.result.title = "讲师编辑";
                data.result.btnText = "保 存";
                data.result.type = "edit";
                var html = template("teacheraddTpl",data.result);
                $(".teacher").html(html);
                // 添加日期插件
                $("input[name=tc_join_date]").datepicker({
                    format:"yyyy-mm-dd",
                    language:"zh-CN"
                });
                // 添加表单验证
                $("#teacherform").validate({
                    description:{
                        "tcname": {
                            required:"请输入用户名",
                        },
                        "tcpass":{
                            required:"请输入密码",
                        },
                        "tcjoindate":{
                            required:"请输入入职时间",
                        }
                    },
                    onBlur:true,
                    onKeyup:true,
                    sendForm:false,
                    eachInvalidField:function(){
                        this.parent().parent().addClass("has-error").removeClass("has-success");
                        this.parent().next().removeClass("hide");    
                    },
                    eachValidField:function(){
                        this.parent().parent().addClass("has-success").removeClass("has-error");
                    },
                    valid:function(){
                        console.log("valid 表单验证通过");
                        var type = $("#btnSave").data("type");
                        var url = "";
                        if(type == "edit"){
                            url="/api/teacher/update";            
                        }else{
                            url="/api/teacher/add";            
                        }
                        $("#teacherform").ajaxSubmit({
                            url:url,
                            type:"post",
                            success:function(data){
                                if(data.code == 200){
                                    console.log(data);
                                    location.href = "/teacher/list";                    
                                }
                            }
                        });                
                    }
                });                
            }
        });
    }else{ //添加讲师列     
        var html = template("teacheraddTpl",{
            title : "讲师添加",
            btnText : "添加",
            type : "add"
        });
        $(".teacher").html(html);
        // 添加日期插件
        $("input[name=tc_join_date]").datepicker({
            format: "yyyy-mm-dd",
            language: "zh-CN"
		});
        // 添加表单验证
        $("#teacherform").validate({
            description:{
                "tcname": {
                    required:"请输入用户名",
                },
                "tcpass":{
                    required:"请输入密码",
                },
                "tcjoindate":{
                    required:"请输入入职时间",
                }
            },
            onBlur:true,
            onKeyup:true,
            sendForm:false,
            eachInvalidField:function(){
                this.parent().parent().addClass("has-error").removeClass("has-success");
                this.parent().next().removeClass("hide");    
            },
            eachValidField:function(){
                this.parent().parent().addClass("has-success").removeClass("has-error");
            },
            valid:function(){
                console.log("valid 表单验证通过");
                var type = $("#btnSave").data("type");
                var url = "";
                if(type == "edit"){
                    url="/api/teacher/update";            
                }else{
                    url="/api/teacher/add";            
                }
                $("#teacherform").ajaxSubmit({
                    url:url,
                    type:"post",
                    success:function(data){
                        if(data.code == 200){
                            console.log(data);
                            location.href = "/teacher/list";                    
                        }
                    }
                });                
            }
        })
    } 
})
