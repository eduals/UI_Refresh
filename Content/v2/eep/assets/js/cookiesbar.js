var int_ou_cookiesbar = {
    addCookie: function () {
        Cookies.set('ou_cookie_policy', true);
    },
    
    removeCookie: function() {
        Cookies.expire('ou_cookie_policy');
    },
    
    deactivateBar: function () {
        this.addCookie();
        $('#int-cookies-bar').animate({
            "max-height": "0"
        }, 300, function() { setTimeout(function() { $(this).removeClass('int-active'); }, 250); });
    },
    
    activateBar: function () {
        setTimeout(function () {
            $('#int-cookies-bar').addClass("int-active");
        }, 300);
    },
    
    init: function () {
        if(!Cookies.get('ou_cookie_policy')) {
            this.activateBar();
            $('#int-cookies-bar .int-button').on('click', function (e) {
                e.preventDefault();
                int_ou_cookiesbar.deactivateBar();
            });
        }
    }
    
}