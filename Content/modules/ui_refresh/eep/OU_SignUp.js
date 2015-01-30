(function ($) {

    $('form').submit(function () {
        if ($(this).valid()) {
            OU.EEP.Throbber.Start();
        }
    });

})(jQuery);


