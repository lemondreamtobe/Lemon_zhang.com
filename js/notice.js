var Noticer = (function ($) {
    return {
        createContainer: function() {

            if ($('#noty_topRight_layout_container').length == 0) {
                var ul_string = '<ul id="noty_topRight_layout_container" class="" style="top: 20px; right: 20px; position: fixed; width: 310px; height: auto; margin: 0px; padding: 0px; list-style-type: none; z-index: 10000000;"></ul>';
                $(document.body).append($(ul_string));
                return $('#noty_topRight_layout_container');
            } else {
               return $('#noty_topRight_layout_container');
            }
        },
        getRandomNumer: function () {
            var Max = 9;
            var Min = 0;
            var Range = Max - Min;
            var Rand = Math.random();
            var num = Min + Math.round(Rand * Range); //四舍五入
            return num;
        },
        setId: function (li) {
            var id = 'id_';
            for (var i = 0; i < 15; i++) {
                id += this.getRandomNumer();
            };
            li.attr('id', id);
        },
        createLi: function(text) {
            var li_string = '<li style="overflow: hidden; margin: 4px 0px; border-radius: 2px; position: relative; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px; width: 310px; cursor: pointer;" class="i-am-closing-now">'
                                + '<div class="noty_bar noty_type_information" id="noty_826227752182406800">'
                                    + '<div class="noty_message" style="text-align: left; padding: 10px; width: auto; position: relative;">'
                                        +'<span class="noty_text">'
                                            +'<div>'
                                                + '<i class="fa pull-left" style="font-size: 38px;min-width: 38px;text-align: center;"></i>'
                                                + '<strong>通知</strong><br>'
                                                + text
                                            + '</div>' 
                                        + '</span>' +
                                    '</div>'
                                +'</div>'
                            + '</li>'
            return $(li_string);
        },
        colorPick: {
            primary : {
                border : '1px solid rgb(59, 173, 214)',
                'background-color': 'rgb(120, 197, 231)',
                color: 'rgb(255, 255, 255)',
                i_class: 'fa-info-circle'
            },
            success : {
                border : '1px solid rgb(124, 221, 119)',
                'background-color': 'rgb(188, 245, 188)',
                color: 'darkgreen',
                i_class: 'fa-check-circle'
            },
            fail : {
                border : '1px solid rgb(226, 83, 83)',
                'background-color': 'rgb(255, 129, 129)',
                color: 'rgb(255, 255, 255)',
                i_class: 'fa-times-circle'
            },
            warn : {
                border : '1px solid rgb(255, 194, 55)',
                'background-color': 'rgb(255, 234, 168)',
                color: 'rgb(130, 98, 0)',
                i_class: 'fa-warning'
            }

        },
        addColorForLi: function(type, li) {

            if (type == undefined) {
                type = 'primary';
            }  
            var the_color = this.colorPick[type];
            li.css({
                'border' : the_color.border,
                'background-color' : the_color['background-color'],
                'color' : the_color.color,
                'height': '0px'
            });
            li.find('i').addClass(the_color.i_class);
            return li;
        },
        hide: function(li) {
            setTimeout(function() {
                li.animate({
                    height:'0px'
                    }, 'slow');
                li.css('border', '0px');
                setTimeout(function() {
                    li.remove();
                    var li_length = $('#noty_topRight_layout_container').children('li').length;
        
                    if (li_length) {
                    
                    } else {
                        $('#noty_topRight_layout_container').remove();
                    }
                }, 1000);
            }, 3000);
        },
        notice: function(type, text) {
            var ul = this.createContainer();
            var li = this.createLi(text);
            ul.append(this.addColorForLi(type, li));
            li.animate({
                    height: '62px'
                    }, 'slow');
            this.hide(li);
        }       
    }
})($);