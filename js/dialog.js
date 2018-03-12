;(function($, window, document){
	
	var defaults = {
		title: "模态对话框",
		dragEnabled: true,
		iframeUrl: "",
		htmlContent: "",
		width: 240,
		height: 120,
        diaCancel: null,
        diaConfirm: null,
        cancelText: '取消',
        confirmText: '确定'
	};

	$.openDialog = function(opts){
		var settings = $.extend({}, defaults, opts);		
		var dialog = {
			init: function(){
                var $body = $(document.body);
                
                /*弹窗结构主体*/
				var dialoghtml = "";
                dialoghtml += "<div class='dialog-container'>";
                    dialoghtml += "<div class='dialog'>";
                        dialoghtml += "<div class='dialog-head'>";
                        dialoghtml += "<label>" + settings.title + "</label>";
                        dialoghtml += "<label class='dialog-close'>X</label>";
                        dialoghtml += "</div>";
                        dialoghtml += "<div class='dialog-content'></div>";
                        dialoghtml += "<div class='dialog-bottom'><label id='dialog-sure'></label><label id='dialog-cancel'></label></div>";
                    dialoghtml += "</div>";
				dialoghtml += "</div>";			
                $body.append(dialoghtml);       
                

                /*插入弹窗内容*/
				if(settings.iframeUrl != ""){
					var $iframe = $('<iframe width="100%" height="100%" frameborder="0"></iframe>');
					$iframe.attr("src", settings.iframeUrl);			
					$('.dialog-content').append($iframe);
                };  
                
                if(settings.htmlContent != ""){
					$('.dialog-content').append(settings.htmlContent);
                };
                $('.dialog-content').width(settings.width).height(settings.height);
                $('#dialog-sure').text(settings.confirmText);
                $('#dialog-cancel').text(settings.cancelText);
                /*插入结束*/

                /*赋予弹窗上三个按钮的点击事件*/
				$('.dialog-close').click(function(){
					settings.diaCancel && settings.diaCancel();
					$('.dialog-container').empty();
					$('.dialog-container').remove();
                });
                $('#dialog-cancel').click(function() {
                    $('.dialog-close').trigger('click');
                });
                $('#dialog-sure').click(function() {
                    settings.diaConfirm && diaConfirm.closeWindow();
                    $('.dialog-close').trigger('click');
                });
                /*事件结束*/

                /*设置拖动*/
                if (settings.dragEnabled) {
                    $('.dialog').lets_drag();
                }
			},
		};	
		dialog.init();
	};
}(jQuery, window, document));
