var oudomain = window.location.hostname;
var idx = oudomain.indexOf(".");
var mdomain = oudomain.slice(idx, oudomain.length);

function ougetCookie(c_name) {

    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }

    ousetCookie("ou_cookie_policy", "notified", 365, mdomain);
}


function doTranslation() {
    var _translation_copy = new Array();

    if (document.body.className.indexOf('cymraeg') >= 0) {

        //Welsh
        _translation_copy['skip'] = "";
        _translation_copy['sign-in'] = "Mewngofnodi";
        _translation_copy['my-account'] = "Fy nghyfrif";
        _translation_copy['sign-out'] = "Allgofnodi";
        _translation_copy['contact-us'] = "Cysylltu â’r OU";
        _translation_copy['current-students'] = "Myfyrwyr presennol";
        _translation_copy['search-label'] = "Chwilio";
        _translation_copy['search-tip'] = "Search the OU";
        _translation_copy['home'] = "Hafan";
        _translation_copy['courses'] = "Cyrsiau";
        _translation_copy['postgraduate'] = "Ôl-raddedig";
        _translation_copy['research'] = "Ymchwil";
        _translation_copy['about'] = "Gwybodaeth am y Brifysgol Agored";
        _translation_copy['news'] = "Newyddion a Chyfryngau'r DU";
        _translation_copy['employers'] = "Cyflogwyr";

        _translation_copy['conditions-of-use'] = "Amodau defnyddio";
        _translation_copy['privacy-and-cookies'] = "Preifatrwydd a chwcis";
        _translation_copy['copyright'] = "Hawlfraint";
        _translation_copy['rights-reserved'] = "© 2014 . Cedwir pob hawl";
        _translation_copy['charter'] = "Mae’r Brifysgol Agored yn gorfforedig drwy Siarter Brenhinol (RC000391), yn elusen a eithrir yng Nghymru a Lloegr ac yn elusen gofrestredig yn yr Alban (SC038302)";

    }
    else {

        //English
        _translation_copy['skip'] = "Skip to content";
        _translation_copy['sign-in'] = "Sign in";
        _translation_copy['my-account'] = "My account";
        _translation_copy['sign-out'] = "Sign out";
        _translation_copy['contact-us'] = "Contact the OU";
        _translation_copy['current-students'] = "Current students";
        _translation_copy['search-label'] = "Search";
        _translation_copy['search-tip'] = "Search the OU";
        _translation_copy['home'] = "Home";
        _translation_copy['courses'] = "Courses";
        _translation_copy['postgraduate'] = "Postgraduate";
        _translation_copy['research'] = "Research";
        _translation_copy['about'] = "About";
        _translation_copy['news'] = "News &amp; media";
        _translation_copy['employers'] = "Employers";

        _translation_copy['conditions-of-use'] = "Conditions of use";
        _translation_copy['privacy-and-cookies'] = "Privacy and cookies";
        _translation_copy['copyright'] = "Copyright";
        _translation_copy['rights-reserved'] = "© 2014 . All rights reserved";
        _translation_copy['charter'] = "The Open University is incorporated by Royal Charter (RC000391), an exempt charity in England & Wales and a charity registered in Scotland (SC038302)";

    }

    var output = '';
    if (document.body.className.indexOf('cymraeg') >= 0) {

        output = output + '<div id="int-ouHeader" role="banner" class="test">';
        output = output + '<div id="int-header">';
        output = output + '<a href="#int-content" class="btn-skip">';
        output = output + '<i class="int-icon int-icon-chevron-down"></i>';
        output = output + '<span>' + _translation_copy['skip'] + '</span>';
        output = output + '</a>';
        //output = output + '<a class="int-ouLogo" href="http://www.open.ac.uk/">';
        output = output + '<a class="int-ouLogo" id="ou-logo-eng" href="http://www.open.ac.uk/"><img id="ou-df-logo-eng" src="/oudigital/headerandfooter/assets/img/ou-logo.png" alt="The Open University" /></a>';
        output = output + '<a class="int-ouLogo" id="ou-logo-sct" href="http://www.open.ac.uk/scotland"><img id="ou-df-logo-sct" src="/oudigital/headerandfooter/assets/img/oulogo-56-scotland.jpg" alt="The Open University" /></a>';
        output = output + '<a class="int-ouLogo" id="ou-logo-wls" href="http://www.open.ac.uk/wales"><img id="ou-df-logo-wls" src="/oudigital/headerandfooter/assets/img/oulogo-56-wales.jpg" alt="The Open University" /></a>';
        //output = output + '</a>';
        output = output + '<div role="navigation" id="int-serviceLinks" class="int-serviceLinks sg-responsive int-container">';
        output = output + '<ul>';
        output = output + '<li class="ou-role-signin" id="ou-signin1">';
        output = output + '<a href="https://msds.open.ac.uk/signon/sams001.aspx" id="ou-signin2">' + _translation_copy['sign-in'] + '</a> <span>|</span>';
        output = output + '</li>';
        output = output + '<li>';
        output = output + '<a href="https://msds.open.ac.uk/students/">' + _translation_copy['my-account'] + '</a> <span>|</span>';
        output = output + '</li>';
        output = output + '<li id="ou-signout" class="ou-role-signout">';
        output = output + '<a href="https://msds.open.ac.uk/signon/samsoff.aspx" id="ou-signout2">' + _translation_copy['sign-out'] + '</a> <span>|</span>';
        output = output + '</li>';
        output = output + '<li>';
        output = output + '<a href="http://www.open.ac.uk/contact">' + _translation_copy['contact-us'] + '</a> <span>|</span>';
        output = output + '</li>';
        output = output + '<li id="ou-studenthome" class="ou-role-studenthome">';
        output = output + '<a href="http://www.open.ac.uk/students/" id="ou-studenthome2">' + _translation_copy['current-students'] + '</a>';
        output = output + '</li>';
        output = output + '<li class="int-headerSearch">';
        output = output + '<div class="int-inputAppend">';
        output = output + '<fieldset>';
        output = output + '<legend class="int-hide">Site search</legend>';
        output = output + '<label for="headerSearch" class="int-hide">' + _translation_copy['search-label'] + '</label>';
        output = output + '<input id="headerSearch" type="search" onkeydown="javascript:handleEnter(this, event);" placeholder="' + _translation_copy['search-tip'] + '"/>';
        output = output + '<a id="headerSearchButton" href="#" onclick="javascript:ou_search();" class="int-button" role="button">' + _translation_copy['search-label'] + '</a>';
        //output = output + '<a id="headerSearchButton" href="#" onclick="javascript:ou_search();" class="int-button" role="button">'+_translation_copy['search-label']+'</a>';
        //output = output + '<input type="submit" id="headerSearchButton" class="int-button" onclick="javascript:ou_search();" value="'+_translation_copy['search-label']+'">';
        output = output + '</fieldset>';
        output = output + '</div>';
        output = output + '</li>';
        output = output + '</ul>';
        output = output + '<a href="#" class="int-mob-menu-toggle">';
        output = output + '<span>Menu title</span>';
        output = output + '<i class="int-icon int-icon-chevron-down"></i>';
        output = output + '<i class="int-icon int-icon-chevron-up"></i>';
        output = output + '</a>';
        output = output + '</div>';
        output = output + '</div>';






        output = output + '<div role="navigation" id="ou-global-primary-navigation" class="ou-df-header-nav">';
        output = output + '<div class="int-primary">';
        output = output + '<div class="int-toplevel-nav int-nav-level">';
        output = output + '<ul class="int-container">';
        output = output + '<li class="ou-df-ia-home int-home"><a href="http://www.open.ac.uk"><span>Home</span></a></li>';
        output = output + '<li class="ou-df-ia-courses"><a href="http://www.open.ac.uk/courses"><span id="courses">' + _translation_copy['courses'] + '</span></a></li>';
        output = output + '<li class="ou-df-ia-postgraduate"><a href="http://www.open.ac.uk/postgraduate"><span>' + _translation_copy['postgraduate'] + '</span></a></li>';
        output = output + '<li class="ou-df-ia-research"><a href="http://www.open.ac.uk/research/main/"><span>' + _translation_copy['research'] + '</span></a></li>';
        output = output + '<li class="ou-df-ia-about"><a href="http://www.open.ac.uk/about/main/"><span>' + _translation_copy['about'] + '</span></a></li>';
        output = output + '<li class="ou-df-ia-news"><a href="http://www.open.ac.uk/news"><span>' + _translation_copy['news'] + '</span></a></li>';
        output = output + '<li class="ou-df-ia-employers"><a href="http://www.open.ac.uk/employers"><span>' + _translation_copy['employers'] + '</span></a></li>';
        output = output + '</ul>';
        output = output + '</div>';
        output = output + '<div class="int-secondlevel-nav int-nav-level">';

        output = output + '</div>';
        output = output + '<div class="int-thirdlevel-nav int-nav-level">';

        output = output + '</div>';
        output = output + '</div>';
        output = output + '</div>';

        output = output + '<div id="int-nav-mobile" class="int-nav-alt-mob">';
        output = output + '<div class="int-nav-mob-overlay"></div>';
        output = output + '<div class="int-nav-alt-primary"></div>';
        output = output + '<a href="#" id="int-nav-toggle" class="int-nav-toggle">';
        output = output + '<i class="int-icon int-icon-bars int-icon-lg"></i>';
        output = output + '<i class="int-icon int-icon-times int-icon-lg"></i>';
        output = output + '</a>';
        output = output + '</div>';
        output = output + '</div>';
    }
    else {

        output = output + '<div id="int-ouHeader" role="banner" class="test">';
        output = output + '<div id="int-header">';
        output = output + '<a href="#int-content" class="btn-skip">';
        output = output + '<i class="int-icon int-icon-chevron-down"></i>';
        output = output + '<span>' + _translation_copy['skip'] + '</span>';
        output = output + '</a>';
        //output = output + '<a class="int-ouLogo" href="http://www.open.ac.uk/">';
        output = output + '<a class="int-ouLogo" id="ou-logo-eng" href="http://www.open.ac.uk/"><img id="ou-df-logo-eng" src="/oudigital/headerandfooter/assets/img/ou-logo.png" alt="The Open University" /></a>';
        output = output + '<a class="int-ouLogo" id="ou-logo-sct" href="http://www.open.ac.uk/scotland"><img id="ou-df-logo-sct" src="/oudigital/headerandfooter/assets/img/oulogo-56-scotland.jpg" alt="The Open University" /></a>';
        output = output + '<a class="int-ouLogo" id="ou-logo-wls" href="http://www.open.ac.uk/wales"><img id="ou-df-logo-wls" src="/oudigital/headerandfooter/assets/img/oulogo-56-wales.jpg" alt="The Open University" /></a>';
		output = output + '<a class="int-ouLogo" id="ou-logo-nir" href="http://www.open.ac.uk/northern-ireland"><img id="ou-df-logo-nir" src="/oudigital/headerandfooter/assets/img/ou-logo.png" alt="The Open University" /></a>';
		output = output + '<a class="int-ouLogo" id="ou-logo-ire" href="http://www.open.ac.uk/republic-of-ireland"><img id="ou-df-logo-ire" src="/oudigital/headerandfooter/assets/img/ou-logo.png" alt="The Open University" /></a>';
        //output = output + '</a>';
        output = output + '<div role="navigation" id="int-serviceLinks" class="int-serviceLinks sg-responsive int-container">';
        output = output + '<ul>';
        output = output + '<li class="ou-role-signin" id="ou-signin1">';
        output = output + '<a href="https://msds.open.ac.uk/signon/sams001.aspx" id="ou-signin2">' + _translation_copy['sign-in'] + '</a> <span>|</span>';
        output = output + '</li>';
        output = output + '<li>';
        output = output + '<a href="https://msds.open.ac.uk/students/">' + _translation_copy['my-account'] + '</a> <span>|</span>';
        output = output + '</li>';
        output = output + '<li id="ou-signout" class="ou-role-signout">';
        output = output + '<a href="https://msds.open.ac.uk/signon/samsoff.aspx" id="ou-signout2">' + _translation_copy['sign-out'] + '</a> <span>|</span>';
        output = output + '</li>';
        output = output + '<li>';
        output = output + '<a href="http://www.open.ac.uk/contact">' + _translation_copy['contact-us'] + '</a> <span>|</span>';
        output = output + '</li>';
        output = output + '<li id="ou-studenthome" class="ou-role-studenthome">';
        output = output + '<a href="http://www.open.ac.uk/students/" id="ou-studenthome2">' + _translation_copy['current-students'] + '</a>';
        output = output + '</li>';
        output = output + '<li class="int-headerSearch">';
        output = output + '<div class="int-inputAppend">';
        output = output + '<fieldset>';
        output = output + '<legend class="int-hide">Site search</legend>';
        output = output + '<label for="headerSearch" class="int-hide">' + _translation_copy['search-label'] + '</label>';
        output = output + '<input id="headerSearch" type="search" onkeydown="javascript:handleEnter(this, event);" placeholder="' + _translation_copy['search-tip'] + '"/>';
        output = output + '<a id="headerSearchButton" href="#" onclick="javascript:ou_search();" class="int-button" role="button">' + _translation_copy['search-label'] + '</a>';
        output = output + '</fieldset>';
        output = output + '</div>';
        output = output + '</li>';
        output = output + '</ul>';
        output = output + '<a href="#" class="int-mob-menu-toggle">';
        output = output + '<span>Menu title</span>';
        output = output + '<i class="int-icon int-icon-chevron-down"></i>';
        output = output + '<i class="int-icon int-icon-chevron-up"></i>';
        output = output + '</a>';
        output = output + '</div>';
        output = output + '</div>';


        output = output + '<div role="navigation" id="ou-global-primary-navigation" class="ou-df-header-nav">';
        output = output + '<div class="int-primary">';
        output = output + '<div class="int-toplevel-nav int-nav-level">';
        output = output + '<ul class="int-container">';
        output = output + '<li class="ou-df-ia-home int-home"><a href="http://www.open.ac.uk"><span>Home</span></a></li>';
        output = output + '<li class="ou-df-ia-courses"><a href="http://www.open.ac.uk/courses"><span id="courses">' + _translation_copy['courses'] + '</span></a></li>';
        output = output + '<li class="ou-df-ia-postgraduate"><a href="http://www.open.ac.uk/postgraduate"><span>' + _translation_copy['postgraduate'] + '</span></a></li>';
        output = output + '<li class="ou-df-ia-research"><a href="http://www.open.ac.uk/research/main/"><span>' + _translation_copy['research'] + '</span></a></li>';
        output = output + '<li class="ou-df-ia-about"><a href="http://www.open.ac.uk/about/main/"><span>' + _translation_copy['about'] + '</span></a></li>';
        output = output + '<li class="ou-df-ia-news"><a href="http://www.open.ac.uk/news"><span>' + _translation_copy['news'] + '</span></a></li>';
        output = output + '<li class="ou-df-ia-employers"><a href="http://www.open.ac.uk/employers"><span>' + _translation_copy['employers'] + '</span></a></li>';
        output = output + '</ul>';
        output = output + '</div>';
        output = output + '<div class="int-secondlevel-nav int-nav-level">';

        output = output + '</div>';
        output = output + '<div class="int-thirdlevel-nav int-nav-level">';

        output = output + '</div>';
        output = output + '</div>';
        output = output + '</div>';

        output = output + '<div id="int-nav-mobile" class="int-nav-alt-mob">';
        output = output + '<div class="int-nav-mob-overlay"></div>';
        output = output + '<div class="int-nav-alt-primary"></div>';
        output = output + '<a href="#" id="int-nav-toggle" class="int-nav-toggle">';
        output = output + '<i class="int-icon int-icon-bars int-icon-lg"></i>';
        output = output + '<i class="int-icon int-icon-times int-icon-lg"></i>';
        output = output + '</a>';
        output = output + '</div>';
        output = output + '</div>';
    }

    document.writeln(output);
    //return _translation_copy;
}


