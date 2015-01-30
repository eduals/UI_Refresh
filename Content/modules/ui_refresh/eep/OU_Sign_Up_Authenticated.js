initValidation(true);

$(".validate-title").rules("add", {
    messages: { required: "<a href='#title'>Title</a> : is a required field" },
    required: true
});

$(".validate-forename").rules("add", {
    alphas: true,
    maxlength: 40,
    messages: {
        alphas: "<a href='#forenames'>Forenames</a> : may only contain letters and the following characters - ' ( ) @ /",
        maxlength: "<a href='#forenames'>Forenames</a> : must not be more than 40 characters",
        required: "<a href='#forenames'>Forenames</a> : is a required field"
    },
    required: true
});

$(".validate-surname").rules("add", {
    surnamealphas: true,
    maxlength: 25,
    messages: {
        surnamealphas: "<a href='#txtSurname'>Surname</a> : may only contain letters and the following characters - ' ( ) @ / and cannot start with /",
        maxlength: "<a href='#surname'>Surname</a> : must not be more than 25 characters",
        required: "<a href='#surname'>Surname</a> : is a required field"
    },
    required: true
});

$(".validate-dob").rules("add", {
    dateUK: true,
    maxage: 102,
    minage: 16,
    messages: {
        dateUK: "<a href='#dob'>Date of birth</a> : is not a valid UK date and should be in the format dd/mm/yyyy",
        maxage: "<a href='#dob'>Date of birth</a> : must not be greater than 102 years",
        minage: "<a href='#dob'>Date of birth</a> : must not be less than 16 years",
        required: "<a href='#dob'>Date of birth</a> : is a required field"
    },
    required: true
});

$(".validate-email").rules("add", {
    email: true,
    maxlength: 100,
    messages: {
        email: "<a href='#email'>Email address</a> : is not a valid email address",
        maxlength: "<a href='#email'>Email address</a> : must not be more than 100 characters",
        required: "<a href='#email'>Email address</a> : is a required field"
    },
    required: true
});

$(".validate-confirm-email").rules("add", {
    equalTo: $(".validate-email"),
    messages: {
        equalTo: "<a href='#txtEmailConfirm'>Retype email address</a> : must match with email address",
        required: "<a href='#txtEmailConfirm'>Retype email address</a> : is a required field"
    },
    required: true
});

$(".validate-password").rules("add", {
    maxlength: 12,
    minlength: 8,
    password: true,
    messages: {
        maxlength: 'Your new <a href="#password">password</a> must be 8 to 12 characters long, include letters and numbers, at least one lowercase and one capital letter and one special-character from the following: ! $ % ^ & * [ ] @ # ? + - _',
        minlength: 'Your new <a href="#password">password</a> must be 8 to 12 characters long, include letters and numbers, at least one lowercase and one capital letter and one special-character from the following: ! $ % ^ & * [ ] @ # ? + - _',
        required: '<a href="#">Password</a> : is a required field',
        password: 'Your new <a href="#password">password</a> must be 8 to 12 characters long, include letters and numbers, at least one lowercase and one capital letter and one special-character from the following: ! $ % ^ & * [ ] @ # ? + - _'
    },
    required: true
});

$(".validate-confirm-password").rules("add", {
    equalTo: $(".validate-password"),
    password: false,
    messages: {
        equalTo: "<a href='#password_confirm'>Retype password</a> : must match with password"
    }
});

$(".validate-terms").rules("add", {
    messages: {
        required: "<a href='#terms'>Terms and conditions</a> : must be accepted"
    },
    required: true
});

/// attach events

$(document).ready(function () {
    $('.validate-email, .validate-confirm-email, .validate-password, .validate-confirm-password').bind("cut copy paste contextmenu", function (e) {
        e.preventDefault();
    });
});