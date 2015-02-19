(function ($) {
    $().ready(function () {
        $(document).ajaxStart(function () {
            OU.EEP.Throbber.Start();
        });
        
        $(document).ajaxStop(function () {
            OU.EEP.Throbber.Stop();
        });

        Sys.WebForms.PageRequestManager.getInstance().add_beginRequest(function() {
            OU.EEP.Throbber.Start();
        });
        
        Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function() {
            OU.EEP.Throbber.Stop();
        });
    });
})(jQuery);

