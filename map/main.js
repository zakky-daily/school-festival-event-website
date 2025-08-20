'use strict'
var nowpage=0;
function pagechange(i){
    $('.width .docs-parent').children().eq(nowpage).addClass('docs-hidden');
    nowpage=i;
    $('.width .docs-parent').children().eq(nowpage).removeClass('docs-hidden');
}

