// ----------------------------------------------------------
// OU.DigitalFramework
// ----------------------------------------------------------
// The Open University © Copyright 2014. All rights reserved
// Written by Paul Liu
// paul.liu@open.ac.uk
// ----------------------------------------------------------
// v0.1
// Throbber initialisation.
// ----------------------------------------------------------
 
window.OU = window.OU || {};
 
(function($, window, df){
    df.version = "OU.DigitalFramework | v0.1";

    df.markup = {
      throbber: '<div id="int-throbber" class="int-throbber"><div class="int-throbberOverlay"></div></div>'
    };

    $(df.markup.throbber).appendTo('body');

    df.Throbber = new window.OU.Widgets.Throbber($('#int-throbber'), {
        lines: 10, // The number of lines to draw
        length: 30, // The length of each line
        width: 8, // The line thickness
        radius: 25, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        color: '#fff', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: true, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'int-throbber', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
    });

})(jQuery, window, window.OU.DigitalFramework = window.OU.DigitalFramework || {});


// ----------------------------------------------------------
// Notes
// ----------------------------------------------------------
// Throbber
// OU.DigitalFramework.Throbber.Start(); //To start the throbber
// OU.DigitalFramework.Throbber.Stop(); //To stop the throbber
// ----------------------------------------------------------