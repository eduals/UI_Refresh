(function (pathway, $) {

    var modalLevel, modalTime, modalResource, modalPayment, modalLanguage, modalCountry;

    modalLevel = new pathway.Modal($('#modal_level'), {
        $modalOpener:$("#modal_level_opener")
    });
    modalTime = new pathway.Modal($('#modal_time'), {
        $modalOpener:$("#modal_time_opener")
    });
    modalResource = new pathway.Modal($('#modal_resource'), {
        $modalOpener:$("#modal_resource_opener")
    });
    modalPayment = new pathway.Modal($('#modal_payment'), {
        $modalOpener:$("#modal_payment_opener")
    });
    modalLanguage = new pathway.Modal($('#modal_language'), {
        $modalOpener:$("#modal_language_opener")
    });
    modalCountry = new pathway.Modal($('#modal_country'), {
        $modalOpener:$("#modal_country_opener")
    });

})(window.Pathway, jQuery);