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

  var pluginName = 'map-control';


  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  function initMap(el, opt) {
    var mapCanvas = el.find('#map');

    if (el.length !== 0) {
      var map = null,
          url = '//maps.googleapis.com/maps/api/js?key=' + opt.mapKey,
          locations = [],
          markers = [];

      var dataLocation = el.find('[data-location]');

      if (dataLocation.length === 0) {
        locations = [{lat: 35.6735408, lng: 139.5703037}];
      } else {
        for (var i = 0; i < dataLocation.length; i++) {
          var lat = dataLocation.eq(i).data('location')[0];
          var lng = dataLocation.eq(i).data('location')[1];

          dataLocation.eq(i).attr('data-index', i);

          locations.push({
            lat: lat,
            lng: lng
          });
        }
      }

      $.getScript(url, function() {
        var callback = function() {
          var styledMapType = new window.google.maps.StyledMapType(
            [
              {
                stylers: [
                  {
                    hue: '#00ffe6'
                  },
                  {
                    saturation: -20
                  }
                ]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [
                  {
                    lightness: 100
                  },
                  {
                    visibility: 'simplified'
                  }
                ]
              },
              {
                featureType: 'road',
                elementType: 'labels',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              }
            ],
            {
              name: 'Styled Map'
            }
          );

          map = new window.google.maps.Map(mapCanvas.get(0), {
            zoom: 10,
            center: {
              lat: locations[0].lat,
              lng: locations[0].lng
            },
            scrollwheel: !1
          });
          map.mapTypes.set('map_style', styledMapType);
          map.setMapTypeId('map_style');

          if (dataLocation.length !== 0) {
            for (var i = 0; i < locations.length; i++) {
              var marker = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(locations[i].lat, locations[i].lng),
                icon: opt.mapMarker,
                map: map
              });

              markers.push(marker);

              window.google.maps.event.addListener(marker, 'click', function (i, marker) {
                var infoWindow = new window.google.maps.InfoWindow();
                infoWindow.close();

                return function() {
                  var text = dataLocation.eq(i).text();

                  if (!$('body').hasClass('pagemode-edit')) {
                    infoWindow.setContent(text);
                    infoWindow.open(map, marker);
                  }
                };
              }(i, marker));

              locations[i].marker = marker;
            }

            if (dataLocation.length > 1) {
              var bounds = new window.google.maps.LatLngBounds();
              for (var j = 0; j < markers.length; j++) {
                bounds.extend(markers[j].getPosition());
              }
              map.fitBounds(bounds);
            }
          }

        };

        callback();
        window.google.maps.event.addDomListener(window, 'load', callback);
        window.google.maps.event.addDomListener(window, 'resize', callback);

        el.find('a.title').on('click', function(evt){
          evt.preventDefault();

          var target = $(this);
          var lat = target.data('location')[0];
          var lng = target.data('location')[1];
          var index = target.data('index');

          map.setCenter(new window.google.maps.LatLng(lat, lng));
          map.setZoom(17);

          if (!$('body').hasClass('pagemode-edit')) {
            window.google.maps.event.trigger(locations[index].marker, 'click');
          }


          (window.innerWidth) < 768 ?
            $('html, body')
                .stop()
                .animate({
                        scrollTop: mapCanvas.offset().top - 49
                    },
                    1500,
                    'easeInOutExpo'
                ) :
            $('html, body')
                .stop()
                .animate({
                        scrollTop: mapCanvas.offset().top - 129
                    },
                    1500,
                    'easeInOutExpo'
                );
        });
      });
    }
  }

  Plugin.prototype = {
    init: function() {
      // initialize
      var el = this.element,
          opt = this.options;

      // add events
      initMap(el, opt);
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
    mapMarker: '../images/pin-pink.png',
    mapKey: 'AIzaSyAT2uZvdmBkyh_mzKmJzuD1xqPLK2Fu8zo'
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
