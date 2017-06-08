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
        dot: this.element.find('.dots ul li'),
        btnUp: this.element.find('.btn-up'),
        btnDown: this.element.find('.btn-down'),
        sliderCount: this.element.find('.slider-item').length,
        sliderHeight: 270,
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

      this.vars.dot.on('click', function(e) {
        that.slideTo($(e.currentTarget).index());
      });

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

    upTo: function() {
      var up;
      if (this.vars.currentIdx === 0) {
        up = this.vars.sliderCount - 1;
      } 
      else {
        up = this.vars.currentIdx - 1;
      }
      this.slideTo(up);
    },

    downTo: function() {
      var down;
      if (this.vars.currentIdx === this.vars.sliderCount - 1) {
        down = 0;
      } 
      else {
        down = this.vars.currentIdx + 1;
      }
      this.slideTo(down);
    },

    slideTo: function(idx) {
      this.vars.currentIdx = idx;
      this.vars.dot.removeClass('active').eq(this.vars.currentIdx).addClass('active');
      this.vars.sliderWrapper.animate({ top: -this.vars.sliderHeight * idx }, this.options.speed);
      console.log(idx+1);
/*      $('.slider-item').removeClass('slider-active');
      $('.slider-wrapper div:nth-child(' + (idx + 1) +')').addClass('slider-active');*/
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
    speed: 500
  };

  $(function() {
    $('[data-' + pluginName + ']').on('customEvent', function() {
      // to do
    });

    $('[data-' + pluginName + ']')[pluginName]({
      
    });
  });

}(jQuery, window));
