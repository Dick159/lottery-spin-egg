/**
 * @autho BGG
 * @date 2017年2月21日 PM ：19点51分
 *快速创建自定义按钮
* @param x             x位置
* @param y             y位置
* @param width         按钮宽
* @param height        按钮高
* @param bgColor       按钮颜色
* @param textColor     字体颜色
* @param text          字体内容
* @param hoverBgColor  点击后的按钮颜色
* @param hoverTextColor点击后的文字颜色
* @param borderWidth   边框粗细
* @param borderColor   边框颜色
* @returns {egret.DisplayObjectContainer}  返回该按钮对象
*/
function createButton(x,y,width,height,bgColor,textColor,text,hoverBgColor,hoverTextColor,borderWidth=0,borderColor=0x000000){
    var div = new egret.DisplayObjectContainer();
    div.x = x;
    div.y = y;
    var  shape = new egret.Shape();//形状对象
    shape.graphics.beginFill(bgColor);     //填充的颜色
    if(borderWidth&&borderColor!==undefined){//判断是否需要设置边框
        shape.graphics.lineStyle(borderWidth,borderColor);   //描边的粗细和颜色
    }
    shape.graphics.drawRect(0,0,width,height);//定义好形状
    shape.graphics.endFill();
    div.addChild(shape);
    var shape_text = new egret.TextField();
    shape_text.text = text;
    shape_text.width = shape.width;
    shape_text.height = shape.height;
    shape_text.textAlign="center";
    shape_text.verticalAlign="middle";
    shape_text.textColor=textColor;
    div.addChild(shape_text);

    div.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
        shape.graphics.beginFill(hoverBgColor);
        shape.graphics.drawRect(0,0,width,height);
        shape.graphics.endFill();
        shape_text.textColor = hoverTextColor;
    },div);
    div.addEventListener(egret.TouchEvent.TOUCH_END,function(){
        shape.graphics.beginFill(bgColor);
        shape.graphics.drawRect(0,0,width,height);
        shape.graphics.endFill();
        shape_text.textColor = textColor;
    },div);
    div.touchEnabled = true;    //开启点击侦听
    return div;
}


//图片按钮
function createBitButton(img,x,y,textColor,text,hoverImg,hoverTextColor){
    var div = new egret.DisplayObjectContainer();
    div.x = x;
    div.y = y;
    var bit=new egret.Bitmap(RES.getRes(img));
    div.addChild(bit);
    var shape_text = new egret.TextField();
    shape_text.text = text;
    shape_text.width = bit.width;
    shape_text.height = bit.height;
    shape_text.textAlign="center";
    shape_text.verticalAlign="middle";
    shape_text.textColor=textColor;
    div.addChild(shape_text);

    div.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
        bit.texture=RES.getRes(hoverImg);
        shape_text.textColor = hoverTextColor;
    },div);
    div.addEventListener(egret.TouchEvent.TOUCH_END,function(){
        bit.texture=RES.getRes(img);
        
        shape_text.textColor = textColor;
    },div);
    div.touchEnabled = true;    //开启点击侦听
    return div;
}
/**
 * 创建或重绘矩形图案
 * shape    如果传入一个shape对象，则表示重绘，不传入，则表示新增
 * x x位置
 * y y位置
 * width 宽度
 * height 高度
 * bgColor  填充颜色
 * borderColor 边框颜色
 * borderWidth 边框粗细
 */
