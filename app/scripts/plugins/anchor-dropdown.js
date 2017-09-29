/**
 *  @name anchor-dropdown
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

  var pluginName = 'anchor-dropdown';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var el = this.element;
      if (el.find('ul.options').length < 1) {
        el.find('select').change(function() {
          var value = el.find('select.fancy-select-box').val();
          if (value.indexOf('#') !== -1) {
              var newId = value.slice(1, value.length);
              window.location.hash = 'anchor-' + newId;
              if ($('body').hasClass('pagemode-edit') || $('body').hasClass('pagemode-preview')) {
                $('html, body').stop().animate({
                  'scrollTop': $(value).offset().top - 300
                }, 1000);
              }
              else {
                if (window.innerWidth < 992) {
                  // $('html, body').stop().animate({
                  //   'scrollTop': $(value).offset().top - ($('.navbar-header').height() + 10)
                  // }, 1000);
                  window.TweenLite.to(window, 1, {scrollTo:{y: value, offsetY: ($('.navbar-header').height() + 10)}});
                }
                else {
                  // $('html, body').stop().animate({
                  //   'scrollTop': $(value).offset().top - ($('.navbar').find('.mobile-menu').children('.primary-nav').height() + 10)
                  // }, 1000);
                  window.TweenLite.to(window, 1, {scrollTo:{y: value, offsetY: ($('.navbar').find('.mobile-menu').children('.primary-nav').height() + 10)}});
                }
              }
            }
            else {
              window.open(value, '_blank');
              window.focus();
            }
        });
      }
      else {
        el.find('ul.options li').each(function() {
          $(this).on('click.' + pluginName, function(event) {
            event.preventDefault();
            var value = el.find('select.fancy-select-box').val();
            if (value.indexOf('#') !== -1) {
              var newId = value.slice(1, value.length);
              console.log(value);
              window.location.hash = 'anchor-' + newId;
              if ($('body').hasClass('pagemode-edit') || $('body').hasClass('pagemode-preview')) {
                $('html, body').stop().animate({
                  'scrollTop': $(value).offset().top - 300
                }, 1000);
              }
              else {
                if (window.innerWidth < 992) {
                  // $('html, body').stop().animate({
                  //   'scrollTop': $(value).offset().top - ($('.navbar-header').height() + 10)
                  // }, 1000);
                   window.TweenLite.to(window, 1, {scrollTo:{y: value, offsetY: ($('.navbar-header').height() + 10)}});
                }
                else {
                  // $('html, body').stop().animate({
                  //   'scrollTop': $(value).offset().top - ($('.navbar').find('.mobile-menu').children('.primary-nav').height() + 10)
                  // }, 1000);
                  window.TweenLite.to(window, 1, {scrollTo:{y: value, offsetY: ($('.navbar').find('.mobile-menu').children('.primary-nav').height() + 10)}});
                }
              }
            }
            else {
              window.open(value, '_blank');
              window.focus();
            }
          });
        });
      }


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

  $.fn[pluginName].defaults = {
    key: 'value',
    onCallback: null
  };

  $(function() {
    $('[data-' + pluginName + ']').on('customEvent', function() {
      // to do
    });

    $('[data-' + pluginName + ']')[pluginName]({
      key: 'custom'
    });
  });

}(jQuery, window));
