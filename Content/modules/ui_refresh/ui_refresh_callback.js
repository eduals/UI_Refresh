(function ($, cl) {
    var $emailInput = $('#txtEmail'),
        $phoneNumber = $('#txtPhone'),
        $retypeEmail = $('#txtEmailConfirm'),
        $smsCheckboxRow = $('#smsCheckboxRow'),
        $smsCheckbox = $('#chkSMS'),
        $passwordRow = $('#passwordRow'),
        $createAccountCheckbox = $('#createAccountCheckbox'),
        retypeInputOptions = {
            alert: true,
            customTrigger: true,
            customTriggerShowEvent: 'paste retypeMatch',
            customTriggerHideEvent: 'blur'
        },
        $password = $('#password'),
        $retypePassword = $('#password_confirm');

    //Date of birth
    new cl.Tooltip($('#txtDateOfBirth'), $('#dobFi'));

    //Email
    new cl.Tooltip($emailInput, $('#emailFi'));
    new cl.Tooltip($retypeEmail, $('#retypeEmailFi'), retypeInputOptions);
    new cl.Tooltip($('#moreInfo'), $('#moreInfoTextAreaTooltip'));
    new cl.EventPreventDefault($retypeEmail, {events: 'paste'});

    //Password
    new cl.Tooltip($password, $('#passwordFi'));
    new cl.Tooltip($retypePassword, $('#retypePasswordFi'), retypeInputOptions);
    new cl.PasswordCheckList($password, $('#passwordCheckList'));
    new cl.EventPreventDefault($password);
    new cl.EventPreventDefault($retypePassword);
    cl.maxCharLengthReached($password);
    cl.maxCharLengthReached($retypePassword);

    //Create account
    $createAccountCheckbox.change(function () {
        if (this.checked) {
            $passwordRow.slideDown();
        } else {
            $passwordRow.slideUp();
        }

    }).attr('aria-controls', $passwordRow.attr('id'));

    //Phone number
    $phoneNumber
        .keyup(function () {
            setMobileCheckboxVisibility($phoneNumber.val());
        })
        .autoFillChecker(function () {
            $phoneNumber.trigger('keyup');
        }, 500);

    function setMobileCheckboxVisibility(val) {
        var isMobile = (val.substring(0, 2) == "07" || val.substring(0, 4) == "+447" || val.substring(0, 5) == "00447");

        if (isMobile) {
            $smsCheckboxRow.slideDown().attr('aria-hidden', 'false');
        } else {
            $smsCheckbox.prop('checked', false);
            $smsCheckboxRow.slideUp().attr('aria-hidden', 'true');
        }
    }

})(jQuery, window.cl5976 = window.cl5976 || {});
