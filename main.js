'use strict'

var nowDot = 0;

function dot() {

    var updateDot = Math.floor(($('.top .pickup .list').scrollLeft() - 4) / ($('.top .pickup .list .content').outerWidth() + 8) + 0.5);
    if (updateDot < 0) updateDot = 0;
    if (updateDot > 2) updateDot = 2;

    if (nowDot != updateDot) {
        
        $('.top .pickup .dot').children().eq(nowDot).removeClass('object-now');
        nowDot = updateDot;
        $('.top .pickup .dot').children().eq(updateDot).addClass('object-now');
    }
}

$('.top .pickup .list').scroll(dot);


function resize() {

    var marginLR = ($(window).width() - $('.top .pickup .list .content').outerWidth()) / 2;

    $('.top .pickup .content:first-child').css('margin-left', marginLR + 'px');
    $('.top .pickup .mr').css('padding-right', marginLR - 8 + 'px');

    dot();
}

$(window).resize(resize);
resize();


$(window).scroll(() => {

    if ($('.introduce').offset().top - $(window).scrollTop() > 60) {

        $('header').addClass('header-transparent');
    
    } else {

        $('header').removeClass('header-transparent');
    }
});



function scrollJump(i) {

    var left = $('.top .pickup .list .content').outerWidth() + 8;
    $('.top .pickup .list').scrollLeft(left * i);
}


function announce() {

    $(window).scrollTop($('.top .pickup').offset().top + $('.top .pickup').height() / 2 - $(window).height() / 2);
}

