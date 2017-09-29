/**
 *  @name plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'owl-carousel';


  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      // initialize
      // add events
      var el = this.element;

      el.owlCarousel({
          responsive: {
            0: {
              items:3,
              nav:!0,
              navText:!1,
              navRewind:!1,
              dots:!1,
              onInitialized:function(){
                $('.carousel-item').fadeIn();
                $('.carousel').prev().remove();
              }
            },
            541: {
              items:5,
              nav:!0,
              navText:!1,
              navRewind:!1,
              dots:!1,
              onInitialized:function(){
                $('.carousel-item').fadeIn();
                $('.carousel').prev().remove();
              }
            },
            1025: {
              items:5,
              nav:!0,
              navText:!1,
              mouseDrag:!1,
              navRewind:!1,
              touchDrag:!1,
              dots:!1,
              slideBy:3,
              onInitialized:function(){
                $('.carousel-item').fadeIn();
                $('.carousel').prev().remove();
              }
            }
          }
        });

        el.append('<div class="owl-controls"></div>');
        el.find('.owl-nav').appendTo(el.children('.owl-controls'));
        el.find('.owl-dots').appendTo(el.children('.owl-controls'));
    },
    destroy: function() {
      // remove events
      // deinitialize
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
