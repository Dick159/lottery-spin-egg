var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InfoUI = (function (_super) {
    __extends(InfoUI, _super);
    function InfoUI() {
        var _this = _super.call(this) || this;
        _this.time = 61;
        //this.createView();
        _this.once(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    InfoUI.prototype.createView = function () {
        var content_bg = createBitmap("six_dataLeave_png");
        content_bg.x = 15;
        content_bg.y = 122;
        this.addChild(content_bg);
        //添加资料内容容器
        var zl_content = new egret.DisplayObjectContainer();
        zl_content.width = 545;
        zl_content.height = 256;
        zl_content.x = 100;
        zl_content.y = 568;
        this.addChild(zl_content);
        //容器信息
        var name = createTextFiled("姓名：", 0, 17, 35, 0x54734a);
        var tel = createTextFiled("电话：", 0, 109, 35, 0x54734a);
        var yzm = createTextFiled("验证码：", 0, 207, 35, 0x54734a);
        var name_text = createTextFiled("请输入真实姓名", 150, 0, 25, 0xb1b1b1, "left", 390, 61, "middle", false, 0xa0a0a0, false, egret.TextFieldType.INPUT);
        var name_border = new egret.Shape();
        name_border.graphics.lineStyle(2, 0xb1b1b1);
        name_border.graphics.drawRoundRect(120, 0, 420, 61, 25, 25);
        name_border.graphics.endFill;
        var tel_text = createTextFiled("请输入真实联系方式", 150, 96, 25, 0xb1b1b1, "left", 250, 61, "middle", false, 0xa0a0a0, false, egret.TextFieldType.INPUT);
        var tel_border = new egret.Shape();
        tel_border.graphics.lineStyle(2, 0xb1b1b1);
        tel_border.graphics.drawRoundRect(120, 96, 286, 61, 25, 25);
        tel_border.graphics.endFill;
        var yzm_text = createTextFiled("888888", 185, 190, 25, 0xb1b1b1, "left", 355, 61, "middle", false, 0xa0a0a0, false, egret.TextFieldType.INPUT);
        var yzm_border = new egret.Shape();
        yzm_border.graphics.lineStyle(2, 0xb1b1b1);
        yzm_border.graphics.drawRoundRect(155, 190, 385, 61, 25, 25);
        yzm_border.graphics.endFill;
        var btn = drawReactShape("", 427, 96, 115, 61, 0x777777, 0xa0a0a0, 2);
        var title_btn = createTextFiled("验证码", 427, 96, 24, 0xffffff, "center", 115, 61, "middle", false, 0xa0a0a0, true);
        title_btn.touchEnabled = true;
        var btn_border = new egret.Shape();
        btn_border.graphics.lineStyle(2, 0xb1b1b1);
        btn_border.graphics.drawRoundRect(427, 96, 115, 61, 25, 25);
        btn_border.graphics.endFill;
        //出错显示
        var chucuo_title = createTextFiled("", 0, 270, 30, 0xff0000, "center", 545, 30);
        zl_content.addChild(chucuo_title);
        zl_content.addChild(name);
        zl_content.addChild(tel);
        zl_content.addChild(yzm);
        zl_content.addChild(name_text);
        zl_content.addChild(tel_text);
        zl_content.addChild(yzm_text);
        zl_content.addChild(name_border);
        3;
        zl_content.addChild(tel_border);
        zl_content.addChild(yzm_border);
        zl_content.addChild(btn_border);
        zl_content.addChild(btn);
        zl_content.addChild(title_btn);
        var nameYN = false;
        var telYN = false;
        var yzmYN = false;
        var yzmNum;
        name_text.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { name_text.text = ""; }, this);
        name_text.addEventListener(egret.TouchEvent.FOCUS_OUT, function () {
            nameYN = false;
            if (/^[\u4E00-\u9FA5]{0,}$/.test(name_text.text) && name_text.text != "") {
                nameYN = true;
                chucuo_title.text = "";
            }
            else {
                chucuo_title.text = "请正确姓名";
            }
            if (name_text.text == "") {
                name_text.text = "请输入真实姓名";
            }
        }, this);
        tel_text.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { tel_text.text = ""; }, this);
        tel_text.addEventListener(egret.TouchEvent.FOCUS_OUT, function () {
            telYN = false;
            if (/1[3|5|7|8|]\d{9}/.test(tel_text.text)) {
                telYN = true;
                chucuo_title.text = "";
            }
            else {
                chucuo_title.text = "请正确的联系方式";
            }
            if (tel_text.text == "") {
                tel_text.text = "请输入真实联系方式";
            }
        }, this);
        yzm_text.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { yzm_text.text = ""; }, this);
        yzm_text.addEventListener(egret.TouchEvent.FOCUS_OUT, function () {
            yzmYN = false;
            if (yzmNum == undefined) {
                chucuo_title.text = "请获取验证码";
            }
            else if (yzm_text.text == yzmNum) {
                yzmYN = true;
                chucuo_title.text = "";
            }
            else {
                chucuo_title.text = "请正确的验证码";
            }
            if (yzm_text.text == "") {
                yzm_text.text = "请输入收到的短信验证码";
            }
        }, this);
        title_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            yzmNum = "888888";
            title_btn.touchEnabled = false;
            console.log(this.time);
            var inter = setInterval(function () {
                this.time--;
                console.log(this.time);
                if (this.time == 0) {
                    title_btn.text = "重新获取";
                    this.time = 61;
                    title_btn.touchEnabled = true;
                    clearInterval(inter);
                }
                else {
                    title_btn.text = "  倒计时： " + this.time + "S";
                }
            }.bind(this), 1000);
        }, this);
        //
        var top_title = createTextFiled("输入资料进行抽奖", 263, 407, 30, 0xffffff);
        this.addChild(top_title);
        //添加按钮
        var cj_btn = createBitmap("lzy_aj_png", 270, 1010);
        this.addChild(cj_btn);
        cj_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (nameYN && telYN && yzmYN) {
                var gameui = ScenceManage.create(this.stage);
                gameui.loadScence("ResultUI", this, ReceiveUI);
            }
            else if (yzmNum == undefined) {
                chucuo_title.text = "请正确的验证码";
            }
            else {
                chucuo_title.text = "填写信息有误";
            }
        }, this);
        cj_btn.touchEnabled = true; //开启点击侦听
    };
    return InfoUI;
}(egret.Sprite));
__reflect(InfoUI.prototype, "InfoUI");
//# sourceMappingURL=InfoUI.js.map