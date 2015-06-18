var my = {}
my.app = {}

my.app.banner = function(){
	var Warp = document.getElementById('warp');
	
	var P = getByClass(Warp,'photo')[0];
	var aUl = P.getElementsByTagName('ul')[0];
	var aLi = aUl.getElementsByTagName('li');
	var aImg = aUl.getElementsByTagName('img');
	var aImgWidth = 1920;
	var aImgHeight = 408;
	
	aUl.style.width = aLi.length*aImgWidth+'px'
	
	var Ctrl = getByClass(Warp,'ctrl')[0];

	var oUl = Ctrl.getElementsByTagName('ul')[0];
	var oLi = oUl.getElementsByTagName('li');

	
	
	function toresize(){
		var viewWidth = document.documentElement.clientWidth;
		var viewHeight = document.documentElement.clientHeight;
		
		
		if(viewHeight > 500)
		{
			P.style.height = viewHeight - 112 + 'px';
			
			for (var i=0;i<aImg.length;i++)
			{
				aImg[i].style.top = - ((aImg[0].offsetHeight) - P.offsetHeight)/2 + 'px';
			}
		}
		if(viewWidth >1000 )
		{
			for(var i=0;i<aImg.length;i++)
			{
				aImg[i].style.left = -(aImgWidth - viewWidth)/2 + 'px'
			}
		}
		
	}
	toresize();
	
	window.onresize = function(){
		toresize();
	}
	
	var now = 0;
	for(var i=0;i<oLi.length;i++)
	{
		oLi[i].index=i;
		oLi[i].onmouseover=function(){
			var now=this.index
			for(var i=0;i<oLi.length;i++)
			{
				oLi[i].className='';
			}
			oLi[this.index].className='active';
			StartMove(aUl,{left : -aImgWidth*now})
		}
		
	}
	
}

my.app.banner();
