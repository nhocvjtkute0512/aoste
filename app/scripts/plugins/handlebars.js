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
;(function($, window, Handlebars) {
  'use strict';

  var pluginName = 'handlebars';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      // initialize
      // add events

      var flag = false;

      var block = $(this.element),
          template = block.data('template'),
          data = block.data('ajax'),
          link = block.find('.load-more');

      link.on('click', function(e){
        var that = $(this);
        var total = block.attr('datatotal'),
            id = block.attr('dataid');

        e.preventDefault();

        if (!flag) {
          flag = true;

          $.when(
            $.ajax({
              url: data,
              type: 'post',
              dataType: 'json',
              data: {datatotal: total, dataid: id},
              cache: false
            }),
            $.ajax({
              url: template,
              dataType: 'text',
              cache: false
            }))
            .done(function(jsonData, templateData) {
              var template = Handlebars.compile(templateData[0]);

              // block.prepend(template(jsonData[0])).fadeIn();
              $(template(jsonData[0])).insertBefore(block).fadeIn();

              if(jsonData[0].data.lastRecord) {
                that.hide();
              } else {
                that.show();
              }

              if(jsonData[0].data.total) {
                block.attr('datatotal', jsonData[0].data.total);
                // block.data('total', jsonData[0].data.total);
              }

              if(jsonData[0].data.id) {
                block.attr('dataid', jsonData[0].data.id);
                // block.data('id', jsonData[0].data.id);
              }

              flag = false;
            })
            .fail(function() {
              block.fadeOut();
            });
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

  $.fn[pluginName].defaults = {};

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window, window.Handlebars));
