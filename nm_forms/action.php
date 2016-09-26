<?php
// Защита от спама
if ($_SERVER['REQUEST_METHOD'] !== "POST" || empty($_POST) || $_SERVER['HTTP_X_REQUESTED_WITH'] !== 'XMLHttpRequest' || strpos($_SERVER['HTTP_REFERER'], $_SERVER['HTTP_HOST']) !== 7){
	header($_SERVER['SERVER_PROTOCOL']." 404 Not Found"); 
	header ('Status: 404 Not Found');
	die();
}else{

//подключаем библиотеку SwiftMail
require_once './lib/swift_required.php';

//принимаем данные от аякса
$post_request = json_decode(file_get_contents('php://input'), true);

	//разбиваем пришедшие данные по группам
	foreach($post_request as $arOneItem){
		$exploded_name = explode(":", $arOneItem["name"]);
		$type = $exploded_name[0]; //тип поля
		switch ($type) {
			case 'text':
				$arResult["simple"][$exploded_name[1]] = trim(strip_tags($arOneItem["value"]));
				break;
			case 'select':
				$arResult["simple"][$exploded_name[1]] = trim(strip_tags($arOneItem["value"]));
				break;
			case 'radio':
				$arResult["simple"][$exploded_name[1]] = trim(strip_tags($arOneItem["value"]));
				break;
			case 'checkbox':
				$arResult["multiply"][$exploded_name[1]][] = trim(strip_tags($arOneItem["value"]));
				break;	
			case 'hidden':
				$arResult["system"][$exploded_name[1]] = trim(strip_tags($arOneItem["value"]));
				break;		
			default:
				# code...
				break;
		}
	}

	//защита от роботов
	if(!empty($arResult["system"]['norobots'])){
		header($_SERVER['SERVER_PROTOCOL']." 404 Not Found"); 
		header ('Status: 404 Not Found');
		die();
	}

	$mail_type = "mail"; //тип отправляемого письма (mail,smtp)
	
	//Настройки SMTP
	$SMTP_HOST = ""; // сервер smtp
	$SMTP_USERNAME = ""; // имя пользователя
	$SMTP_PASSWORD = ""; // пароль
	$SMTP_PORT = 25; // порт

	$from = "from@site.ru"; //с какого Email'a письмо. Указывать только РЕАЛЬНЫЕ email'ы, если выбран тип smtp
	$from_name = "Письмо с моего сайта";
	
	//на какие адреса отправлять письма
	//$arRecievers[] = "max-master@yandex.ru";
	$arRecievers[] = "to@somebody.ru";

	// Тема сообщения (задается в файле формы в поле subject)
	$subject = $arResult["system"]["subject"]; 
	$form_type = (int)$arResult["system"]["form_type"];

	//формируем сообщение для пользователя
	switch ($form_type) {
		case 1:
			$arJSON["message"] = "<div class='sent'><div class='bg-success'>Ваше сообщение отправлено!</div></div>";
			break;
		case 2:
			$arJSON["message"] = "<div class='sent'><div class='bg-success'>Спасибо, за обращение в нашу компанию! В ближайшее время с вами свяжется менеджер</div></div>";
			break;
		case 3:
			$arJSON["message"] = "<div class='sent'><div class='bg-success'>Благодарим вас за ваш отзыв!</div></div>";
			break;
	}
	$html_text = $arJSON["message"];
	if(!empty($arResult["system"]["yandex_metrika_id"])){
		$arJSON["yandex_metrika_id"] = $arResult["system"]["yandex_metrika_id"];
	}

	// формируем тело письма
	$text_body = '';
	//на всякий случай дублируем тему письма
	$text_body .= "<h3>".$subject."</h3><hr />";
	//простые текстовые поля
	foreach ($arResult["simple"] as $field_name => $field_value) {
		$text_body .= "<p><strong>".$field_name."</strong>: ".$field_value."<p/>";
	}
	//сложные поля
	if(!empty($arResult["multiply"])){
		foreach ($arResult["multiply"] as $field_name => $ar_field_value) {
			$text_body .= "<p><strong>".$field_name."</strong>: <p/>";
				$text_body .= "<ul>";
					foreach ($ar_field_value as $field_value) {
						$text_body .= "<li>".$field_value."</li>";
					}
				$text_body .= "</ul>";
		}	
	}


	//Создаем транспортный узел, выбрав тип почтового отправления
	if($mail_type == "smtp"){
		$transport = Swift_SmtpTransport::newInstance();
		$transport->setHost($SMTP_HOST);
		$transport->setPort($SMTP_PORT);
		$transport->setUsername($SMTP_USERNAME);
		$transport->setPassword($SMTP_PASSWORD);
	}else{
		$transport = Swift_MailTransport::newInstance();
	}

	//Создаем экземпляр почтового объекта из транспортного узла
	$mailer = Swift_Mailer::newInstance($transport);

	//Создаем сообщение
	$message = Swift_Message::newInstance($subject);
	$message->setFrom(array($from => $from_name));
	$message->setTo($arRecievers);
	$message->setBody($text_body, 'text/html');

	//Отправляем сообщение
	if (!$mailer->send($message)){
		$arJSON["message"] = 'Ошибка при отправке почты!';
		echo json_encode($arJSON);
	 	exit;
	}else{
		echo json_encode($arJSON);
		exit;
	}

}
?>