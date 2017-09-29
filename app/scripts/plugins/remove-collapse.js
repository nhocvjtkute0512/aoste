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

  var pluginName = 'removecollapse';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var block = this.element;
      $(window).resize(function() {
        if (window.innerWidth < 768) {
          block.find('[data-toggle]').attr('data-toggle', 'collapse');
        }
        else {
          block.find('[data-toggle]').attr('data-toggle', 'false');
        }
      });
      if ($(window).width() < 768) {
        block.find('[data-toggle]').attr('data-toggle', 'collapse');
      }
      else {
        block.find('[data-toggle]').attr('data-toggle', 'false');
      }
    },
    destroy: function() {
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

  };

  $(function() {
    $('[data-' + pluginName + ']').on('customEvent', function() {
      // to do
    });

    $('[data-' + pluginName + ']')[pluginName]({

    });
  });

}(jQuery, window));
