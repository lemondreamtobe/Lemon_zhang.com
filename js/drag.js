(function($){
    /*
     *option
     *   -- mouseDown
     *   -- mouseUp
     *   -- mousemove
     */
    $.fn.lets_drag = function(option){
        var defaults = {
            dragstart: function(){},
            dragging: function(){},
            dragend: function(){}
        };
        option = $.extend({},defaults, option);//将一个空对象做为第一个参数
        var $self = this;

        //自定义事件
        function EventTarget(){
            this.handlers = {};
        };
        EventTarget.prototype = {
            constructor: EventTarget,
            addHandler: function(type, handler) {
                
                if (typeof this.handlers[type] == 'undefined') {
                    this.handlers[type] = [];
                };
                this.handlers[type].push(handler);
            },
            fire: function(e) {
                
                if (!e.target) {
                    e.target = this;
                };
                
                if (this.handlers[e.type] instanceof Array) {
                    var handlers = this.handlers[e.type];
                    for (var i = 0, len=handlers.length;i < len; i++) {
                        handlers[i](e);
                    };
                };
            },
            removeHandler: function(type, handler) {
                
                 if (this.handlers[e.type] instanceof Array) {
                    var handlers = this.handlers[type];
                    for (var i = 0, len=handlers.length;i < len; i++) {
                        
                        if (handlers[i] === handler) {
                            break;
                        }
                    };
                    handlers.splice(i, 1);
                 }
            }
        };
        
        //拖放
        var DragDrop = function() {
            var dragdrap = new EventTarget(),
                dragging = $self,
                diffX = 0,
                diffY = 0;
            var states = {
                mousedown: function(e) {
                    dragging = $self;
                    diffX = e.clientX - dragging.offset().left;
                    diffY = e.clientY - dragging.offset().top;
                    dragdrap.fire({type: 'dragstart', target:dragging, x:e.clientX, y:e.clientY, event:e});
                    $(document).mousemove(states.mousemove);
                },
                mousemove: function(e) {

                    if (dragging == null) {
                        return;
                    }
                    dragging.css({
                        position: 'absolute',
                        left: (e.clientX - diffX) + 'px',
                        top: (e.clientY - diffY) + 'px',
                    });
                    dragdrap.fire({type: 'dragging', target:dragging, x:e.clientX, y:e.clientY, event:e});
                },
                mouseup: function(e) {
                    dragdrap.fire({type: 'dragend', target:dragging, x:e.clientX, y:e.clientY,event:e});
                    dragging = null;
                }
            };
            dragging.enable = function() {
                dragging.mousedown(states.mousedown);
                $(document).mouseup(states.mouseup);
            };
            dragging.disable = function() {
                dragging.unbind(states.mousedown);
                // dragging.unbind(states.mousemove);
                $(document).unbind('mouseup');
            }
            return dragdrap;
        }();
        DragDrop.addHandler('dragstart',option.dragstart);
        DragDrop.addHandler('dragging', option.dragging);
        DragDrop.addHandler('dragend', option.dragend);
        $self.enable();
        return $self;
    }
}(jQuery));