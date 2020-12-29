var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Info1UI = (function (_super) {
    __extends(Info1UI, _super);
    function Info1UI() {
        var _this = _super.call(this) || this;
        _this.time = 61;
        _this.registerLabelX = 50;
        _this.registerLabelY = 92;
        _this.registerLabelYBias = 130;
        _this.registerInputX = 200;
        _this.registerInputY = 96;
        _this.registerInputYBias = 110;
        _this.marketingConsent = "N";
        _this.dateY = "";
        _this.dateM = "";
        _this.dateD = "";
        _this._registerScollerView = new eui.Scroller();
        _this._loginView = new eui.Group();
        //this.createView();
        _this.once(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    Info1UI.prototype.createView = function () {
        //this.getCountryListData();
        this.createLoginView();
        this.createRegisterView();
    };
    Info1UI.prototype.createLoginView = function () {
        var img = new eui.Image("/resource/assets/djy_wbk.png");
        img.scaleY = 1.15;
        this._loginView.x = 15;
        this._loginView.y = 200;
        this._loginView.width = 750;
        this._loginView.height = 1080;
        this._loginView.addChild(img);
        var last_name_label = createTextFiled("会员ID:", this.registerLabelX, this.registerLabelYBias + this.registerLabelY * 1, 24, 0x000000);
        this.memerIdInput = createTextFiled("请输入ID", this.registerInputX + 5, this.registerInputYBias + this.registerInputY * 1, 25, 0xb1b1b1, "left", 250, 61, "middle", false, 0xa0a0a0, false, egret.TextFieldType.INPUT);
        var memberIdInput_border = new egret.Shape();
        memberIdInput_border.graphics.lineStyle(2, 0xb1b1b1);
        memberIdInput_border.graphics.drawRoundRect(this.registerInputX, this.registerInputYBias + this.registerInputY * 1, 420, 61, 25, 25);
        memberIdInput_border.graphics.endFill;
        this._loginView.addChild(last_name_label);
        this._loginView.addChild(this.memerIdInput);
        this._loginView.addChild(memberIdInput_border);
        var login_btn = createBitmap("login_btn2_png", 350, 824);
        this._loginView.addChild(login_btn);
        //登录 //pattern /^\d\d{8}$/
        login_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var v = this.memerIdInput.text;
            console.log(v);
            var pattern = /^\d\d{8}$/;
            if (pattern.test(v)) {
                this.addChild(ConfirmUtil.popUpTips("登录成功", false, 150, 300, 400, 250));
            }
            else {
                this.addChild(ConfirmUtil.popUpTips("格式错误", false, 150, 300, 400, 250));
            }
        }, this);
        login_btn.touchEnabled = true; //开启点击侦听
        var toRegisterBtn = createBitmap("patronRegister_png", 130, 824);
        this._loginView.addChild(toRegisterBtn);
        //登录 //pattern /^\d\d{8}$/
        toRegisterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.removeChild(this._loginView);
            this.addChild(this._registerScollerView);
        }, this);
        toRegisterBtn.touchEnabled = true; //开启点击侦听
        this.addChild(this._loginView);
    };
    Info1UI.prototype.createRegisterView = function () {
        var dropDwonList = new euiextendsion.DropDwonList();
        dropDwonList.x = this.registerInputX;
        dropDwonList.y = this.registerInputYBias + 5 + this.registerInputY * 3;
        var img = new eui.Image("/resource/assets/djy_wbk.png");
        img.scaleY = 1.15;
        this.register_view = new eui.Group();
        //this.addChild(this.register_view);
        this.register_view.addChild(img);
        var euiben = new eui.Button();
        euiben.width = 100;
        euiben.width = 50;
        this.register_view.addChild(euiben);
        //    _registerScollerView.width = 540;
        //    _registerScollerView.height = 380;
        this._registerScollerView.x = 15;
        this._registerScollerView.y = 200;
        this._registerScollerView.width = 750;
        this._registerScollerView.height = 1080;
        this._registerScollerView.scrollPolicyH = eui.ScrollPolicy.OFF;
        this._registerScollerView.scrollPolicyV = eui.ScrollPolicy.ON;
        this._registerScollerView.viewport = this.register_view;
        //this.addChild(this._registerScollerView);
        //_registerScollerView.verticalScrollBar.autoVisibility = false;
        var title = createBitmap("index_title_png", 0, 10);
        this.addChild(title);
        title.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var gameui = ScenceManage.create(this.stage);
            gameui.loadScence("index", this, IndexUI);
        }, this);
        title.touchEnabled = true;
        var distanct = 92;
        //容器信息
        var first_name_label = createTextFiled("姓氏：", this.registerLabelX, this.registerLabelYBias, 24, 0x000000);
        var last_name_label = createTextFiled("名字：", this.registerLabelX, this.registerLabelYBias + this.registerLabelY * 1, 24, 0x000000);
        var bod_label = createTextFiled("出生日期：", this.registerLabelX, this.registerLabelYBias + this.registerLabelY * 2, 24, 0x000000);
        var tel_label = createTextFiled("电话：", this.registerLabelX, this.registerLabelYBias + this.registerLabelY * 3, 24, 0x000000);
        var email_label = createTextFiled("电邮：", this.registerLabelX, this.registerLabelYBias + this.registerLabelY * 4, 24, 0x000000);
        //0,17+92*4
        var mcCheckBox = new eui.CheckBox();
        mcCheckBox.skinName = "resource/eui_skins/CheckBoxSkin.exml";
        mcCheckBox.x = this.registerLabelX;
        mcCheckBox.y = this.registerLabelYBias + this.registerLabelY * 5;
        mcCheckBox.label = "                 我希望于通过邮件、电邮、简讯及/或电话搜集\r\n接收此处所述的最新营销动态。";
        this.register_view.addChild(mcCheckBox);
        //var yzm=createTextFiled("验证码：",0,207,35,0x54734a);
        this.firstNameText = createTextFiled("请输入姓氏", this.registerInputX + 5, this.registerInputYBias + this.registerInputY * 0, 25, 0xb1b1b1, "left", 390, 61, "middle", false, 0xa0a0a0, false, egret.TextFieldType.INPUT);
        var f_name_border = new egret.Shape();
        f_name_border.graphics.lineStyle(2, 0xb1b1b1);
        f_name_border.graphics.drawRoundRect(this.registerInputX, this.registerInputYBias + this.registerInputY * 0, 420, 61, 25, 25);
        f_name_border.graphics.endFill;
        this.lastNameText = createTextFiled("请输入名字", this.registerInputX + 5, this.registerInputYBias + this.registerInputY * 1, 25, 0xb1b1b1, "left", 250, 61, "middle", false, 0xa0a0a0, false, egret.TextFieldType.INPUT);
        var l_name_border = new egret.Shape();
        l_name_border.graphics.lineStyle(2, 0xb1b1b1);
        l_name_border.graphics.drawRoundRect(this.registerInputX, this.registerInputYBias + this.registerInputY * 1, 420, 61, 25, 25);
        l_name_border.graphics.endFill;
        var dob_y_text = createTextFiled("年", this.registerInputX + 5, this.registerInputYBias + this.registerInputY * 2, 25, 0xb1b1b1, "left", 200, 61, "middle", false, 0xa0a0a0, false, egret.TextFieldType.INPUT);
        var dob_y_border = new egret.Shape();
        dob_y_border.graphics.lineStyle(2, 0xb1b1b1);
        dob_y_border.graphics.drawRoundRect(this.registerInputX, this.registerInputYBias + this.registerInputY * 2, 200, 61, 25, 25);
        dob_y_border.graphics.endFill;
        var dob_m_text = createTextFiled("月", this.registerInputX + 5 + 210, this.registerInputYBias + this.registerInputY * 2, 25, 0xb1b1b1, "left", 100, 61, "middle", false, 0xa0a0a0, false, egret.TextFieldType.INPUT);
        var dob_m_border = new egret.Shape();
        dob_m_border.graphics.lineStyle(2, 0xb1b1b1);
        dob_m_border.graphics.drawRoundRect(this.registerInputX + 210, this.registerInputYBias + this.registerInputY * 2, 100, 61, 25, 25);
        dob_m_border.graphics.endFill;
        var dob_d_text = createTextFiled("日", this.registerInputX + 5 + 320, this.registerInputYBias + this.registerInputY * 2, 25, 0xb1b1b1, "left", 100, 61, "middle", false, 0xa0a0a0, false, egret.TextFieldType.INPUT);
        var dob_d_border = new egret.Shape();
        dob_d_border.graphics.lineStyle(2, 0xb1b1b1);
        dob_d_border.graphics.drawRoundRect(this.registerInputX + 320, this.registerInputYBias + this.registerInputY * 2, 100, 61, 25, 25);
        dob_d_border.graphics.endFill;
        this.mobilePhone = createTextFiled("电话号码", this.registerInputX + 5 + 100, this.registerInputYBias + this.registerInputY * 3, 25, 0xb1b1b1, "left", 230, 61, "middle", false, 0xa0a0a0, false, egret.TextFieldType.INPUT);
        var tel_border = new egret.Shape();
        tel_border.graphics.lineStyle(2, 0xb1b1b1);
        tel_border.graphics.drawRoundRect(this.registerInputX + 100, this.registerInputYBias + this.registerInputY * 3, 320, 61, 25, 25);
        tel_border.graphics.endFill;
        this.emailText = createTextFiled("电邮", this.registerInputX + 5, this.registerInputYBias + this.registerInputY * 4, 25, 0xb1b1b1, "left", 250, 61, "middle", false, 0xa0a0a0, false, egret.TextFieldType.INPUT);
        var mail_border = new egret.Shape();
        mail_border.graphics.lineStyle(2, 0xb1b1b1);
        mail_border.graphics.drawRoundRect(this.registerInputX, this.registerInputYBias + this.registerInputY * 4, 420, 61, 25, 25);
        mail_border.graphics.endFill;
        //出错显示
        var chucuo_title = createTextFiled("", this.registerInputX - 50, this.registerInputYBias + this.registerInputY * 6, 25, 0xff0000, "center", 545, 30);
        this.errorText = chucuo_title;
        this.register_view.addChild(chucuo_title);
        this.register_view.addChild(first_name_label);
        this.register_view.addChild(last_name_label);
        this.register_view.addChild(bod_label);
        this.register_view.addChild(tel_label);
        this.register_view.addChild(email_label);
        this.register_view.addChild(this.firstNameText);
        this.register_view.addChild(this.lastNameText);
        this.register_view.addChild(this.mobilePhone);
        this.register_view.addChild(dob_y_text);
        this.register_view.addChild(dob_m_text);
        this.register_view.addChild(dob_d_text);
        this.register_view.addChild(this.emailText);
        this.register_view.addChild(f_name_border);
        this.register_view.addChild(tel_border);
        this.register_view.addChild(l_name_border);
        this.register_view.addChild(mail_border);
        this.register_view.addChild(dob_y_border);
        this.register_view.addChild(dob_m_border);
        this.register_view.addChild(dob_d_border);
        var nameYN = false;
        var telYN = false;
        var yzmYN = false;
        var yzmNum;
        this.firstNameText.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { console.log("aaa"); }, this);
        //    f_name_text.addEventListener(egret.TouchEvent.FOCUS_OUT,function(){
        //     //    nameYN=false;
        //     //    if(/^[\u4E00-\u9FA5]{0,}$/.test(name_text.text)&&name_text.text!=""){
        //     //        nameYN=true;
        //     //        chucuo_title.text="";
        //     //    }else{
        //     //        chucuo_title.text="请输入正确会员账号";
        //     //    }
        //     //    if(name_text.text==""){
        //     //        name_text.text="请输入正确会员账号";
        //     //    }
        //    },this)
        //    l_name_text.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
        //        l_name_text.text="";
        //     },this)
        //    l_name_text.addEventListener(egret.TouchEvent.FOCUS_OUT,function(){
        //     //    telYN=false;
        //     //    if(/1[3|5|7|8|]\d{9}/.test(tel_text.text)){
        //     //        telYN=true;
        //     //        chucuo_title.text="";
        //     //    }else{
        //     //        chucuo_title.text="请输入正确的联系方式"
        //     //    }
        //     //    if(tel_text.text==""){
        //     //        tel_text.text="请输入真实联系方式";
        //     //    }
        //    },this)
        //    var top_title=createTextFiled("输入资料进行注册",263,446,30,0xffffff);
        //    this.addChild(top_title);
        dob_y_text.addEventListener(egret.TouchEvent.FOCUS_OUT, function () {
            var v = dob_y_text.text;
            var pattern = /^(19\d{2}|20[01][0-9]|2020)$/;
            if (pattern.test(v)) {
                this.dateY = v;
            }
            else {
                this.showErrorText("Invalid Date Format.");
            }
        }, this);
        dob_m_text.addEventListener(egret.TouchEvent.FOCUS_OUT, function () {
            var v = dob_m_text.text;
            var pattern = /^(0[0-9]|1[0-2])$/;
            if (pattern.test(v)) {
                this.dateM = v;
            }
            else {
                this.showErrorText("Invalid Date Format.");
            }
        }, this);
        dob_d_text.addEventListener(egret.TouchEvent.FOCUS_OUT, function () {
            var v = dob_d_text.text;
            this.dateD = v;
        }, this);
        //添加按钮
        var cj_btn = createBitmap("patronRegister_png", 100, 824);
        this.register_view.addChild(cj_btn);
        //注册按钮点击
        cj_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var request = requestPost(Main.baseUrl + Main.patronRegisterUrl, "?" + this.getPatronPostData());
            request.send();
            request.addEventListener(egret.Event.COMPLETE, this.registerCompelete, this);
        }, this);
        cj_btn.touchEnabled = true; //开启点击侦听
        var toLogin_btn = createBitmap("login_btn2_png", 370, 824);
        this.register_view.addChild(toLogin_btn);
        //转到登录页
        toLogin_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.removeChild(this._registerScollerView);
            this.addChild(this._loginView);
        }, this);
        toLogin_btn.touchEnabled = true; //开启点击侦听
        this.register_view.addChild(dropDwonList);
    };
    Info1UI.prototype.registerCompelete = function (event) {
        var request = event.currentTarget;
        var jsonObject = JSON.parse(request.response);
        var patronId = jsonObject.data.PatronId;
        setLocalStorage("pId", patronId);
        this.addChild(ConfirmUtil.popUpTips("注册成功,patron ID:" + patronId, false, 150, 300, 450, 350));
    };
    Info1UI.prototype.getPatronPostData = function () {
        var firstName = "firstName=" + this.firstNameText.text;
        var lastName = "lastName=" + this.lastNameText.text;
        var mobilePhone = "mobilePhone=" + this.mobilePhone.text;
        var parimaryEmail = "primaryEmail=" + this.emailText.text;
        var DOB = "DOB=" + this.dateY + "-" + this.dateM + "-" + this.dateD;
        var marketConsent = "marketingConsent=" + "Y";
        return firstName + "&" + lastName + "&" + mobilePhone + "&" + parimaryEmail + "&" + DOB + "&" + marketConsent;
    };
    //指向动画
    Info1UI.prototype.share_lg = function () {
        egret.Tween.get(this.shareLg).to({ alpha: 0 }, 1000).call(function () {
            this.shareLg.alpha = 1;
            this.share_lg();
        }.bind(this));
    };
    Info1UI.prototype.showErrorText = function (text) {
        this.errorText.text = text;
        this.errorText.alpha = 1;
        egret.Tween.get(this.errorText, { loop: false }).to({ alpha: 0 }, 2500);
    };
    return Info1UI;
}(eui.UILayer));
__reflect(Info1UI.prototype, "Info1UI");
//# sourceMappingURL=Info1UI.js.map