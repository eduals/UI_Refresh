(function ($, cl) {
    var $emailInput = $('#email'),
        $password = $('#password'),
        $retypeEmail = $('#retypeEmailAddressInput'),
        $retypePassword = $('#password_confirm'),
        retypeInputOptions = {
            alert: true,
            customTrigger: true,
            customTriggerShowEvent: 'paste retypeMatch',
            customTriggerHideEvent: 'blur'
        };

    new cl.Tooltip($('#dob'), $('#dobFi'));

    new cl.Tooltip($('#phoneNumberInput'), $('#phoneNumberInputTooltip'));

    new cl.Tooltip($emailInput, $('#emailFi'));
    new cl.Tooltip($retypeEmail, $('#retypeEmailFi'), retypeInputOptions);
    new cl.EventPreventDefault($retypeEmail, {events: 'paste'});

    new cl.Tooltip($password, $('#passwordFi'));
    new cl.Tooltip($retypePassword, $('#retypePasswordFi'), retypeInputOptions);
    new cl.PasswordCheckList($password, $('#passwordCheckList'));
    new cl.EventPreventDefault($password);
    new cl.EventPreventDefault($retypePassword);
    cl.obscurePasswordOnBlur($password);
    cl.obscurePasswordOnBlur($retypePassword);

})(jQuery, window.cl5976 = window.cl5976 || {});
