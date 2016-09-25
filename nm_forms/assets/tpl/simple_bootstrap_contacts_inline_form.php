<?include "../../helper.php";if(check_access(__FILE__)){$arParams = getParams($_POST);loadCSS(__FILE__);}?>

<!--form layout here -->
<div class="col-sm-8 contact-form" data-nmforms>
	<form id="contact" method="post" class="form" role="form">
		<div class="row">
			<div class="col-xs-6 col-md-6 form-group">
				<input class="form-control required" data-nm-forms-validate id="name" name="text:Имя" placeholder="Ваше имя" type="text" />
			</div>
			<div class="col-xs-6 col-md-6 form-group">
				<input class="form-control required" data-nm-forms-validate id="email" name="text:Email" placeholder="Ваше Email" type="text" />
			</div>
		</div>
		<textarea class="form-control" id="message" name="text:Сообщение" placeholder="Ваше сообщение" rows="5"></textarea>
		<br />
		<div class="row">
			<div class="col-xs-12 col-md-12 form-group">
				<button class="btn btn-primary pull-right" type="submit" data-nmforms-send-button>Отправить</button>
			</div>
		</div>
			<input type="hidden" name="hidden:norobots">
            <input type="hidden" name="hidden:subject" value="Новая сообщение">
            <input type="hidden" name="hidden:form_type" value="2">
	</form>
</div>