$(function(){
	$("#descriptUl li:not(':first')").css("display", "none");
    $(".roundHolder li:first").addClass("whiteRound");
	$(".roundHolder li:first").css("margin-left","150px");
	$("#toGit").click(function() {
		location.href = "https://github.com/lemondreamtobe";
	});
	$("#toweChat").click(function() {
	    if ($("#personPic").attr("src") == "html/images/IMG_1443.JPG") {
            $("#personPic").attr("src", "html/images/IMG_5349.JPG");
        } else if($("#personPic").attr("src") == "html/images/IMG_5349.JPG") {
            $("#personPic").attr("src", "html/images/IMG_1443.JPG");
        }
    });
    $('#toBlog').click(function() {
        location.href = "http://www.lemon-zhang.cn/myblog/index.html";
    })
    changeLi();  //列表轮播
    // changeImg(); //兴趣图片轮播
}());

//三个li的循环播放
function changeLi() {
    var nowLi = $("#descriptUl li:visible");
    var nextLi = nowLi.val() == "3" ?  $("#descriptUl li:first"): nowLi.next();
    var nowRound = $(".roundHolder .whiteRound");
    var nextRound = nowRound.val() == "3" ? $(".roundHolder li:first") : nowRound.next();
    setTimeout(function() {
        nowLi.css("display", "none");
        nextLi.css("display", "block");
        nextRound.addClass("whiteRound");
        nextRound.siblings().removeClass("whiteRound");
					
        setTimeout(changeLi(),4000);
    },3000)
};

//五个兴趣图片的循环播放
function  changeImg() {
   var imgArray = $('.hobbit-img img');
   var srcArray = [];
   var imgArray_s = Array.prototype.slice.call(imgArray);
   imgArray_s.forEach(function (item, index) {
       srcArray.push(item.src);
   });
   setTimeout(function () {
       var lastImg = srcArray.pop();
       srcArray.unshift(lastImg);
       for (var i = 0; i < imgArray_s.length; i++) {
           imgArray_s[i].src = srcArray[i];
       };
       setTimeout(changeImg, 2000);
   },2000);
};