function crawReactShape(shape,x=0,y=0,width=10,height=10,bgColor=0x000000,borderColor=0x000000,borderWidth=0){
    shape = shape?shape:new egret.Shape();
    shape.graphics.clear();
    shape.graphics.beginFill(bgColor);
    shape.graphics.lineStyle(borderWidth, borderColor);
    shape.graphics.drawRect(x, y, width, height);
    shape.graphics.endFill();
    return shape;
}
function drawReactShape(shape,x=0,y=0,width=10,height=10,bgColor=0xBC1717,borderColor=0xBC1717,borderWidth=2){
    shape = shape?shape:new egret.Shape();
    shape.graphics.clear();
    shape.graphics.beginFill(bgColor);
    shape.graphics.lineStyle(borderWidth, borderColor);
    shape.graphics.drawRect(x, y, width, height);
    shape.graphics.endFill();
    return shape;
}
function formatTime(time:number){
    var min:any=Math.floor((time/60));
    min=min<10?("0"+min):min;
    var second:any=time%60;
    second=second<10?("0"+second):second;
    return min+":"+second;
}
function createBitmap(img,x=0,y=0,name="",anchorOffsetX=0,anchorOffsetY=0,scaleX=1,scaleY=1,alpha=1){
    var bitmap=new egret.Bitmap(RES.getRes(img));
    bitmap.name=name?name:img;
    bitmap.x=x;
    bitmap.y=y;
    bitmap.anchorOffsetX=anchorOffsetX;
    bitmap.anchorOffsetY=anchorOffsetY;
    bitmap.scaleX=scaleX;
    bitmap.scaleY=scaleY;
    bitmap.alpha=alpha;
    return bitmap;
}

function createBitmapEui(img,x=0,y=0,name="",anchorOffsetX=0,anchorOffsetY=0,scaleX=1,scaleY=1,alpha=1){
    var bitmap=new eui.Image(RES.getRes(img));
    bitmap.name=name?name:img;
    bitmap.x=x;
    bitmap.y=y;
    bitmap.anchorOffsetX=anchorOffsetX;
    bitmap.anchorOffsetY=anchorOffsetY;
    bitmap.scaleX=scaleX;
    bitmap.scaleY=scaleY;
    bitmap.alpha=alpha;
    return bitmap;
}
/**
 * 
 * @param text
 * @param x
 * @param y
 * @param size
 * @param textColor
 * @param textAlign
 * @param width
 * @param height
 * @param verticalAlign
 * @param border
 * @param borderColor
 * @param multiline
 * @param type
 * @returns {egret.TextField}
 */
function createTextFiled(text="",x=0,y=0,size=30,textColor=0x000000,textAlign="center",width=0,height=0,verticalAlign="middle",border=false,borderColor=0x000000,multiline=false,type=egret.TextFieldType.DYNAMIC){
    var TextField = new eui.EditableText();
    TextField.textAlign = textAlign;
    TextField.verticalAlign = verticalAlign;
    TextField.size = size;
    TextField.x = x;
    TextField.y = y;
    //TextField.text = text;
    TextField.prompt = text;
    if(width){TextField.width = width}
    if(height){TextField.height = height}
    TextField.textColor = textColor;
    if(border){TextField.border = border;TextField.borderColor=borderColor}
    TextField.multiline = multiline;
    TextField.type = type;
    return TextField;
}



function createTextFiledNoEui(text="",x=0,y=0,size=30,textColor=0x000000,textAlign="center",width=0,height=0,verticalAlign="middle",border=false,borderColor=0x000000,multiline=false,type=egret.TextFieldType.DYNAMIC){
    var TextField = new egret.TextField();
    TextField.textAlign = textAlign;
    TextField.verticalAlign = verticalAlign;
    TextField.size = size;
    TextField.x = x;
    TextField.y = y;
    TextField.text = text;
    if(width){TextField.width = width}
    if(height){TextField.height = height}
    TextField.textColor = textColor;
    if(border){TextField.border = border;TextField.borderColor=borderColor}
    TextField.multiline = multiline;
    TextField.type = type;
    return TextField;
}


function setLocalStorage(key: string,value: any){
    egret.localStorage.setItem(key, value);
}

function getLocalStorage (key : string) {
    //  let value : string = localStorage.getItem(key);
    //  if (value && value != "undefined" && value != "null") {
    //     var data = JSON.parse(value);
    //     if(data.expired){
    //         var period = data.expired * 86400;
    //         var distance = (new Date().getTime() - data.startTime)/1000;
    //         if( distance - period >= 0){
    //             egret.localStorage.removeItem(key);
    //             return null;
    //         }else{
    //             return data;
    //         }
    //     }else{
    //         return data;
    //     }
    //  }
    //  return null;
    return localStorage.getItem(key);
}


