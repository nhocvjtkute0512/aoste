/**
 *  @name filter-dropdown
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

  var pluginName = 'c057-form';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var el = this.element,
          checkbox = el.find('.hoken-tetuduki-form input[type="checkbox"]');

      checkbox.each(function(){
          if (checkbox.attr('checked') === 'checked') {
            $(this).parent().find('input[type="hidden"]').remove();
          } else {
            var n = $(this).attr('name');
            $(this).after('<input type="hidden" name="'+ n +'" value="'+0+'" />');
          }
      });

      checkbox.change(function(){
        if ($(this).is(':checked')) {
          $(this).parent().find('input[type="hidden"]').remove();
        } else {
          var n = $(this).attr('name');
          $(this).after('<input type="hidden" name="'+ n +'" value="'+0+'" />');
        }
      });
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
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
