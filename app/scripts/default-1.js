function initScroller() {
    $(window)
        .scroll(function () {
            $('.carousel-wrap.animated')
                .not(".csr-carousel-2")
                .find(".combined")
                .parents(".carousel")
                .not(".owl-carousel")
                .find(".wow:first")
                .addClass("fadeInLeft");

            $(".carousel-wrap.animated ")
                .not(".csr-carousel-2")
                .find(".combined")
                .parents(".carousel")
                .not(".owl-carousel")
                .find(".wow:last")
                .addClass("fadeInRight");

            $(".csr-carousel-2.animated .combined")
                .parents(".carousel")
                .not(".owl-carousel")
                .find(".wow:first")
                .addClass("fadeInRight");

            $(".csr-carousel-2.animated .combined")
                .parents(".carousel")
                .not(".owl-carousel")
                .find(".wow:last")
                .addClass("fadeInLeft");

            $(".carousel-wrap.animated ")
                .not(".csr-carousel-2")
                .find(".active .combined")
                .find(".wow:first")
                .addClass("fadeInLeft");

            $(".carousel-wrap.animated ")
                .not(".csr-carousel-2")
                .find(".active .combined")
                .find(".wow:last")
                .addClass("fadeInRight");

            $(".csr-carousel-2.animated .active .combined")
                .find(".wow:first")
                .addClass("fadeInRight");

            $(".csr-carousel-2.animated .active .combined")
                .find(".wow:last")
                .addClass("fadeInLeft");
        });
}

function initTrigger() {
    $('body')
        .on('click', '[data-trigger="pic-modal"]', function (evt) {
            evt.preventDefault();

            var target = evt.target;
            var source = null;

            if (target.dataset['src'] !== undefined) {
                source = target.dataset['src'];
            } else if (target.src !== undefined) {
                source = target.src;
            } else if (target.href !== undefined) {
                source = target.href;
            }

            if (source !== null) {
                $('#pic').attr('src', source);
                $('#pic-modal').modal('show');
            }
        })
        .on('click', '[data-trigger="anchor"]', function (evt) {
            evt.preventDefault();

            var href = $(evt.target).attr('href');
            var headerHeight = $('#header > .navbar').height();
            var top = $(href).offset().top;

            $('html, body')
                .stop()
                .animate(
                    {scrollTop: top - headerHeight},
                    1500,
                    'easeInOutExpo'
                );
        });
}

