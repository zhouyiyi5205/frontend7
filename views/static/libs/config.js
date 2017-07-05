require.config({
     baseUrl: "/views",
     paths: {
     	"jquery": "assets/jquery/jquery.min",
     	"form": "assets/jquery-form/jquery.form",
     	"cookie": "assets/jquery-cookie/jquery.cookie",
     	"template": "assets/artTemplate/template",
     	"bootstrap": "assets/bootstrap/js/bootstrap.min",
     	"util": "static/js/util",
        "nprogress": "assets/nprogress/nprogress",
        "datepicker": "assets/bootstrap-datepicker/js/bootstrap-datepicker.min",
        "datepicker-zh": "assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
        "validate": "assets/jquery-validate/jquery-validate.min",
        "ckeditor": "assets/ckeditor/ckeditor",
        "region": "assets/jquery-region/jquery.region",
        "uploadify": "assets/uploadify/jquery.uploadify",
        "jcrop": "assets/Jcrop/js/Jcrop"
     },
     shim: {
     	"bootstrap": {
     		deps: ["jquery"]
     	},
          "datepicker-zh": {
               deps: ["datepicker"]
          },
          "validate": {
               deps: ["jquery"]
          },
          "ckeditor": {
               exports: "CKEDITOR"
          },
          "uploadify": {
               deps: ["jquery"]
          },
          "jcrop": {
               deps: ["jquery"]
          }
     }
});