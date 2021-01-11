var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IndexUI = (function (_super) {
    __extends(IndexUI, _super);
    function IndexUI() {
        var _this = _super.call(this) || this;
        _this.isRegistPopUp = false;
        _this.balls = [];
        _this.isFinishSpin = false;
        _this.isFirstLoop = false;
        _this.isNormalError = false;
        _this.isErrorRequest = false;
        _this.currentPrizeValue = null;
        _this.currentPrizeType = null;
        _this.currentAc = 0;
        _this.currentAd = 0;
        _this.currentAe = 0;
        _this.ERROR_MESSAGE = mc_content.ERROR_MESSAGE;
        _this.machine_group = new egret.DisplayObjectContainer();
        _this.getTokenFirst = true;
        _this.sign_out_btn = createBitmap("sign_out_png", 375, 603);
        _this.LoginRegisterbutton = createBitmap("Member Login Button_1_png", 0, 1295);
        _this.curLang = "c";
        _this.languageCnt = new egret.DisplayObjectContainer();
        _this.isSelect = false;
        _this.ballMove = [
            //[x,y,t]
            // x in [225,455]
            // y in [525,725]
            [[230, 600, 688], [380, 700, 600], [400, 560, 600]],
            [[380, 555, 500], [360, 666, 450], [235, 580, 450]],
            [[290, 525, 688], [240, 680, 600], [300, 630, 600]],
            [[333, 643, 500], [380, 700, 450], [264, 554, 600]],
            [[273, 689, 688], [425, 636, 600], [444, 721, 600]],
            [[421, 632, 500], [400, 660, 600], [380, 600, 600]],
            [[345, 682, 688], [300, 630, 450], [240, 580, 600]],
            [[230, 600, 500], [264, 714, 600], [380, 700, 600]]
        ];
        _this.once(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        _this.initData();
        return _this;
    }
    IndexUI.prototype.initData = function () {
        this.ifLoginJudge();
        Main.jp_onoff = false;
        Main.isBindingAction = false;
        this.LoginRegisterbutton.touchEnabled = true;
        Main.bg.texture = RES.getRes("common_bg_png");
        Main.bg.scaleX = 1;
        Main.bg.scaleY = 1;
        Main.bg.anchorOffsetX = 0;
        Main.bg.anchorOffsetY = 0;
        Main.bg.x = 0;
        Main.bg.y = 0;
    };
    IndexUI.prototype.showWelcomePage = function () {
        if (!Main.isFirstLoad) {
            return;
        }
        var cont = new eui.Group();
        var _whiteShader = createShaderMask(this.stage.stageWidth, this.stage.stageHeight, 0xFFFFFF, 0.5);
        var _s = createBitmap("Startup Text_png");
        var startUpText = createBitmapEui("Startup Text_png");
        startUpText.x = (this.stage.stageWidth - _s.width) * 0.5;
        startUpText.y = this.stage.stageHeight * 0.29;
        startUpText.anchorOffsetX = _s.width * 0.5;
        startUpText.anchorOffsetY = _s.width * 0.5;
        startUpText.x = startUpText.anchorOffsetX + startUpText.x;
        startUpText.y = startUpText.anchorOffsetY + startUpText.y;
        startUpText.scaleX = 0.5;
        startUpText.scaleY = 0.5;
        egret.Tween.get(startUpText).to({ scaleX: 1.2, scaleY: 1.2 }, 300, egret.Ease.quadInOut).to({ scaleX: 0.8, scaleY: 0.8 }, 300, egret.Ease.quadInOut).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.quadInOut).wait(1500).call(function () {
            egret.Tween.get(cont).to({ alpha: 0 }, 400).call(function () {
                Main.isFirstLoad = false;
                cont.visible = false;
            });
            cont.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                cont.visible = false;
                Main.isFirstLoad = false;
            }, this);
        }, this);
        cont.addChild(_whiteShader);
        cont.addChild(startUpText);
        cont.touchThrough = false;
        this.addChild(cont);
    };
    IndexUI.prototype.createSwitchLanguage = function () {
        var _e = null;
        var _c;
        if (this.curLang == 'e') {
            _e = createBitmap("Langauge Selection_English_png");
            _c = createBitmap("Langauge Selection_Chinese_child_png");
        }
        else if (this.curLang == 'c') {
            _e = createBitmap("Langauge Selection_Chinese_png");
            _c = createBitmap("Langauge Selection_English_child_png");
        }
        _e.touchEnabled = true;
        _c.touchEnabled = true;
        _e.x = this.stage.stageWidth - _e.width;
        _e.y = 20;
        _c.x = this.stage.stageWidth - _c.width;
        _c.y = 20;
        _c.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (this.curLang == "e") {
                _e.texture = RES.getRes("Langauge Selection_Chinese_png");
                _c.texture = RES.getRes("Langauge Selection_English_child_png");
                this.curLang = "c";
            }
            else {
                _e.texture = RES.getRes("Langauge Selection_English_child_png");
                _c.texture = RES.getRes("Langauge Selection_Chinese_png");
                this.curLang = "e";
            }
            if (!this.isSelect) {
                egret.Tween.get(_c).to({ y: _c.y + _c.height }, 200);
                this.isSelect = true;
            }
            else {
                egret.Tween.get(_c).to({ y: _e.y }, 200);
                this.isSelect = false;
            }
            window.location.href = "https://uat.marinabaysands.com" + window.location.pathname;
        }, this);
        _e.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (!this.isSelect) {
                egret.Tween.get(_c).to({ y: _c.y + _c.height }, 200);
                this.isSelect = true;
            }
            else {
                egret.Tween.get(_c).to({ y: _e.y }, 200);
                this.isSelect = false;
            }
        }, this);
        this.languageCnt.addChild(_c);
        this.languageCnt.addChild(_e);
        this.addChild(this.languageCnt);
    };
    IndexUI.prototype.createView = function () {
        this.createSwitchLanguage();
        var that = this;
        //添加背景
        this._bg = Main.bg;
        //标题
        var title = createBitmap("index_title_png", 0, 10);
        this.addChild(title);
        //铃铛
        //声音
        //     var dd = new egret.Sound;
        //     dd.load("resource/assets/dd.mp3");
        //     var bell = createBitmap("index_bell_png", 29, 233);
        //     this.addChild(bell);
        //     bell.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
        //         egret.Tween.get(bell).to({ rotation: 30 }, 300).call(function () {
        //             dd.play(0,1);
        //             egret.Tween.get(bell).to({ rotation: -30 }, 300).call(function () {
        //                 bell.rotation=0;
        //                 //dog.play(0,1);
        //                 // egret.Tween.get(fawn2).to({ alpha: 0 }, 300).to({alpha: 1},300).to({alpha: 0},300).call(function () {
        //                 //     fawn2.alpha=1;
        //                 //  }.bind(this));
        //             }.bind(this));
        //         }.bind(this));
        //     },this);
        //    bell.touchEnabled = true; 
        //gameRule
        var gameRule = createBitmap("PrizesRulesButton_png", 440, 1295);
        this.addChild(gameRule);
        gameRule.touchEnabled = true;
        //game rule pop up
        // var myPrizeButton = createBitmap("PrizesRulesButton_png",300,1495);
        // //this.addChild(myPrizeButton);
        //人物
        var machineMain = createBitmap("Capsule Machine_png", 0, 500);
        this.machine_group.addChild(machineMain);
        this.addCapsuleToGroup(this.machine_group);
        var Machine_Glass = createBitmap("Capsule Machine Glass_png", 130, 440);
        this.machine_group.addChild(Machine_Glass);
        this.addChild(this.machine_group);
        //我的奖品
        this.MyPrizeBtn = createBitmap("MyPrizes_png");
        //this.MyPrizeBtn.x = this.stage.stageWidth - this.MyPrizeBtn.width;
        this.MyPrizeBtn.y = this.stage.stageHeight * 0.12;
        this.addChild(this.MyPrizeBtn);
        this.MyPrizeBtn.touchEnabled = true;
        //myPrizeButton.touchEnabled=true;
        this.start_btn = createBitmap("gameStartBtn_png", 250, 1000);
        this.addChild(this.start_btn);
        var _gFilter = glowFilter(0xFFFFFF, 0.8, 25, 25, 2, true, false);
        this.start_btn.filters = [_gFilter];
        egret.Tween.get(this.start_btn, { loop: true }).to({ y: this.start_btn.y + 30 }, 900, egret.Ease.quadOut).to({ y: this.start_btn.y }, 900, egret.Ease.quadOut);
        egret.Tween.get(_gFilter, { loop: true }).to({ alpha: 0.3 }, 1000).to({ alpha: 0.8 }, 1000);
        this.start_btn.touchEnabled = true;
        this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (Main.jp_onoff) {
                return;
            }
            var hpl = getLocalStorageList(Main.PAYED_SYN);
            if (getLocalStorage(Main.MEMBERID_SYB)) {
                if (hpl.indexOf(getLocalStorage(Main.MEMBERID_SYB)) >= 0) {
                    this.popUpMessageTip(mc_content.PlayedMsg, this);
                    return;
                }
            }
            else if (getLocalStorage(Main.TOKENID_SYB)) {
                if (hpl.indexOf(getLocalStorage(Main.TOKENID_SYB)) >= 0) {
                    this.popUpMessageTip(mc_content.PlayedMsg, this);
                    return;
                }
            }
            if (getLocalStorage(Main.IS_TOKEN_PLAYED)) {
                this.popUpMessageTip(mc_content.PlayedMsg, this);
                setLocalStorageList(Main.PAYED_SYN, getLocalStorage(Main.TOKENID_SYB));
                return;
            }
            this.removeChild(this.languageCnt);
            Main.jp_onoff = true;
            //-----alpha to 0-------
            //disable button;
            this.start_btn.touchEnabled = false;
            this.LoginRegisterbutton.touchEnabled = false;
            gameRule.touchEnabled = false;
            this.sign_out_btn.touchEnabled = false;
            egret.Tween.get(this.start_btn).to({ alpha: 0 }, 300);
            egret.Tween.get(this.sign_out_btn).to({ alpha: 0 }, 300);
            egret.Tween.get(this.LoginRegisterbutton).to({ alpha: 0 }, 300);
            egret.Tween.get(gameRule).to({ alpha: 0 }, 300);
            //-----alpha 
            //----scale start-----
            this.setBgAnchor(true);
            egret.Tween.get(this._bg).to({ scaleX: 1.4, scaleY: 1.35, y: this._bg.y + 80 }, 1000);
            this.machine_group.anchorOffsetX = this.machine_group.width * 0.57;
            this.machine_group.anchorOffsetY = this.machine_group.height;
            this.machine_group.x = this.machine_group.x + this.machine_group.anchorOffsetX;
            this.machine_group.y = this.machine_group.y + this.machine_group.anchorOffsetY;
            egret.Tween.get(this.machine_group).to({ scaleX: 1.35, scaleY: 1.35 }, 1000).wait(500).call(function () {
                for (var i = 0; i < this.balls.length; i++) {
                    var b1 = this.balls[i];
                    egret.Tween.get(b1, { loop: true }).to({ x: this.ballMove[i][0][0] + b1.anchorOffsetX, y: this.ballMove[i][0][1] + +b1.anchorOffsetY }, this.ballMove[i][0][2], egret.Ease.sineIn).to({ x: this.ballMove[i][1][0] + b1.anchorOffsetX, y: this.ballMove[i][1][1] + b1.anchorOffsetY }, this.ballMove[i][1][2], egret.Ease.sineOut).to({ x: this.ballMove[i][2][0] + b1.anchorOffsetX, y: this.ballMove[i][2][1] + b1.anchorOffsetY }, this.ballMove[i][2][2], egret.Ease.sineIn).to({ x: b1.x, y: b1.y }, 500, egret.Ease.sineIn).call(function () {
                        if (!this.isFirstLoop) {
                            this.doLotteryRequest();
                        }
                        if (this.isFinishSpin) {
                            this.pauseAllBalls(this.balls);
                            this.popUpResult(that);
                        }
                        if (this.isErrorRequest) {
                            this.pauseAllBalls(this.balls);
                            //this.popUpMyPrizeList(that);
                            this.pupUpErrorTips(that);
                            removeLocalStorage(Main.IS_TOKEN_PLAYED);
                        }
                        if (this.isNormalError) {
                            this.pauseAllBalls(this.balls);
                            this.popUpMessageTip(mc_content.PlayedMsg, that);
                        }
                    }, this);
                    egret.Tween.get(b1, { loop: true }).to({ rotation: 360 }, 2500);
                }
            }, this);
            //------scale end-------
            //   var gameui = ScenceManage.create(this.stage);
            //   gameui.loadScence("ResultUI",this,ReceiveUI);
        }, this);
        //注册登录按钮
        this.LoginRegisterbutton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (Main.jp_onoff) {
                return;
            }
            var info = ScenceManage.create(this.stage);
            info.loadScence("info", this, Info1UI);
        }, this);
        this.sign_out_btn.x = 0;
        this.sign_out_btn.y = 1295;
        this.sign_out_btn.touchEnabled = true;
        this.addChild(this.LoginRegisterbutton);
        this.addChild(this.sign_out_btn);
        this.sign_out_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            removeLocalStorage(Main.MEMBERID_SYB);
            if (!getLocalStorage(Main.MEMBERID_SYB)) {
                this.popUpMessageTip(mc_content.SignOut, this);
                this.sign_out_btn.visible = false;
                this.LoginRegisterbutton.visible = true;
                var srlId = getQueryVariable(Main.SRLID_SYB);
                if (srlId) {
                    var url = delParam(Main.SRLID_SYB);
                    window.location.href = url;
                }
            }
        }, this);
        //游戏规则弹窗
        var mask = createBitmap("Rules_png", 375, 603);
        mask.touchEnabled = true;
        mask.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            egret.Tween.get(mask).to({ scaleX: 0, scaleY: 0 }, 500).call(function () {
                this.start_btn.touchEnabled = true;
                this.LoginRegisterbutton.touchEnabled = true;
                mask.visible = false;
            }, this);
            // egret.Tween.get(myPrizeButton).to({ x: 556 }, 300).call(function () {
            //         myPrizeButton.visible = true;      //我的奖品复位
            //     }, this);
            egret.Tween.get(gameRule).to({ x: 440 }, 300).call(function () {
                gameRule.visible = true; //游戏规则复位
            }, this);
            egret.Tween.get(this.LoginRegisterbutton).to({ x: 0 }, 300).call(function () {
                gameRule.visible = true; //login
            }, this);
            egret.Tween.get(this.sign_out_btn).to({ x: 0 }, 300).call(function () {
                gameRule.visible = true; //login
            }, this);
        }, this);
        this.addChild(mask);
        mask.visible = false; //隐藏对象
        mask.scaleX = 0;
        mask.scaleY = 0;
        mask.anchorOffsetX = mask.width * .5;
        mask.anchorOffsetY = mask.height * .5;
        //我的奖品点击逻辑;
        this.MyPrizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (!Main.jp_onoff && !mask.visible) {
                Main.jp_onoff = true;
                var mId = getLocalStorage(Main.MEMBERID_SYB);
                var tId = getLocalStorage(Main.TOKENID_SYB);
                var _url = Main.GetTokenUserDetail;
                var params = "?";
                if (mId) {
                    _url = Main.GetMemberUserDetail;
                    params += "memberId=" + mId;
                }
                else if (tId) {
                    params += "tokenId=" + tId;
                }
                loading(true);
                this.MyPrizeBtn.touchEnabled = false;
                var request = requestPost(Main.baseUrl + _url, params);
                request.send();
                request.addEventListener(egret.Event.COMPLETE, this.getPrizeDetailFinish, this);
                request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.getPrizeDetailError, this);
            }
        }, this);
        //游戏规则弹窗里面的圣诞老头
        var old_man = createBitmap("old_man_png", 750, 1000);
        // this.addChild(old_man);
        // old_man.visible = false;
        //点击显示/隐藏游戏规则弹出窗
        gameRule.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (Main.jp_onoff) {
                return;
            }
            var gameui = ScenceManage.create(this.stage);
            gameui.loadScence("index", this, PrizeAndRules);
        }, this);
        this.showWelcomePage();
    };
    IndexUI.prototype.addCapsuleToGroup = function (group) {
        // x in [225,455]
        // y in [525,725]
        var pos = [
            [235, 660],
            [260, 710],
            [295, 640],
            [330, 680],
            [380, 620],
            [400, 710],
            [425, 650],
            [445, 660]
        ];
        for (var i = 1; i < pos.length + 1; i++) {
            var b = createBitmap("Capsule" + i + "_png", pos[i - 1][0], pos[i - 1][1]);
            b.anchorOffsetX = b.width * 0.5;
            b.anchorOffsetY = b.height * 0.5;
            b.x = b.x + b.anchorOffsetX;
            b.y = b.y + b.anchorOffsetY;
            this.balls.push(b);
            group.addChild(b);
        }
    };
    IndexUI.prototype.randomLimitMoveBoxX = function (obj_width) {
        return random_num(this.xLeftBorder + obj_width, this.xRightBorder - obj_width);
    };
    IndexUI.prototype.randomLimitMoveBoxY = function (obj_width) {
        return random_num(this.yTopBorder + obj_width, this.yBottomBorder - obj_width);
    };
    IndexUI.prototype.lotteryResultComplete = function (event) {
        var request = event.currentTarget;
        //激活奖品按钮;
        Main.jp_onoff = false;
        if (!request.response) {
            this.isErrorRequest = true;
            return;
        }
        if (getLocalStorage(Main.MEMBERID_SYB)) {
            setLocalStorageList(Main.PAYED_SYN, getLocalStorage(Main.MEMBERID_SYB));
        }
        if (getLocalStorage(Main.TOKENID_SYB)) {
            setLocalStorageList(Main.PAYED_SYN, getLocalStorage(Main.TOKENID_SYB));
        }
        var jsonObject = JSON.parse(request.response);
        if (jsonObject.data.status) {
            this.currentAc = jsonObject.data.ac ? jsonObject.data.ac : "0";
            this.currentAd = jsonObject.data.ad ? jsonObject.data.ad : "0";
            this.currentAe = jsonObject.data.ae ? jsonObject.data.ae : "0";
        }
        else {
            this.isErrorRequest = true;
            return;
        }
        if (jsonObject.data.status == "00") {
            this.currentPrizeValue = jsonObject.data.value;
            this.currentPrizeType = jsonObject.data.type;
            this.isFinishSpin = true;
            setLocalStorage(Main.CPT, jsonObject.data.cpt);
        }
        else if (jsonObject.data.status == "01") {
            this.isErrorRequest = true;
        }
        else if (jsonObject.data.status == "02") {
            this.isNormalError = true;
        }
        //key for valuel text1 for prob. text2 for type.
    };
    IndexUI.prototype.pauseAllBalls = function (balls) {
        for (var i = 0; i < balls.length; i++) {
            egret.Tween.pauseTweens(balls[i]);
        }
    };
    IndexUI.prototype.doLotteryRequest = function () {
        // var request = requestPost_Lottery(Main.baseUrl + Main.lotteryApi,"?token=" + this.token + "&memberId=" + "");
        if (this.getTokenFirst) {
            this.getTokenFirst = false;
            var tmpRequest = requestGet(Main.baseUrl + Main.PostTokenizerApi, "");
            tmpRequest.send();
            tmpRequest.addEventListener(egret.Event.COMPLETE, this.tokenizerRequestCompelete, this);
            tmpRequest.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
        }
    };
    IndexUI.prototype.onPostIOError = function (event) {
        this.isErrorRequest = true;
    };
    IndexUI.prototype.tokenizerRequestCompelete = function (event) {
        var request = event.currentTarget;
        var jsonObject = JSON.parse(request.response);
        if (jsonObject.code && jsonObject.code == "200") {
            if (jsonObject.data && jsonObject.data.status == "00") {
                var tmp = jsonObject.data.tmp;
                var token = jsonObject.data.token;
                var params = "?tmp=" + tmp + "&" + "token=" + token;
                var memberId = getLocalStorage(Main.MEMBERID_SYB);
                var tokenId = getLocalStorage(Main.TOKENID_SYB);
                var _f = false;
                if (memberId) {
                    params += "&memberId=" + memberId;
                    _f = true;
                }
                else if (tokenId) {
                    setLocalStorage(Main.IS_TOKEN_PLAYED, "HPFB");
                    params += "&tokenId=" + tokenId;
                    _f = true;
                }
                if (_f) {
                    var lottery_request = requestPost(Main.baseUrl + Main.lotteryApi, params);
                    lottery_request.send();
                    lottery_request.addEventListener(egret.Event.COMPLETE, this.lotteryResultComplete, this);
                    lottery_request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
                }
                else {
                    this.isErrorRequest = true;
                }
            }
        }
        else {
            this.isErrorRequest = true;
        }
    };
    IndexUI.prototype.popUpResult = function (that, callBack) {
        if (!getLocalStorage(Main.MEMBERID_SYB) && getLocalStorage(Main.TOKENID_SYB)) {
            putNonBindingTokenId();
        }
        var shader = createShaderMask(this.stage.width, this.stage.height, 0x000000, 0.6);
        var popupPrizeContainer = new egret.DisplayObjectContainer();
        //popupPrizeContainer.x = 160;
        popupPrizeContainer.y = 630;
        popupPrizeContainer.width = this.stage.stageWidth;
        var capsule = createBitmap("Big Capsule(Glow)_png");
        middleObject(popupPrizeContainer.width, capsule);
        this.addChild(shader);
        var black_mask = createBitmap("black_mask_png");
        black_mask.alpha = 0;
        black_mask.width = this.stage.width;
        black_mask.height = this.stage.height;
        popupPrizeContainer.addChild(capsule);
        this.addChild(popupPrizeContainer);
        this.addChildAt(black_mask, 99999);
        popupPrizeContainer.anchorOffsetX = popupPrizeContainer.width * 0.5;
        popupPrizeContainer.anchorOffsetY = popupPrizeContainer.height * 0.5;
        popupPrizeContainer.x = popupPrizeContainer.anchorOffsetX + popupPrizeContainer.x;
        popupPrizeContainer.y = popupPrizeContainer.anchorOffsetY + popupPrizeContainer.y;
        popupPrizeContainer.scaleX = 0.3;
        popupPrizeContainer.scaleY = 0.3;
        var prizeTypePng = "OpenCapsule- Just Dollar_png";
        if (this.currentPrizeType && startWith(this.currentPrizeType, "C")) {
            prizeTypePng = "OpenCapsule- Just Ox_png";
        }
        else if (this.currentPrizeType && startWith(this.currentPrizeType, "E")) {
            prizeTypePng = "OpenCapsule- Just Red Packet_png";
        }
        egret.Tween.get(popupPrizeContainer).to({ scaleX: 1, scaleY: 1 }, 2000, egret.Ease.quadInOut).wait(100).call(function () {
            var _whiteShader = createShaderMask(this.stage.width, this.stage.height, 0xFFFFFF, 1);
            this.addChild(_whiteShader);
            popupPrizeContainer.removeChild(capsule);
            var openCapsule = createBitmap("OpenCapsule_png");
            middleObject(that.stage.stageWidth, openCapsule);
            openCapsule.y = capsule.y + 50;
            var prizeSymbol = createBitmap(prizeTypePng);
            prizeSymbol.x = popupPrizeContainer.width * 0.5 - prizeSymbol.width * 0.5;
            prizeSymbol.y = capsule.y - 40;
            //capsule.x+115,capsule.y -40
            var glodenGlow = glowFilter(0xFFC951, 0.8, 50, 50, 2, false, false);
            prizeSymbol.filters = [glodenGlow];
            popupPrizeContainer.addChild(openCapsule);
            popupPrizeContainer.addChild(prizeSymbol);
            egret.Tween.get(glodenGlow, { loop: true }).to({ alpha: 0.3 }, 1000).to({ alpha: 0.8 }, 500);
            egret.Tween.get(_whiteShader).to({ alpha: 0 }, 2500, egret.Ease.sineIn).wait(500).call(function () {
                egret.Tween.get(black_mask).to({ alpha: 1 }, 300, egret.Ease.quartInOut).call(function () {
                    popupPrizeContainer.removeChild(openCapsule);
                    popupPrizeContainer.removeChild(prizeSymbol);
                    that.removeChild(shader);
                    that.removeMachine();
                    that.showPrizePlatform();
                    egret.Tween.get(black_mask).to({ alpha: 0 }, 100, egret.Ease.quartInOut).call(function () {
                    }, this);
                }, this);
            }, this);
        }, this);
    };
    IndexUI.prototype.showPrizePlatform = function () {
        var _container = new egret.DisplayObjectContainer();
        var platform = createBitmap("Platform_png");
        var prizeSymbolPng = "Platform Prize Symbol- Dollar_png";
        var dvText = mc_content.DD;
        var cvText = "OX COIN";
        var evText = "";
        var congTextPng = "Congratulations Text box2_png";
        var coinsCongTipsText1 = mc_content.coinsCongTipsText1;
        var coinsCongTipsText2 = mc_content.coinsCongTipsText2;
        var envCongTipsText1 = mc_content.envCongTipsText1;
        var envCongTipsText2 = mc_content.envCongTipsText2;
        var congTipsTextList = [];
        var typeText = createTextFiledNoEui("");
        var prizeValueText = createTextFiledNoEui("");
        typeText.size = 34;
        typeText.textColor = 0xFFFFFF;
        prizeValueText.size = 34;
        prizeValueText.textColor = 0xFFFFFF;
        if (this.currentPrizeType && startWith(this.currentPrizeType, "C")) {
            prizeSymbolPng = "Platform Prize Symbol- Ox_png";
            typeText.text = cvText;
            prizeValueText.text = this.currentPrizeValue + "";
            congTipsTextList.push(coinsCongTipsText1);
            congTipsTextList.push(coinsCongTipsText2);
        }
        else if (this.currentPrizeType && startWith(this.currentPrizeType, "E")) {
            prizeSymbolPng = "Platform Prize Symbol- Red Packet_png";
            typeText.text = evText;
            prizeValueText.text = this.currentPrizeValue + mc_content.PACK;
            congTipsTextList.push(envCongTipsText1);
            congTipsTextList.push(envCongTipsText2);
        }
        else if (this.currentPrizeType && startWith(this.currentPrizeType, "D")) {
            prizeValueText.text = "$" + this.currentPrizeValue;
            congTextPng = "Congratulations Text box 1_png";
        }
        var prizeSymbol = createBitmap(prizeSymbolPng);
        var congText = createBitmap(congTextPng);
        var glodenGlow = glowFilter(0xFFC951, 0.8, 50, 50, 2, false, false);
        prizeSymbol.filters = [glodenGlow];
        egret.Tween.get(glodenGlow, { loop: true }).to({ alpha: 0.3 }, 1000).to({ alpha: 0.8 }, 500);
        prizeSymbol.x = (platform.x + platform.width * 0.5) - prizeSymbol.width * 0.5;
        platform.y = prizeSymbol.y + prizeSymbol.height - 40;
        congText.x = (platform.x + platform.width * 0.5) - congText.width * 0.5;
        congText.y = platform.y + platform.height + 10;
        prizeValueText.x = (congText.x + congText.width * 0.5) - prizeValueText.width * 0.5;
        prizeValueText.y = congText.y + congText.height * 0.37;
        typeText.x = (congText.x + congText.width * 0.5) - typeText.width * 0.5;
        typeText.y = prizeValueText.y + typeText.size;
        var congTextSize = 25;
        var congTextColor = 0xFFFFFF;
        for (var i = 0; i < congTipsTextList.length; i++) {
            var _t = createTextFiledNoEui("");
            _t.text = congTipsTextList[i];
            _t.textColor = congTextColor;
            _t.size = congTextSize;
            _t.x = (congText.x + congText.width * 0.5) - _t.width * 0.5;
            _t.y = typeText.y + 72 + congTextSize * i;
            _container.addChild(_t);
        }
        _container.addChild(platform);
        _container.addChild(prizeSymbol);
        _container.addChild(congText);
        _container.addChild(prizeValueText);
        _container.addChild(typeText);
        _container.x = this.stage.width * 0.5 - platform.width;
        _container.y = 500;
        this.addChild(_container);
        var inf_rdmp_pa_btn_cnt = new egret.DisplayObjectContainer();
        inf_rdmp_pa_btn_cnt.alpha = 0;
        var rdm_btn = createBitmap("How to redeem button_png");
        var myPrizeOrLoginPrizePng = "MY PRIZES Button_2_png";
        if (!getLocalStorage(Main.MEMBERID_SYB)) {
            myPrizeOrLoginPrizePng = "Member Login Button_2_png";
        }
        var my_prize = createBitmap(myPrizeOrLoginPrizePng);
        my_prize.touchEnabled = true;
        my_prize.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //if member 
            var m = getLocalStorage(Main.MEMBERID_SYB);
            if (!m) {
                Main.isBindingAction = true;
                var info = ScenceManage.create(this.stage);
                info.loadScence("info", this, Info1UI);
            }
            else {
                var mId = getLocalStorage(Main.MEMBERID_SYB);
                var tId = getLocalStorage(Main.TOKENID_SYB);
                var _url = Main.GetTokenUserDetail;
                var params = "?";
                if (mId) {
                    _url = Main.GetMemberUserDetail;
                    params += "memberId=" + mId;
                }
                else if (tId) {
                    params += "tokenId=" + tId;
                }
                loading(true);
                var request = requestPost(Main.baseUrl + _url, params);
                request.send();
                request.addEventListener(egret.Event.COMPLETE, this.getPrizeDetailFinish, this);
                request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.getPrizeDetailError, this);
            }
        }, this);
        var playAgain = createBitmap("Playagaintomorrow text_png");
        playAgain.touchEnabled = true;
        playAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var gameui = ScenceManage.create(this.stage);
            gameui.loadScence("index", this, IndexUI);
        }, this);
        rdm_btn.x = (platform.x + platform.width * 0.5) - rdm_btn.width * 0.5;
        rdm_btn.y = congText.y + congText.height + 200;
        my_prize.x = (platform.x + platform.width * 0.5) - my_prize.width * 0.5;
        my_prize.y = rdm_btn.y + rdm_btn.height;
        playAgain.x = (platform.x + platform.width * 0.5) - playAgain.width * 0.5;
        playAgain.y = my_prize.y + my_prize.height + 50;
        inf_rdmp_pa_btn_cnt.addChild(rdm_btn);
        inf_rdmp_pa_btn_cnt.addChild(my_prize);
        inf_rdmp_pa_btn_cnt.addChild(playAgain);
        inf_rdmp_pa_btn_cnt.x = this.stage.width * 0.5 - platform.width;
        inf_rdmp_pa_btn_cnt.y = 350;
        this.addChild(inf_rdmp_pa_btn_cnt);
        egret.Tween.get(inf_rdmp_pa_btn_cnt).wait(1500).to({ alpha: 1 }, 700);
        var rdmpInfo = createBitmap("How to redeem info_png");
        rdmpInfo.scaleX = 0;
        rdmpInfo.scaleY = 0;
        rdmpInfo.anchorOffsetX = rdmpInfo.width * 0.5;
        rdmpInfo.anchorOffsetY = rdmpInfo.height * 0.5;
        rdmpInfo.x = 375;
        rdmpInfo.y = 483;
        rdmpInfo.visible = false;
        this.addChild(rdmpInfo);
        rdm_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var rdmPage = ScenceManage.create(this.stage);
            rdmPage.loadScence("info", this, HowToRedeem);
        }, this);
        rdmpInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (rdm_btn.visible) {
                egret.Tween.get(rdmpInfo).to({ scaleX: 0, scaleY: 0 }, 500).call(function () {
                    rdmpInfo.visible = false;
                }, this);
            }
        }, this);
        rdmpInfo.touchEnabled = true;
        rdm_btn.touchEnabled = true;
    };
    IndexUI.prototype.removeMachine = function () {
        this.removeChild(this.machine_group);
        this._bg.texture = RES.getRes("Background2_png");
        this.setBgAnchor(false);
        this._bg.scaleX = 1;
        this._bg.scaleY = 1;
    };
    IndexUI.prototype.setBgAnchor = function (isBigScale) {
        if (isBigScale === void 0) { isBigScale = true; }
        if (isBigScale) {
            this._bg.anchorOffsetX = this._bg.width * 0.48;
            this._bg.anchorOffsetY = this._bg.height * 0.3;
            this._bg.x = this._bg.x + this._bg.anchorOffsetX;
            this._bg.y = this._bg.y + this._bg.anchorOffsetY;
        }
        else {
            this._bg.anchorOffsetX = 0;
            this._bg.anchorOffsetY = 0;
            this._bg.x = 0;
            this._bg.y = 0;
        }
    };
    IndexUI.prototype.popUpMyPrizeList = function (_that) {
        var tokenId = getLocalStorage(Main.TOKENID_SYB);
        var memberId = getLocalStorage(Main.MEMBERID_SYB);
        Main.jp_onoff = true;
        var myPrizeInfo_cnt = new egret.DisplayObjectContainer();
        myPrizeInfo_cnt.visible = false;
        myPrizeInfo_cnt.alpha = 0;
        var my_prize_info_bg = createBitmap("TextBG_png");
        var coins_png = createBitmap("Ox symbol_png");
        var ac_content = createTextFiledNoEui(mc_content.ac_content);
        ac_content.size = 36;
        ac_content.x = 200;
        ac_content.textColor = 0x7E1E08;
        ac_content.y = 695;
        ac_content.text = this.currentAc + ac_content.text;
        var dd_png = createBitmap("Dollar Symbol_png");
        var ad_content = createTextFiledNoEui(mc_content.ad_content);
        ad_content.size = 36;
        ad_content.x = 200;
        ad_content.textColor = 0x7E1E08;
        ad_content.y = 607;
        ad_content.text = this.currentAd + ad_content.text;
        var rp_png = createBitmap("Red Packet Symbol_png");
        var ae_content = createTextFiledNoEui(mc_content.ae_content);
        ae_content.size = 36;
        ae_content.x = 200;
        ae_content.textColor = 0x7E1E08;
        ae_content.y = 815;
        ae_content.text = this.currentAe + ae_content.text;
        var title = createTextFiledNoEui(mc_content.MYPRIZE);
        title.textColor = 0x7E1E08;
        title.size = 36;
        var bindingPatronBtn = createRegisterLoginButton(200, 950);
        bindingPatronBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Main.isBindingAction = true;
            var info = ScenceManage.create(this.stage);
            info.loadScence("info", this, Info1UI);
        }, this);
        my_prize_info_bg.x = _that.stage.stageWidth * 0.5 - my_prize_info_bg.width * 0.5;
        my_prize_info_bg.y = _that.stage.stageHeight * 0.3;
        title.x = (my_prize_info_bg.x + my_prize_info_bg.width * 0.5) - title.width * 0.5;
        title.y = (my_prize_info_bg.y + my_prize_info_bg.height * 0.16) - title.height;
        coins_png.x = 150 - coins_png.width * 0.5;
        coins_png.y = 710;
        dd_png.x = 150 - dd_png.width * 0.5;
        dd_png.y = 595;
        rp_png.x = 150 - rp_png.width * 0.5;
        rp_png.y = 815;
        myPrizeInfo_cnt.addChild(my_prize_info_bg);
        myPrizeInfo_cnt.addChild(title);
        myPrizeInfo_cnt.addChild(coins_png);
        myPrizeInfo_cnt.addChild(dd_png);
        myPrizeInfo_cnt.addChild(rp_png);
        myPrizeInfo_cnt.addChild(ac_content);
        myPrizeInfo_cnt.addChild(ad_content);
        myPrizeInfo_cnt.addChild(ae_content);
        // if(!this.start_btn.touchEnabled && !getLocalStorage(Main.MEMBERID_SYB)){
        //     myPrizeInfo_cnt.addChild(bindingPatronBtn);
        // }
        _that.addChild(myPrizeInfo_cnt);
        myPrizeInfo_cnt.visible = true;
        egret.Tween.get(myPrizeInfo_cnt).to({ alpha: 1 }, 800);
        myPrizeInfo_cnt.touchEnabled = true;
        myPrizeInfo_cnt.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (myPrizeInfo_cnt.visible) {
                egret.Tween.get(myPrizeInfo_cnt).to({ alpha: 0 }, 500).call(function () {
                    myPrizeInfo_cnt.visible = false;
                    Main.jp_onoff = false;
                });
            }
        }, this);
        loading(false);
    };
    IndexUI.prototype.pupUpErrorTips = function (_that) {
        var width = 300;
        var height = 500;
        _that.addChild(ConfirmUtil.popUpTips(this.ERROR_MESSAGE, true, _that.stage.stageWidth * 0.5 - width * 0.5, _that.stage.stageHeight * 0.6, width, height));
    };
    IndexUI.prototype.popUpMessageTip = function (str, _that) {
        var width = 300;
        var height = 700;
        _that.addChild(ConfirmUtil.popUpTips(str, true, _that.stage.stageWidth * 0.5 - width * 0.5, _that.stage.stageHeight * 0.7, width, height));
    };
    IndexUI.prototype.getPrizeDetailFinish = function (event) {
        var request = event.currentTarget;
        var jsonObject = JSON.parse(request.response);
        var _data = jsonObject.data;
        if (_data.status && _data.status == "00") {
            MyPrizes.currentAc = _data.ac;
            MyPrizes.currentAd = _data.ad;
            MyPrizes.currentAe = _data.ae;
        }
        this.MyPrizeBtn.touchEnabled = true;
        loading(false);
        var prizeScene = ScenceManage.create(this.stage);
        prizeScene.loadScence("IndexUI", this, MyPrizes);
    };
    IndexUI.prototype.getPrizeDetailError = function (event) {
        this.MyPrizeBtn.touchEnabled = true;
    };
    IndexUI.prototype.ifLoginJudge = function () {
        var srlID = getQueryVariable(Main.SRLID_SYB);
        //srl转跳
        if (srlID) {
            setLocalStorage(Main.MEMBERID_SYB, srlID);
        }
        if (getLocalStorage(Main.MEMBERID_SYB)) {
            this.sign_out_btn.visible = true;
            this.LoginRegisterbutton.visible = false;
        }
        else {
            this.sign_out_btn.visible = false;
            this.LoginRegisterbutton.visible = true;
        }
    };
    return IndexUI;
}(egret.Sprite));
__reflect(IndexUI.prototype, "IndexUI");
//# sourceMappingURL=IndexUI.js.map