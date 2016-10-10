//maskedinput plugin (для того, чтобы задавать маску input полям, дабы человек не ввел чего-то лишнего)
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});

$(document).ready(function(){

	if($("[data-nmforms-container]").length){
		//загружаем инлайновые формы в свои контейнеры, в контент страницы
		$("[data-nmforms-container]").each(function(index, el) {
			$this_block = $(this);
			var inline_form_name = $this_block.data("nmforms-container");
			var inline_nm_form_params = $this_block.data("nm-form-params");

		if(inline_nm_form_params){
			var inline_form_params = JSON.parse('{'+inline_nm_form_params+'}');
		}else{
			var inline_form_params = "";
		}			
			loadForm($this_block,inline_form_name,inline_form_params);
		});
	}

	//вызываем модальную форму при клике на объект с атрибутом data-get-modal-nm-form
	$("[data-get-modal-nm-form]").click(function(){

		var $this = $(this);
		//название модальной формы
		var modal_form_name = $this.data("get-modal-nm-form");
		//параметры, передаваемые в форму
		var nm_form_params = $this.data("nm-form-params");
		if(nm_form_params){
			var form_params = JSON.parse('{'+nm_form_params+'}');
		}else{
			var form_params = "";
		}

		var loaded_form = "";
		$.ajax({
			url: '/nm_forms/assets/tpl/'+modal_form_name+".php",
			type: 'POST',
			dataType: 'json',
			//в форму можно передать какие-либо параметры, для этого используется data-nm-form-params. Например, data-nm-form-params="{param1:'aaa',param2:'bbb'}"
			data: form_params,
		})
		.always(function(result) {
			if(result.status == 200){
				loaded_form = result.responseText;

				//создаем оболочку над модальным блоком
				if($("#standaloneModalBlock").length == 0){
					$("body").append('<div id="standaloneModalBlock"></div>');
				}
				$("#standaloneModalBlock").append(loaded_form);

				//создаем фейдер, полупрозрачный фон-подложку
				if($("#nm_overlay").length == 0){
					$("body").append('<div id="nm_overlay"></div>');
				}

				//показываем фейдер
				$("#nm_overlay").addClass("nm_overlay_shown").animate({ "opacity": "0.8" }, 400);

				//фиксируем html, чтобы избежать прокрутку
				$("html").css("overflow","hidden");

				//делаем небольшую задержку, чтобы скрипт мог сделать нужные расчеты
			    setTimeout(function(){

					//проставляем маски, если надо
					$("[data-input-mask]").each(function(index, el) {
						$(this).mask($(this).data("input-mask"));
					});

				    var form_width = $("#standaloneModalBlock").find("[data-nmforms]").width();
				    $("#standaloneModalBlock").find("[data-nmforms]").css({
				    							"opacity"	 : "0",
												"position"	 : "absolute",
												"top" 	     : "15%",
												"left" 	     : "50%",
												"margin-left": "-"+(form_width/2)+"px",

												});

				    $("#standaloneModalBlock").addClass("visible").find("[data-nmforms]").animate({ "opacity": "1" }, 400);
			    },200)



			}else{
				loaded_form = "ERROR";
			}
		});


		return false;
	})

		/* обработка формы по нажатию кнопки отправки */
		$("body").on("click","[data-nmforms-send-button]",function(e) {
				e.preventDefault();
				//выбираем элемент формы
				var parent_form = $(this).parents("[data-nmforms]").find("form:first");
				//выбираем элементы формы, которые обязательны для заполнения
				var parent_form_fields = $(this).parents("[data-nmforms]").find(".non_empty_field");
				//выполняем проверку на пустоту у обязательных элементов и проводим валидацию
				var res = true;
				parent_form.find("[data-nm-forms-validate]").each(function(){
					if ( Validate($(this)) == false) res = false;
				});
				if(res){
					sendFormNM(parent_form);
				}else{
					return false;
				}

		});

		//закрываем и убиваем модальное окно по клику на кнопку с атрибутом data-nm-modal-dismiss
		$("body").on("click","[data-nm-modal-dismiss]",function() {

     		$("#nm_overlay").animate({"opacity": "0",},400, function() {
     			$(this).css({"display":"none"}).removeClass('nm_overlay_shown');
     		}).clearQueue();
     		$("#standaloneModalBlock").animate({"opacity": "0",},400, function() {
     			$(this).remove();
     		}).clearQueue();

     		$("html").css("overflow",""); 		
			return false;
		});

		$("body").on("click","[data-nmforms]",function(e){
			e.stopPropagation();
		})
		//закрываем и убиваем модальное окно по клику на фейдере b блоке-оболочке
     	$("body").on("click","#standaloneModalBlock",function(e){
     		
     		$("#nm_overlay, #standaloneModalBlock").animate({"opacity": "0",},400, function() {
     			$("#nm_overlay").css({"display":"none"}).removeClass('nm_overlay_shown');
     			$("html").css("overflow","");
     		}).clearQueue();
     		$("#standaloneModalBlock").remove(); 		

     	});

		//закрываем и убиваем модальное окно по нажатию Esc
      	$(document).on("keyup",function(e){
       		if(e.keyCode===27){
	     		$("#nm_overlay, #standaloneModalBlock").animate({"opacity": "0",},400, function() {
	     			$("#nm_overlay").css({"display":"none"}).removeClass('nm_overlay_shown');
	     			$("html").css("overflow","");
	     		}).clearQueue();
	     		$("#standaloneModalBlock").remove(); 	
     		}
     	})			

})//end ready

