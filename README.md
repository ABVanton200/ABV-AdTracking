# ABV-AdTracking - подмена номеров с рекламы

<p>Скрипт подмены номеров телефонов на сайте при заходе по рекламе или email-рассылке. Используется только JavaScript, дополнительные библиотеки (например, jQuery) не требуются.
Источник трафика сохраняется в cookie на 15 дней, поэтому, при следующем заходе на сайт номер телефона будет также подменён.
</p>

<h3>Установка</h3>
<p>Добавьте на все страницы сайта, где должна осуществляться подмена номеров, перед закрывающим тегом <code></body></code> следующий код:</p>
<pre><code>
<!-- ABV AdTracking -->
<script type="text/javascript">
	(function (d, w, p, s, k, v, e) {
	
		var urlVar = w.location.search,
			urlAssoc = urlVar.substr(1).split("&"),
			index = urlAssoc.indexOf( k + "=" + v ),
			r = function(){
				this.innerHTML = p;
 			},
			f = function(){
				var phones = d.querySelectorAll(s),
					i = 0;
				for( ; i < phones.length; i++ ){
					r.call( phones[i] );
				}				
			},
			get = function( name ){
				var matches = d.cookie.match(new RegExp(
					"(?:^|; )" + name + "=([^;]*)"
				));
				return matches ? decodeURIComponent(matches[1]) : undefined;
			},
			set = function(){
				var date = new Date(new Date().getTime() + 1296000000);
				d.cookie = "_ABV_AdTracking=ad; path=/; expires=" + date.toUTCString();
			};
			
		if ( (index != -1 || get("_ABV_AdTracking")) && e == "enable" ){
			f();
			w.addEventListener( "DOMContentLoaded", f, false );
			set();
		}	
	
	})(document, window, "(812) XXX XX XX", ".ya-phone", "utm_medium", "cpc", "enable");
</script>
<!-- /ABV AdTracking -->
</code></pre>
<p>Замените <b>(812) XXX XX XX</b> на свой номер подмены.</p>
<br>
<p>Каждый номер телефона на вашем сайте выделите c помощью элементов разметки следующим образом:</p>
<pre><code>
<span class="ya-phone">8 (812) 123-45-67</span>
</code></pre>
<p>Если вы раньше использовали Целевой звонок Яндекса, то номера на сайте уже должны быть помечены.</p>
<h3>Проверка</h3>
<p>После того, как скрипт был добавлен на сайт, а телефоны - помечены, необходимо проверить корректность подмены номеров.</p>
<p>В адресной строке браузера добавьте к адресу страницы параметр <code>?utm_medium=cpc</code> и загрузите страницу.</p>
<p>Например, <code>http://example.com/about.html?utm_medium=cpc</code></p>
<p>Если номера на страницах сайта стали подменяться, то всё настроено корректно.</p>
<h3>Дополнительные возможности</h3>
<p>Если номер телефона помечен при помощи id, то в скрипте необходимо заменить <code>.ya-phone</code> на <code>#ya-phone-1</code></p>
<p>Если нужно отслеживать <b>email-рассылки</b>, то замените <code>cpc</code> на <code>email</code></p>
<p>Если необходимо на время отключить подмену номеров, то необязательно удалять скрипт с сайта, достаточно в коде скрипта заменить <code>enable</code> на <code>disable</code></p>
<h3>Лицензия</h3>
<p><a href="https://github.com/ABVanton200/ABV-AdTracking/blob/master/LICENSE.md">MIT</a></p>