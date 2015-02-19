var CountryCodeCookieManager = {
    // could change in code
    CookieName: 'OU_CountryCode',
    Path: '/',
    
    RemoveCookie : function() {
        Cookies.expire(this.CookieName, { path: this.Path });
        Cookies.expire(this.CookieName, { path: this.Path, domain: '.open.ac.uk' });
    }
}