function doTranslationFooter() {

    var _translation_copy = new Array();

    if (document.body.className.indexOf('cymraeg') >= 0) {

        //Welsh
        _translation_copy['contact-us'] = "Cysylltu &#226; ni";
        _translation_copy['conditions-of-use'] = "Amodau defnyddio";
        _translation_copy['privacy-and-cookies'] = "Preifatrwydd a chwcis";
        _translation_copy['copyright'] = "Hawlfraint";
        _translation_copy['rights-reserved'] = "&copy; 2014. Cedwir pob hawl.";
        _translation_copy['charter'] = "Mae’r Brifysgol Agored yn gorfforedig drwy Siarter Brenhinol (RC000391), yn elusen a eithrir yng Nghymru a Lloegr ac yn elusen gofrestredig yn yr Alban (SC038302). Awdurdodir a rheoleiddir y Brifysgol Agored gan yr Awdurdod Ymddygiad Ariannol. Mae Cyfrifon Cyllideb Myfyrwyr y Brifysgol Agored Cyf (OUSBA) yn is-gwmni ym mherchnogaeth lwyr y Brifysgol Agored, rhif Tŷ'r Cwmnïau 303735 a hyd at 31 Mawrth 2014 roedd wedi'i drwyddedu gan y Swyddfa Masnachu Teg (OFT) dan y rhif trwydded 573250 ac o 1 Ebrill 2014 caiff ei  awdurdodi a'i reoleiddio gan yr Awdurdod Ymddygiad Ariannol (FCA) o dan y rhif caniatâd dros dro 573250.";
        _translation_copy['jobs'] = "Swyddi";
        _translation_copy['accessibility'] = "Hygyrchedd";
        _translation_copy['cymraeg'] = "Cymraeg";
    }
    else {

        //English
        _translation_copy['contact-us'] = "Contact us";
        _translation_copy['conditions-of-use'] = "Conditions of use";
        _translation_copy['privacy-and-cookies'] = "Privacy and cookies";
        _translation_copy['copyright'] = "Copyright";
        _translation_copy['rights-reserved'] = "&copy; 2014. All rights reserved.";
        _translation_copy['charter'] = "The Open University is incorporated by Royal Charter (RC 000391), an exempt charity in England & Wales and a charity registered in Scotland (SC 038302). The Open University is authorised and regulated by the Financial Conduct Authority. Open University Student Budget Accounts Limited (OUSBA) is a wholly owned subsidiary of The Open University, Companies House number 303735 and until 31 March 2014 was licensed by the Office of Fair Trading (OFT) under licence number 573250 and from 1 April 2014 is authorised and regulated by the Financial Conduct Authority (FCA) under interim permission number 573250.";
        _translation_copy['jobs'] = "Jobs";
        _translation_copy['accessibility'] = "Accessibility";
        _translation_copy['cymraeg'] = "Cymraeg";

    }


    var output = '';
    if (document.body.className.indexOf('cymraeg') >= 0) {

        output = output + '<div class="int-ouFooter" role="contentinfo">';
        output = output + '<div class="int-container">';
        output = output + '<div class="header">';
        output = output + '<div class="crest"><img src="/oudigital/headerandfooter/assets/img/ou-crest.png" alt="The Open University Crest"></div>';
        output = output + '<div class="contact">';
        output = output + '<h3>Y Brifysgol Agored</h3>';
        output = output + '</div>';
        output = output + '</div>';
        output = output + '<div class="nav-footer">';
        output = output + '<ul>';
        output = output + '<li><a href="http://www.open.ac.uk/contact">' + _translation_copy['contact-us'] + '</a></li>';
        output = output + '<li><a href="http://www3.open.ac.uk/employment/">' + _translation_copy['jobs'] + '</a></li>';
        output = output + '<li><a href="http://www.open.ac.uk/about/main/management/policies-and-statements/website-accessibility-open-university">' + _translation_copy['accessibility'] + '</a></li>';
        output = output + '<li><a href="http://www.open.ac.uk/cymraeg">' + _translation_copy['cymraeg'] + '</a></li>';
        output = output + '<li><a href="http://www.open.ac.uk/about/main/management/policies-and-statements/conditions-use-open-university-websites">' + _translation_copy['conditions-of-use'] + '</a></li>';
        output = output + '<li><a href="http://www.open.ac.uk/about/main/management/policies-and-statements/website-privacy-ou">' + _translation_copy['privacy-and-cookies'] + '</a></li>';
        output = output + '<li><a href="http://www.open.ac.uk/about/main/management/policies-and-statements/copyright-ou-websites">' + _translation_copy['copyright'] + '</a></li>';
        output = output + '</ul>';
        output = output + '</div>';
        output = output + '<div class="small-print">';
        output = output + '<p class="copyright"><small>' + _translation_copy['rights-reserved'] + ' ' + _translation_copy['charter'] + '</small></p>';
        output = output + '</div>';
        output = output + '</div>';
        output = output + '</div>';

    }
    else {

        output = output + '<div class="int-ouFooter" role="contentinfo">';
        output = output + '<div class="int-container">';
        output = output + '<div class="header">';
        output = output + '<div class="crest"><img src="/oudigital/headerandfooter/assets/img/ou-crest.png" alt="The Open University Crest"></div>';
        output = output + '<div class="contact">';
        output = output + '<h3>The Open University</h3>';
        output = output + '</div>';
        output = output + '</div>';
        output = output + '<div class="nav-footer">';
        output = output + '<ul>';
        output = output + '<li><a href="http://www.open.ac.uk/contact">' + _translation_copy['contact-us'] + '</a></li>';
        output = output + '<li><a href="http://www3.open.ac.uk/employment/">' + _translation_copy['jobs'] + '</a></li>';
        output = output + '<li><a href="http://www.open.ac.uk/about/main/management/policies-and-statements/website-accessibility-open-university">' + _translation_copy['accessibility'] + '</a></li>';
        output = output + '<li><a href="http://www.open.ac.uk/cymraeg">' + _translation_copy['cymraeg'] + '</a></li>';
        output = output + '<li><a href="http://www.open.ac.uk/about/main/management/policies-and-statements/conditions-use-open-university-websites">' + _translation_copy['conditions-of-use'] + '</a></li>';
        output = output + '<li><a href="http://www.open.ac.uk/about/main/management/policies-and-statements/website-privacy-ou">' + _translation_copy['privacy-and-cookies'] + '</a></li>';
        output = output + '<li><a href="http://www.open.ac.uk/about/main/management/policies-and-statements/copyright-ou-websites">' + _translation_copy['copyright'] + '</a></li>';
        output = output + '</ul>';
        output = output + '</div>';
        output = output + '<div class="small-print">';
        output = output + '<p class="copyright"><small>' + _translation_copy['rights-reserved'] + ' ' + _translation_copy['charter'] + '</small></p>';
        output = output + '</div>';
        output = output + '</div>';
        output = output + '</div>';

    }

    document.writeln(output);
    //return _translation_copy;
}


