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
function createButton(x, y, width, height, bgColor, textColor, text, hoverBgColor, hoverTextColor, borderWidth, borderColor) {
    if (borderWidth === void 0) { borderWidth = 0; }
    if (borderColor === void 0) { borderColor = 0x000000; }
    var div = new egret.DisplayObjectContainer();
    div.x = x;
    div.y = y;
    var shape = new egret.Shape(); //形状对象
    shape.graphics.beginFill(bgColor); //填充的颜色
    if (borderWidth && borderColor !== undefined) {
        shape.graphics.lineStyle(borderWidth, borderColor); //描边的粗细和颜色
    }
    shape.graphics.drawRect(0, 0, width, height); //定义好形状
    shape.graphics.endFill();
    div.addChild(shape);
    var shape_text = new egret.TextField();
    shape_text.text = text;
    shape_text.width = shape.width;
    shape_text.height = shape.height;
    shape_text.textAlign = "center";
    shape_text.verticalAlign = "middle";
    shape_text.textColor = textColor;
    div.addChild(shape_text);
    div.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
        shape.graphics.beginFill(hoverBgColor);
        shape.graphics.drawRect(0, 0, width, height);
        shape.graphics.endFill();
        shape_text.textColor = hoverTextColor;
    }, div);
    div.addEventListener(egret.TouchEvent.TOUCH_END, function () {
        shape.graphics.beginFill(bgColor);
        shape.graphics.drawRect(0, 0, width, height);
        shape.graphics.endFill();
        shape_text.textColor = textColor;
    }, div);
    div.touchEnabled = true; //开启点击侦听
    return div;
}
//图片按钮
function createBitButton(img, x, y, textColor, text, hoverImg, hoverTextColor) {
    var div = new egret.DisplayObjectContainer();
    div.x = x;
    div.y = y;
    var bit = new egret.Bitmap(RES.getRes(img));
    div.addChild(bit);
    var shape_text = new egret.TextField();
    shape_text.text = text;
    shape_text.width = bit.width;
    shape_text.height = bit.height;
    shape_text.textAlign = "center";
    shape_text.verticalAlign = "middle";
    shape_text.textColor = textColor;
    div.addChild(shape_text);
    div.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
        bit.texture = RES.getRes(hoverImg);
        shape_text.textColor = hoverTextColor;
    }, div);
    div.addEventListener(egret.TouchEvent.TOUCH_END, function () {
        bit.texture = RES.getRes(img);
        shape_text.textColor = textColor;
    }, div);
    div.touchEnabled = true; //开启点击侦听
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
function crawReactShape(shape, x, y, width, height, bgColor, borderColor, borderWidth) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (width === void 0) { width = 10; }
    if (height === void 0) { height = 10; }
    if (bgColor === void 0) { bgColor = 0x000000; }
    if (borderColor === void 0) { borderColor = 0x000000; }
    if (borderWidth === void 0) { borderWidth = 0; }
    shape = shape ? shape : new egret.Shape();
    shape.graphics.clear();
    shape.graphics.beginFill(bgColor);
    shape.graphics.lineStyle(borderWidth, borderColor);
    shape.graphics.drawRect(x, y, width, height);
    shape.graphics.endFill();
    return shape;
}
function drawReactShape(shape, x, y, width, height, bgColor, borderColor, borderWidth) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (width === void 0) { width = 10; }
    if (height === void 0) { height = 10; }
    if (bgColor === void 0) { bgColor = 0xBC1717; }
    if (borderColor === void 0) { borderColor = 0xBC1717; }
    if (borderWidth === void 0) { borderWidth = 2; }
    shape = shape ? shape : new egret.Shape();
    shape.graphics.clear();
    shape.graphics.beginFill(bgColor);
    shape.graphics.lineStyle(borderWidth, borderColor);
    shape.graphics.drawRect(x, y, width, height);
    shape.graphics.endFill();
    return shape;
}
function formatTime(time) {
    var min = Math.floor((time / 60));
    min = min < 10 ? ("0" + min) : min;
    var second = time % 60;
    second = second < 10 ? ("0" + second) : second;
    return min + ":" + second;
}
function createBitmap(img, x, y, name, anchorOffsetX, anchorOffsetY, scaleX, scaleY, alpha) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (name === void 0) { name = ""; }
    if (anchorOffsetX === void 0) { anchorOffsetX = 0; }
    if (anchorOffsetY === void 0) { anchorOffsetY = 0; }
    if (scaleX === void 0) { scaleX = 1; }
    if (scaleY === void 0) { scaleY = 1; }
    if (alpha === void 0) { alpha = 1; }
    var bitmap = new egret.Bitmap(RES.getRes(img));
    bitmap.name = name ? name : img;
    bitmap.x = x;
    bitmap.y = y;
    bitmap.anchorOffsetX = anchorOffsetX;
    bitmap.anchorOffsetY = anchorOffsetY;
    bitmap.scaleX = scaleX;
    bitmap.scaleY = scaleY;
    bitmap.alpha = alpha;
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
function createTextFiled(text, x, y, size, textColor, textAlign, width, height, verticalAlign, border, borderColor, multiline, type) {
    if (text === void 0) { text = ""; }
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (size === void 0) { size = 30; }
    if (textColor === void 0) { textColor = 0x000000; }
    if (textAlign === void 0) { textAlign = "center"; }
    if (width === void 0) { width = 0; }
    if (height === void 0) { height = 0; }
    if (verticalAlign === void 0) { verticalAlign = "middle"; }
    if (border === void 0) { border = false; }
    if (borderColor === void 0) { borderColor = 0x000000; }
    if (multiline === void 0) { multiline = false; }
    if (type === void 0) { type = egret.TextFieldType.DYNAMIC; }
    var TextField = new egret.TextField();
    TextField.textAlign = textAlign;
    TextField.verticalAlign = verticalAlign;
    TextField.size = size;
    TextField.x = x;
    TextField.y = y;
    TextField.text = text;
    if (width) {
        TextField.width = width;
    }
    if (height) {
        TextField.height = height;
    }
    TextField.textColor = textColor;
    if (border) {
        TextField.border = border;
        TextField.borderColor = borderColor;
    }
    TextField.multiline = multiline;
    TextField.type = type;
    return TextField;
}
function setLocalStorage(key, value, expiredDay) {
    if (expiredDay === void 0) { expiredDay = 0; }
    if (value) {
        var _value = {};
        _value = {
            "value": value,
            "expired": expiredDay,
            "startTime": new Date().getTime()
        };
        egret.localStorage.setItem(key, JSON.stringify(_value));
    }
}
function getLocalStorage(key) {
    var value = localStorage.getItem(key);
    if (value && value != "undefined" && value != "null") {
        var data = JSON.parse(value);
        if (data.expired) {
            var period = data.expired * 86400;
            var distance = (new Date().getTime() - data.startTime) / 1000;
            if (distance - period >= 0) {
                egret.localStorage.removeItem(key);
                return null;
            }
            else {
                return data;
            }
        }
        else {
            return data;
        }
    }
    return null;
}
function requestGet(postUrl, parameter) {
    var request;
    request = new egret.HttpRequest();
    request.responseType = egret.HttpResponseType.TEXT;
    request.open(postUrl + parameter, egret.HttpMethod.GET);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    return request;
}
function requestPost(postUrl, parameter) {
    var request;
    request = new egret.HttpRequest();
    request.responseType = egret.HttpResponseType.TEXT;
    request.open(postUrl + parameter, egret.HttpMethod.POST);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    //request.setRequestHeader("clientID","mbs-repo-client-001");
    return request;
}
function randomToken() {
    return this.uuid2(32);
}
function removeExpiredToken(existsSet, target) {
    var n_s = [];
    for (var i = 0; i < existsSet.length; i++) {
        if (existsSet[i] != target) {
            n_s.push(existsSet[i]);
        }
    }
    return n_s;
}
function uuid2(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
    if (len) {
        for (i = 0; i < len; i++)
            uuid[i] = chars[0 | Math.random() * radix];
    }
    else {
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
//# sourceMappingURL=until.js.map