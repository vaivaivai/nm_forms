<?
$filename = "nm_forms_zipped.zip"; // Zip-���� ��� ����������
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
				echo "������ �������� ����� $name";
			}
			zip_entry_close($zip_entry);
		}
	}
	echo "
		<br><br><font size='5' color='green'><b>����� ������� nm_forms ������� ���������!</b></font> 
		<br><br>����������� ������: <b>$files</b>
		<br><br>����������� �����: &nbsp;<b>$folders</b>
		<br><br>�������! ;)
		";
	zip_close($zip);
	unlink(dirname(__FILE__)."/".$filename);
	unlink(__FILE__);
}else{
	echo "<br>\n ������ �������� zip-�����!";
}
?>