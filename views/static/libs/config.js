require.config({
    baseUrl:"/views",
    paths:{
        "jquery":"assets/jquery/jquery.min",
        "form":  "assets/jquery-form/jquery.form",
        "cookie":"assets/jquery-cookie/jquery.cookie",
        "template":"assets/artTemplate/template",
        "bootstrap":"assets/bootstrap/js/bootstrap.min",
        "util":"static/js/util"
          
    },
    shim:{
        "bootstrap":{
            deps:["jquery"]
        }
    }
})

