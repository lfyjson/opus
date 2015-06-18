// JavaScript Document


function getStyle(obj, name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name]
	}else
	{
		return getComputedStyle(obj, false)[name];
	}
};
function StartMove(obj,json,FnEnd)
{
	clearInterval(obj.timer)
	obj.timer=setInterval(function()
	{
			var bStop=true;
			for (var attr in json)
			{
				var cut=0;
					if(attr=='opacity')
					{
						cut=Math.round(parseFloat(getStyle(obj, attr))*100)
					}
					else
					{
						cut=(parseInt(getStyle(obj, attr)))
					}
				var speed=(json[attr]-cut)/6
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				
					if(cut!=json[attr])
					bStop=false;
					
					if(attr=='opacity')
					{
						obj.style.filter='alpha(opacity:'+cut+speed+')'
						obj.style.opacity=(cut+speed)/100;
					}
					else
					{
						obj.style[attr]=cut+speed+'px'
					}
				
			}
				
					if(bStop)
					{
						clearInterval(obj.timer)
						if(FnEnd)FnEnd();
					}
			
	}, 30)
};

function getByClass(oParent, sClass)
{
	var oEle=oParent.getElemenstByTagName('*')
	var aResult=[];
	for(var i=0;i<oEle.length;i++)
	{
		if(oEle[i].className==sClass)
		{
			aResult.push(oEle[i])
		}
		
	}
	return aResult;
}