function initBgLoaded() {
    $.fn.bgLoaded = function (d) {
        var t = this,
            e = {
                afterLoaded: function () {
                    this.addClass("bg-loaded")
                }
            },
            o = $.extend({}, e, d);

        t.each(function () {
            var d = $(this),
                t = d.css("background-image").split(", ");
            d.data("loaded-count", 0);
            $.each(t, function (e, n) {
                var c = n.replace(/^url\(["']?/, "").replace(/["']?\)$/, "");

                $("<img/>")
                    .attr("src", c)
                    .load(function () {
                        $(this).remove();
                        d.data("loaded-count", d.data("loaded-count") + 1);
                        d.data("loaded-count") >= t.length && o.afterLoaded.call(d);
                    });
            })
        });
    };
}

function initImgBg() {
    var n = function () {
        var e,
            t,
            a,
            o;
        return o = window.navigator.userAgent,
            (t = o.indexOf("MSIE ")) > 0
                ? parseInt(o.substring(t + 5, o.indexOf(".", t)), 10)
                : o.indexOf("Trident/") > 0
                ? (a = o.indexOf("rv:"), parseInt(o.substring(a + 3, o.indexOf(".", a)), 10))
                : (e = o.indexOf("Edge/")) > 0 && parseInt(
                o.substring(e + 5, o.indexOf(".", e)),
                10
                )
    };

    if (navigator.userAgent.indexOf("Safari") > -1 && -1 === navigator.userAgent.indexOf("Chrome") && $("img.img-bg").length) {
        for (var h = 0; h < $("img.img-bg").length;) {
            var m = $("img.img-bg")
                .eq(h)
                .attr("src");
            $("img.img-bg")
                .eq(h)
                .css("background-image", "url(" + m + ")")
                .removeAttr("src");
            h++;
        }
    }

    if (!1 !== n() && $("img.img-bg").length) {
        for (h = 0; h < $("img.img-bg").length;) {
            m = $("img.img-bg")
                .eq(h)
                .attr("src");

            $("img.img-bg")
                .eq(h)
                .css("background-image", "url(" + m + ")")
                .removeAttr("src");

            h++;
        }
    }
}

$(function () {
    initBgLoaded();

    var mobile_device = false;
    var tablet_device = false;
    var touch_device = false;

    if (navigator.userAgent.match(/Phone/i) || navigator.userAgent.match(/DROID/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/) || navigator.userAgent.match(/Windows Phone/i) || navigator.userAgent.match(/ZuneWP7/i) || navigator.userAgent.match(/IEMobile/i)) {
        mobile_device = true;
        touch_device = true;
    }

    if (navigator.userAgent.match(/Tablet/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Kindle/i) || navigator.userAgent.match(/Playbook/i) || navigator.userAgent.match(/Nexus/i) || navigator.userAgent.match(/Xoom/i) || navigator.userAgent.match(/SM-N900T/i) || navigator.userAgent.match(/GT-N7100/i) || navigator.userAgent.match(/SAMSUNG-SGH-I717/i) || navigator.userAgent.match(/SM-T330NU/i)) {
        tablet_device = true;
        touch_device = true;
    }

    if (!(mobile_device || tablet_device)) {
        $(".carousel").addClass("enable-hover-event");
        $(".navmenu").addClass("desktop");
    }

    //Fix bug back-to-top button
    //var topLinkBlockRight = (($(window).width() - $('header ~ .container').width()) / 2 - 13);
    var topLinkBlockRight = (($(window).width() - $('.sitemap .container').width()) / 2 - 13);

    $("#top-link-block")
        .css({
            right: topLinkBlockRight
        });

    if ($(window).height() + 300 < $(document).height()) {
        $("#top-link-block")
            .removeClass("hidden")
            .affix({
                offset: {
                    top: 300
                }
            });
    }

    $(".primary-nav .navbar-right li > .dropdown-toggle")
        .attr({"data-toggle": "dropdown"});

    // カレントのメニューの動作をキャンセル。
    $(".navbar-nav.left.business .business a, .navbar-nav.left.individual .individual a")
        .on('click', function (evt) {
            evt.preventDefault();
        });

    $('.primary-nav a[data-toggle="tab"]')
        .on('click', function (evt) {
            window.location.href = $(evt.target)
                .closest('a')
                .attr('href');
        });

    $(".primary-nav .navbar-right li > .dropdown-toggle span")
        .on('click', function () {
            window.location.href = $(this)
                .parent()
                .attr('href')
        });

    $(".mobile-only .navbar-nav.left.mobile li a")
        .on('click', function (evt) {
            evt.preventDefault();

            if ($(".mobile-only").is(":visible")) {
                if ($(".mobile-menu").hasClass("current-individual")) {
                    if ($(this).closest("li").hasClass("individual")) {
                        evt.preventDefault();
                    } else if ($(this).closest("li").hasClass("business")) {
                        $(".mobile-menu")
                            .removeClass("current-individual")
                            .addClass("current-business");
                    }
                } else if ($(".mobile-menu").hasClass("current-business")) {
                    if ($(this).closest("li").hasClass("business")) {
                        evt.preventDefault();
                    } else if ($(this).closest("li").hasClass("individual")) {
                        $(".mobile-menu")
                            .removeClass("current-business")
                            .addClass("current-individual");
                    }
                }
            }
        });

    // アラートの有無によって位置を調整。
    if ($('header .alert').length) {
        $('header .alert')
            .on('close.bs.alert', function () {
                setTimeout(function () {
                    $('body')
                        .css({
                            'margin-top': $('#header .navbar').height()
                        });
                }, 10);
            });

        $(window).on('load resize', function() {
          window.setTimeout(function () {
            if (window.innerWidth < 985) {
              var headerHeight = $('#header .alert').outerHeight() + $('#header .navbar-header').height();
            } else {
              var headerHeight = $('#header .navbar').height();
            }

            $('body').css({
                'margin-top': headerHeight
            });
          }, 300);
        });
    } else {
        //$('body').css({'margin-top': 50});
        $('.primary-nav .navbar-right li > .dropdown-toggle')
            .attr({'data-toggle': 'dropdown'});
        $('.primary-nav .navbar-right li > .dropdown-toggle span')
            .on('click', function () {
                window.location.href = $(this)
                    .parent()
                    .attr('href');
            });
    }

    // footer dropdown.
    $(".fancy-select-box")
        .fancySelect({
          forceiOS: true
        });

    var wow = new WOW({
        mobile: !1
    });
    wow.init();

    var gridElement = document.querySelector('.grid');
    if (gridElement !== null) {
        var msnry = new Masonry(gridElement, {
            columnWidth: '.grid-sizer',
            itemSelector: '.grid-item',
            percentPosition: true
        });
    }

    var a = 0;
    var s = $(".carousel.single-carousel")
        .parent()
        .not(".heroimage");

    var singleAutoPlay = true;
    var multiMouseDrag = true;
    var loopCarousel = true;

    if ($('body').hasClass('pagemode-edit')) {
        singleAutoPlay = false;
        multiMouseDrag = false;
        loopCarousel = false;
    }


    $(".carousel.single-carousel")
        .each(function () {
            if ($(this).find(".carousel-item").length > 1) {
                $(this).attr("id", "carousel-" + a);

                $("#carousel-" + a)
                    .owlCarousel({
                        responsive: {
                            0: {
                                dots: true,
                                items: 1,
                                nav: !0,
                                navText: !1,
                                lazyLoad: true,
                                loop: loopCarousel,
                                autoplay: !0,
                                autoplayTimeout: 3e3,
                                autoplaySpeed: 1500,
                                navSpeed: 1500,
                                dotsSpeed: 1500,
                                dragEndSpeed: 1500,
                                mouseDrag: multiMouseDrag,
                                onInitialized: function () {
                                    if (0 < $(".jumbotron .img-bg").length) {
                                        $(".jumbotron .img-bg")
                                            .bgLoaded({
                                                afterLoaded: function () {
                                                    $(".carousel.single-carousel")
                                                        .prev()
                                                        .remove();
                                                }
                                            });
                                    } else {
                                        r = ($(window).width() - $(".container").width()) / 2 - 13;

                                        $(".carousel-item")
                                            .fadeIn();
                                        s.find(".carousel.single-carousel")
                                            .trigger("stop.owl.autoplay");
                                        $(".owl-item > .carousel-item")
                                            .css({
                                                opacity: "100"
                                            });
                                    }
                                },
                                onTranslated: function () {
                                    s.find(".carousel.single-carousel").trigger("stop.owl.autoplay")
                                },
                                onResized: function () {
                                    s.find(".carousel.single-carousel").trigger("stop.owl.autoplay")
                                },
                                autoHeight: !0
                            },
                            768: {
                                dots: true,
                                items: 1,
                                nav: !0,
                                navText: !1,
                                lazyLoad: true,
                                loop: loopCarousel,
                                autoplay: singleAutoPlay,
                                autoplayTimeout: 3e3,
                                autoplaySpeed: 1500,
                                navSpeed: 1500,
                                dotsSpeed: 1500,
                                dragEndSpeed: 1500,
                                mouseDrag: multiMouseDrag,
                                onInitialized: function () {
                                    if ($(".jumbotron .img-bg").length) {
                                        $(".jumbotron .img-bg")
                                            .bgLoaded({
                                                afterLoaded: function () {
                                                    $(".carousel.single-carousel")
                                                        .prev()
                                                        .remove();
                                                }
                                            });
                                    } else {
                                        r = ($(window).width() - $(".container").width()) / 2 - 13;

                                        $(".carousel.single-carousel")
                                            .prev()
                                            .remove();
                                        $(".carousel-item")
                                            .fadeIn();

                                        s.find(".carousel.single-carousel")
                                            .trigger("stop.owl.autoplay");

                                        $(".owl-item > .carousel-item")
                                            .css({
                                                opacity: "100"
                                            });
                                    }
                                },
                                onTranslated: function () {
                                    s.find(".carousel.single-carousel").trigger("stop.owl.autoplay")
                                },
                                onResized: function () {
                                    s.find(".carousel.single-carousel").trigger("stop.owl.autoplay")
                                },
                                autoHeight: !1
                            }
                        }
                    });
            } else {
                $(this)
                    .show()
                    .prev()
                    .remove();
                $(this)
                    .find(".carousel-item")
                    .css({
                        opacity: "100"
                    });
            }

            a++;
        });

    $(".carousel.multi-carousel-3")
        .owlCarousel({
            responsive: {
                0: {
                    dots: !1,
                    dragEndSpeed: 1500,
                    items: 1,
                    lazyLoad: !0,
                    loop: loopCarousel,
                    mouseDrag: !1,
                    nav: !0,
                    navRewind: !0,
                    navSpeed: 1500,
                    navText: !1,
                    onInitialized: function () {
                        $(".carousel-item").fadeIn();
                        $(".carousel.multi-carousel-3")
                            .prev()
                            .remove();
                    }
                },
                768: {
                    dots: !1,
                    dragEndSpeed: 1500,
                    items: 2,
                    lazyLoad: !0,
                    loop: loopCarousel,
                    mouseDrag: !1,
                    nav: !0,
                    navRewind: !0,
                    navSpeed: 1500,
                    navText: !1,
                    onInitialized: function () {
                        $(".carousel-item").fadeIn();
                        $(".carousel.multi-carousel-3")
                            .prev()
                            .remove();
                    }
                },
                992: {
                    dots: !1,
                    dragEndSpeed: 1500,
                    items: 3,
                    lazyLoad: !0,
                    loop: !1,
                    mouseDrag: !1,
                    nav: true,
                    navRewind: !0,
                    navSpeed: 1500,
                    navText: !1,
                    controlsClass: "owl-controls",
                    onInitialized: function () {
                        $(".carousel-item").fadeIn();
                        $(".carousel.multi-carousel-3")
                            .prev()
                            .remove();
                    }
                }
            }
        });

    //Fix width carousel
    // $(".carousel").css({width: $(window).width()});

    if (0 < $(".carousel.multi-carousel").length) {
        $(".carousel.multi-carousel")
            .owlCarousel({
                responsive: {
                    0: {
                        dots: false,
                        items: 2,
                        nav: !0,
                        navRewind: !1,
                        navText: !1,
                        mouseDrag: multiMouseDrag,
                        onInitialized: function () {
                            $(".carousel-item").fadeIn(),
                                $(".carousel")
                                    .prev()
                                    .remove()
                        }
                    },
                    768: {
                        dots: false,
                        items: 4,
                        navRewind: !1,
                        navText: !1,
                        mouseDrag: multiMouseDrag,
                        onInitialized: function () {
                            $(".carousel-item").fadeIn(),
                                $(".carousel")
                                    .prev()
                                    .remove()
                        },
                        touchDrag: !1
                    }
                }
            });
    }

    //Fix bug https://drf.backlog.jp/view/FWD-1390
    $(window).on('resize', function() {
      if (window.innerWidth < 992) {
        $('.heroimage.home .carousel')
          .find('.owl-next')
          .css({
              right: 20
          })
          .end()
          .find('.owl-prev')
          .css({
              left: 20
          });
      }
    });
    if ('block' === $('.navbar-toggle').css('display')) {
      $('.heroimage.home .carousel')
          .find('.owl-next')
          .css({
              right: 20
          })
          .end()
          .find('.owl-prev')
          .css({
              left: 20
          });
    } else {
        $(".dropdown-menu-nav > li a")
            .on('mouseenter', function (evt) {
                $(this).tab('show');

                $(".drop-down-menu-tab")
                    .css({
                        height: 'auto'
                    });

                if ($('.drop-down-menu-tab .tab-pane').hasClass('active')) {
                    $('.drop-down-menu-tab .tab-pane.active')
                        .removeClass('fadeIn animated')
                        .addClass('fadeIn animated')
                        .one(
                            'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                            function () {
                                $(this).removeClass('fadeIn animated');
                            }
                        );
                }
            });
        $(".dropdown-menu")
            .on('mouseenter', function (evt) {
                $(this)
                    .prev()
                    .addClass('active')
            })
            .on('mouseleave', function (evt) {
                $(this)
                    .prev()
                    .removeClass('active')
            });

        // var i = (($(window).width() - $('header ~ .container').width()) / 2 - 13);
        var i = (($(window).width() - $('.sitemap .container').width()) / 2 - 13);

        $(".heroimage.home .carousel .owl-next")
            .css({
                right: i + 42
            });
        $(".heroimage.home .carousel .owl-prev")
            .css({
                left: i + 42
            });
    }

    // スクロール時の処理
    // fix bug header on edit-mode
    if (!$('body').hasClass('pagemode-edit')) {
      var $hScroll = $('#header');
      var lScrollTop = $(window).scrollTop();
      var $target_individual = $('.top-nav-individual')
        .removeClass('header-collapsed');
      var $target_business = $('.top-nav-business')
        .removeClass('header-collapsed');

    }
    if ($('body').hasClass('pagemode-edit') ) {
      $(".carousel.single-carousel").trigger("stop.owl.autoplay");
    }

    // スクロールイベントの処理状態を保持します。
    var isProcessScroll = true;

    if (!$('body').hasClass('disableHash')) {
        var headerHeight = Math.max($('#header .navbar').height(), $('#header .navbar .navbar-header').height());
        var anchorScroll = function () {
            var target = $(location.hash);
            var y = 0;

            if (0 < $('.tokuyaku-list').length) {
                y = target.closest('.heading').offset().top;
            } else {
                y = target.offset().top;
            }

            y = y - headerHeight;

            window.scrollTo(0, y);
        };

        $(window)
            .on('hashchange', function (evt) {
                anchorScroll();
            });

        if (location.hash) {
            isProcessScroll = false;

            setTimeout(function () {
                // この時点で一度移動しているので再度 false に。
                isProcessScroll = false;

                anchorScroll();
            }, 500);
        }
    }

if (!$('body').hasClass('pagemode-edit')) {
    $(window)
        .on('resize', function (evt) {

            //fix bug back-to-top button
            // var i = ($(window).width() - $('header ~ .container').width()) / 2 - 13;
            var i = ($(window).width() - $('.sitemap .container').width()) / 2 - 13;

            $("#top-link-block").css({right: i});

            $(".carousel")
                .css({
                    width: $(window).width()
                });
        })
        .on('scroll', function (event) {
            if (isProcessScroll) {
                var toggle = $('.navbar-toggle:visible').length;

                if (toggle < 1) {
                    var st = $(this).scrollTop();

                    if (st < lScrollTop || st === 0) {
                      if ($hScroll.hasClass('header-collapsed'))
                        $hScroll.removeClass('header-collapsed');
                      $target_individual.removeClass('header-collapsed');
                      $target_business.removeClass('header-collapsed');
                    } else {
                      if (!$hScroll.hasClass('header-collapsed'))
                        $hScroll.addClass('header-collapsed');
                      $target_individual.addClass('header-collapsed');
                      $target_business.addClass('header-collapsed');
                    }

                    lScrollTop = st;
                }
            } else {
                isProcessScroll = true;
            }
        });
        }

    initImgBg();
    initTrigger();
    initScroller();
});

$(function () {
    $('body')
        .on('click', 'a', function (evt) {
            var a = $(evt.target).closest('a');
            var href = a.attr('href');

            if (href) {
                var host = a.get(0).host;

                if (host !== location.host) {
                    if (/http(s?):\/\/direct.fwdfujilife.co.jp\//.test(href)) {
                        evt.preventDefault();

                        window.open(href, 'fwd_direct');
                    } else if (/http(s?):\/\/customer.fwdfujilife.co.jp\//.test(href)) {
                        a.attr('target', '');
                        //evt.preventDefault();

                        //window.open(href, 'fwd_customer');
                    }
                } else {
                    if (/http(s?):\/\/direct.fwdfujilife.co.jp\//.test(href)) {
                        a.attr('target', '');
                    } else if (/http(s?):\/\/customer.fwdfujilife.co.jp\//.test(href)) {
                        a.attr('target', '');
                    }
                }
            }
        });
});
