(function ($) {
    $().ready(function () {
        /*
            When using the Digital Framework Alerts, we have a container (div) on the page.
            We are supposed to call OUAlerts() on that container in order to wire up the necessary events
            in the alert box.

            HOWEVER, this does not seem to work in IE (at least IE8).

            This is a workaround - wire up the remove click event manually for now.
            Using $(document) ensures events are always rebound
        */

        $(document).on("click", ".int-alertRemove", function (e) {
            e.preventDefault();
            $(this).closest(".int-alert").remove();
        });
    });
})(jQuery);

