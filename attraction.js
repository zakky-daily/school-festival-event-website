'use strict'

// 検索機能

var url = new URL(window.location.href);
var params = url.searchParams;

if ($.cookie('sortAspect') == null) $.cookie('sortAspect', 'group');
if ($.cookie('sortOrder') == null) $.cookie('sortOrder', 'up');

if (params.has('sort')) {

    let sortRule = params.get('sort').split('-');
        
    if (['group', 'name'].includes(sortRule[0])) $.cookie('sortAspect', sortRule[0]);
    if (sortRule.length < 2 || ['up', 'down'].includes(sortRule[1])) $.cookie('sortOrder', sortRule[1]);
}

var sortLabel = '';
switch ($.cookie('sortAspect')) {

    case 'group':
        sortLabel += '団体名';
        break;

    case 'name':
        sortLabel += '企画名';
        break;
}

switch ($.cookie('sortOrder')) {

    case 'up':
        sortLabel += '(昇順)';
        break;

    case 'down':
        sortLabel += '(降順)';
        break;
}

$('.finder .sort .dropbox .mask .show').text(sortLabel);

var sortList = [];
var categoryList = [];

$('.list').children('.content').each( (i, element) => {

    sortList.push($(element));

    let c = $(element).find('.category').text()
    if (!categoryList.includes(c)) categoryList.push(c);
});

if ($.cookie('filter') == null) $.cookie('filter', 'all');

if (params.has('filter')) {

    if (params.get('filter') == 'all' || categoryList.includes('# ' + params.get('filter'))) $.cookie('filter', params.get('filter'));
}

sortList.sort((a, b) => {
    
    let a_text = a.find('.' + $.cookie('sortAspect')).text();
    let b_text = b.find('.' + $.cookie('sortAspect')).text();
    
    if ($.cookie('sortOrder') == 'up') return a_text.localeCompare(b_text, 'ja');
    else return b_text.localeCompare(a_text, 'ja');
});

for (let element of sortList) {

    if ($.cookie('filter') == 'all' || element.find('.category').text() == ('# ' + $.cookie('filter'))) {

        $('.list').append(element.remove());
    
    } else {

        element.remove();
    }
}

if ($.cookie('filter') == 'all') $('.finder .filter .dropbox .mask .show').text('全ての企画');
else $('.finder .filter .dropbox .mask .show').text('# ' + $.cookie('filter'));


$('.finder .filter .dropbox .mask').append(`<a href="./?filter=all" class="element candidate">全ての企画</a>`);
for (let filter of categoryList) {

    $('.finder .filter .dropbox .mask').append(`<a href="./?filter=${filter.substr(2)}" class="element candidate">${filter}</a>`);
}


// dropboxの挙動

var isSortOpen = false;
var isFilterOpen = false;

function sortOpen() {

    $('.finder .sort .mask').addClass('mask-open');
    isSortOpen = true;
}

function sortClose() {

    $('.finder .sort .mask').removeClass('mask-open');
    isSortOpen = false;
}

function sortOpenClose() {

    $('.finder .sort .mask').off('mouseenter mouseleave');
    if (!isSortOpen) sortOpen();
    else sortClose();
}

$('.finder .sort .mask').on('mouseenter', sortOpen);
$('.finder .sort .mask').on('mouseleave', sortClose);
$('.finder .sort .mask .show').on('touchend', sortOpenClose);


function filterOpen() {

    $('.finder .filter .mask').addClass('mask-open');
    $('.finder .filter .mask').css('height', `${(categoryList.length + 2) * 100}%`);
    isFilterOpen = true;
}

function filterClose() {

    $('.finder .filter .mask').removeClass('mask-open');
    $('.finder .filter .mask').css('height', '100%');
    isFilterOpen = false;
}

function filterOpenClose() {

    $('.finder .filter .mask').off('mouseenter mouseleave');
    if (!isFilterOpen) filterOpen();
    else filterClose();
}

$('.finder .filter .mask').on('mouseenter', filterOpen);
$('.finder .filter .mask').on('mouseleave', filterClose);
$('.finder .filter .mask .show').on('touchend', filterOpenClose);
