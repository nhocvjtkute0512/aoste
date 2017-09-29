var Site = (function($, window, undefined) {
  'use strict';

  //Select box product filter


  //fix table accordion
  // if ($(window).width() <= 767) {
  //   $('.tetuduki-table').on('click', 'th:not([colspan="4"])', function(evt) {
  //     var tr = $(evt.target).closest('tr');
  //     tr.toggleClass('show');
  //   });
  // }
  // end fix
  var ua = window.navigator.userAgent;

  var isBrowser = {
    Chrome: function() {
      if (ua.toLowerCase().indexOf('chrome') > -1) {
        return true;
      } else {
        return false;
      }
    },
    Firefox: function() {
      if (ua.toLowerCase().indexOf('firefox') > -1) {
        return true;
      } else {
        return false;
      }
    },
    IE: function() {
      if (ua.toLowerCase().indexOf('msie ') > -1 || !!ua.match(/Trident.*rv\:11\./)) {
        return true;
      } else {
        return false;
      }
    },
    Safari: function() {
      if (ua.toLowerCase().indexOf('safari') !== -1 && ua.toLowerCase().indexOf('chrome') == -1) {
        return true;
      } else {
        return false;
      }
    },
    any: function() {
      return (isBrowser.Chrome() || isBrowser.Firefox() || isBrowser.Opera() || isBrowser.IE() || isBrowser.Safari());
    }
  };

  //Anchor dropdown
  $(window).on('load', function() {
    var myUrl = window.location.hash;
    if (myUrl.indexOf('#anchor-') != -1) {
      var myAnchorId = myUrl.slice(8, myUrl.length),
          navHeight;

      if (window.innerWidth < 992) {
        navHeight = $('.navbar').find('.navbar-header').height();
      } else {
        navHeight = $('.navbar').find('.mobile-menu').children('.primary-nav').height();
      }

      // $('html, body').animate({
      //   'scrollTop': $('#' + myAnchorId).offset().top - (navHeight + 10)
      // }, 1000);
      TweenLite.to(window, 1, {scrollTo:{y: '#' + myAnchorId, offsetY: (navHeight + 10)}});
    }
  });

  //FAQ
  function initFaq() {
    var getMenuPosition = function(selector) {
      var top = 0 < $(selector).closest('.content').length ?
        $(selector).closest('.content').offset().top :
        $(selector).offset().top;

      if ($('#header .navbar-header').height() === 0) {
        top -= $('header > .navbar').height();
        // top -= $('.primary-nav:visible').height();
      } else {
        top -= ($('.navbar-header').height() + $('#faq-menu').height());
      }

      return top;
    };

    var faq = $('#faq');
    var faqMenu = $("#faq-menu");
    var faqDropdown = $('#faq-dropdown');

    var contentButton = ($(document).height() - $(".examination-number-area").offset().top) + 40;

    if (!$('body').hasClass('pagemode-edit')) {
      faqMenu
        .css({
          right: (($(window).width() - $('.sitemap .container').width()) / 2 - 13)
        })
        .affix({
          offset: {
            bottom: contentButton,
            top: 50
          }
        });
      faqDropdown
        .fancySelect({
          forceiOS: true
        })
        .on('change.fs', function(evt) {
          $(this).trigger('change.$');
        })
        .on('change', function(evt) {
          var href = $(evt.target).val();

          if (0 < $(href).length) {
            var top = getMenuPosition(href);

            $("html, body")
              .stop()
              .animate({ scrollTop: top }, 1500, 'easeInOutExpo');
          }
        });
      faq
        .on('click', 'a', function(evt) {
          evt.preventDefault();

          var href = $(evt.target).attr('href');
          var top = getMenuPosition(href);

          $("html, body")
            .stop()
            .animate({ scrollTop: top }, 1500, 'easeInOutExpo');
        });
    }

    var headerHeight = $('#header > .navbar').height();

    $(".faq-topic .wp, .faq-topic .qa-caption")
      .waypoint(function(e) {
        var t = $(this)[0].element.id;

        if ('down' === e) {
          $("#faq a").removeClass('active');
          $('#faq a[href="#' + t + '"]').addClass('active');
        } else if ('up' === e) {
          $("#faq a").removeClass('active');
          $('#faq a[href="#' + t + '"]').addClass('active');
        }
      }, {
        offset: headerHeight
      });

    $(window)
      .resize(function() {
        faqMenu.css({
          right: (($(window).width() - $('.sitemap .container').width()) / 2 - 13)
        });
      });

    if (location.hash) {
      setTimeout(function() {
        var top = getMenuPosition(location.hash);

        $("html, body")
          .stop()
          .animate({ scrollTop: top }, 1500, 'easeInOutExpo');
      }, 100);
    }
  };

  if (0 < $("#faq-menu").length) {
    initFaq();
  }

  function fixHeaderFWD() {
    var header = $('.header-fwd'),
        mobileMenu = header.find('.mobile-menu'),
        windowWidth = window.innerWidth;

    if (windowWidth < 985) {
      if (mobileMenu.find('.mobile-only .sidebar-scroll').length === 0) {
        mobileMenu.find('.mobile-only').append('<div class="sidebar-scroll"></div>');
        mobileMenu.find('.mobile-only .primary-nav').appendTo('.mobile-only .sidebar-scroll');
        mobileMenu.find('.mobile-only .top-nav').appendTo('.mobile-only .sidebar-scroll');
      }

      if (mobileMenu.children('.sidebar-scroll').length === 0) {
        mobileMenu.find('.mobile-only').after('<div class="sidebar-scroll"></div>');
        mobileMenu.children('.primary-nav').appendTo(mobileMenu.children('.sidebar-scroll'));
        mobileMenu.children('.top-nav').appendTo(mobileMenu.children('.sidebar-scroll'));
      }

      mobileMenu.find('.top-nav').removeClass('header-collapsed');
    } else {
      mobileMenu.find('.mobile-only .sidebar-scroll .primary-nav').appendTo(mobileMenu.children('.mobile-only'));
      mobileMenu.find('.mobile-only .sidebar-scroll .top-nav').appendTo(mobileMenu.children('.mobile-only'));
      mobileMenu.find('.mobile-only .sidebar-scroll').remove();

      mobileMenu.children('.sidebar-scroll').find('.top-nav').appendTo(mobileMenu);
      mobileMenu.children('.sidebar-scroll').find('.primary-nav').appendTo(mobileMenu);
      mobileMenu.children('.sidebar-scroll').remove();

      mobileMenu.find('.navbar-nav li.open > a').attr('aria-expanded', 'false');
      mobileMenu.find('.navbar-nav li').removeClass('open');

      if (header.find('.navmenu').hasClass('in')) {
        header.find('.navmenu').removeClass('in');

        setTimeout(function(){
          $('body').removeClass('overflow-hidden');
        }, 300);
      }
    }
  }

  function blockScrollHeader() {
    var header = $('.header-fwd');

    header.find('.navbar-toggle-wrap .navbar-toggle').on('click', function() {
      if (!$(this).closest('.navmenu').hasClass('in')) {
        setTimeout(function(){
          $('body').addClass('overflow-hidden');
        }, 300);
      } else {
        setTimeout(function(){
          $('body').removeClass('overflow-hidden');
        }, 300);
      }
    });
  }

  blockScrollHeader();

  if ($('.header-fwd').length > 0) {
    $(window).on('load resize', function() {
      fixHeaderFWD();
    });
  }

  //image-map
  $(document).ready(function() {
    if (0 < $(".image-map-component").length) {
      $('.image-map-component').find('map').imageMapResize();
    }
  });

})(jQuery, window);
