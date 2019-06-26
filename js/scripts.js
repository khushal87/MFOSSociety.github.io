document.querySelectorAll('a[href^="#"]').forEach(function(b) {
    b.addEventListener("click", function(b) {
        b.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        })
    })
});
var mr_firstSectionHeight, mr_nav, mr_fixedAt, mr_navOuterHeight, mr_navScrolled = !1,
    mr_navFixed = !1,
    mr_outOfSight = !1,
    mr_floatingProjectSections, mr_scrollTop = 0;
$(document).ready(function() {
    function b(a) {
        var c, b;
        $(a).find('.validate-required[type="checkbox"]').each(function() {
            $('[name="' + $(this).attr("name") + '"]:checked').length || (b = 1, c = $(this).attr("name").replace("[]", ""), a.find(".form-error").text("Please tick at least one " + c + " box."))
        });
        $(a).find(".validate-required").each(function() {
            "" === $(this).val() ? ($(this).addClass("field-error"), b = 1) : $(this).removeClass("field-error")
        });
        $(a).find(".validate-email").each(function() {
            /(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()) ?
                $(this).removeClass("field-error") : ($(this).addClass("field-error"), b = 1)
        });
        a.find(".field-error").length || a.find(".form-error").fadeOut(1E3);
        return b
    }

    function e(a) {
        return decodeURIComponent(((new RegExp("[?|&]" + a + "=([^&;]+?)(&|#|;|$)")).exec(location.search) || [, ""])[1].replace(/\+/g, "%20")) || null
    }
    var d = $("a.inner-link");
    d.length && (d.each(function() {
        var a = $(this);
        "#" !== a.attr("href").charAt(0) && a.removeClass("inner-link")
    }), d = 0, $("body[data-smooth-scroll-offset]").length && (d = $("body").attr("data-smooth-scroll-offset"),
        d *= 1), smoothScroll.init({
        selector: ".inner-link",
        selectorHeader: null,
        speed: 750,
        easing: "easeInOutCubic",
        offset: d
    }));
    addEventListener("scroll", function() {
        mr_scrollTop = window.pageYOffset
    }, !1);
    $(".background-image-holder").each(function() {
        var a = $(this).children("img").attr("src");
        $(this).css("background", 'url("' + a + '")');
        $(this).children("img").hide();
        $(this).css("background-position", "initial")
    });
    setTimeout(function() {
        $(".background-image-holder").each(function() {
            $(this).addClass("fadeIn")
        })
    }, 200);
    $('[data-toggle="tooltip"]').tooltip();
    $("ul[data-bullet]").each(function() {
        var a = $(this).attr("data-bullet");
        $(this).find("li").prepend('<i class="' + a + '"></i>')
    });
    $(".progress-bar").each(function() {
        $(this).css("width", $(this).attr("data-progress") + "%")
    });
    768 < $(window).width() && $(".parallax:nth-of-type(1) .background-image-holder").css("top", -$("nav").outerHeight(!0));
    768 < $(window).width() && $("section.fullscreen:nth-of-type(1)").css("height", $(window).height() - $("nav").outerHeight(!0));
    $("nav").hasClass("bg-dark") && $(".nav-container").addClass("bg-dark");
    mr_nav = $("body .nav-container nav:first");
    mr_navOuterHeight = $("body .nav-container nav:first").outerHeight();
    mr_fixedAt = "undefined" !== typeof mr_nav.attr("data-fixed-at") ? parseInt(mr_nav.attr("data-fixed-at").replace("px", "")) : parseInt($("section:nth-of-type(1)").outerHeight());
    $(".menu > li > ul").each(function() {
        var a = $(this).offset(),
            c = a.left + $(this).outerWidth(!0);
        c > $(window).width() && !$(this).hasClass("mega-menu") ? $(this).addClass("make-right") : c > $(window).width() && $(this).hasClass("mega-menu") &&
            (a = $(window).width() - a.left, a = $(this).outerWidth(!0) - a, $(this).css("margin-left", -a))
    });
    $(".mobile-toggle").click(function() {
        $(".nav-bar").toggleClass("nav-open");
        $(this).toggleClass("active")
    });
    $(".menu li").click(function(a) {
        a || (a = window.event);
        a.stopPropagation();
        $(this).find("ul").length ? $(this).toggleClass("toggle-sub") : $(this).parents(".toggle-sub").removeClass("toggle-sub")
    });
    $(".menu li a").click(function() {
        $(this).hasClass("inner-link") && $(this).closest(".nav-bar").removeClass("nav-open")
    });
    $(".module.widget-handle").click(function() {
        $(this).toggleClass("toggle-widget-handle")
    });
    $(".search-widget-handle .search-form input").click(function(a) {
        a || (a = window.event);
        a.stopPropagation()
    });
    $(".offscreen-toggle").length ? $("body").addClass("has-offscreen-nav") : $("body").removeClass("has-offscreen-nav");
    $(".offscreen-toggle").click(function() {
        $(".main-container").toggleClass("reveal-nav");
        $("nav").toggleClass("reveal-nav");
        $(".offscreen-container").toggleClass("reveal-nav")
    });
    $(".main-container").click(function() {
        $(this).hasClass("reveal-nav") &&
            ($(this).removeClass("reveal-nav"), $(".offscreen-container").removeClass("reveal-nav"), $("nav").removeClass("reveal-nav"))
    });
    $(".offscreen-container a").click(function() {
        $(".offscreen-container").removeClass("reveal-nav");
        $(".main-container").removeClass("reveal-nav");
        $("nav").removeClass("reveal-nav")
    });
    $(".projects").each(function() {
        var a = "";
        $(this).find(".project").each(function() {
            $(this).attr("data-filter").split(",").forEach(function(c) {
                -1 == a.indexOf(c) && (a += '<li data-filter="' + c + '">' + capitaliseFirstLetter(c) +
                    "</li>")
            });
            $(this).closest(".projects").find("ul.filters").empty().append('<li data-filter="all" class="active">All</li>').append(a)
        })
    });
    $(".filters li").click(function() {
        var a = $(this).attr("data-filter");
        $(this).closest(".filters").find("li").removeClass("active");
        $(this).addClass("active");
        $(this).closest(".projects").find(".project").each(function() {
            -1 == $(this).attr("data-filter").indexOf(a) ? $(this).addClass("inactive") : $(this).removeClass("inactive")
        });
        "all" == a && $(this).closest(".projects").find(".project").removeClass("inactive")
    });
    $(".tweets-feed").each(function(a) {
        jQuery(this).attr("id", "tweets-" + a)
    }).each(function(a) {
        var c = $("#tweets-" + a),
            b = {
                domId: "",
                maxTweets: c.attr("data-amount"),
                enableLinks: !0,
                showUser: !0,
                showTime: !0,
                dateFunction: "",
                showRetweet: !1,
                customCallback: function(c) {
                    for (var b = c.length, d = 0, e = document.getElementById("tweets-" + a), h = '<ul class="slides">'; d < b;) h += "<li>" + c[d] + "</li>", d++;
                    h += "</ul>";
                    e.innerHTML = h;
                    $(".tweets-slider").length && $(".tweets-slider").flexslider({
                        directionNav: !1,
                        controlNav: !1
                    });
                    return h
                }
            };
        "undefined" !==
        typeof c.attr("data-widget-id") ? b.id = c.attr("data-widget-id") : "undefined" !== typeof c.attr("data-feed-name") && "" !== c.attr("data-feed-name") ? b.profile = {
            screenName: c.attr("data-feed-name").replace("@", "")
        } : b.profile = {
            screenName: "twitter"
        };
        twitterFetcher.fetch(b)
    });
    $(".instafeed").length && (jQuery.fn.spectragram.accessData = {
        accessToken: "1406933036.dc95b96.2ed56eddc62f41cbb22c1573d58625a2",
        clientID: "87e6d2b8a0ef4c7ab8bc45e80ddd0c6a"
    }, $(".instafeed").each(function() {
        var a = $(this).attr("data-user-name");
        $(this).children("ul").spectragram("getUserFeed", {
            query: a,
            max: 12
        })
    }));
    $(".flickr-feed").length && $(".flickr-feed").each(function() {
        var a = $(this).attr("data-user-id"),
            c = $(this).attr("data-album-id");
        $(this).flickrPhotoStream({
            id: a,
            setId: c,
            container: '<li class="masonry-item" />'
        });
        setTimeout(function() {
            initializeMasonry();
            window.dispatchEvent(new Event("resize"))
        }, 1E3)
    });
    $(".slider-all-controls, .slider-paging-controls, .slider-arrow-controls, .slider-thumb-controls, .logo-carousel").length && ($(".slider-all-controls").flexslider({
        start: function(a) {
            a.find(".slides li:first-child").find(".fs-vid-background video").length &&
                a.find(".slides li:first-child").find(".fs-vid-background video").get(0).play()
        },
        after: function(a) {
            a.find(".fs-vid-background video").length && (a.find("li:not(.flex-active-slide)").find(".fs-vid-background video").length && a.find("li:not(.flex-active-slide)").find(".fs-vid-background video").get(0).pause(), a.find(".flex-active-slide").find(".fs-vid-background video").length && a.find(".flex-active-slide").find(".fs-vid-background video").get(0).play())
        }
    }), $(".slider-paging-controls").flexslider({
        animation: "slide",
        directionNav: !1
    }), $(".slider-arrow-controls").flexslider({
        controlNav: !1
    }), $(".slider-thumb-controls .slides li").each(function() {
        var a = $(this).find("img").attr("src");
        $(this).attr("data-thumb", a)
    }), $(".slider-thumb-controls").flexslider({
        animation: "slide",
        controlNav: "thumbnails",
        directionNav: !0
    }), $(".logo-carousel").flexslider({
        minItems: 1,
        maxItems: 4,
        move: 1,
        itemWidth: 200,
        itemMargin: 0,
        animation: "slide",
        slideshow: !0,
        slideshowSpeed: 3E3,
        directionNav: !1,
        controlNav: !1
    }));
    $(".lightbox-grid li a").each(function() {
        var a =
            $(this).closest(".lightbox-grid").attr("data-gallery-title");
        $(this).attr("data-lightbox", a)
    });
    $("iframe[data-provider]").each(function() {
        var a = jQuery(this).attr("data-provider"),
            c = jQuery(this).attr("data-video-id"),
            b = jQuery(this).attr("data-autoplay");
        "vimeo" == a ? (a = "http://player.vimeo.com/video/" + c + "?badge=0&title=0&byline=0&title=0&autoplay=" + b, $(this).attr("data-src", a)) : "youtube" == a ? (a = "https://www.youtube.com/embed/" + c + "?showinfo=0&autoplay=" + b, $(this).attr("data-src", a)) : console.log("Only Vimeo and Youtube videos are supported at this time")
    });
    jQuery(".foundry_modal[modal-link]").remove();
    $(".foundry_modal").length && !jQuery(".modal-screen").length && jQuery("<div />").addClass("modal-screen").appendTo("body");
    jQuery(".foundry_modal").click(function() {
        jQuery(this).addClass("modal-acknowledged")
    });
    jQuery(document).on("wheel mousewheel scroll", ".foundry_modal, .modal-screen", function(a) {
        $(this).get(0).scrollTop += a.originalEvent.deltaY;
        return !1
    });
    $(".modal-container:not([modal-link])").each(function(a) {
        if (jQuery(this).find("iframe[src]").length) {
            jQuery(this).find(".foundry_modal").addClass("iframe-modal");
            var c = jQuery(this).find("iframe");
            c.attr("data-src", c.attr("src"));
            c.attr("src", "")
        }
        jQuery(this).find(".btn-modal").attr("modal-link", a);
        jQuery('.foundry_modal[modal-link="' + a + '"]').length || jQuery(this).find(".foundry_modal").clone().appendTo("body").attr("modal-link", a).prepend(jQuery('<i class="ti-close close-modal">'))
    });
    $(".btn-modal").unbind("click").click(function() {
        var a = jQuery('.foundry_modal[modal-link="' + jQuery(this).attr("modal-link") + '"]'),
            c = "";
        jQuery(".modal-screen").toggleClass("reveal-modal");
        a.find("iframe").length && ("1" === a.find("iframe").attr("data-autoplay") && (c = "&autoplay=1"), a.find("iframe").attr("src", a.find("iframe").attr("data-src") + c));
        a.find("video").length && a.find("video").get(0).play();
        a.toggleClass("reveal-modal");
        return !1
    });
    $(".foundry_modal[data-time-delay]").each(function() {
        var a = $(this),
            c = a.attr("data-time-delay");
        a.prepend($('<i class="ti-close close-modal">'));
        "undefined" != typeof a.attr("data-cookie") ? mr_cookies.hasItem(a.attr("data-cookie")) || setTimeout(function() {
            a.addClass("reveal-modal");
            $(".modal-screen").addClass("reveal-modal")
        }, c) : setTimeout(function() {
            a.addClass("reveal-modal");
            $(".modal-screen").addClass("reveal-modal")
        }, c)
    });
    $(".foundry_modal[data-show-on-exit]").each(function() {
        var a = $(this),
            c = $(a.attr("data-show-on-exit"));
        $(c).length && (a.prepend($('<i class="ti-close close-modal">')), $(document).on("mouseleave", c, function() {
            $("body .reveal-modal").length || ("undefined" !== typeof a.attr("data-cookie") ? mr_cookies.hasItem(a.attr("data-cookie")) || (a.addClass("reveal-modal"), $(".modal-screen").addClass("reveal-modal")) :
                (a.addClass("reveal-modal"), $(".modal-screen").addClass("reveal-modal")))
        }))
    });
    $(".foundry_modal[data-hide-after]").each(function() {
        var a = $(this),
            c = a.attr("data-hide-after");
        "undefined" != typeof a.attr("data-cookie") ? mr_cookies.hasItem(a.attr("data-cookie")) || setTimeout(function() {
            a.hasClass("modal-acknowledged") || (a.removeClass("reveal-modal"), $(".modal-screen").removeClass("reveal-modal"))
        }, c) : setTimeout(function() {
                a.hasClass("modal-acknowledged") || (a.removeClass("reveal-modal"), $(".modal-screen").removeClass("reveal-modal"))
            },
            c)
    });
    jQuery(".close-modal:not(.modal-strip .close-modal)").unbind("click").click(function() {
        var a = jQuery(this).closest(".foundry_modal");
        a.toggleClass("reveal-modal");
        "undefined" !== typeof a.attr("data-cookie") && mr_cookies.setItem(a.attr("data-cookie"), "true", Infinity);
        a.find("iframe").length && a.find("iframe").attr("src", "");
        jQuery(".modal-screen").removeClass("reveal-modal")
    });
    jQuery(".modal-screen").unbind("click").click(function() {
        jQuery(".foundry_modal.reveal-modal").find("iframe").length && jQuery(".foundry_modal.reveal-modal").find("iframe").attr("src",
            "");
        jQuery(".foundry_modal.reveal-modal").toggleClass("reveal-modal");
        jQuery(this).toggleClass("reveal-modal")
    });
    jQuery(document).keyup(function(a) {
        27 == a.keyCode && (jQuery(".foundry_modal").find("iframe").length && jQuery(".foundry_modal").find("iframe").attr("src", ""), jQuery(".foundry_modal").removeClass("reveal-modal"), jQuery(".modal-screen").removeClass("reveal-modal"))
    });
    jQuery(".modal-strip").each(function() {
        jQuery(this).find(".close-modal").length || jQuery(this).append(jQuery('<i class="ti-close close-modal">'));
        var a = jQuery(this);
        "undefined" != typeof a.attr("data-cookie") ? mr_cookies.hasItem(a.attr("data-cookie")) || setTimeout(function() {
            a.addClass("reveal-modal")
        }, 1E3) : setTimeout(function() {
            a.addClass("reveal-modal")
        }, 1E3)
    });
    jQuery(".modal-strip .close-modal").click(function() {
        var a = jQuery(this).closest(".modal-strip");
        "undefined" != typeof a.attr("data-cookie") && mr_cookies.setItem(a.attr("data-cookie"), "true", Infinity);
        jQuery(this).closest(".modal-strip").removeClass("reveal-modal");
        return !1
    });
    jQuery(".close-iframe").click(function() {
        jQuery(this).closest(".modal-video").removeClass("reveal-modal");
        jQuery(this).siblings("iframe").attr("src", "");
        jQuery(this).siblings("video").get(0).pause()
    });
    $(".checkbox-option").on("click", function() {
        $(this).toggleClass("checked");
        var a = $(this).find("input");
        !1 === a.prop("checked") ? a.prop("checked", !0) : a.prop("checked", !1)
    });
    $(".radio-option").click(function() {
        var a = $(this).hasClass("checked"),
            c = $(this).find("input").attr("name");
        a || ($('input[name="' + c + '"]').parent().removeClass("checked"), $(this).addClass("checked"), $(this).find("input").prop("checked", !0))
    });
    $(".accordion li").click(function() {
        $(this).closest(".accordion").hasClass("one-open") ? ($(this).closest(".accordion").find("li").removeClass("active"), $(this).addClass("active")) : $(this).toggleClass("active");
        "undefined" !== typeof window.mr_parallax && setTimeout(mr_parallax.windowLoad, 500)
    });
    $(".tabbed-content").each(function() {
        $(this).append('<ul class="content"></ul>')
    });
    $(".tabs li").each(function() {
        var a = $(this),
            c = "";
        a.is(".tabs>li:first-child") && (c = ' class="active"');
        c = a.find(".tab-content").detach().wrap("<li" +
            c + "></li>").parent();
        a.closest(".tabbed-content").find(".content").append(c)
    });
    $(".tabs li").click(function() {
        $(this).closest(".tabs").find("li").removeClass("active");
        $(this).addClass("active");
        var a = $(this).index() + 1;
        $(this).closest(".tabbed-content").find(".content>li").removeClass("active");
        $(this).closest(".tabbed-content").find(".content>li:nth-of-type(" + a + ")").addClass("active")
    });
    $("section").closest("body").find(".local-video-container .play-button").click(function() {
        $(this).siblings(".background-image-holder").removeClass("fadeIn");
        $(this).siblings(".background-image-holder").css("z-index", -1);
        $(this).css("opacity", 0);
        $(this).siblings("video").get(0).play()
    });
    $("section").closest("body").find(".player").each(function() {
        $(this).closest("section").find(".container").addClass("fadeOut");
        var a = $(this).attr("data-video-id"),
            c = $(this).attr("data-start-at");
        $(this).attr("data-property", "{videoURL:'http://youtu.be/" + a + "',containment:'self',autoPlay:true, mute:true, startAt:" + c + ", opacity:1, showControls:false}")
    });
    $(".player").length &&
        $(".player").each(function() {
            var a = $(this).closest("section"),
                c = a.find(".player");
            c.YTPlayer();
            c.on("YTPStart", function(c) {
                a.find(".container").removeClass("fadeOut");
                a.find(".masonry-loader").addClass("fadeOut")
            })
        });
    $("#map-overlay").click(function() {
        $("#map").css("pointer-events", "auto")
    });
    $("#map-overlay").mouseleave(function() {
        $("#map").css("pointer-events", "none")
    });
    $(".countdown").length && $(".countdown").each(function() {
        var a = $(this).attr("data-date");
        $(this).countdown(a, function(a) {
            $(this).text(a.strftime("%D days %H:%M:%S"))
        })
    });
    $("form.form-email, form.form-newsletter").submit(function(a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = !1;
        var c = $(this).closest("form.form-email, form.form-newsletter"),
            d = c.find('button[type="submit"]');
        a = 0;
        var e = c.attr("original-error"),
            h;
        a = $(c).find("iframe.mail-list-form");
        c.find(".form-error, .form-success").remove();
        d.attr("data-text", d.text());
        c.append('<div class="form-error" style="display: none;">' + c.attr("data-error") + "</div>");
        c.append('<div class="form-success" style="display: none;">' +
            c.attr("data-success") + "</div>");
        var g = c.find(".form-error");
        var f = c.find(".form-success");
        c.addClass("attempted-submit");
        if (a.length && "undefined" !== typeof a.attr("srcdoc") && "" !== a.attr("srcdoc")) {
            console.log("Mail list form signup detected.");
            "undefined" !== typeof e && !1 !== e && g.html(e);
            e = $(c).find(".signup-email-field").val();
            var n = $(c).find(".signup-name-field").val();
            var p = $(c).find("input.signup-first-name-field").length ? $(c).find("input.signup-first-name-field").val() : $(c).find(".signup-name-field").val();
            var q = $(c).find(".signup-last-name-field").val();
            if (1 !== b(c)) {
                a = prepareSignup(a);
                a.find("#mce-EMAIL, #fieldEmail").val(e);
                a.find("#mce-LNAME, #fieldLastName").val(q);
                a.find("#mce-FNAME, #fieldFirstName").val(p);
                a.find("#mce-NAME, #fieldName").val(n);
                c.removeClass("attempted-submit");
                g.fadeOut(200);
                d.html(jQuery("<div />").addClass("form-loading")).attr("disabled", "disabled");
                try {
                    $.ajax({
                        url: a.attr("action"),
                        crossDomain: !0,
                        data: a.serialize(),
                        method: "GET",
                        cache: !1,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function(a) {
                            "success" != a.result && 200 != a.Status ? (g.attr("original-error", g.text()), g.html(a.msg).fadeIn(1E3), f.fadeOut(1E3), d.html(d.attr("data-text")).removeAttr("disabled")) : (d.html(d.attr("data-text")).removeAttr("disabled"), h = c.attr("success-redirect"), "undefined" !== typeof h && !1 !== h && "" !== h && (window.location = h), c.find('input[type="text"]').val(""), c.find("textarea").val(""), f.fadeIn(1E3), g.fadeOut(1E3), setTimeout(function() {
                                f.fadeOut(500)
                            }, 5E3))
                        }
                    })
                } catch (r) {
                    g.attr("original-error", g.text()),
                        g.html(r.message).fadeIn(1E3), f.fadeOut(1E3), setTimeout(function() {
                            g.fadeOut(500)
                        }, 5E3), d.html(d.attr("data-text")).removeAttr("disabled")
                }
            } else g.fadeIn(1E3), setTimeout(function() {
                g.fadeOut(500)
            }, 5E3)
        } else console.log("Send email form detected."), "undefined" !== typeof e && !1 !== e && g.text(e), a = b(c), 1 === a ? (g.fadeIn(200), setTimeout(function() {
            g.fadeOut(500)
        }, 3E3)) : (c.removeClass("attempted-submit"), g.fadeOut(200), d.html(jQuery("<div />").addClass("form-loading")).attr("disabled", "disabled"), jQuery.ajax({
            type: "POST",
            url: "mail/mail.php",
            data: c.serialize() + "&url=" + window.location.href,
            success: function(a) {
                d.html(d.attr("data-text")).removeAttr("disabled");
                $.isNumeric(a) ? 0 < parseInt(a) && (h = c.attr("success-redirect"), "undefined" !== typeof h && !1 !== h && "" !== h && (window.location = h), c.find('input[type="text"]').val(""), c.find("textarea").val(""), c.find(".form-success").fadeIn(1E3), g.fadeOut(1E3), setTimeout(function() {
                    f.fadeOut(500)
                }, 5E3)) : (g.attr("original-error", g.text()), g.text(a).fadeIn(1E3), f.fadeOut(1E3))
            },
            error: function(a,
                c, b) {
                g.attr("original-error", g.text());
                g.text(b).fadeIn(1E3);
                f.fadeOut(1E3);
                d.html(d.attr("data-text")).removeAttr("disabled")
            }
        }));
        return !1
    });
    $(".validate-required, .validate-email").on("blur change", function() {
        b($(this).closest("form"))
    });
    $("form").each(function() {
        $(this).find(".form-error").length && $(this).attr("original-error", $(this).find(".form-error").text())
    });
    e("ref") && $("form.form-email").append('<input type="text" name="referrer" class="hidden" value="' + e("ref") + '"/>');
    /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent ||
        navigator.vendor || window.opera) && $("section").removeClass("parallax");
    if ($(".disqus-comments").length) {
        var h = $(".disqus-comments").attr("data-shortname");
        (function() {
            var a = document.createElement("script");
            a.type = "text/javascript";
            a.async = !0;
            a.src = "//" + h + ".disqus.com/embed.js";
            (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(a)
        })()
    }
    if (document.querySelector("[data-maps-api-key]") && !document.querySelector(".gMapsAPI") && $("[data-maps-api-key]").length) {
        d =
            document.createElement("script");
        var f = $("[data-maps-api-key]:first").attr("data-maps-api-key");
        d.type = "text/javascript";
        d.src = "https://maps.googleapis.com/maps/api/js?key=" + f + "&callback=initializeMaps";
        d.className = "gMapsAPI";
        document.body.appendChild(d)
    }
});
$(window).load(function() {
    setTimeout(initializeMasonry, 1E3);
    mr_firstSectionHeight = $(".main-container section:nth-of-type(1)").outerHeight(!0)
});

