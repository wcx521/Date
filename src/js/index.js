import '../less/index.less';
var $ = require('jquery');
console.log('xxx ',$);

$(function(){
    $('#load').mask({
        desc:"你小子强人所难",
        cancel: 'Cancel',
        sure: 'OK',
        succFn: function(){
            alert('睡大觉喽！');
        }
    });
})