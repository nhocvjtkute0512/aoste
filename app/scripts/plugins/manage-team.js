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

  var pluginName = 'manage-team';


  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  function initManageTeam(el) {
    var ppl_mmt = el.find('.mmt');

    ppl_mmt.hover(function () {
      $(this).addClass('active').siblings().removeClass('active');
    }, function () {
      ppl_mmt.addClass('active');
    });

    if (ppl_mmt.hasClass('active') && ppl_mmt.hasClass('mmt-toggle')) {
      ppl_mmt.on('click', function() {
        var elm = $(this);
        elm.toggleClass('fixed');

        if (elm.hasClass('fixed')) {
          ppl_mmt.removeClass('active').off('hover');
        } else {
          ppl_mmt.addClass('active');
          ppl_mmt.hover(function() {
            $(this).addClass('active').siblings().removeClass('active');
          }, function() {
            ppl_mmt.addClass('active');
          });
        }

        if (!elm.hasClass('fixed')) {
          elm.find('.ppl-detail').slideUp();
        } else {
          elm.find('.ppl-detail').slideDown();
        }
        elm.siblings().find('.ppl-detail').slideUp();
        elm.siblings().removeClass('fixed');

        (window.innerWidth) < 768 ?
          setTimeout(function(){
            $('html, body')
              .stop()
              .animate({
                      scrollTop: elm.offset().top - 50
                  },
                  1500,
                  'easeInOutExpo'
              );
          }, 300) :
          $('html, body')
            .stop()
            .animate({
                    scrollTop: elm.offset().top - 125
                },
                1500,
                'easeInOutExpo'
            );
      });
    }
  }

  Plugin.prototype = {
    init: function() {
      // initialize
      var el = this.element;

      initManageTeam(el);
      // add events
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
