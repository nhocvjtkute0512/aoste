/**
 *  @name tab-to-accordion
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

  var pluginName = 'tab-to-accordion';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  function tab(el) {
    el.find('.nav-tabs li').on('click', function(e) {
      e.preventDefault();
      el.find('.tab-content .tab-pane').hide();
       var tabActive = $(this).attr('rel');
       $('#'+ tabActive).fadeIn();
       el.find('.nav-tabs li').removeClass('active');
       $(this).addClass('active');
       el.find('.tab-content .tab-pane[rel="'+ tabActive +'"]').addClass('active');
    });
  }

  function accordion(el) {
    el.find('.tab-content .panel-title').on('click', function() {
     el.find('.tab-content .tab-pane').hide();
      var tabActive_acc = $(this).attr('rel');
      $('#'+ tabActive_acc).fadeIn();
      el.find('.tab-content .tab-pane[rel="'+ tabActive_acc +'"]').addClass('active');

      $('.tab-content .panel-title .hvr-icon-rotate').removeClass('rotate');
      $(this).find('.hvr-icon-rotate').addClass('rotate');
    });
  }

  Plugin.prototype = {
    init: function() {
      var el = this.element;
      el.find('.tab-content .tab-pane').hide();
      el.find('.tab-content .tab-pane:first').show();

      tab(el);
      accordion(el);
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
