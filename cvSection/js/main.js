jQuery(document).ready(function($) {

    /* ---------------------------------------------------------------------- */
    /*	------------------------------- Loading ----------------------------- */
    /* ---------------------------------------------------------------------- */

    /*Page Preloading*/
    $(window).load(function() {
        $('#spinner').fadeOut(20);
        $('#preloader').delay(20).fadeOut('slow');
        $('.wrapper').fadeIn(20);
        $('#custumize-style').fadeIn(20);
        // filterList.init();
    });

    /* ---------------------------------------------------------------------- */
    /* ------------------------------- Taps profile ------------------------- */
    /* ---------------------------------------------------------------------- */

    $('.collapse_tabs').click(function() {

        if ($(this).hasClass('collapsed')) {
            $(this).find('i.glyphicon').removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
        } else {
            $(this).find('i.glyphicon').removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
        }

    });

    /* ---------------------------------------------------------------------- */
    /* -------------------------- easyResponsiveTabs ------------------------ */
    /* ---------------------------------------------------------------------- */

    $('#verticalTab').easyResponsiveTabs({
        type: 'vertical',
        width: 'auto',
        fit: true
    });

    $("h2.resp-accordion").click(function() {
        $(this).find(".icon_menu").addClass("icon_menu_active");
        $("h2.resp-accordion").not(this).find(".icon_menu").removeClass("icon_menu_active");

        /*	Scroll To */
        $('html, body').animate({
            scrollTop: $('h2.resp-accordion').offset().top - 50
        }, 600);
    });

    $(".resp-tabs-list li").click(function() {
        $(this).find(".icon_menu").addClass("icon_menu_active");
        $(".resp-tabs-list li").not(this).find(".icon_menu").removeClass("icon_menu_active");
    });


    $(".resp-tabs-list li").hover(function() {
        $(this).find(".icon_menu").addClass("icon_menu_hover");
    }, function() {
        $(this).find(".icon_menu").removeClass("icon_menu_hover");
    });

    $("h2.resp-accordion").hover(function() {
        $(this).find(".icon_menu").addClass("icon_menu_hover");
    }, function() {
        $(this).find(".icon_menu").removeClass("icon_menu_hover");
    });

    /* ---------------------------------------------------------------------- */
    /* --------------------------- Scroll tabs ------------------------------ */
    /* ---------------------------------------------------------------------- */

    $(".content_2").mCustomScrollbar({
        theme: "dark-2",
        contentTouchScroll: true,
        advanced: {
            updateOnContentResize: true,
            updateOnBrowserResize: true,
            autoScrollOnFocus: false
        }
    });

    /* ---------------------------------------------------------------------- */
    /* ------------------------- Effect tabs -------------------------------- */
    /* ---------------------------------------------------------------------- */

    var animation_style = 'bounceIn';

    $('.dropdown-select').change(function() {
        animation_style = $('.dropdown-select').val();
    });


    $('ul.resp-tabs-list li[class^=tabs-]').click(function() {

        var tab_name = $(this).attr('data-tab-name');

        $('.resp-tabs-container').addClass('animated ' + animation_style);
        $('.resp-tabs-container').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $('.resp-tabs-container').removeClass('animated ' + animation_style);
        });

        $(".content_2").mCustomScrollbar("destroy");
        $(".content_2").mCustomScrollbar({
            theme: "dark-2",
            contentTouchScroll: true,
            advanced: {
                updateOnContentResize: true,
                updateOnBrowserResize: true,
                autoScrollOnFocus: false
            }
        });

        if (tab_name == "contact")
            initialize();

        return false;
    });

    /* ---------------------------------------------------------------------- */
    /* ---------------------- redimensionnement ----------------------------- */
    /* ---------------------------------------------------------------------- */

    function redimensionnement() {

        if (window.matchMedia("(max-width: 800px)").matches) {
            $(".content_2").mCustomScrollbar("destroy");
            $(".resp-vtabs .resp-tabs-container").css("height", "100%");
            $(".content_2").css("height", "100%");
        } else {

            $(".resp-vtabs .resp-tabs-container").css("height", "580px");
            $(".content_2").css("height", "580px");
            $(".content_2").mCustomScrollbar("destroy");
            $(".content_2").mCustomScrollbar({
                theme: "dark-2",
                contentTouchScroll: true,
                advanced: {
                    updateOnContentResize: true,
                    updateOnBrowserResize: true,
                    autoScrollOnFocus: false
                }
            });

        }

    }

    // On lie l'événement resize à la fonction
    window.addEventListener('load', redimensionnement, false);
    window.addEventListener('resize', redimensionnement, false);

    /* ---------------------------------------------------------------------- */
    /* ----------------------------- Portfolio ------------------------------ */
    /* ---------------------------------------------------------------------- */


    var filterList = {
        init: function() {

            // MixItUp plugin
            // http://mixitup.io
            $('#portfoliolist').mixitup({
                targetSelector: '.portfolio',
                filterSelector: '.filter',
                effects: ['fade'],
                easing: 'snap',
                // call the hover effect
                // mixStart: filterList.waterFall(),
                onMixEnd: filterList.hoverEffect()
            });

        },
        hoverEffect: function() {

            // Simple parallax effect
            $('#portfoliolist .portfolio').hover(
                function() {
                    $(this).find('.label').stop().animate({
                        bottom: 0
                    }, 200);
                    $(this).find('img').stop().animate({
                        top: -30
                    }, 500);
                },
                function() {
                    $(this).find('.label').stop().animate({
                        bottom: -40
                    }, 200);
                    $(this).find('img').stop().animate({
                        top: 0
                    }, 300);
                }
            );
            // console.log($(".portfolio").eq(0).find('img').height());

        },
        waterFall: function() {
            $("#portfolio").show();
            var aPin = $("#portfoliolist>.portfolio");
            // var aPin = $( "#portfoliolist>img" );
            var iPinW = aPin.eq(0).outerWidth(); // 一个块框pin的宽
            console.log($("#portfolio").outerWidth());
            console.log(iPinW);
            var num = Math.floor($(".mCSB_container").width() / iPinW); //每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
            //oParent.style.cssText='width:'+iPinW*num+'px;ma rgin:0 auto;';//设置父级居中样式：定宽+自动水平外边距
            console.log($(".mCSB_container").width());
            console.log(num);
            // $( "#portfolio" ).css({
            //     'width:' : iPinW * num,
            //     'margin': '0 auto'
            // });

            var pinHArr = []; //用于存储 每列中的所有块框相加的高度。
            // console.log($(".cycle-slideshow").eq(0).find('img').height());
            aPin.each(function(index, value) {
                var pinH = aPin.eq(index).height();
                console.log("position" + aPin.eq(index).position());
                console.log(index + "+" + pinH);
                if (index < num) {
                    pinHArr[index] = pinH; //第一行中的num个块框pin 先添加进数组pinHArr
                    console.log(pinHArr[index]);
                } else {
                    var minH = Math.min.apply(null, pinHArr); //数组pinHArr中的最小值minH
                    var minHIndex = $.inArray(minH, pinHArr);
                    $(value).css({
                        'position': 'relative',
                        'top': minH + 15,
                        'left': aPin.eq(minHIndex).position().left
                    });
                    console.log($(value).css('top'));
                    console.log(aPin.eq(minHIndex).position());
                    //数组 最小高元素的高 + 添加上的aPin[i]块框高
                    pinHArr[minHIndex] += aPin.eq(index).height() + 15; //更新添加了块框后的列高
                    console.log(minH);
                    console.log(minHIndex);
                }
            });
            $("#portfolio").hide();
        }
    };

    // Run the show!
    filterList.init();


    /* ---------------------------------------------------------------------- */
    /* ----------------------------- prettyPhoto ---------------------------- */
    /* ---------------------------------------------------------------------- */

    $("a[rel^='portfolio']").prettyPhoto({
        animation_speed: 'fast',
        /* fast/slow/normal */
        social_tools: '',
        theme: 'pp_default',
        // horizontal_padding: 5,
        deeplinking: false,
        allow_expand: false,
    });

    /* ---------------------------------------------------------------------- */
    /* ---------------------------- icon menu ------------------------------- */
    /* ---------------------------------------------------------------------- */

    $(".resp-tabs-container h2.resp-accordion").each(function() {

        if ($(this).hasClass('resp-tab-active')) {
            $(this).append("<i class='glyphicon glyphicon-chevron-up arrow-tabs'></i>");
        } else {
            $(this).append("<i class='glyphicon glyphicon-chevron-down arrow-tabs'></i>");
        }
    });

    $(".resp-tabs-container h2.resp-accordion").click(function() {
        if ($(this).hasClass('resp-tab-active')) {
            $(this).find("i.arrow-tabs").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
        }

        $(".resp-tabs-container h2.resp-accordion").each(function() {

            if (!$(this).hasClass('resp-tab-active')) {
                $(this).find("i.arrow-tabs").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
            }
        });


    });


    /* ---------------------------------------------------------------------- */
    /* -------------------------------- skillbar ---------------------------- */
    /* ---------------------------------------------------------------------- */

    $('.tabs-resume').click(function() {

        $('.skillbar').each(function() {
            $(this).find('.skillbar-bar').width(0);
        });

        $('.skillbar').each(function() {
            $(this).find('.skillbar-bar').animate({
                width: $(this).attr('data-percent')
            }, 2000);
        });

    });

    $('#resume').prev('h2.resp-accordion').click(function() {

        $('.skillbar').each(function() {
            $(this).find('.skillbar-bar').width(0);
        });

        $('.skillbar').each(function() {
            $(this).find('.skillbar-bar').animate({
                width: $(this).attr('data-percent')
            }, 2000);
        });
    });


    //Change for demo page
    $('input:radio[name=page_builder]').on('change', function() {

        $('input:radio[name=page_builder]').each(function() {

            var $this = $(this);

            if ($(this).prop('checked')) {
                window.location.replace($this.val());
            }
        });

        return false;
    });



});