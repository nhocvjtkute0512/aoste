/**
 *  @name slider
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
 /*
;
(function($, window, undefined) {
	'use strict';

	var pluginName = 'slider';
	var privateVar = null;
	var privateMethod = function(el, options) {

	};

	function Plugin(element, options) {
		this.element = $(element);
		this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
		this.init();
	}

	Plugin.prototype = {
		init: function() {
			var that = this;
			this.vars = {
				currentIdx: 0,
				clickTime: 0,
				prevBtn: this.element.find('.btn-prev'),
				nextBtn: this.element.find('.btn-next'),
				sliderCount: this.element.find('.slider-item').length,
				sliderWidth: this.element.find('.slider-item').width(),
				sliderHeight: this.element.find('.slider-item').height(),
				slider: this.element.find('.slider'),
				sliderContainer: this.element.find('.slider-container'),
				sliderItem: this.element.find('.slider-item'),
				hover: this.element.find('.btn-arrow, .dots, .slider-container')
			};

			this.vars.slider.css({ 
				width: this.vars.sliderWidth, 
				height: this.vars.sliderHeight 
			});

			this.vars.sliderContainer.css({
				width: this.vars.sliderWidth * this.vars.sliderCount,
				marginLeft: -this.vars.sliderWidth
			});

			this.vars.sliderItem.last().prependTo(this.vars.sliderContainer);

			this.vars.sliderItem.children('img').css({
				width: this.vars.slider.width(),
				height: this.vars.slider.height()
			});

			if (this.options.dots) {
				this.addDots();				
				var dots = this.element.find('.dots li');
				dots.on('click', function(e) {
					that.slideTo($(e.currentTarget).index());
				});
			}		

			this.vars.prevBtn.on('click', function(e) {
				if (e.timeStamp - that.vars.clickTime > that.options.speed) {
					if (that.vars.currentIdx == 0 ) {
						that.vars.currentIdx = that.vars.sliderCount - 1;
					}
					else {
						that.vars.currentIdx = that.vars.currentIdx - 1;
					}
					that.prevTo(that.vars.currentIdx, that.options.speed);
					that.vars.clickTime = e.timeStamp; 		
				}
			});

			this.vars.nextBtn.on('click', function(e) {
				if (e.timeStamp - that.vars.clickTime > that.options.speed) {
					if (that.vars.currentIdx == that.vars.sliderCount - 1) {
						that.vars.currentIdx = 0;            
					}
					else {
						that.vars.currentIdx = that.vars.currentIdx + 1;
					}
					that.nextTo(that.vars.currentIdx, that.options.speed);
					that.vars.clickTime = e.timeStamp; 		
				}
			});

			if (this.options.autoPlay) {
				this.playSlider();
				this.vars.hover.on('mouseenter', function() {
					that.stopSlider();
				}).on('mouseleave', function() {
					that.playSlider();
				});
			}
		},

		addDots: function() {
			var str = '';
			for (var i = 1; i <= this.vars.sliderCount; i++) {
				str += '<li><button>' + i +'</button></li>';
			}
			$('.dots').append(str);
			$('.dots li').first().addClass('active');
		},

		prevTo: function(idx, speed) {
			var that = this; 
			var dots = this.element.find('.dots li');
			this.vars.sliderContainer.animate({
				left: this.vars.sliderWidth
			}, speed, function() {
				$(this).children('.slider-item:last-child').prependTo($(this));
				$(this).css('left', '');
			});
			dots.removeClass("active").eq(idx).addClass("active");
		},

		nextTo: function(idx, speed) {
			var that = this;
			var dots = this.element.find('.dots li');
			this.vars.sliderContainer.animate({
				left: -this.vars.sliderWidth
			}, speed, function() {
				$(this).children('.slider-item:first-child').appendTo($(this));
				$(this).css('left', '');
			});
			dots.removeClass("active").eq(idx).addClass("active");	
		},

		slideTo: function(idx) {
			if (this.vars.currentIdx < idx) {
				for (var i = 0; i < idx - this.vars.currentIdx; i++) {
					this.nextTo(idx, this.options.speed/(idx - this.vars.currentIdx));
				}
				this.vars.currentIdx = idx;
			}
			else {
				for (var i = idx - this.vars.currentIdx; i < 0; i++) {
					this.prevTo(idx, this.options.speed/-(idx - this.vars.currentIdx));
				}
				this.vars.currentIdx = idx; 
			}
		},

		playSlider: function() {
			var that = this;
			this.vars.play = setInterval(function() {
				if (that.vars.currentIdx == that.vars.sliderCount - 1) {
					that.vars.currentIdx = 0;            
				}
				else {
					that.vars.currentIdx = that.vars.currentIdx + 1;
				}
				that.nextTo(that.vars.currentIdx, that.options.speed);
			}, that.options.duration);
		},

		stopSlider: function() {
			clearInterval(this.vars.play);
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
			dots: true,
			autoPlay: false,
			speed: 200,
			duration: 3000,
	};

	$(function() {
		$('[data-' + pluginName + ']').on('customEvent', function() {
			
		});

		$('[data-' + pluginName + ']')[pluginName]({

		});
	});

}(jQuery, window));
*/