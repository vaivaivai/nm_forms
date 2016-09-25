<?include "../../helper.php";if(check_access(__FILE__)){$arParams = getParams($_POST);loadCSS(__FILE__);}?>

<!--form layout here -->
<div id="login-modal" data-nmforms data-fadeout-delay="3000">
		<div class="formmodal-container">
			<h1>Узнать больше о помещении</h1><br>
		  <form>
			<input type="text" name="text:Ваше имя" class="required" data-nm-forms-validate placeholder="Введите имя">
			<input type="text" name="text:Ваш телефон" class="required" data-nm-forms-validate="phone" placeholder="Введите телефон">
			<input type="text" name="text:Удобное время звонка" class="" placeholder="Удобное время звонка">
			<input type="hidden" name="hidden:norobots">
            <input type="hidden" name="hidden:subject" value="Новая заявка на обратный звонок">
            <input type="hidden" name="hidden:form_type" value="2">
            <input type="hidden" name="hidden:yandex_metrika_id" value="id-otpravit">
			<input type="submit" name="login" class="login formmodal-submit" value="Отправить" data-nmforms-send-button>
		  </form>
			
		  <div class="login-help">
			
		  </div>
		</div>
</div>