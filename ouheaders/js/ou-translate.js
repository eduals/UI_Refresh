
// Uses the HTML value to find the translated equivalent, and then replaces the html with the translation
function ouTranslate() {
	
	// Find all the values to translate
	var matches = document.querySelectorAll("[data-translate]");
	
	// If the body contains, cymraeg flag we should do the welsh translation
	var welshTranslation = (document.body.className.indexOf("cymraeg") >= 0) ? true : false;
	
	var warningMessage = " (missing welsh traslation)";
	
	for (i = 0; i < matches.length; i++) {
		// Remove the warning if its there
		match = ouExistingText(matches[i]).replace(warningMessage, "");
		translatedText = _translations[match];
		// If we have a match, tranlate it
		if (translatedText) {
			if (welshTranslation == true) {
				ouTranslatedText(matches[i], translatedText);			
			}
		}
		else if (!isLive()) // Otherwise flag that we were asked to translate something with no translation (but not on live)
		{
			ouTranslatedText(matches[i], match + warningMessage);
		}
	}
}

function ouExistingText(ele) {
	if (ele.nodeName == 'INPUT') {
		return ele.placeholder.trim();
	}
	else {
	    return ele.innerHTML.trim();
	}
}

function ouTranslatedText (ele, text) {
	if (ele.nodeName == 'INPUT') {
		ele.placeholder = text;
	}
	else {
		ele.innerHTML = text;
	}
}


if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
        if (this != null) {
            return this.replace(/^\s+|\s+$/g, '');
        }
        return this;
    }
}

// Start translation code after page is loaded
window.addEventListener ? window.addEventListener("load",ouTranslate,false) : window.attachEvent && window.attachEvent("onload",ouTranslate);


// Translations follow.
var _translations = {
	"The Open University": "Y Brifysgol Agored",
	'<i class="fa fa-arrow-circle-down"></i> Skip to content': '<i class="fa fa-arrow-circle-down"></i> Ymlaen i’r cynnwys',
	"Sign in": "Mewngofnodi",
	"Sign out": "Allgofnodi",
	"My Account": "Fy nghyfrif",
	"Student Home": "Hafan Myfyrwyr",
	"Tutor Home": "Hafan Tiwtoriaid",
	"Intranet Home": "Hafan Mewnrwyd",
	"Contact the OU": "Cysylltu &acirc;'r OU",
	"Contact us": "Cysylltu &acirc; ni",
	"Accessibility": "Hygyrchedd",
	"Search the OU": "Chwilio’r OU",
	"Jobs": "Swyddi",
	"Conditions of use": "Amodau defnyddio",
	"Privacy and cookies": "Preifatrwydd a chwcis",
	"Copyright": "Hawlfraint",
	"All rights reserved. The Open University is incorporated by Royal Charter (RC 000391), an exempt charity in England &amp; Wales and a charity registered in Scotland (SC 038302). The Open University is authorised and regulated by the Financial Conduct Authority.": 
		"Cedwir pob hawl. Mae'r Brifysgol Agored yn gorfforedig drwy Siarter Brenhinol (RC000391), yn elusen a eithrir yng Nghymru a Lloegr ac yn elusen gofrestredig yn yr Alban (SC038302). Awdurdodir a rheoleiddir Y Brifysgol Agored gan yr Awdurdod Ymddygiad Ariannol.",
};