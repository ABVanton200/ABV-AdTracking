/*!
 * ABV AdTracking v1.0
 * https://github.com/ABVanton200/ABV-AdTracking
 *
 * Copyright Anton Babakhin
 * Released under the MIT license
 * https://github.com/ABVanton200/ABV-AdTracking/blob/master/LICENSE.md
 *
 * Date: 2018-01-02
 */
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