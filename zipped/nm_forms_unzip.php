<?
$filename = "nm_forms_zipped.zip"; // Zip-файл для распаковки
$zip = zip_open($filename); 
$folder = substr(str_replace("\\", "/", __FILE__), 0, strrpos(str_replace("\\", "/", __FILE__), "/"))."/";
$files = 0;
$folders = 0;
if (file_exists($filename) && $zip){
	while ($zip_entry = zip_read($zip)){
		$name = $folder . zip_entry_name($zip_entry);
		if($name[strlen($name) - 1] == '/')
		{
		mkdir($name, 0770);
		$folders++;
		}elseif(zip_entry_open($zip, $zip_entry, "r")){
			$buf = zip_entry_read($zip_entry, zip_entry_filesize($zip_entry));
			$file = fopen($name, "w");
			if($file){
				fwrite($file, $buf);
				fclose($file);
				$files++;
			}else{
				echo "Ошибка открытия файла $name";
			}
			zip_entry_close($zip_entry);
		}
	}
	echo "
		<br><br><font size='5' color='green'><b>Файлы проекта nm_forms успешно извлечены!</b></font> 
		<br><br>Распаковано файлов: <b>$files</b>
		<br><br>Распаковано папок: &nbsp;<b>$folders</b>
		<br><br>Успехов! ;)
		";
	zip_close($zip);
	unlink(dirname(__FILE__)."/".$filename);
	unlink(__FILE__);
}else{
	echo "<br>\n ОШИБКА ОТКРЫТИЯ zip-файла!";
}
?>