/* функция отправки данных формы */
function sendFormNM(form) {
		//задержка в милисекундах, после чего модальное окно закроется после отправки данных. Устанавливается через data-fadeout-delay="3000" в атрибуте модального блока. По умолчанию форма сама не закрывается.
		var fadeout_delay = form.parents("[data-nmforms]").data("fadeout-delay");
		//сериализуем данные формы, преобразуем их в оюъект JSON
		var formData = JSON.stringify(form.serializeArray());

		//объект счетчика Яндекс.Метрики. Устанавливается, если необходимо отправлять цель при успешной отправке формы. Нужно подставить цифры вашей метрики
		//var metrika_counter = yaCounter37564100;
		//создаем новое подключение
 		var xhr = new JSONHttpRequest();
 		//открываем подключение, устанавливаем метод отправки POST
 		xhr.open("POST", "/nm_forms/action.php");

	            xhr.onreadystatechange = function() {
	                if (xhr.readyState == 4) {
	                    if(xhr.status == 200) {
	                        raw_data = xhr.responseText;
	                        data = JSON.parse(raw_data);
	                        if(data) {
								form.empty();
								form.html(data.message);

								/***цель яндекс метрики***/
								if(data.yandex_metrika_id){
									if(metrika_counter){
										metrika_counter.reachGoal(data.yandex_metrika_id);
									}

								}
								if(fadeout_delay){
									setTimeout(function(){
							     		$("#nm_overlay").animate({"opacity": "0",},400, function() {
							     			$(this).css({"display":"none"}).removeClass('nm_overlay_shown');
							     		}).clearQueue();
							     		$("#standaloneModalBlock").animate({"opacity": "0",},400, function() {
							     			$(this).remove();
							     		}).clearQueue(); 
									}, fadeout_delay);
								}							
	                        } else {
								form.empty();
								form.html("<p>Ошибка!</p>");
	                        }
	                    }
	                }
	            };
	    //отправляем данные формы
	    xhr.send(formData);
} 

function str_replace(search, replace, subject) {
	return subject.replace(new RegExp (search, 'g'), replace);
}

