
(function($){
	$.fn.preview = function(){
		var xOffset = 10; //横向偏移量
		var yOffset = 20; //纵向偏移量
		var w = $(window).width(); //页面宽度
		$(this).each(function(){
			$(this).hover(function(e){

				//检测图片和文字来生成不同的容器
				if(/.png$|.gif$|.jpg$|.bmp$/.test($(this).attr("href"))){
					$("body").append("<div id='preview'><div><img src='"+$(this).attr('href')+"' /><p>"+$(this).attr('title')+"</p></div></div>");
				}else{
					$("body").append("<div id='preview'><div><p>"+$(this).text()+"</p></div></div>");
				}
				$("#preview").css({
					position:"absolute",
					padding:"4px",
					border:"1px solid #f3f3f3",
					backgroundColor:"#eeeeee",
					top:(e.pageY - yOffset) + "px", //鼠标位置减去纵向偏移量来定位到鼠标偏上的位置
					zIndex:1000
				});
				$("#preview > div").css({
					padding:"5px",
					backgroundColor:"white",
					border:"1px solid #cccccc"
				});
				$("#preview > div > p").css({
					textAlign:"center",
					fontSize:"12px",
					padding:"8px 0 3px",
					margin:"0"
				});
				if(e.pageX < w/2){

					//鼠标在页面左侧则靠左展示淡入
					$("#preview").css({
						left: e.pageX + xOffset + "px",
						right: "auto"
					}).fadeIn("fast");
				}else{

					//鼠标在右边则靠左展示淡入
					$("#preview").css("right",(w - e.pageX + yOffset) + "px").css("left", "auto").fadeIn("fast");	
				}
			},function(){

				//鼠标移出则删除
				$("#preview").remove();
			}).mousemove(function(e){

				//在a元素上移动时进行位置改变
				$("#preview").css("top",(e.pageY - xOffset) + "px")
				if(e.pageX < w/2){
					$("#preview").css("left",(e.pageX + yOffset) + "px").css("right","auto");
				}else{
					$("#preview").css("right",(w - e.pageX + yOffset) + "px").css("left","auto");
				}
			});						  
		});
	};
})(jQuery);