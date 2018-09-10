$(document).ready(function(e) {
	/*silod轮播*/
    var unslider04 = $('#hdslide').unslider({
        dots: true
    }),
    data04 = unslider04.data('unslider');
     
    $('.unslider-arrow04').click(function() {
        var fn = this.className.split(' ')[1];
        data04[fn]();
    });
    /*ip-desc*/
   var copyLi1=$('.center1').find('li');
   var copyLi2=$('.center2').find('li');
   copyLi1.each(function(index,value){
   	$(value).mouseover(function(e){
			$('.center1').addClass('centerhover');
			e.stopPropagation();
		});
		$(value).mouseout(function(e){
			$('.center1').removeClass('centerhover');
			e.stopPropagation();
		});
   });
   copyLi2.each(function(index,value){
   	$(value).mouseover(function(e){			
			$('.center2').css('animation-play-state','paused');			
			e.stopPropagation();
		});
		$(value).mouseout(function(e){			
			$('.center2').css('animation-play-state','running');
			e.stopPropagation();
		});
   });
   
   /*home-app*/
   var appAs=$('#tabApp').find('a');
   appAs.each(function(index,value){
   		$(value).click(function(e){			
			leaderMove(value);
			tabPanelMove(value);
			e.stopPropagation();
		});
   });
   
	function leaderMove(obj){
		var currA=$('.tab-tab .active');
			currA.removeClass('active');
			$(obj).addClass('active');
			var fristLeft=$(appAs[0]).offset().left;
			var currLeft=$(obj).offset().left-fristLeft;
			var currWidth=$(obj).outerWidth();
			var tabLine=$('#tabLine');
			tabLine.css({'transform':'translateX('+currLeft+'px)','width':currWidth+'px'});
	}
	function tabPanelMove(obj){
		var ilId=$(obj).data('rel');
		var currPanel=$('.tab-panel .active');
		currPanel.removeClass('active');
		$('#'+ilId).addClass('active');
	}
	
	/*barX*/
	$(window).scroll(function(){
		var top=$(window).scrollTop();
		if (top!=0) {
			addFixed(top);
			changeActive(top);
		} else{
			removeFixed();
		}
		
	});
	
	function addFixed(top){
		$('#barX').addClass('barX-fixed');
			if(top<=50){
				$('#barX').css('opacity',top*top*0.001);
			}else{
				$('#barX').css('opacity','1');
			}	
	}
	
	function removeFixed(){
		$('#barX').removeClass('barX-fixed');
		$('#barX').css('opacity','1');
	}
	
	function changeActive(top){
		var currentId='';
		$('.page>div[id]').each(function(index,value){
			var itemTop=$(value).offset().top;
			if(itemTop-150<top){
				currentId='#'+$(value).attr('id'); /*不带#*/
			}else{
				return false;
			}
		});
		currentActive=$('#nav .active');
		if(currentId&&currentActive.attr('href')!=currentId){
			currentActive.removeClass('active');
			$('[href='+currentId+']').addClass('active');
		}
	}
	/*barX-a*/
	$('.nav>a').each(function(index,value){
		$(value).click(function(e){
			e.preventDefault();
			var aId=$(this).attr('href');
			var top=$(aId).offset().top-73;
			$('html,body').animate({scrollTop:top},'slow','swing');
		});
	});
	
	/*brand*/
	var $brandNav=$('#brandNavX');
	var activeA=$brandNav.find('a:first');
	var timer
	var $brandDesc=$('#brandDesc');
	var Dindex
	var PrevDindex
	var PrevLi
	var ActiveLi
	$brandNav
	.on('mouseenter','a',function(e){
		if(timer){
			clearTimeout(timer);
		}
		timer=setTimeout(function(){		
			activeA.removeClass('active');	
			PrevDindex=activeA.data('index')-1;
			PrevLi=$brandDesc.find('il:eq('+PrevDindex+')');
			PrevLi.removeClass('in').addClass('out');		
			if($(e.target).get(0).tagName==='A'){
				activeA=$(e.target).addClass('active');
			}else{
				activeA=$(e.target).parents('a').addClass('active');
			}
			Dindex=activeA.data('index')-1;
			ActiveLi=$brandDesc.find('il:eq('+Dindex+')');
			if(PrevDindex<=Dindex){
				PrevLi.removeClass('revers');
				ActiveLi.removeClass('out revers').addClass('in');
			}else if(PrevDindex>Dindex){
				PrevLi.addClass('revers');
				ActiveLi.removeClass('out').addClass('in revers');
			}
		},250);	
	})
});
