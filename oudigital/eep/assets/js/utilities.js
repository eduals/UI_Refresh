/*******************************************
	
	Utilities

*******************************************/

(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');


// Useful utility functions
var ou_utils = {

	// returns current viewport setting (eg: xs, sm, md, lg)
	getMQ: function() {
		var size = window.getComputedStyle(document.body,':after').getPropertyValue('content');
    return size;
	},

	// test whether a viewport setting is currently active ( eg: isMQ('sm'); )
	isMQ: function() {
		var mq = getMQ();
	  return (mq.indexOf(test) !== -1);
	}

};


