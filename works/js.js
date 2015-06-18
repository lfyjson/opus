window.onload = function(){
	
	my.tools.toRolling();
	my.tools.banner();
	my.tools.head();
	my.tools.picRoling();
	
}
var my = {};

my.tools = {};

my.ui = {};

my.app = {};

my.app.getStyle = function(obj,name){

	if(obj.currentStyle)
	{
		return obj.currentStyle[name]
	}
	else{
		return getComputedStyle(obj,false)[name]
	}
}

my.app.getByClass = function(oParent,sClass){
	
	var result = []
	var aEle = oParent.getElementsByTagName('*')
	
	for(var i=0;i<aEle.length;i++)
	{
		if(aEle[i].className == sClass)
		{
			result.push(aEle[i]);
		}
	}
		return result;

}


my.tools.head = function(){
	
	var oNav = document.getElementById('nav');
	var aLi = oNav.getElementsByTagName('li');
	var aMenu = my.app.getByClass(oNav,'menu2')
	
	
	for(var i=0;i<aLi.length;i++)
	{
		aLi[i].index = i;
		aLi[i].onmouseover = function(){
			
			for (var i=0;i<aLi.length;i++)
			{
				aLi[i].className = '';
				//aMenu[i].style.display='none'; 当li数量与menu等同使用此隐藏所有
			}
			
			//aMenu[this.index].style.display = 'block'; 当li数量与menu等同使用此显示当前
			this.className = 'active';
			if(this.children[1]) {
				StartMove(this.children[1], {opacity: 100});
				//this.children[1].setAttribute('height', this.children[1].offsetHeight); 
			}
			
		}
		
		aLi[i].onmouseout = function(){
			
			for (var i=0;i<aLi.length;i++)
			{
				aLi[i].className = '';
				
			}
			this.className = 'active';
			if(this.children[1]) {
				StartMove(this.children[1], {opacity: 0});
			}
		}
		
	}
}

my.tools.toRolling = function(){
	var oScroll = document.getElementById('scroll');
	var aLi = oScroll.getElementsByTagName('li');
	
	var PrveBtn = my.app.getByClass(oScroll,'prve_btn')[0];
	var NextBtn = my.app.getByClass(oScroll,'next_btn')[0];
	
	var arr = [];
	
	for(var i=0;i<aLi.length;i++)
	{
		var oImg = aLi[i].getElementsByTagName('img')[0];
		
		arr.push([ parseInt(my.app.getStyle(aLi[i] ,'left')) , parseInt(my.app.getStyle(aLi[i] ,'top')) ,  my.app.getStyle(aLi[i] ,'opacity')*100 , my.app.getStyle(aLi[i] ,'zIndex') , oImg.width ])
	}
	
	PrveBtn.onclick = function(){
		
		arr.push(arr[0]);
		arr.shift();
		
		for(var i=0;i<aLi.length;i++)
		{
			var oImg = aLi[i].getElementsByTagName('img')[0];
			
			aLi[i].style.zIndex = arr[i][3];
			
			StartMove(aLi[i],{left : arr[i][0] , top : arr[i][1] , opacity : arr[i][2] }  )
			
			StartMove(oImg, {width : arr[i][4]})
		}
		
		
	}
	
	NextBtn.onclick = function(){
		
		arr.unshift(arr[arr.length-1]);
		arr.pop();
		
		for(var i=0;i<aLi.length;i++)
		{
			var oImg = aLi[i].getElementsByTagName('img')[0];
			
			aLi[i].style.zIndex = arr[i][3];
			
			StartMove(aLi[i],{left : arr[i][0] , top : arr[i][1] , opacity : arr[i][2] }  )
			
			StartMove(oImg, {width : arr[i][4]})
		}
		
		
	}
}


my.tools.banner = function(){
	
	var oBanner = document.getElementById('banner');
	var aPrve = my.app.getByClass(oBanner,'prve')[0];
	var aNext = my.app.getByClass(oBanner,'next')[0];
	var aOl = oBanner.getElementsByTagName('ol')[0];
	var aUl = oBanner.getElementsByTagName('ul')[0];
	var oA = aOl.getElementsByTagName('a');
	var aLi = oBanner.getElementsByTagName('li');
	var oImg = aUl.getElementsByTagName('img');
	var now =0;
	
	
	
	var aimgWidth = 1920;
	
	aUl.innerHTML += aUl.innerHTML;
	aUl.style.width = aimgWidth * oImg.length + 'px';
	
	
	function toresize()
	{
		
		    var viewWidth = document.documentElement.clientWidth;
			
			if(viewWidth>1000)
			{
				for(var i=0;i<oImg.length;i++)
				{
					oImg[i].style.left = - (aimgWidth - viewWidth)/2 + 'px';
				}
			}
	}
	
	toresize();
	
	window.onresize = function()
	{
		toresize()
	}
	
	

	for(var i=0;i<oA.length;i++){
		 
		oA[i].index = i;
		oA[i].onmouseover = function(){
			
			for(var i=0;i<oA.length;i++)
			{
				oA[i].className = '';
			}	
			
			this.className = 'active'
			StartMove(aUl,{left : - this.index * aimgWidth});
		}
	};
	
	
	timer = setInterval(next,2000)
	
	function next(){
		now++;
			for(var i=0;i<oA.length;i++)
			{
				oA[i].className = '';
			}
			if(now >= aLi.length/2)
			{
				oA[0].className = 'active'
			}else{
				oA[now].className = 'active'	
			}
			
			StartMove(aUl,{left : - now * aimgWidth},function(){
				if(now == aLi.length/2)
				{
					now = 0; 
					aUl.style.left=0;
				}
			}) 	
		
		
		
		
		
		
	}
	
	 
	
	oBanner.onmousemove = function(){
		clearInterval(timer)
	}
	oBanner.onmouseout = function(){
		timer = setInterval(next,3000)
	}
		
}


my.tools.picRoling = function(){

	var PicRolling = document.getElementById('pic_rolling');
	var oBtnNext =  my.app.getByClass(PicRolling,'pic_next')[0];
	var oBtnPrve =  my.app.getByClass(PicRolling,'pic_prve')[0];
	var PicRollingW = document.getElementById('rolling_warp');
	var oUl = PicRollingW.getElementsByTagName('ul')[0];
	var oLi = oUl.getElementsByTagName('li');
	
	
	//oUl.innerHTML += oUl.innerHTML;
	oUl.style.width = oLi[0].offsetWidth * oLi.length + 'px';
	
	var now3 = 0;
	

	
	oBtnPrve.onclick=function()
	{
		now3--;
		
		
		if(now3==-1)
		{
			now3= 0;	
		};
		StartMove(oUl,{left: -oLi[0].offsetWidth * now3})
	};
	
	oBtnNext.onclick=function(){
		
		now3++;
		if(now3 >= oLi.length - Math.ceil((PicRollingW.offsetWidth / oLi[0].offsetWidth)-1))
		{
			now3--;
		};
		
		StartMove(oUl,{left: -oLi[0].offsetWidth * now3})
	};
}