function capitaliseFirstLetter(b) {
    return b.charAt(0).toUpperCase() + b.slice(1)
}

function initializeMasonry() {
    $(".masonry").each(function() {
        var b = $(this).get(0);
        b = new Masonry(b, {
            itemSelector: ".masonry-item"
        });
        b.on("layoutComplete", function() {
            mr_firstSectionHeight = $(".main-container section:nth-of-type(1)").outerHeight(!0);
            $(".filters.floating").length && (setupFloatingProjectFilters(), updateFloatingFilters(), window.addEventListener("scroll", updateFloatingFilters, !1));
            $(".masonry").addClass("fadeIn");
            $(".masonry-loader").addClass("fadeOut");
            $(".masonryFlyIn").length && masonryFlyIn()
        });
        b.layout()
    })
}

function masonryFlyIn() {
    var b = 0;
    $(".masonryFlyIn .masonry-item").each(function() {
        var e = $(this);
        setTimeout(function() {
            e.addClass("fadeIn")
        }, b);
        b += 170
    })
}

function setupFloatingProjectFilters() {
    mr_floatingProjectSections = [];
    $(".filters.floating").closest("section").each(function() {
        var b = $(this);
        mr_floatingProjectSections.push({
            section: b.get(0),
            outerHeight: b.outerHeight(),
            elemTop: b.offset().top,
            elemBottom: b.offset().top + b.outerHeight(),
            filters: b.find(".filters.floating"),
            filersHeight: b.find(".filters.floating").outerHeight(!0)
        })
    })
}