function getCookiePolicyTranslation() {
    var _cookiepolicy_copy = new Array();

    // Determine if english or welsh text should be displayed
    if (document.body.className.indexOf('cymraeg') >= 0) {
        _cookiepolicy_copy['_cookiepolicy_title'] = "Cwcis ar ein gwefan";
        _cookiepolicy_copy['_cookiepolicy_body'] = "Rydym yn defnyddio cwcis i sicrhau bod ein gwefannau yn gweithio'n effeithiol ac i wella eich profiad fel defnyddiwr. Os byddwch yn parhau i ddefnyddio'r wefan, byddwn yn tybio eich bod yn fodlon gyda hyn. Fodd bynnag, gallwch newid eich gosodiadau cwcis unrhyw dro. <a class='cookieInfo' href='http://www.open.ac.uk/about/main/admin-and-governance/policies-and-statements/cookie-use-the-ou-website'>More Info/Change Settings</a>.";
        _cookiepolicy_copy['_cookiepolicy_button'] = "Parhau";
    }
    else {
        _cookiepolicy_copy['_cookiepolicy_title'] = "Cookies on our website";
        _cookiepolicy_copy['_cookiepolicy_body'] = "We use cookies to make sure our websites work effectively and to improve your user experience.  If you continue to use this site we will assume that you are happy with this. However, you can change your cookie settings at any time. <a class='cookieInfo' href='http://www.open.ac.uk/about/main/admin-and-governance/policies-and-statements/cookie-use-the-ou-website'>More Info/Change Settings</a>.";
        _cookiepolicy_copy['_cookiepolicy_button'] = "Continue";
    }

    return _cookiepolicy_copy;
}

