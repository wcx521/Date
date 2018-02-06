var jQuery = require('jquery');
;(function($){
    function Calendar(_this){
        this.$el = _this;
    }
    
    Calendar.prototype = {
        getDay: function(){
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth();
            var today = date.getDate();
            date.setFullYear(year,month+1,0);
            var allDay = date.getDate();
            date.setFullYear(year,month,1);
            var week = date.getDay();
            date.setFullYear(year,month,0);
            var preAllDay = date.getDate();
            return {
                today:today,
                week:week,
                allDay:allDay,
                preAllDay: preAllDay
            }
        },
        createEl: function(){
            var $thead = this.createHead();
            var $tbody = this.createBody();
            this.$el.append($thead,$tbody);
        },
        createHead: function(){
            var $thead = $('<thead>');
            var $tr = $('<tr>');
            var arr = ['一','二','三','四','五','六','日'];
            for(var i=0; i<7; i++){
                var $td = $('<td>');
                $td.html(arr[i]);
                if(i==5||i==6){
                    $td.addClass('play-day');
                }
                $tr.append($td);
            }
            return $thead.append($tr);
        },
        createBody: function(){
            var $tbody = $('<tbody id="xxx"></tbody>')
            for(var i=0; i<5;i++){
                var $tr = $('<tr>');
                for(var j=0; j<7; j++){
                    $td = $('<td>');
                    $tr.append($td);
                }
                $tbody.append($tr);
            }
            return $tbody;
        },
        insertData: function(obj){
            var allDay = obj.allDay;
            var week = obj.week;
            var today = obj.today;
            for(var i=1; i<=allDay; i++){
                if(week==0){
                    week=7;
                }
                var num = week+i-2;
                var $item = $('#xxx').find('td').eq(num);
                $item.html(i);
                if(num%7==5||num%7==6){
                    $item.addClass('play-day');
                }
                if(i==1){
                    this.start = num;
                    $item.addClass('start');
                }
                if(i==allDay){
                    $item.addClass('end');
                    this.end = num;
                }
                if(i==today){
                    $item.addClass('today');
                }
            }
            this.paddingOther(obj);
        },
        paddingOther: function(obj){
            var i_tag  = obj.preAllDay+1;
            
            var start = this.start;
            var end = this.end;
            var j_tag = 0 ;
            for(var i=start-1; i>=0; i--){
                i_tag--;
                $('#xxx').find('td').eq(i).html(i_tag).addClass('disable');
            }
            for(var j=end+1; j<35;j++){
                j_tag++;
                $('#xxx').find('td').eq(j).html(j_tag).addClass('disable');
            }

        },
        init: function(){
            this.createEl();
            var obj = this.getDay();
            this.insertData(obj);
            return this.$el;
        }
    }
    
    $.fn.calendar = function(){
        var calendar = new Calendar(this);
        return calendar.init();
    }

})(jQuery)
