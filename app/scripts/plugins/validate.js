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

; (function ($, window, undefined) {
  'use strict';

  var pluginName = 'validate';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this;
      this.vars = {
        emailFilter: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      };

      $('[data-required]').blur(function () {
        that.required(
          $.trim($(this).val()),
          $(this).next(),
          $(this).data('messageRequired')
        );
      });

      $('[data-email]').blur(function () {
        that.email(
          $.trim($(this).val()),
          $(this).next(),
          $(this).data('emailInvalid')
        );
      });

      $('[data-min-length]').blur(function() {
        that.minLength(
          $.trim($(this).val()),
          $(this).data('minLength'),
          $(this).next()
        );      
      });

      $('[data-max-length]').blur(function() {
        that.maxLength(
          $.trim($(this).val()),
          $(this).data('maxLength'),
          $(this).next()
        );
      });

      $('[data-number]').keyup(function () {
        if (/\D/g.test(this.value)) {
          this.value = this.value.replace(/\D/g, '');
        }
      });
      
      $('[data-confirm-password]').blur(function () {
        that.compare(
          $.trim($('[data-password]').val()),
          $.trim($(this).val()),
          $(this).next()       
        );
      });
    },

    minLength: function(element, min, messElement) {
      if (element.length !== 0) {
        if (element.length < min) {
          messElement.addClass('visible').text('You need to enter at least a ' + min +' character');
        }
        else {
          messElement.removeClass('visible').text('');
        }        
      }
    },

    maxLength: function(element, max, messElement) {
      if (element.length !== 0) {
        if (element.length > max) {
          if (element.length > max) {
            messElement.addClass('visible').text('You need to enter less than ' + max + ' character');
          }
          else {
            messElement.removeClass('visible').text('');
          }        
        }
      } 
    },

    required: function (element, messElement, messText) {
      if (element.length === 0) {
        messElement.addClass('visible').text(messText);
      }
      else {
        messElement.removeClass('visible').text('');
      }
    },

    email: function (element, messElement, messText) {
      if (element !== '') {
        if (!this.vars.emailFilter.test(element)) {
          messElement.addClass('visible').text(messText);
        }
        else {
          messElement.removeClass('visible').text('');
        }        
      }
    },

    compare: function (element1, element2, messElement) {
      if (element1 !== element2) {
        messElement.addClass('visible').text('Password does not match the confirm password');
      }
      else {
        messElement.removeClass('visible').text('');
      }
    },
    
    destroy: function () {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
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

  $(function () {
    $('[data-' + pluginName + ']').on('customEvent', function () {

    });

    $('[data-' + pluginName + ']')[pluginName]({

    });
  });

}(jQuery, window));