function updateFloatingFilters() {
    for (var b = mr_floatingProjectSections.length; b--;) {
        var e = mr_floatingProjectSections[b];
        e.elemTop < mr_scrollTop && "undefined" == typeof window.mr_variant ? (e.filters.css({
            position: "fixed",
            top: "16px",
            bottom: "auto"
        }), mr_navScrolled && e.filters.css({
            transform: "translate3d(-50%,48px,0)"
        }), mr_scrollTop > e.elemBottom - 70 && (e.filters.css({
            position: "absolute",
            bottom: "16px",
            top: "auto"
        }), e.filters.css({
            transform: "translate3d(-50%,0,0)"
        }))) : e.filters.css({
            position: "absolute",
            transform: "translate3d(-50%,0,0)"
        })
    }
}
window.initializeMaps = function() {
    "undefined" !== typeof google && "undefined" !== typeof google.maps && $(".map-canvas[data-maps-api-key]").each(function() {
        var b = this,
            e = "undefined" !== typeof $(this).attr("data-map-style") ? $(this).attr("data-map-style") : !1,
            d = JSON.parse(e) || [{
                    featureType: "landscape",
                    stylers: [{
                        saturation: -100
                    }, {
                        lightness: 65
                    }, {
                        visibility: "on"
                    }]
                }, {
                    featureType: "poi",
                    stylers: [{
                        saturation: -100
                    }, {
                        lightness: 51
                    }, {
                        visibility: "simplified"
                    }]
                }, {
                    featureType: "road.highway",
                    stylers: [{
                        saturation: -100
                    }, {
                        visibility: "simplified"
                    }]
                },
                {
                    featureType: "road.arterial",
                    stylers: [{
                        saturation: -100
                    }, {
                        lightness: 30
                    }, {
                        visibility: "on"
                    }]
                }, {
                    featureType: "road.local",
                    stylers: [{
                        saturation: -100
                    }, {
                        lightness: 40
                    }, {
                        visibility: "on"
                    }]
                }, {
                    featureType: "transit",
                    stylers: [{
                        saturation: -100
                    }, {
                        visibility: "simplified"
                    }]
                }, {
                    featureType: "administrative.province",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "water",
                    elementType: "labels",
                    stylers: [{
                        visibility: "on"
                    }, {
                        lightness: -25
                    }, {
                        saturation: -100
                    }]
                }, {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{
                            hue: "#ffff00"
                        }, {
                            lightness: -25
                        },
                        {
                            saturation: -97
                        }
                    ]
                }
            ],
            h = "undefined" !== typeof $(this).attr("data-map-zoom") && "" !== $(this).attr("data-map-zoom") ? 1 * $(this).attr("data-map-zoom") : 17,
            f = "undefined" != typeof $(this).attr("data-latlong") ? $(this).attr("data-latlong") : !1;
        e = f ? 1 * f.substr(0, f.indexOf(",")) : !1;
        f = f ? 1 * f.substr(f.indexOf(",") + 1) : !1;
        var a = new google.maps.Geocoder,
            c = "undefined" !== typeof $(this).attr("data-address") ? $(this).attr("data-address").split(";") : [""],
            k = "We Are Here",
            l, m = {
                draggable: 766 < $(document).width() ? !0 : !1,
                scrollwheel: !1,
                zoom: h,
                disableDefaultUI: !0,
                styles: d
            };
        void 0 != $(this).attr("data-marker-title") && "" != $(this).attr("data-marker-title") && (k = $(this).attr("data-marker-title"));
        void 0 != c && "" != c[0] ? a.geocode({
                address: c[0].replace("[nomarker]", "")
            }, function(a, d) {
                if (d == google.maps.GeocoderStatus.OK) {
                    var e = new google.maps.Map(b, m);
                    e.setCenter(a[0].geometry.location);
                    c.forEach(function(a) {
                        l = {
                            url: void 0 == window.mr_variant ? "img/mapmarker.png" : "../img/mapmarker.png",
                            size: new google.maps.Size(50, 50),
                            scaledSize: new google.maps.Size(50,
                                50)
                        };
                        if (/(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)/.test(a)) a = a.split(","), new google.maps.Marker({
                            position: {
                                lat: 1 * a[0],
                                lng: 1 * a[1]
                            },
                            map: e,
                            icon: l,
                            title: k,
                            optimised: !1
                        });
                        else if (0 > a.indexOf("[nomarker]")) {
                            var c = new google.maps.Geocoder;
                            c.geocode({
                                address: a.replace("[nomarker]", "")
                            }, function(a, c) {
                                c == google.maps.GeocoderStatus.OK && new google.maps.Marker({
                                    map: e,
                                    icon: l,
                                    title: k,
                                    position: a[0].geometry.location,
                                    optimised: !1
                                })
                            })
                        }
                    })
                } else console.log("There was a problem geocoding the address.")
            }) : void 0 != e && "" !=
            e && 0 != e && void 0 != f && "" != f && 0 != f && (m.center = {
                lat: e,
                lng: f
            }, d = new google.maps.Map(b, m), new google.maps.Marker({
                position: {
                    lat: e,
                    lng: f
                },
                map: d,
                icon: l,
                title: k
            }))
    })
};
initializeMaps();

