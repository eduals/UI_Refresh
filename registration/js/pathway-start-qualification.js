(function ($, pathway) {

    var $qualificationPopupAnchor = $('#qualificationPopupAnchor'),
        $CreditTransferPopupAnchor = $('#creditTransferPopupAnchor'),
        qualificationDataUrl = $qualificationPopupAnchor.data('url'),
        creditTransferDataUrl = $CreditTransferPopupAnchor.data('url'),
        modalLanguage,
        modalQualification;

    $qualificationPopupAnchor.click(function () {
        pathway.openPopup(qualificationDataUrl, 'info', 'popup1');
    });

    $CreditTransferPopupAnchor.click(function () {
        pathway.openPopup(creditTransferDataUrl, 'web', 'webpopup1');
    });

    modalLanguage = new pathway.Modal($('#modal_username'), {
        $modalOpener: $('#modal_username_opener')
    });

    /*    modalQualification = new pathway.Modal($('#modal_qualification'), {
     $modalOpener: $qualificationPopupAnchor
     });*/

})(jQuery, window.Pathway);