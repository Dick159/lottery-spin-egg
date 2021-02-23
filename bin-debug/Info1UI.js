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
        _this.registerInputX = 160;
        _this.registerInputY = 126;
        _this.registerInputYBias = 210;
        _this.marketingConsent = "N";
        _this.dateY = "";
        _this.dateM = "";
        _this.dateD = "";
        _this._registerScollerView = new eui.Scroller();
        _this._loginView = new eui.Group();
        _this.register_view = new eui.Group();
        _this.dropDwonList = new euiextendsion.DropDwonList(Main.countryList);
        _this.mcCheckBox = new eui.CheckBox();
        _this.mcCheckBox2 = new eui.CheckBox();
        _this._button = null;
        _this.banner = createBitmap("SandsRewardsLifestyle_Logo_png");
        //this.createView();
        _this.once(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    Info1UI.prototype.createView = function () {
        this.touchThrough = true;
        this.changeBackGround();
        this.createBannerAndTips();
        this.createLoginView();
        this.createRegisterView();
        this.createHomebtn();
    };
    Info1UI.prototype.createHomebtn = function () {
        var homeBtn = createBitmap("homepageback_button_png");
        homeBtn.x = 5;
        homeBtn.y = 35;
        homeBtn.touchEnabled = true;
        homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.toMainPage();
        }, this);
        this.addChild(homeBtn);
    };
    Info1UI.prototype.changeBackGround = function () {
        Main.bg.texture = RES.getRes("Background3_png");
    };
    Info1UI.prototype.createBannerAndTips = function () {
        this.banner = createBitmap("SandsRewardsLifestyle_Logo_png");
        this.banner.x = (this.stage.stageWidth - this.banner.width) * 0.5;
        this.banner.y = this.stage.stageHeight * 0.03;
        this.addChild(this.banner);
        var tipsTextSize = 40;
        var tipsTextColor = 0xFFFFFF;
        this.tipText1 = createTextFiledNoEui(mc_content.tipText1);
        this.tipText1.textColor = tipsTextColor;
        this.tipText1.size = tipsTextSize;
        middleObject(this.stage.stageWidth, this.tipText1);
        this.tipText1.y = this.banner.y + this.banner.height + 70;
        this.addChild(this.tipText1);
        this.tipText2 = createTextFiledNoEui(mc_content.tipText2);
        this.tipText2.textColor = tipsTextColor;
        this.tipText2.size = tipsTextSize;
        middleObject(this.stage.stageWidth, this.tipText2);
        //this.tipText2.y = this.stage.stageHeight * 0.30 + tipsTextSize;
        this.tipText2.y = this.tipText1.y + this.tipText1.height + 10;
        this.addChild(this.tipText2);
    };
    Info1UI.prototype.createLoginView = function () {
        this._loginView.touchThrough = true;
        var img = new eui.Image("/resource/assets/djy_wbk.png");
        var srlCard = new eui.Image("/resource/assets/SRL_Cards.png");
        var loginPanel = new eui.Image("/resource/assets/login_input.png");
        var loginBtn = new eui.Image("/resource/assets/login_btn.png");
        var sigUpText = new eui.Image("/resource/assets/signup_text.png");
        var inputTips = new eui.Image("/resource/assets/question_child.png");
        inputTips.x = 540;
        inputTips.y = 675;
        inputTips.scaleX = 1.3;
        inputTips.scaleY = 1.3;
        inputTips.touchEnabled = true;
        inputTips.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var cont = new egret.DisplayObjectContainer();
            var _whiteShader = createShaderMask(this.stage.width, this.stage.height, 0xFFFFFF, 0.5);
            var myCard = createBitmap("SRL_png");
            middleObject(this.stage.stageWidth, myCard);
            myCard.y = this.stage.stageHeight * 0.2;
            cont.addChild(_whiteShader);
            cont.addChild(myCard);
            cont.touchEnabled = true;
            cont.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                egret.Tween.get(cont).to({ alpha: 0 }, 500).call(function () {
                    cont.visible = false;
                }, this);
            }, this);
            this.addChild(cont);
        }, this);
        img.scaleY = 1.15;
        this._loginView.y = 50;
        this._loginView.width = this.stage.stageWidth;
        //this._loginView.height = 1080;
        var last_name_label = createTextFiled(mc_content.MID, this.registerLabelX, this.registerLabelYBias + this.registerLabelY * 1, 24, 0x000000);
        this.memerIdInput = createTextFiled(mc_content.InputID, 149 + 62, 668, 25, 0xa1a1a1, "left", 320, 72, "middle", false, 0x000000, false, egret.TextFieldType.INPUT);
        srlCard.x = 115;
        srlCard.y = 420;
        loginPanel.x = 149;
        loginPanel.y = 630;
        loginBtn.x = 149;
        loginBtn.y = 765;
        sigUpText.x = 226;
        sigUpText.y = 950;
        this._loginView.addChild(srlCard);
        this._loginView.addChild(loginPanel);
        this._loginView.addChild(sigUpText);
        this._loginView.addChild(inputTips);
        this._loginView.addChild(loginBtn);
        this._loginView.addChild(this.memerIdInput);
        //登录 //pattern /^\d\d{8}$/
        loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var v = this.memerIdInput.text;
            var pattern = /^[1]\d{8}$/;
            if (pattern.test(v)) {
                var _group = new eui.Group();
                var _whiteShader = createShaderMask(this.stage.stageWidth, this.stage.stageHeight, 0xFFFFFF, 0.5);
                var _body = createBitmap("tips_box_png");
                _body.y = this.stage.stageHeight * 0.25;
                middleObject(this.stage.stageWidth, _body);
                var _off = createBitmap("close_off_png");
                _off.scaleX = 0.8;
                _off.scaleY = 0.8;
                // this._button = createButton( _body.x + (_body.width - _body.width * 0.3)*0.5,_body.y + _body.height - _body.height * 0.3,_body.width * 0.3,_body.height * 0.2,0xe6b956,0x851c1c,"Confirm",0xe6b956,0xFFFFFF,0,0);
                // this._button.touchEnabled = true;
                _off.x = _body.x + _body.width - _off.width + 10;
                _off.y += _body.y + 5;
                _off.touchEnabled = true;
                var text = createTextFiledNoEui(mc_content.confirmTxt);
                text.size = 36;
                text.textColor = 0x851c1c;
                text.y = _body.y + 50 + _body.height * 0.1;
                middleObject(this.stage.stageWidth, text);
                var textID = createTextFiledNoEui(v);
                textID.textColor = 0x851c1c;
                textID.size = 36;
                middleObject(this.stage.stageWidth, textID);
                textID.y = text.y + text.size * 3;
                _group.addChild(_whiteShader);
                _group.addChild(_body);
                _group.addChild(this._button);
                _group.addChild(_off);
                _group.addChild(text);
                _group.addChild(textID);
                _group.touchThrough = false;
                this.addChild(_group);
                _off.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    this.removeChild(_group);
                }, this);
                this._button.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    this._button.touchEnabled = false;
                    if (Main.isBindingAction || getLocalStorage(Main.NBD_TOKEN_SYB)) {
                        this.tempPatronId = v;
                        var tokenId = getLocalStorage(Main.TOKENID_SYB);
                        var params = "memberId=" + this.tempPatronId + "&tokenId=" + tokenId + "&remark=" + "binding" + "&cpt=" + getLocalStorage(Main.CPT);
                        setLocalStorage(Main.MEMBERID_SYB, v);
                        var request = requestPost(Main.baseUrl + Main.PostBindingMember, "?" + params);
                        loading(true);
                        request.send();
                        request.addEventListener(egret.Event.COMPLETE, this.bindingResultSuccess, this);
                        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.bindingError, this);
                        Main.isBindingAction = false;
                    }
                    else {
                        //  this.addChild(ConfirmUtil.popUpTips(mc_content.LoginSuccess,false,150,150,400,250));
                        var that = this;
                        ShowTipsBox(mc_content.LoginSuccess, this, function () {
                            var gameui = ScenceManage.create(that.stage);
                            gameui.loadScence("index", that, IndexUI);
                        });
                        setLocalStorage(Main.MEMBERID_SYB, v);
                    }
                }, this);
            }
            else {
                //this.addChild(ConfirmUtil.popUpTips(mc_content.FormatErr,false,150,300,400,250));
                loginBtn.touchEnabled = false;
                ShowConfirmBox(mc_content.FormatErr, "Error", this, function () {
                    loginBtn.touchEnabled = true;
                });
            }
        }, this);
        loginBtn.touchEnabled = true; //开启点击侦听
        sigUpText.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.removeChild(this._loginView);
            this.addChild(this._registerScollerView);
            this.removeChild(this.tipText1);
            this.removeChild(this.tipText2);
            //this.removeChild(this.banner);
        }, this);
        sigUpText.touchEnabled = true; //开启点击侦听
        this.addChild(this._loginView);
        var _body = createBitmap("tips_box_png");
        _body.y = this.stage.stageHeight * 0.25;
        middleObject(this.stage.stageWidth, _body);
        this._button = createButton(_body.x + (_body.width - _body.width * 0.3) * 0.5, _body.y + _body.height - _body.height * 0.3, _body.width * 0.3, _body.height * 0.2, 0xe6b956, 0x851c1c, "Confirm", 0xe6b956, 0xFFFFFF, 0, 0);
        this._button.touchEnabled = true;
    };
    Info1UI.prototype.bindingError = function (event) {
        this.tempPatronId = "";
        this.popUpErrorTips(this, mc_content.NetworkErr);
        this._button.touchEnabled = true;
    };
    Info1UI.prototype.bindingResultSuccess = function (event) {
        loading(false);
        var request = event.currentTarget;
        if (!request.response) {
            ShowConfirmBox(mc_content.ERROR_MESSAGE, "Error", this, null);
            return;
        }
        var jsonObject = JSON.parse(request.response);
        setLocalStorage(Main.MEMBERID_SYB, this.tempPatronId);
        var _that = this;
        if (jsonObject.code == "200") {
            if (jsonObject.data.Output.Response.StatusCode == "00") {
                setLocalStorage(Main.MEMBERID_SYB, this.tempPatronId);
                setLocalStorageList(Main.PAYED_SYN, this.tempPatronId);
                removeNonBindTokenId();
                removeLocalStorage(Main.TOKENID_SYB);
                setLocalStorage("MBS_TOKENID", uuid2(16, null));
                ShowTipsBox(mc_content.BinSuccess, this, this.resetBtnStatus(true));
                setTimeout(function () {
                    _that.toMainPage();
                }, 2000);
            }
            else if (jsonObject.data.Output.Response.StatusCode == "01") {
                var _message = jsonObject.data.Output.Response.StatusDescription;
                if (_message && _message.indexOf("already") >= 0 && _message.indexOf("TOKENID") >= 0) {
                    this.popUpErrorTips(this, mc_content.Binded, this.resetBtnStatus(true));
                    removeLocalStorage(Main.NBD_TOKEN_SYB);
                    removeLocalStorage(Main.TOKENID_SYB);
                    setLocalStorage("MBS_TOKENID", uuid2(16, null));
                }
                else if (_message && _message.indexOf("already") >= 0 && _message.indexOf("MEMBERSHIPID") >= 0) {
                    this.popUpErrorTips(this, mc_content.BindedBefore, this.resetBtnStatus(true));
                }
                else {
                    this.popUpErrorTips(this, mc_content.ERROR_MESSAGE, this.resetBtnStatus(true));
                }
                this.tempPatronId = "";
            }
            else {
                this.tempPatronId = "";
                this.popUpErrorTips(this, mc_content.Bindfail, this.resetBtnStatus(true));
            }
        }
        else if (jsonObject.code == "05") {
            var gameui = ScenceManage.create(_that.stage);
            this.popUpErrorTips(this, mc_content.haveBinded, function () {
                gameui.loadScence("index", _that, IndexUI);
            });
        }
        else if (jsonObject.code == "03" || jsonObject.code == "01") {
            var gameui = ScenceManage.create(_that.stage);
            //this.resetBtnStatus(true)
            this.tempPatronId = "";
            this.popUpErrorTips(this, mc_content.Bindfail, function () {
                gameui.loadScence("index", _that, IndexUI);
                _that.resetBtnStatus(true);
            }, "Tips");
        }
        else {
            var gameui = ScenceManage.create(_that.stage);
            //this.resetBtnStatus(true)
            this.tempPatronId = "";
            this.popUpErrorTips(this, mc_content.NetworkErr, function () {
                gameui.loadScence("index", _that, IndexUI);
                _that.resetBtnStatus(true);
            });
        }
    };
    Info1UI.prototype.popUpErrorTips = function (_that, message, callBack, title) {
        if (callBack === void 0) { callBack = null; }
        if (title === void 0) { title = "Error"; }
        // var width = 300;
        // var height = 500;
        // _that.addChild(ConfirmUtil.popUpTips(message,true,_that.stage.stageWidth * 0.5 - width * 0.5,_that.stage.stageHeight * 0.6,width,height));
        ShowConfirmBox(message, "Error", _that, callBack);
    };
    Info1UI.prototype.createRegisterView = function () {
        var img = new eui.Image("/resource/assets/djy_wbk.png");
        img.scaleY = 1;
        img.y = 140;
        this.register_view.touchThrough = true;
        // bthis.addChild(this.register_view);
        this.register_view.addChild(img);
        var euiben = new eui.Button();
        euiben.width = 700;
        euiben.width = 50;
        this.register_view.addChild(euiben);
        this._registerScollerView.y = this.stage.stageHeight * 0.04;
        this._registerScollerView.width = this.stage.stageWidth;
        this._registerScollerView.x = 15;
        this._registerScollerView.height = this.stage.stageHeight;
        this._registerScollerView.scrollPolicyH = eui.ScrollPolicy.OFF;
        this._registerScollerView.scrollPolicyV = eui.ScrollPolicy.OFF;
        this._registerScollerView.viewport = this.register_view;
        var title = createBitmap("index_title_png", 0, 10);
        this.addChild(title);
        title.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var gameui = ScenceManage.create(this.stage);
            gameui.loadScence("index", this, IndexUI);
        }, this);
        title.touchEnabled = true;
        var distanct = 92;
        //容器信息
        var first_name_label = createTextFiled("First Name:", this.registerLabelX, this.registerLabelYBias, 24, 0x000000);
        var last_name_label = createTextFiled("Last Name:", this.registerLabelX, this.registerLabelYBias + this.registerLabelY * 1, 24, 0x000000);
        var bod_label = createTextFiled("Birthday:", this.registerLabelX, this.registerLabelYBias + this.registerLabelY * 2, 24, 0x000000);
        var tel_label = createTextFiled("Mobile Phone:", this.registerLabelX, this.registerLabelYBias + this.registerLabelY * 3, 24, 0x000000);
        var email_label = createTextFiled("Email:", this.registerLabelX, this.registerLabelYBias + this.registerLabelY * 4, 24, 0x000000);
        //0,17+92*4
        this.mcCheckBox.skinName = "resource/eui_skins/CheckBoxSkin.exml";
        //--------------------------------------------------------------------
        this.mcCheckBox.left = 8;
        //--------------------------------------------------------------------
        this.mcCheckBox.x = this.registerLabelX;
        this.mcCheckBox.y = this.registerLabelYBias + this.registerLabelY * 7.5;
        //   var terms1_LBoxTxt = createTextFiledNoEui(mc_content.terms1_LBox);
        var terms1_LBoxTxt = new egret.TextField;
        terms1_LBoxTxt.textFlow = new Array({ text: "I wish to receive marketing updates via postal mail,\r\nemail,text messaging and/or telephone as \r\ndescribed ", style: {} }, { text: mc_content.terms1_LBox, style: { "href": "event:text event triggered", "bold": true } });
        terms1_LBoxTxt.size = 23;
        terms1_LBoxTxt.textColor = 0xffffff;
        terms1_LBoxTxt.x = this.registerLabelX + 50;
        terms1_LBoxTxt.y = 822;
        terms1_LBoxTxt.touchEnabled = true;
        terms1_LBoxTxt.addEventListener(egret.TextEvent.LINK, function (evt) {
            var cont = new egret.DisplayObjectContainer();
            var _whiteShader = createShaderMask(this.stage.width, this.stage.height, 0xFFFFFF, 0.8);
            var myCard = createBitmap("terms2_png");
            middleObject(this.stage.stageWidth, myCard);
            myCard.y = this.stage.stageHeight * 0.2;
            cont.addChild(_whiteShader);
            cont.addChild(myCard);
            cont.touchEnabled = true;
            cont.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                egret.Tween.get(cont).to({ alpha: 0 }, 500).call(function () {
                    cont.visible = false;
                }, this);
            }, this);
            this.addChild(cont);
        }, this);
        terms1_LBoxTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            this.mcCheckBox.selected = !this.mcCheckBox.selected;
        }, this);
        this.mcCheckBox.label = "";
        this.register_view.addChild(this.mcCheckBox);
        this.register_view.addChild(terms1_LBoxTxt);
        this.mcCheckBox.addEventListener(egret.Event.CHANGE, function () {
        }, this);
        //0,17+92*4
        this.mcCheckBox2.skinName = "resource/eui_skins/CheckBoxSkin.exml";
        //--------------------------------------------------------------------
        this.mcCheckBox2.left = 8;
        //--------------------------------------------------------------------
        this.mcCheckBox2.x = this.registerLabelX;
        this.mcCheckBox2.y = this.registerLabelYBias + this.registerLabelY * 8.5;
        var tx = new egret.TextField;
        tx.textFlow = new Array({ text: "I understand and agree to both the" + "Sands Rewards \r\nLifeStyle programme terms and conditions" + " and the " + "\r\nprocessing of my personal data" + ", and warrant that \r\nthe declarations ", style: {} }, { text: mc_content.terms2_LBox, style: { "href": "event:text event triggered", "bold": true } }, { text: " are true.", style: {} });
        tx.touchEnabled = true;
        tx.addEventListener(egret.TextEvent.LINK, function (evt) {
            console.log(evt.text);
            var cont = new egret.DisplayObjectContainer();
            var _whiteShader = createShaderMask(this.stage.width, this.stage.height, 0xFFFFFF, 0.8);
            var myCard = createBitmap("terms1_png");
            middleObject(this.stage.stageWidth, myCard);
            myCard.y = this.stage.stageHeight * 0.2;
            var tc = createTextFiledNoEui(mc_content.TC);
            tc.size = 28;
            tc.x = myCard.x + 51;
            tc.y = myCard.y + 277;
            tc.textColor = 0x851c1c;
            tc.bold = true;
            cont.addChild(_whiteShader);
            cont.addChild(myCard);
            cont.addChild(tc);
            tc.touchEnabled = true;
            tc.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                window.location.href = "https://www.marinabaysands.com/sands-rewards-lifestyle/terms-and-conditions.html";
            }, this);
            cont.touchEnabled = true;
            cont.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                egret.Tween.get(cont).to({ alpha: 0 }, 500).call(function () {
                    cont.visible = false;
                }, this);
            }, this);
            this.addChild(cont);
        }, this);
        tx.x = 100;
        tx.y = this.registerLabelYBias + this.registerLabelY * 8.5;
        tx.size = 23;
        tx.textColor = 0xffffff;
        tx.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            this.mcCheckBox2.selected = !this.mcCheckBox2.selected;
        }, this);
        //   var terms2_LBoxTxt = createTextFiledNoEui(mc_content.terms2_LBox);
        //   terms2_LBoxTxt.bold = true;
        //   terms2_LBoxTxt.size = 23;
        //   terms2_LBoxTxt.x = this.registerLabelX+227;
        //   terms2_LBoxTxt.y = this.registerLabelYBias+this.registerLabelY*8.5+70;
        this.mcCheckBox2.label = "";
        this.register_view.addChild(this.mcCheckBox2);
        this.register_view.addChild(tx);
        this.mcCheckBox2.addEventListener(egret.Event.CHANGE, function () {
        }, this);
        //   terms2_LBoxTxt.touchEnabled = true;
        //   terms2_LBoxTxt.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
        //          var cont = new egret.DisplayObjectContainer();
        //          var _whiteShader = createShaderMask(this.stage.width,this.stage.height,0xFFFFFF,0.8);
        //          var myCard = createBitmap("terms1_png");
        //          middleObject(this.stage.stageWidth,myCard);
        //          myCard.y = this.stage.stageHeight * 0.2;
        //         var tc = createTextFiledNoEui(mc_content.TC);
        //         tc.size = 28;
        //         tc.x = this.registerLabelX+63;
        //         tc.y = this.stage.stageHeight * 0.4-49;
        //         tc.textColor = 0x851c1c;
        //         tc.bold = true;
        //          cont.addChild(_whiteShader);
        //          cont.addChild(myCard);
        //          cont.addChild(tc);
        //          tc.touchEnabled = true;
        //          tc.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
        //              window.location.href="https://www.marinabaysands.com/sands-rewards-lifestyle/terms-and-conditions.html";
        //         },this);
        //          cont.touchEnabled = true;
        //          cont.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
        //                  egret.Tween.get(cont).to({alpha : 0},500).call(function(){
        //                         cont.visible = false;
        //                  },this);
        //          },this);
        //          this.addChild(cont);
        //   },this)
        //var yzm=createTextFiled("验证码：",0,207,35,0x54734a);
        this.firstNameText = createTextFiled(mc_content.firstName, this.registerInputX + 5, this.registerInputYBias + this.registerInputY * 0, 25, 0xb1b1b1, "left", 390, 61, "middle", false, 0xa0a0a0, false, egret.TextFieldType.INPUT);
        var f_name_border = new egret.Shape();
        f_name_border.graphics.lineStyle(2, 0xb1b1b1);
        f_name_border.graphics.drawRoundRect(this.registerInputX, this.registerInputYBias + this.registerInputY * 0, 420, 61, 25, 25);
        f_name_border.graphics.endFill;
        this.lastNameText = createTextFiled(mc_content.lastName, this.registerInputX + 5, this.registerInputYBias + this.registerInputY * 1, 25, 0xb1b1b1, "left", 390, 61, "middle", false, 0xa0a0a0, false, egret.TextFieldType.INPUT);
        var l_name_border = new egret.Shape();
        l_name_border.graphics.lineStyle(2, 0xb1b1b1);
        l_name_border.graphics.drawRoundRect(this.registerInputX, this.registerInputYBias + this.registerInputY * 1, 420, 61, 25, 25);
        l_name_border.graphics.endFill;
        //---------------------------------------------------------------------
        this.dob_d_text = createTextFiled("DD", this.registerInputX + 5, 9 + this.registerInputYBias + this.registerInputY * 2, 25, 0xb1b1b1, "left", 100, 61, "middle", false, 0xa0a0a0, false, egret.TextFieldType.INPUT);
        var dob_d_border = new egret.Shape();
        dob_d_border.graphics.lineStyle(2, 0xb1b1b1);
        dob_d_border.graphics.drawRoundRect(this.registerInputX, 10 + this.registerInputYBias + this.registerInputY * 2, 100, 61, 25, 25);
        dob_d_border.graphics.endFill;
        this.dob_m_text = createTextFiled("MM", this.registerInputX + 170, 9 + this.registerInputYBias + this.registerInputY * 2, 25, 0xb1b1b1, "left", 100, 61, "middle", false, 0xa0a0a0, false, egret.TextFieldType.INPUT);
        var dob_m_border = new egret.Shape();
        dob_m_border.graphics.lineStyle(2, 0xb1b1b1);
        dob_m_border.graphics.drawRoundRect(this.registerInputX + 140, this.registerInputYBias + this.registerInputY * 2, 100, 61, 25, 25);
        dob_m_border.graphics.endFill;
        this.dob_y_text = createTextFiled("YYYY", this.registerInputX + 5 + 310, 9 + this.registerInputYBias + this.registerInputY * 2, 25, 0xb1b1b1, "left", 130, 61, "middle", false, 0xa0a0a0, false, egret.TextFieldType.INPUT);
        var dob_y_border = new egret.Shape();
        dob_y_border.graphics.lineStyle(2, 0xb1b1b1);
        dob_y_border.graphics.drawRoundRect(this.registerInputX + 310, this.registerInputYBias + this.registerInputY * 2, 200, 61, 25, 25);
        dob_y_border.graphics.endFill;
        //------------------------------------------------------------------------
        this.mobilePhone = createTextFiled(mc_content.phone, this.registerInputX + 5 + 130, 10 + this.registerInputYBias + this.registerInputY * 3, 25, 0xb1b1b1, "left", 280, 61, "middle", false, 0xa0a0a0, false, egret.TextFieldType.INPUT);
        var tel_border = new egret.Shape();
        tel_border.graphics.lineStyle(2, 0xb1b1b1);
        tel_border.graphics.drawRoundRect(this.registerInputX + 100, this.registerInputYBias + this.registerInputY * 3, 320, 61, 25, 25);
        tel_border.graphics.endFill;
        this.emailText = createTextFiled(mc_content.email, this.registerInputX + 5, 12 + this.registerInputYBias + this.registerInputY * 4, 25, 0xb1b1b1, "left", 250, 61, "middle", false, 0xa0a0a0, false, egret.TextFieldType.INPUT);
        var mail_border = new egret.Shape();
        mail_border.graphics.lineStyle(2, 0xb1b1b1);
        mail_border.graphics.drawRoundRect(this.registerInputX, this.registerInputYBias + this.registerInputY * 4, 420, 61, 25, 25);
        mail_border.graphics.endFill;
        //出错显示
        var chucuo_title = createTextFiled("", this.registerInputX - 50, this.registerInputYBias + this.registerInputY * 6, 25, 0xff0000, "center", 545, 30);
        chucuo_title.size = 40;
        chucuo_title.textColor = 0xe6b956;
        this.errorText = chucuo_title;
        this.register_view.addChild(this.firstNameText);
        this.register_view.addChild(this.lastNameText);
        this.register_view.addChild(this.mobilePhone);
        this.register_view.addChild(this.dob_y_text);
        this.register_view.addChild(this.dob_m_text);
        this.register_view.addChild(this.dob_d_text);
        this.register_view.addChild(this.emailText);
        var nameYN = false;
        var telYN = false;
        var yzmYN = false;
        var yzmNum;
        this.firstNameText.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, this);
        this.mobilePhone.addEventListener(egret.TextEvent.CHANGE, function (evt) {
            var pattern = /^[0-9]*$/;
            while (!pattern.test(this.mobilePhone.text)) {
                this.mobilePhone.text = this.mobilePhone.text.substring(0, this.mobilePhone.text.length - 1);
            }
        }, this);
        //--------------------------------------------------------------------
        this.dob_y_text.addEventListener(egret.TouchEvent.FOCUS_OUT, function () {
            var v = this.dob_y_text.text;
            var pattern = /^(19\d{2}|20[01][0-9]|2020)$/;
            if (pattern.test(v)) {
                this.dateY = v;
            }
            else {
                if (this.dob_y_text.text) {
                    ShowTipsBox(mc_content.InvalidDate, this);
                    this.dob_y_text.text = '';
                }
            }
        }, this);
        this.dob_m_text.addEventListener(egret.TouchEvent.FOCUS_OUT, function () {
            var v = this.dob_m_text.text;
            var pattern = /^(0[0-9]|1[0-2])$/;
            if (pattern.test(v)) {
                this.dateM = v;
            }
            else {
                if (this.dob_m_text.text) {
                    ShowTipsBox(mc_content.InvalidDate, this);
                    this.dob_m_text.text = '';
                }
            }
        }, this);
        this.dob_d_text.addEventListener(egret.TouchEvent.FOCUS_OUT, function () {
            var v = this.dob_d_text.text;
            var pattern = /^(0[0-9]|1[0-9]|2[0-9]|3[0-1])$/;
            if (pattern.test(v)) {
                this.dateD = v;
            }
            else {
                if (this.dob_d_text.text) {
                    ShowTipsBox(mc_content.InvalidDate, this);
                    this.dob_d_text.text = '';
                }
            }
        }, this);
        //--------------------------------------------------------------------
        //添加按钮
        this.cj_btn = createBitmap("patronRegister_png", 140, 1000);
        this.register_view.addChild(this.cj_btn);
        //注册按钮点击
        this.cj_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.cj_btn.touchEnabled = false;
            loading(true);
            var that = this;
            if (!this.checkParamasValidate(function () {
                that.cj_btn.touchEnabled = true;
            })) {
                loading(false);
                return;
            }
            this.resetZcStatus(false);
            var request = requestRegisterPost(Main.baseUrl + Main.patronRegisterUrl, "?" + this.getPatronPostData());
            request.send();
            request.addEventListener(egret.Event.COMPLETE, this.registerCompelete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.signUpNetworkError, this);
        }, this);
        this.cj_btn.touchEnabled = true; //开启点击侦听
        this.dropDwonList.x = this.registerInputX;
        this.dropDwonList.y = this.registerInputYBias + 5 + this.registerInputY * 3;
        this._registerScollerView.addChild(this.dropDwonList);
        this.addChild(chucuo_title);
    };
    Info1UI.prototype.signUpNetworkError = function (event) {
        ShowConfirmBox(mc_content.NetworkErr, "Error", this, null);
        this.resetZcStatus(true);
        loading(false);
    };
    Info1UI.prototype.registerCompelete = function (event) {
        loading(false);
        var request = event.currentTarget;
        var jsonObject = JSON.parse(request.response);
        if (jsonObject.result == 'SUCCESS') {
            var patronId = jsonObject.data.PatronId;
            setLocalStorage(Main.MEMBERID_SYB, patronId);
            //this.addChild(ConfirmUtil.popUpTips(mc_content.MIDMsg + patronId,false,150,300,450,350));
            ShowTipsBox(mc_content.MIDMsg + patronId, this);
            if (Main.isBindingAction || getLocalStorage(Main.NBD_TOKEN_SYB)) {
                this.tempPatronId = patronId;
                var tokenId = getLocalStorage(Main.TOKENID_SYB);
                var params = "memberId=" + this.tempPatronId + "&tokenId=" + tokenId + "&remark=" + "binding";
                var request = requestPost(Main.baseUrl + Main.PostBindingMember, "?" + params);
                loading(true);
                request.send();
                request.addEventListener(egret.Event.COMPLETE, this.bindingResultSuccess, this);
                request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.bindingError, this);
                Main.isBindingAction = false;
            }
            else {
                var _that = this;
                ShowConfirmBox(mc_content.SUSuccess + patronId, "Success", _that, function () {
                    var gameui = ScenceManage.create(_that.stage);
                    gameui.loadScence("index", _that, IndexUI);
                });
            }
        }
        else if (jsonObject.result == 'ERROR') {
            // this.addChild(ConfirmUtil.popUpTips(mc_content.SUFailExist + patronId,false,150,300,450,350));
            ShowConfirmBox(mc_content.SUFailExist, "Error", this, null);
        }
        this.cj_btn.touchEnabled = true;
    };
    Info1UI.prototype.getPatronPostData = function () {
        var firstName = "firstName=" + this.firstNameText.text;
        var lastName = "lastName=" + this.lastNameText.text;
        var mobilePhone = "mobilePhone=" + this.dropDwonList.selectText + this.mobilePhone.text;
        var parimaryEmail = "primaryEmail=" + this.emailText.text;
        var DOB = "DOB=" + this.dateY + "-" + this.dateM + "-" + this.dateD;
        var marketConsent = "marketingConsent=" + (this.mcCheckBox.selected ? "Y" : "N");
        return firstName + "&" + lastName + "&" + mobilePhone + "&" + parimaryEmail + "&" + DOB + "&" + marketConsent;
    };
    //指向动画
    Info1UI.prototype.share_lg = function () {
        egret.Tween.get(this.shareLg).to({ alpha: 0 }, 1000).call(function () {
            this.shareLg.alpha = 1;
            this.share_lg();
        }.bind(this));
    };
    Info1UI.prototype.showErrorText = function (text, callBack) {
        if (callBack === void 0) { callBack = null; }
        // this.errorText.text = text;
        // this.errorText.alpha = 1
        // egret.Tween.get(this.errorText,{loop:false}).to({alpha:0},2500);
        ShowConfirmBox(text, "Error", this, callBack);
    };
    Info1UI.prototype.toMainPage = function () {
        var gameui = ScenceManage.create(this.stage);
        gameui.loadScence("index", this, IndexUI);
    };
    Info1UI.prototype.checkParamasValidate = function (callBack) {
        if (callBack === void 0) { callBack = null; }
        if (!this.firstNameText.text) {
            this.showErrorText(mc_content.ParamError, callBack);
            return false;
        }
        if (!this.lastNameText.text) {
            this.showErrorText(mc_content.ParamError, callBack);
            return false;
        }
        var pattern = /^[0-9]*$/;
        if (!pattern.test(this.mobilePhone.text) || !this.mobilePhone.text) {
            this.showErrorText(mc_content.ParamError, callBack);
            return false;
        }
        var pattern = /^(19\d{2}|20[01][0-9]|2020)$/;
        if (!pattern.test(this.dob_y_text.text)) {
            this.showErrorText(mc_content.ParamError, callBack);
            return false;
        }
        var pattern = /^(0[0-9]|1[0-2])$/;
        if (!pattern.test(this.dob_m_text.text)) {
            this.showErrorText(mc_content.ParamError, callBack);
            return false;
        }
        var pattern = /^(0[0-9]|1[0-9]|2[0-9]|3[0-1])$/;
        if (!pattern.test(this.dob_d_text.text)) {
            this.showErrorText(mc_content.ParamError, callBack);
            return false;
        }
        if (!this.mcCheckBox2.selected) {
            this.showErrorText(mc_content.ParamError, callBack);
            return false;
        }
        return true;
    };
    Info1UI.prototype.resetBtnStatus = function (f) {
        this._button.touchEnabled = f;
    };
    Info1UI.prototype.resetZcStatus = function (f) {
        this.cj_btn.touchEnabled = f;
    };
    return Info1UI;
}(eui.UILayer));
__reflect(Info1UI.prototype, "Info1UI");
//# sourceMappingURL=Info1UI.js.map