function prepareSignup(b) {
    var e = jQuery("<form />"),
        d = jQuery("<div />");
    jQuery(d).html(b.attr("srcdoc"));
    b = jQuery(d).find("form").attr("action");
    /list-manage\.com/.test(b) && (b = b.replace("/post?", "/post-json?") + "&c=?", "//" == b.substr(0, 2) && (b = "http:" + b));
    /createsend\.com/.test(b) && (b += "?callback=?");
    e.attr("action", b);
    jQuery(d).find("input, select, textarea").not('input[type="submit"]').each(function() {
        jQuery(this).clone().appendTo(e)
    });
    return e
}
var mr_cookies = {
    getItem: function(b) {
        return b ? decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(b).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null : null
    },
    setItem: function(b, e, d, h, f, a) {
        if (!b || /^(?:expires|max\-age|path|domain|secure)$/i.test(b)) return !1;
        var c = "";
        if (d) switch (d.constructor) {
            case Number:
                c = Infinity === d ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + d;
                break;
            case String:
                c = "; expires=" + d;
                break;
            case Date:
                c = "; expires=" +
                    d.toUTCString()
        }
        document.cookie = encodeURIComponent(b) + "=" + encodeURIComponent(e) + c + (f ? "; domain=" + f : "") + (h ? "; path=" + h : "") + (a ? "; secure" : "");
        return !0
    },
    removeItem: function(b, e, d) {
        if (!this.hasItem(b)) return !1;
        document.cookie = encodeURIComponent(b) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (d ? "; domain=" + d : "") + (e ? "; path=" + e : "");
        return !0
    },
    hasItem: function(b) {
        return b ? (new RegExp("(?:^|;\\s*)" + encodeURIComponent(b).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie) : !1
    },
    keys: function() {
        for (var b =
                document.cookie.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:=[^;]*)?;\s*/), e = b.length, d = 0; d < e; d++) b[d] = decodeURIComponent(b[d]);
        return b
    }
};

