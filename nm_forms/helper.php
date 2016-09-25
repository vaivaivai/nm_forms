<?
//проверяем, что к форме был послан ajax-запрос и не было прямого обращения к файлу
function check_access($form_file){
	if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || empty($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
		$file = basename($form_file, ".php");
		die("Error loading form - $file!");

	}else{
		return true;
	}
}
//подгружаем файл со стилями для формы, если такой имеется
function loadCSS($form_file){
	$file = basename($form_file, ".php");
	if(file_exists($_SERVER["DOCUMENT_ROOT"]."/nm_forms/assets/css/forms/".$file.'.css')){
		echo '<link rel="stylesheet" type="text/css" href="/nm_forms/assets/css/forms/'.$file.'.css?r='.rand(1111,9999).'">';
	}
}
//если в форму переданы какие-либо параметры, отфильтруем их и вернем отфильтрованный массив
function getParams($data){
	foreach ($data as $key => $value) {
		$new_key = trim(strip_tags($key));
		$new_val = trim(strip_tags($value));
		$newData[$new_key] = $new_val;
	}
	return $newData;
}
?>