function removeLocalStorage(key : string){
    egret.localStorage.removeItem(key);
}

function requestGet(postUrl:string,parameter:string){
    var request:egret.HttpRequest;
    request = new egret.HttpRequest();
    request.responseType = egret.HttpResponseType.TEXT;
    request.open(postUrl + parameter,egret.HttpMethod.GET);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");

    return request;
}

function requestPost_Lottery(postUrl:string,parameter:string){
    var request:egret.HttpRequest;
    request = new egret.HttpRequest();
    request.responseType = egret.HttpResponseType.TEXT;
    request.open(postUrl + parameter,egret.HttpMethod.POST);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    
    return request;
}


function requestRegisterPost(postUrl:string,parameter:string){
    var request:egret.HttpRequest;
    request = new egret.HttpRequest();
    request.responseType = egret.HttpResponseType.TEXT;
    request.open(postUrl + parameter,egret.HttpMethod.POST);
    request.setRequestHeader("Content-Type", "application/json");
    return request;
}


function requestPost(postUrl:string,parameter:string){
    var request:egret.HttpRequest;
    request = new egret.HttpRequest();
    request.responseType = egret.HttpResponseType.TEXT;
    request.open(postUrl + parameter,egret.HttpMethod.POST);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    return request;
}

function randomToken(){
    var token = egret.localStorage.getItem("token");
    if(!token){
      return this.uuid2(32);
    }
    return token;
}

function removeExpiredToken(existsSet,target){
    var n_s = []
    for(var i=0;i<existsSet.length;i++){
        if(existsSet[i] != target){
            n_s.push(existsSet[i]);
        }
    }
    return n_s;
}


function uuid2(len, radix) {
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	var uuid = [],
		i;
	radix = radix || chars.length;

	if (len) {
		for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
	} else {

		var r;
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}

	return uuid.join('');
}

function generateSessionToken(){
    return this.uuid2(16);
}


function createRegisterLoginPage(){
    // 添加注册登录也页面
    var loginRegist = createBitmap("login_regist_jpg",375, 603);
    loginRegist.width = 750;
    loginRegist.height = 1206;
    loginRegist.anchorOffsetX = loginRegist.width * .5;
    loginRegist.anchorOffsetY = loginRegist.height * .5;
    loginRegist.touchEnabled = true;
    return loginRegist;
}


function createRegisterLoginButton(x,y){
        var LoginRegisterbutton = new eui.Button();
        // LoginRegisterbutton.width = 200;
        // LoginRegisterbutton.height = 80;
        //LoginRegisterbutton.x = 253;
        //LoginRegisterbutton.y = 850;
        LoginRegisterbutton.x = x;
        LoginRegisterbutton.y = y;
        LoginRegisterbutton.label = "";
        LoginRegisterbutton.skinName = "resource/eui_skins/ButtonSkin.exml";
        return LoginRegisterbutton;
}



function createRedeemButton(x,y){
        var redeemBUtton = new eui.Button();
        // LoginRegisterbutton.width = 200;
        // LoginRegisterbutton.height = 80;
        //LoginRegisterbutton.x = 253;
        //LoginRegisterbutton.y = 850;
        redeemBUtton.x = x;
        redeemBUtton.y = y;
        redeemBUtton.label = "";
        redeemBUtton.skinName = "resource/eui_skins/redeemButtonSkin.exml";
        return redeemBUtton;
}

function getPrizeResult(){
        var result = getLocalStorage( egret.localStorage.getItem("token"));
        if(result){
            return result;
        }else{
            return mc_content.Play;
        }
}

