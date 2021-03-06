# Подмена номеров для посетителей с рекламы или email-рассылок на JavaScript

Используется только **JavaScript**, дополнительные библиотеки (например, **jQuery**) не требуются.

Источник трафика сохраняется в cookie **на 15 дней**, поэтому, при следующем заходе на сайт номер телефона будет также подменён.

## Установка

### Шаг 1

Добавьте на все страницы сайта, где должна осуществляться подмена номеров, перед закрывающим тегом `</body>` следующий код:

```html
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
```

**Замените в последней строчке скрипта (812) XXX XX XX на свой номер подмены.**

### Шаг 2

Выделите c помощью элементов разметки каждый номер телефона на вашем сайте:

```html
<span class="ya-phone">8 (812) 123-45-67</span>
```
> Процедура аналогична настройке [Целевого звонка Яндекса](https://yandex.ru/support/metrika/general/target-call_markup.html#markup__html) 

> Если вы раньше использовали Целевой звонок Яндекса, то номера на сайте уже должны быть помечены.

## Проверка
После того, как скрипт был добавлен на сайт, а телефоны - помечены, необходимо проверить корректность подмены номеров.

В адресной строке браузера добавьте к адресу страницы параметр `?utm_medium=cpc` и загрузите страницу.

Например: `http://example.com/about.html?utm_medium=cpc`

Если номера на страницах сайта стали подменяться, то всё настроено корректно.

## Дополнительные возможности
* Если нужно отслеживать **email-рассылки**, то замените в коде `cpc` на `email`
* Если номер телефона помечен при помощи id, то в скрипте необходимо заменить `.ya-phone` на `#ya-phone-1`
* Если необходимо на время отключить подмену номеров, то **необязательно удалять скрипт с сайта**, достаточно в коде скрипта заменить `enable` на `disable`

## Лицензия
[MIT](https://github.com/ABVanton200/ABV-AdTracking/blob/master/LICENSE.md)