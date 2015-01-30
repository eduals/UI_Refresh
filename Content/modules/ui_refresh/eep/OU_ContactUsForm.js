(function($){
    $(document).ready(function () {

        $(".validate-email, .validate-confirm-email").bind("cut copy paste contextmenu", function (e) {
            e.preventDefault();
        });

        initValidation(true);

        $(".validate-title").rules("add", {
            messages: { required: "<a href='#ddlTitle'>Title</a> : is a required field" },
            required: true
        });

        $(".validate-forename").rules("add", {
            alphas: true,
            maxlength: 40,
            messages: {
                alphas: "<a href='#txtForename'>Forename</a> : may only contain letters and the following characters - ' ( ) @ /",
                maxlength: "<a href='#txtForename'>Forename</a> : must not be more than 40 characters",
                required: "<a href='#txtForename'>Forename</a> : is a required field"
            },
            required: true
        });

        $(".validate-surname").rules("add", {
            surnamealphas: true,
            maxlength: 25,
            messages: {
                surnamealphas: "<a href='#txtSurname'>Surname</a> : may only contain letters and the following characters - ' ( ) @ / and cannot start with /",
                maxlength: "<a href='#txtSurname'>Surname</a> : must not be more than 25 characters",
                required: "<a href='#txtSurname'>Surname</a> : is a required field"
            },
            required: true
        });

        $(".validate-email").rules("add", {
            simplifiedEmail: true,
            maxlength: 100,
            messages: {
                simplifiedEmail: "<a href='#txtEmail'>Email address</a> : is not a valid email address",
                maxlength: "<a href='#txtEmail'>Email address</a> : must not be more than 100 characters",
                required: "<a href='#txtEmail'>Email address</a> : is a required field"

            },
            required: true
        });

        $(".validate-confirm-email").rules("add", {
            equalTo: $(".validate-email"),
            messages: {
                equalTo: "<a href='#txtEmailConfirm'>Confirm email address</a> : must match with email address",
                required: "<a href='#txtEmailConfirm'>Confirm email address</a> : is a required field"
            },
            required: true
        });

        $(".validate-daytime-phone").rules("add", {
            messages: {
                phoneUK: "<a href='#txtPhone'>Daytime phone number</a> : must be a valid UK or international phone number"
            },
            phoneUK: true
        });

        $(".validate-dob").rules("add", {
            dateUK: true,
            maxage: 102,
            minage: 16,
            mustbeinpast: true,
            messages: {
                dateUK: "<a href='#txtDateOfBirth'>Date of birth</a> : is not a valid UK date and should be in the format dd/mm/yyyy",
                maxage: "<a href='#txtDateOfBirth'>Date of birth</a> : must not be greater than 102 years",
                minage: "<a href='#txtDateOfBirth'>Date of birth</a> : must not be less than 16 years",
                required: "<a href='#txtDateOfBirth'>Date of birth</a> : is a required field"
            },
            required: true
        });

        $(".validate-postcode").rules("add", {
            postcodealphas: true,
            maxlength: 8,
            messages: {
                postcodealphas: "<a href='#txtPostcode'>Post Code</a> : may only contain letters, numbers and spaces",
                maxlength: "<a href='#txtPostcode'>Post Code</a> : must not be more than 8 characters"
            }
        });

        $(".validate-address-line1").rules("add", {
            addressalphas: true,
            maxlength: 35,
            messages: {
                addressalphas: "<a href='#txtAddressLine1'>Address first line</a> : may only contain letters, numbers and the following characters - ' ( ) \" & /",
                maxlength: "<a href='#txtAddressLine1'>Address first line</a> : must not be more than 35 characters",
                required: "<a href='#txtAddressLine1'>Address first line</a> : is a required field"
            },
            required: true
        });

        $(".validate-address-line2").rules("add", {
            addressalphas: true,
            maxlength: 35,
            messages: {
                addressalphas: "<a href='#txtAddressLine2'>Address second line</a> : may only contain letters, numbers and the following characters - ' ( ) \" & /",
                maxlength: "<a href='#txtAddressLine2'>Address second line</a> : must not be more than 35 characters"
            }
        });

        $(".validate-address-line3").rules("add", {
            addressalphas: true,
            maxlength: 35,
            messages: {
                addressalphas: "<a href='#txtAddressLine3'>Address third line</a> : may only contain letters, numbers and the following characters - ' ( ) \" & /",
                maxlength: "<a href='#txtAddressLine3'>Address third line</a> : must not be more than 35 characters"
            }
        });

        $(".validate-address-line4").rules("add", {
            addressalphas: true,
            maxlength: 35,
            messages: {
                addressalphas: "<a href='#txtTown'>Town</a> : may only contain letters, numbers and the following characters - ' ( ) \" & /",
                maxlength: "<a href='#txtTown'>Town</a> : must not be more than 35 characters",
                required: "<a href='#txtTown'>Town</a> : is a required field"
            },
            required: true
        });

        $(".validate-address-line5").rules("add", {
            addressalphas: true,
            maxlength: 35,
            messages: {
                addressalphas: "<a href='#txtCounty'>County/State</a> : may only contain letters, numbers and the following characters - ' ( ) \" & /",
                maxlength: "<a href='#txtCounty'>County/State</a> : must not be more than 35 characters"
            }
        });

        $(".validate-subject-query").rules("add", {
            messages: { required: "<a href='#ddlSubject'>Subject of query</a> : is a required field" },
            required: true
        });

        $(".validate-query-field").rules("add", {
            messages: {
                required: "<a href='#textareaQuery'>Query</a> : is a required field",
                textareamax: "<a href='#textareaQuery'>Query</a> : must not be more than 500 characters"
            },
            required: true,
            textareamax: 500
        });

        $(".validate-country").rules("add", {
            messages: { required: "<a href='#ddlCountry'>Country</a> : is a required field" },
            required: true
        });

        $('form').submit(function () {
            if ($(this).valid()) {
                OU.EEP.Throbber.Start();
            }
        });

        $(".txtAddressLine1").on("blur", function (e) {
            if ($(this).val().replace(" ", "").length > 0) {
                $("#divFindAddressError").hide();
            }
        });
    });

    var prm = Sys.WebForms.PageRequestManager.getInstance();
    prm.add_endRequest(showMessage());
})(jQuery);