window.onload=function()
{
	my.app.toText();
	my.app.toSel();
	my.app.toRun();
};

var my = {};

my.tools = {};

my.tools.getByClass = function(oParent,sClass)
{
	var aResult = [];
	var aEle = oParent.getElementsByTagName('*')
	
	for(var i=0;i<aEle.length;i++)
	{
		if(aEle[i].className == sClass)
		{
			aResult.push(aEle[i]);
		}
	}
	return aResult;
};


my.tools.getByStyle = function(obj,name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj,false)[name];
	}
}

my.ui = {};

my.ui.moveLeft = function(obj,old,now)
{
	clearInterval(obj.timer)
	obj.timer = setInterval(function(){
	var iSpeed = (now - old)/10
	iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
	if(old == now)
	{
		clearInterval(obj.timer)
	}
	else{
		
		old += iSpeed;
		obj.style.left = old + 'px'; 
	}
	
	}, 30)
}

my.ui.toText = function(obj,str)
{
	obj.onfocus = function()
	{
		if(this.value == str)
		{
			this.value = '';
		}
	}
	obj.onblur = function()
	{
		if(this.value == '')
		{
			this.value = str;
		}
	}
}

my.app = {};


my.app.toText = function()
{
	var oText1 = document.getElementById('text1')
	var oText2 = document.getElementById('text2')
	
	my.ui.toText(oText1,'Search website')
	my.ui.toText(oText2,'Search website')
}



my.app.toSel = function()
{
	var oSel = document.getElementById('sort');
	var aDd = oSel.getElementsByTagName('dd');
	var aH2 = oSel.getElementsByTagName('H2');
	var aUl = oSel.getElementsByTagName('ul');
	
	for(var i=0;i<aDd.length;i++)
	{
		aDd[i].index = i;
		
		aDd[i].onclick = function(ev)
		{
			var ev = ev || event;
			var This = this;
			
			for(var i=0;i<aUl.length;i++)
			{
				aUl[i].style.display = 'none';
			}
			
			aUl[this.index].style.display = 'block';
			
			document.onclick = function()
			{
				aUl[This.index].style.display = 'none';
			}
			
			ev.cancelBubble = true;
		}
	}
	
	for(var i=0;i<aUl.length;i++)
	{
		aUl[i].index = i;
		
		(function(ul){
		
			var aLi = ul.getElementsByTagName('li');
			for(var i=0;i<aLi.length;i++)
			{
				aLi[i].onmouseover = function()
				{
					this.className = 'active';
				}
				aLi[i].onmouseout = function()
				{
					this.className = '';
				}
				
				aLi[i].onclick = function(ev)
				{
					var ev = ev||event;
					aH2[this.parentNode.index].innerHTML = this.innerHTML;
					ev.cancelBubble = true;
					this.parentNode.style.display = 'none';
				}
			}
		
		}(aUl[i]))
	}
}


my.app.toRun = function()
{
	var oRun = document.getElementById('run1');
	var aUl = oRun.getElementsByTagName('ul')[0];
	var aLi = oRun.getElementsByTagName('li');
	
	aUl.innerHTML +=aUl.innerHTML;
	aUl.style.width = aLi.length * aLi[0].offsetWidth + 'px';
	
	var iNow = 0;
	var oPrev = my.tools.getByClass(oRun,'prve')[0];
	var oNext = my.tools.getByClass(oRun,'next')[0];
	
	oNext.onclick = function()
	{
		if(iNow == aLi.length/2)
		{
			iNow = 0;
			aUl.style.left = 0;
		}
		my.ui.moveLeft(aUl,-iNow*aLi[0].offsetWidth,-(iNow+1)*aLi[0].offsetWidth);
		
		iNow++;
	}
	oPrev.onclick = function()
	{
		if(iNow == 0)
		{
			iNow = aLi.length/2;
			aUl.style.left = aUl.offsetWidth/2 + 'px';
		}
		my.ui.moveLeft(aUl,-iNow*aLi[0].offsetWidth,-(iNow-1)*aLi[0].offsetWidth);
		
		iNow--;
	}
}
