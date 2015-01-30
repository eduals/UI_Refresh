(function ($) {

    var messageRequired = 'is a required field';

    function message(href, anchorText, text) {
        return '<a href="#' + href + '">' + anchorText + '</a>: ' + text;
    }

    function messageCharacterLength(length) {
        return 'must not be more than ' + length + ' characters';
    }

    $(document).ready(function () {
        initValidation(true);

        $(".validate-title").rules("add", {
            messages: {required: message('ddlTitle', 'Title', messageRequired)},
            required: true
        });

        $(".validate-forename").rules("add", {
            alphas: true,
            maxlength: 40,
            messages: {
                alphas: message('txtForename', 'Forename', 'may only contain letters and the following characters - \' ( ) @ /'),
                maxlength: message('txtForename', 'Forename', messageCharacterLength('40')),
                required: message('txtForename', 'Forename', messageRequired)
            },
            required: true
        });

        $(".validate-surname").rules("add", {
            surnamealphas: true,
            maxlength: 25,
            messages: {
                surnamealphas: message('txtSurname', 'Surname', 'may only contain letters and the following characters - \' ( ) @ / and cannot start with /'),
                maxlength: message('txtSurname', 'Surname', messageCharacterLength('25')),
                required: message('txtSurname', 'Surname', messageRequired)
            },
            required: true
        });

        $(".validate-dob").rules("add", {
            dateUK: true,
            maxage: 102,
            minage: 16,
            mustbeinpast: true,
            messages: {
                dateUK: message('txtDateOfBirth', 'Date of birth', 'is not a valid UK date and should be in the format DD/MM/YYYY'),
                maxage: message('txtDateOfBirth', 'Date of birth', 'must not be greater than 102 years'),
                minage: message('txtDateOfBirth', 'Date of birth', 'must not be less than 16 years'),
                required: message('txtDateOfBirth', 'Date of birth', messageRequired)
            },
            required: true
        });

        var $validateEmail = $(".validate-email");

        $validateEmail.rules("add", {
            email: true,
            maxlength: 100,
            messages: {
                email: message('txtEmail', 'Email address', 'is not a valid email address'),
                maxlength: message('txtEmail', 'Email address', messageCharacterLength('100')),
                required: message('txtEmail', 'Email address', messageRequired)
            },
            required: true
        });

        $(".validate-confirm-email").rules("add", {
            equalTo: $validateEmail,
            messages: {
                equalTo: message('txtEmailConfirm', 'Confirm email address', 'must match with email address'),
                required: message('txtEmailConfirm', 'Confirm email address', messageRequired)
            },
            required: true
        });

        $(".validate-daytime-phone").rules("add", {
            messages: {
                phoneUK: message('txtPhone', 'Daytime phone number', ' must be a valid UK or international phone number'),
                required: message('txtPhone', 'Daytime phone number', messageRequired)
            },
            required: true,
            phoneUK: true
        });

        $(".validate-query").rules("add", {
            messages: {required: message('ddlSubject', 'Subject of query', messageRequired)},
            required: true
        });

        $(".validate-time").rules("add", {
            messages: {required: message('ddlTime', 'Callback time', messageRequired)},
            required: true
        });
    });

})(jQuery);


