<?php 
	//如果能够获取到用户在连接最后面传进来的 /模块名称/文件名
	//就可以通过php代码找到该文件并且返回

	//1. 获取用户在连接最后面传进来的 /模块名称/文件名
	$path = "/dashboard/index";

	if(array_key_exists("PATH_INFO", $_SERVER)){
		$path =  $_SERVER['PATH_INFO'];
	}
	//2. 获取目录名称
	$pathArr = explode("/", substr($path, 1));
	$directory = "dashboard";
	$fileName = "index";

	//用户即传进来了目录名也传了文件名
	if(count($pathArr) == 2){
		$directory = $pathArr[0];
		$fileName = $pathArr[1];
	//用户只传了目录名
	}else if(count($pathArr) == 1){
		$directory = $pathArr[0];
	}

	//如果用户啥都没传 那就目录和文件全都是默认值

	$filePath = "/views/".$directory."/".$fileName.".html";

	include $filePath;
 ?>

