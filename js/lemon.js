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
			}());
			function changeLi() {
				var nowLi = $("#descriptUl li:visible");
				var nextLi = nowLi.val() == "3" ?  $("#descriptUl li:first"): nowLi.next();
				var nowRound = $(".roundHolder .whiteRound");
				console.log(nowRound.text())
				var nextRound = nowRound.val() == "3" ? $(".roundHolder li:first") : nowRound.next();
				setTimeout(function() {
					nowLi.css("display", "none");
					nextLi.css("display", "block");
					nextRound.addClass("whiteRound");
					nextRound.siblings().removeClass("whiteRound");
					
					setTimeout(changeLi(),4000);
				},3000)
			};
			changeLi()