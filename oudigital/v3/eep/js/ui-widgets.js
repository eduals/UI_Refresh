var int_ou_ui_widgets = {
    
    accordion: {
        init: function () {
            //console.log('accordion init');
            $('.int-accordion').accordion({
                heightStyle: "content"
            });
            $('.int-accordion .ui-accordion-header').prepend(
                '<span class="int-icon-btn int-accordion-closed"><i class="int-icon int-icon-chevron-right"></i></span>' +
                '<span class="int-icon-btn int-icon-btn-active int-accordion-open"><i class="int-icon int-icon-chevron-down"></i></span>'
            );
        }
    }
    
}