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

  var pluginName = 'validate';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      this.vars = {
        emailFilter : /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      };    

      $('.element input').blur(function() {
        that.required(
          $.trim($(this).val()), 
          $(this).parent('.element').children('span')
        );
      });

      $('.element input[name="email"]').blur(function() {
        that.email(
          $.trim($(this).val()), 
          $(this).parent('.element').children('span')
        );
      });

      $('.group-element div input').blur(function() {
        that.required(
          $.trim($(this).val()), 
          $(this).parent('div').children('span')
        );
        that.length(
          $.trim($(this).val()),
          $(this).parent('div').children('span'),
          4
        );
      });

      $('.postcode, .telephone ').keyup(function(){
        if (/\D/g.test(this.value))
        {
          this.value = this.value.replace(/\D/g, '');
        }
      });

      $('.confirm-password').blur(function() {
        that.compare($.trim($(this).val()), $.trim($('.password').val()), $('.error-compare-password'));
      });
    },

    compare: function(element1, element2, errorMess) {
      if (element1 !== element2) {
        errorMess.addClass('visible');
      }
      else {
        errorMess.removeClass('visible');
      }
    },

    email: function(element, errorMess) {
      if (!this.vars.emailFilter.test(element)) {
        errorMess.addClass('visible');
      }
      else {
        errorMess.removeClass('visible');
      }
    },
    
    required: function(element, errorMess) {
      if (element === '') {
        errorMess.addClass('visible');
      }
      else {
        errorMess.removeClass('visible');
      }
    },

    length: function(element, errorMess, min) {
      if (element.length < min) {
        errorMess.addClass('visible');
      }
      else {
        errorMess.removeClass('visible');
      }
    },

    checkvalue: function() {
      $('input').keyup(function()                                      {
        if (/\D/g.test(this.value))
        {
          this.value = this.value.replace(/\D/g, '');
        }
      });
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
      
    });

    $('[data-' + pluginName + ']')[pluginName]({
      
    });
  });

}(jQuery, window));