function contribution_sort(b, e) {
    return b.contributions > e.contributions
}
$(document).ready(function() {
    $.ajax({
        url: "https://api.github.com/repos/mfossociety/mfossociety.github.io/contributors?per_page=100&page=1"
    }).done(function(b) {
        b.sort(contribution_sort);
        b.forEach(function(b) {
            var d = '<div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 text-center contributor"> <div class="card hvr-hang single-mentor">';
            d += '<img src="https://github.com/' + b.login + '.png?size=120x120" height="120" width="120" style="width: auto">';
            d += "<br>";
            $.ajax({
                url: "https://api.github.com/users/" + b.login
            }).done(function(e) {
                d +=
                    '<p class="person-name">';
                null != e.name ? (d += e.name + "<br>", d += "(" + b.login + ")") : d += b.login;
                d += "</p><br>";
                d += '<ul class="list-inline social-list social-overlay-list">';
                d += '<a href="' + b.html_url + '" target="_blank" class="icon-a">';
                d += '<i class="icon-i fa fa-github fa-2x" aria-hidden="true"></i>';
                d += "</a></ul></div>";
                d += '<a contributor href="https://github.com/mfossociety/mfossociety.github.io/commits?author=' + b.login + '" target="_blank" ';
                d += 'class="align-bottom">';
                d += "(" + b.contributions;
                d = 1 === b.contributions ?
                    d + " contribution)</a>" : d + " contributions)</a>";
                d += "</div>";
                $("#contributors").append(d)
            })
        })
    })
});
$(function() {
    $.ajax({
        url: "https://api.github.com/repos/mfossociety/mfossociety.github.io/issues?state=open"
    }).done(function(b) {
        var e = 0;
        b.forEach(function(b) {
            if (6 < e) return !1;
            e++;
            var d = "<div class='issue'>Issue - <span>#" + b.number + "</span>";
            d += "<a href='" + b.html_url + "' target='_blank'>" + b.title + "</a>";
            d = d + "<p>Opened by </p>" + ("<a href='" + b.user.html_url + "' target='_blank' class='user'>");
            d += b.user.login + "</a><div class='right-side'>";
            d += "<a href='" + b.html_url + "' target='_blank'>";
            d += "<i class='fa fa-eye'></i>See</a></div></div>";
            $(".issues-wrapper").append(d)
        })
    });
    $.ajax({
        url: "https://api.github.com/repos/mfossociety/mfossociety.github.io/pulls?state=merged"
    }).done(function(b) {
        var e = 0;
        b.forEach(function(b) {
            if (6 < e) return !1;
            e++;
            var d = "<div class='issue'>Pull Request - <span>#" + b.number + "</span>";
            d += "<a href='" + b.html_url + "' target='_blank'>" + b.title + "</a>";
            d = d + "<p>Opened by </p>" + ("<a href='" + b.user.html_url + "' target='_blank' class='user'>");
            d += b.user.login + "</a><div class='right-side'>";
            d += "<a href='" + b.html_url + "' target='_blank'>";
            d += "<i class='fa fa-eye'></i>See</a></div></div>";
            $(".issues-wrapper").append(d)
        })
    })
});