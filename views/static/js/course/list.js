define(['jquery','template'], function($l,template) {
    $.ajax({
        url:"/api/course",
        type:"get",
        success:function(data){
            console.log(data);
            if(data.code == 200){
                var html = template("courselist-tpl",data);
                $(".courses").html(html);
            }
        }
    })    
});