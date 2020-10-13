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

