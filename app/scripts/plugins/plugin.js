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

  var pluginName = 'slider';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      this.vars = {
        stopClick: 0,
        currentIdx: 0,
        btnUp: this.element.find('.btn-up'),
        btnDown: this.element.find('.btn-down'),
        sliderCount: this.element.find('.slider-item').length,
        sliderHeight: 260,
        sliderWrapper: this.element.find('.slider-wrapper'),
        sliderItem: this.element.find('.slider-item'),
      };

      this.vars.btnUp.on('click', function(e) {
        if (e.timeStamp - that.vars.stopClick > that.options.speed) { 
          that.upTo();    
          that.vars.stopClick = e.timeStamp; 
        }
      });

      this.vars.btnDown.on('click', function(e) {
        if (e.timeStamp - that.vars.stopClick > that.options.speed) { 
          that.downTo();    
          that.vars.stopClick = e.timeStamp; 
        }
      });

      if (this.options.dots) {
        this.addDots();       
        var dots = this.element.find('.dots ul li');
        dots.on('click', function(e) {
          that.slideTo($(e.currentTarget).index());
        });
      }

      $(window).on('mousewheel DOMMouseScroll', function (e) {
        var delta = e.originalEvent.wheelDelta ? 
        e.originalEvent.wheelDelta : -e.originalEvent.detail;
        if (delta >= 0) {
          if (e.timeStamp - that.vars.stopClick > that.options.speed) { 
            that.upTo();    
            that.vars.stopClick = e.timeStamp; 
          }
        } 
        else {
          if (e.timeStamp - that.vars.stopClick > that.options.speed) { 
            that.downTo();    
            that.vars.stopClick = e.timeStamp; 
          }
        }
      });

    },

    addDots: function() {
      var str = '<ul>';
      for (var i = 0; i <= this.vars.sliderCount - 1; i++) {
        str += '<li><button></button></li>';
      }
      str += '</ul>';
      $('.dots').append(str);
      $('.dots li').first().addClass('active');
    },

    upTo: function() {
      var up;
      if (this.vars.currentIdx === 0) {
        this.vars.btnUp.disabled = true;
      } 
      else {
        up = this.vars.currentIdx - 1;
        this.slideTo(up);
      }
    },

    downTo: function() {
      var down;
      if (this.vars.currentIdx === this.vars.sliderCount - 1) {
        this.vars.btnDown.disabled = true;
      } 
      else {
        down = this.vars.currentIdx + 1;
        this.slideTo(down);
      }
    },

    slideTo: function(idx) {
      var dots = this.element.find('.dots ul li');
      this.vars.currentIdx = idx;
      dots.removeClass('active').eq(this.vars.currentIdx).addClass('active');
      this.vars.sliderWrapper.animate({ top: -this.vars.sliderHeight * idx }, this.options.speed);
      this.vars.sliderItem.removeClass('slider-active').eq(this.vars.currentIdx).addClass('slider-active');
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
    speed: 500,
    dots: true
  };

  $(function() {
    $('[data-' + pluginName + ']').on('customEvent', function() {
      // to do
    });

    $('[data-' + pluginName + ']')[pluginName]({
      
    });
  });

}(jQuery, window));
