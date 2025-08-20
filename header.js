'use strict'

var isOtherOpen = false;

function otherOpen() {

    $('header .environment .other .expand-list').addClass('expand-list-open');
    isOtherOpen = true;
}

function otherClose() {

    $('header .environment .other .expand-list').removeClass('expand-list-open');
    isOtherOpen = false;
}

function otherOpenClose() {

    $('header .environment .other').off('mouseenter mouseleave');
    if (!isOtherOpen) otherOpen();
    else otherClose();
}

$('header .environment .other').on('mouseenter', otherOpen);
$('header .environment .other').on('mouseleave', otherClose);
$('header .environment .other').on('touchend', otherOpenClose);

var isAttractionOpen;

function attractionOpen() {

    $('header .environment .attraction .expand-list').addClass('expand-list-open');
    isAttractionOpen = true;
}

function attractionClose() {

    $('header .environment .attraction .expand-list').removeClass('expand-list-open');
    isAttractionOpen = false;
}

function attractionOpenClose() {

    $('header .environment .attraction').off('mouseenter mouseleave');
    if (!isAttractionOpen) attractionOpen();
    else attractionClose();
}

$('header .environment .attraction').on('mouseenter', attractionOpen);
$('header .environment .attraction').on('mouseleave', attractionClose);
$('header .environment .attraction').on('touchend', attractionOpenClose);

$('header .environment .expand .expand-list').on('touchend', (event) => event.stopPropagation());

function expandPos() {

    let otherParentX =  $('header .pc .other').offset().left;
    let otherParentWidth =  $('header .pc .other').width();
    let otherListWidth = $('header .pc .other .expand-list').width();

    if (otherParentX + otherParentWidth / 2 + otherListWidth / 2 > $(window).width() - 8) {
    
        $('header .pc .other').addClass('other-right');

    } else {

        $('header .pc .other').removeClass('other-right');
    }
}

$(window).resize(expandPos);
expandPos();
