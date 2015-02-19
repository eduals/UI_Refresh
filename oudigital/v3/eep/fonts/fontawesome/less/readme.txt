Remove 'int-icon-download-alt' from doc site

Remove 'int-icon-renminbi' as this icon no longer exists in 4.0.3

Update use of 'int-icon-reorder' within framework to 'int-icon-bars'.

Ensure when updating to a new version of Font Awesome that the class name within core.less is changed to:
.@{fa-css-prefix}, [class^="int-icon-"], [class*=" int-icon-"], [class*="ui-icon-"] {

28/11/14 --

variables.less

Changed from:

@fa-var-sort: "\f0dc";
@fa-var-sort-asc: "\f0dd";
@fa-var-sort-desc: "\f0de"

to:

@fa-var-sort-up: "\f0de";
@fa-var-sort-asc: "\f0de";
@fa-var-sort-down: "\f0dd";
@fa-var-sort-desc: "\f0dd";