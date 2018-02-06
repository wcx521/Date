
var $ = require('jquery');
console.log($,'xxx')
;(function($){

    function Mask(_this,options){
        this.$el = _this;
        this.options = options;
        this.config = {
            succFn: function(){},
            cancelFn: function(){}
        };
        
    }

    Mask.prototype = {
        show: function(){
            this.$el.show();
        },
        hide: function(){
            this.$el.hide();
        },
        changeDesc: function(){
            var desc = this.config.desc;
            if(desc){
                this.$el.find('.desc').html(desc);
            }
        },
        changeText: function(){
            var sureText = this.config.sure;
            var cancelText = this.config.cancel;
            if(sureText){
                this.$el.find('.sure').html(sureText);
            }
            if(cancelText){
                this.$el.find('.cancel').html(cancelText);
            }
        },
        init: function(){
            this.initConfig();
            this.createEl();
            this.addEvents();
            this.changeDesc();
            this.changeText();
            return this.$el;
        },
        initConfig: function(){
            var typeStr = Object.prototype.toString.call(this.options);
            if(!this.options||typeStr!=='[object Object]'){
                this.options = {};
            }
            var config = $.extend({},this.config,this.options);
            this.config = config;
        },
        createEl: function(){
            var $box = $('<div class="box"></div>');
            var $title = this.createTitle();
            var $desc = this.createDesc();
            var $btns = this.createBtns();
            $box.append($title,$desc,$btns);
            this.$el.append($box);
        },
        createTitle: function(){
            var $closeDom = $('<a href="javascript:;" class="close">X</a>');
            var $tipDom = $('<h3 class="title">消息提示</h3>');
            $tipDom.append($closeDom);
            return $tipDom;
        },
        createDesc: function(){
            var $descDom = $('<p class="desc">请选择提示内容！</p>');
            return $descDom;
        },
        createBtns: function(){
            var $sureDom = $('<a href="javascript:;" class="sure">确定</a>');
            var $cancelDom = $('<a href="javascript:;" class="cancel">取消</a>');
            var $btnsDom = $('<div class="btns"></div>');
            $btnsDom.append($sureDom,$cancelDom);
            return $btnsDom;
        },
        addEvents: function(){
            var self = this;
            var $el = this.$el;
            $el.on('click','.close,.cancel',function(){
                self.hide();
                self.config.cancelFn();
            });
            $el.on('click','.sure',function(){
                self.hide();
                self.config.succFn();
            });
        }
    }

    $.fn.mask = function(options){
        var mask = new Mask(this,options);
        return mask.init();
    }

})($)