function JSONHttpRequest() {
    var _xmlHttpRequest = new XMLHttpRequest();
    var _responseJSON = null;
    var _userContentType = false;
    var _self = this;
 
    var property = {
        get: function() {
            try {
                _responseJSON = _xmlHttpRequest.responseText ? (!_responseJSON ? JSON.parse(_xmlHttpRequest.responseText) : _responseJSON) : null;
            }
            catch (e) {
                if (_self.strictJSON)
                    throw e;
            }
            return _responseJSON;
        },
        enumerable: true,
        configurable: true
    }
     
    _self.strictJSON = true;
    Object.defineProperty(_self, 'responseJSON', property);
     
    _self.sendJSON = function(data) {
        try {
            data = JSON.stringify(data);
            _responseJSON = null;
            if (!_userContentType)
                _xmlHttpRequest.setRequestHeader('Content-Type', 'application/json;charset=encoding');         
            _userContentType = false;
        }
        catch (e) {
            if (_self.strictJSON)
                throw e;
        }
        _xmlHttpRequest.send(data);
    }
     
    function proxy(name) {
        try {
            if ((typeof _xmlHttpRequest[name]) == 'function') {
                _self[name] = function() {
                    if (name == 'setRequestHeader')
                        _userContentType = arguments[0].toLowerCase() == 'content-type';
                    return _xmlHttpRequest[name].apply(_xmlHttpRequest, Array.prototype.slice.apply(arguments));
                };
            }
            else {
                property.get = function() { return _xmlHttpRequest[name]; }
                property.set = function(value) { _xmlHttpRequest[name] = value; }
                Object.defineProperty(_self, name, property);  
            }
        }
        catch (e) {
            // NOTE Swallow any exceptions, which may rise here.
        }
    }
     
    // FIX onreadystatechange is not enumerable [Opera]
    proxy('onreadystatechange');
     
    for (n in _xmlHttpRequest)
        proxy(n);
}

var border_color = false;
function Validate(this1) {
	var res = false;
	var one = true; 
	var value = this1.val() != null ? this1.val().trim() : '';

	if (!border_color) border_color = this1.css("border-color");
	
	if (this1.data('nm-forms-validate') == "email") {
		if(value != ''){
			pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			if (pattern.test(value)){
				res = true;
			}
		} else if (!this1.hasClass('required')) {
			res = true;
		}
		one = false;
	} else if (this1.data('nm-forms-validate') == "phone" && res == false) {
		if(value != ''){
			pattern = new RegExp(/^[\d\(\)\+\- ]{7,}$/i);
			if (pattern.test(value)){
				res = true;
			}
		} else if (!this1.hasClass('required')) {
			res = true;
		}
		one = false;
	} else if (this1.data('nm-forms-validate') == "url") {
		if(value != ''){
			pattern = new RegExp(/^(https?:\/\/)?([\da-z\.-а-я]+)\.([а-яa-z\.]{2,6})([\/\w \.-]*)*\/?$/i);
			if (pattern.test(value)){
				res = true;
			}
		} else if (!this1.hasClass('required')) {
			res = true;
		}
		one = false;
	} else if (this1.data('nm-forms-validate') == "file" && res == false) {
		if(value != ''){
			value = value.split('\\').pop();
			format = this1.data('format').split(',');
			format = format.join(")|(");
			pattern = new RegExp('\.(('+format+'))$','i');
			if (pattern.test(value)){
				res = true;
			}
		} else if (!this1.hasClass('required')) {
			res = true;
		}
		one = false;
	}
	
	if (this1.hasClass('required') && one == true && res == false) {
		if (this1.attr('type') == 'checkbox'){
			if (this1.prop('checked') == true) res = true;
		} else if(value != ''){
			res = true;
		}
	}
	if (res == false) this1.css("border-color", "red");
	else this1.css("border-color", border_color);
	
	return res;
}

function loadForm(container,form_name,form_params){
	$.ajax({
		url: '/nm_forms/assets/tpl/'+form_name+".php",
		type: 'POST',
		dataType: 'json',
		//в форму можно передать какие-либо параметры, для этого используется data-form-params. Например, data-form-params="{param1:'aaa',param2:'bbb'}"
		data: form_params,
	}).always(function(result) {
		if(result.status == 200){
			container.html(result.responseText);
		}

	})
}