function displayNotification(c_action) {

    // Get Cookie policy translation based on class
    var _translation = getCookiePolicyTranslation();

    var message = '<div id="int-cookies-bar" class="int-cookies-bar int-active">';
    message = message + '<div class="interaction">';
    message = message + '<div class="int-container">';
    message = message + '<div class="int-row">';
    message = message + '<div class="int-grid12">';
    message = message + '<h3>' + _translation['_cookiepolicy_title'] + '</h3>';
    message = message + '</div>';
    message = message + ' </div>';
    message = message + '<div class="int-row">';
    message = message + '<div class="int-grid10">';
    message = message + '<p>';
    message = message + _translation['_cookiepolicy_body'];
    message = message + '</p>';
    message = message + '</div>';
    message = message + '<div class="int-grid2">';
    message = message + '<a href="#" onclick="JavaScript:oudoAccept();" class="int-button" id="int-cookies-bar-button" role="button">' + _translation['_cookiepolicy_button'] + '</a>';
    message = message + '</div>';
    message = message + '</div>';
    message = message + '</div>';
    message = message + '</div>';
    message = message + '</div>';

    document.writeln(message);
}

function oudoAccept() {
    ousetCookie("ou_cookie_policy", "continue", 365, mdomain);
    //TG Ireland code starts here    
    if (typeof countryCode !=='undefined' && countryCode == '') {    		
    		ousetCookie('OU_CountryCode', countryCode, 365, mdomain);
		}
		//ends here
		
    // Get countryCode set by sites inorder to set countrycode upon cookie accept
    if (typeof countryCode !== 'undefined' && countryCode != '') {
        ousetCookie('OU_CountryCode', countryCode, 365, mdomain);
    }

    location.reload(true);
}

function ousetCookie(c_name, value, exdays, domain) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = value + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString() + "; path=/");
    document.cookie = c_name + "=" + c_value + ";domain=" + domain;
}

function oucheckCookie(_cookieName) {
    var cookieChk = ougetCookie(_cookieName);
    return cookieChk;
}

function ouCookiePolicyDisplayNotification() {

    var cookieName = "ou_cookie_policy";
    var cookieSAMS = "SAMSsession";
    var cookie2SAMS = "SAMS2session";

    var cookieChk = oucheckCookie(cookieName);
    var samsCookie1 = oucheckCookie(cookieSAMS);
    var samsCookie2 = oucheckCookie(cookie2SAMS);

    if (samsCookie1 != null && samsCookie1 != "") {
        ousetCookie("ou_cookie_policy", "continue", 365, mdomain); // set the cookie to expire in a year.
    }
    else {
        if (cookieChk != null && cookieChk != "notified") {
            ousetCookie(cookieName, cookieChk, 365, mdomain); // set the cookie to expire in a year.
        }
        else {
            displayNotification();
        }
    }
}

// Choose wheather to diplay cookie policy notification
ouCookiePolicyDisplayNotification();
//doTranslation();