function checkDate(dateStr) {
　　dateStr = dateStr.replace(/\//g, '-');
　　var dateReg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
　　var rValue = dateStr.match(dateReg);
　　if (rValue == null) {
　　　　return false;
　　}
　　rValue[1] = parseInt(rValue[1], 10);
　　rValue[2] = parseInt(rValue[2], 10) -1 ;
　　rValue[3] = parseInt(rValue[3], 10);
　　var dateObj = new Date(rValue[1], rValue[2], rValue[3]);
　　if (dateObj.getFullYear() != rValue[1] || dateObj.getMonth() != rValue[2] || dateObj.getDate() != rValue[3]) {
　　　　return false;
　　}
　　return true;
}


function random_num(min:number,max:number){
        let Range = max - min;  
        let Rand = Math.random();  
        return (min + Math.round(Rand * Range));  
}

function glowFilter(_color,_alpha,_blurX,_blurY,_strength,_inner,_knockout){
        const color: number = _color;                             /// 光晕的颜色，十六进制，不包含透明度
        const alpha: number = _alpha;                                  /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        const blurX: number = _blurX;                                   /// 水平模糊量。有效值为 0 到 255.0（浮点）
        const blurY: number = _blurY;                                   /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        const strength: number = _strength;                                 /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        const quality: number = egret.BitmapFilterQuality.HIGH;     /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        const inner: boolean = _inner;                               /// 指定发光是否为内侧发光，
        const knockout: boolean = _knockout;                            /// 指定对象是否具有挖空效果
        const glowFilter: egret.GlowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        return glowFilter;
}

function createShaderMask(width,height,color,alpha){
    var  shape = new egret.Shape();//形状对象
    shape.graphics.beginFill(color,alpha);     //填充的颜色

    shape.graphics.drawRect(0,0,width,height);//定义好形状
    shape.graphics.endFill();
    return shape;
}

function loading(flag){
    if(flag){
        document.getElementById("preloading").style.display = "block";
    }else{
        document.getElementById("preloading").style.display = "none";
    }
}


function startWith(str:string,t:string){
    if(str && t){
        var s_str = str.substr(0,t.length);
        if(s_str == t){
            return true;
        }
    }
    return false;
}


function createEuiLabelText(text:string,textColor,size){
    var label = new eui.Label;
    label.text = text;
    label.textColor = textColor;
    label.size = size;
    return label;
}
 
function middleObject(parentWidth,obj){
    obj.x = (parentWidth - obj.width) * 0.5;
}


function setLocalStorageList(key,value){
    if(!getLocalStorage(key)){
        let newlist = [value]
        egret.localStorage.setItem(key,  JSON.stringify(newlist));
    }
    else{
        let list = JSON.parse(getLocalStorage(key));
        if(list.indexOf(value) < 0){
            list.push(value);
            egret.localStorage.setItem(key,JSON.stringify(list));
        }
    }
}

function getLocalStorageList(key){
    if(!getLocalStorage(key)){
        return [];
    }
    let list = JSON.parse(getLocalStorage(key));
    return list;
}

function putNonBindingTokenId(){
      setLocalStorage(Main.NBD_TOKEN_SYB,getLocalStorage(Main.TOKENID_SYB));
}

function removeNonBindTokenId(){
      removeLocalStorage(Main.NBD_TOKEN_SYB);
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function delParam(paramKey) {
        var url = window.location.href;    //页面url
        var urlParam = window.location.search.substr(1);   //页面参数
        var beforeUrl = url.substr(0, url.indexOf("?"));   //页面主地址（参数之前地址）
        var nextUrl = "";

        var arr = new Array();
        if (urlParam != "") {
            var urlParamArr = urlParam.split("&"); //将参数按照&符分成数组
            for (var i = 0; i < urlParamArr.length; i++) {
                var paramArr = urlParamArr[i].split("="); //将参数键，值拆开
                if (paramArr[0] != paramKey) {
                    arr.push(urlParamArr[i]);
                }
            }
        }
        if (arr.length > 0) {
            nextUrl = "?" + arr.join("&");
        }
        url = beforeUrl + nextUrl;
        return url;
}


function checkExpiredDate(_date){
        if(!getLocalStorage(Main.CURRENT_DATE)){
                setLocalStorage(Main.CURRENT_DATE,_date);
        }
        else{
            var cur_date = getLocalStorage(Main.CURRENT_DATE);
            if(_date >cur_date){
                removeLocalStorage(Main.PAYED_SYN);
                setLocalStorage(Main.CURRENT_DATE,_date);
            }
        }
}