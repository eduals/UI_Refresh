// ----------------------------------------------------------
// OU.Docs
// ----------------------------------------------------------
// The Open University © Copyright 2014. All rights reserved
// Written by Paul Liu | paul.liu@open.ac.uk
// ----------------------------------------------------------

(function ($, ou) {

    ou.Docs = ou.Docs || {};

    ou.Docs.version = 'OU.Docs | v0.4';
    ou.Docs.codeDump = function ($component, $pre) {
        $pre.html(ou.Docs.encode($component.html()));
    };
    ou.Docs.encode = function (str) {
        return $.trim(str).replace(/[<>]/g, function (m) {
            return {
                '<': '&lt;',
                '>': '&gt;'
            }[m];
        });
    };
    ou.Docs.codeTrim = function ($el) {
        $el.each(function () {
            $(this).html(ou.Docs.encode($(this).html()));
        });
    };
})(jQuery, window.OU.Docs = window.OU || {});