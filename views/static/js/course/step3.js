define(['jquery','template','util'], function($, template,util) {
   var csid = util.getQuery("id");
   $.ajax({
       url:"/api/course/lesson",
       data:{
           cs_id:csid,
       },
       success:function(data){
           console.log(data);
           if(data.code == 200){
                var html = template("steps3-tpl",data.result);
                $(".steps").html(html);
           }
       }
   });    
});