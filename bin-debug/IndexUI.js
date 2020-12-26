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
        _this.machine_group = new egret.DisplayObjectContainer();
        _this.ballMove = [
            //[x,y,t]
            // x in [225,455]
            // y in [525,725]
            [[400, 560, 600], [380, 700, 600], [230, 600, 500]],
            [[235, 580, 450], [360, 666, 600], [380, 555, 500]],
            [[400, 560, 600], [380, 700, 600], [230, 600, 500]],
            [[400, 560, 600], [380, 700, 600], [230, 600, 500]],
            [[400, 560, 600], [380, 700, 600], [230, 600, 500]],
            [[400, 560, 600], [380, 700, 600], [230, 600, 500]],
            [[400, 560, 600], [380, 700, 600], [230, 600, 500]],
            [[400, 560, 600], [380, 700, 600], [230, 600, 500]]
        ];
        _this.once(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    IndexUI.prototype.createView = function () {
        var that = this;
        //添加背景
        this._bg = Main.bg;
        //标题
        var title = createBitmap("index_title_png", 0, 10);
        this.addChild(title);
        //铃铛
        //声音
        var dd = new egret.Sound;
        dd.load("resource/assets/dd.mp3");
        var bell = createBitmap("index_bell_png", 29, 233);
        this.addChild(bell);
        bell.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            egret.Tween.get(bell).to({ rotation: 30 }, 300).call(function () {
                dd.play(0, 1);
                egret.Tween.get(bell).to({ rotation: -30 }, 300).call(function () {
                    bell.rotation = 0;
                    //dog.play(0,1);
                    // egret.Tween.get(fawn2).to({ alpha: 0 }, 300).to({alpha: 1},300).to({alpha: 0},300).call(function () {
                    //     fawn2.alpha=1;
                    //  }.bind(this));
                }.bind(this));
            }.bind(this));
        }, this);
        bell.touchEnabled = true;
        //gameRule
        var gameRule = createBitmap("PrizesRulesButton_png", 440, 1295);
        this.addChild(gameRule);
        gameRule.touchEnabled = true;
        //game rule pop up
        var myPrizeButton = createBitmap("PrizesRulesButton_png", 300, 1495);
        //this.addChild(myPrizeButton);
        //人物
        var machineMain = createBitmap("lotteryMachine_png", 0, 500);
        this.machine_group.addChild(machineMain);
        this.addCapsuleToGroup(this.machine_group);
        var Machine_Glass = createBitmap("Machine_Glass", 120, 440);
        this.machine_group.addChild(Machine_Glass);
        this.addChild(this.machine_group);
        //我的奖品
        // var Prize = createBitmap("index_mine_png", 543, 1011);
        // if(Main.jp_onoff){
        //     this.addChild(Prize);
        // }
        myPrizeButton.touchEnabled = true;
        myPrizeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Main.mask_onoff = true;
            var receiveui = ScenceManage.create(this.stage);
            receiveui.loadScence("ResultUI", this, ReceiveUI);
        }, this);
        var start_btn = createBitmap("gameStartBtn_png", 250, 1000);
        this.addChild(start_btn);
        var _gFilter = glowFilter(0xFFFFFF, 0.8, 25, 25, 2, true, false);
        start_btn.filters = [_gFilter];
        egret.Tween.get(start_btn, { loop: true }).to({ y: start_btn.y + 30 }, 900, egret.Ease.quadOut).to({ y: start_btn.y }, 900, egret.Ease.quadOut);
        egret.Tween.get(_gFilter, { loop: true }).to({ alpha: 0.3 }, 1000).to({ alpha: 0.8 }, 1000);
        start_btn.touchEnabled = true;
        start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Main.jp_onoff = true;
            //-----alpha to 0-------
            //disable button;
            start_btn.touchEnabled = false;
            LoginRegisterbutton.touchEnabled = false;
            gameRule.touchEnabled = false;
            egret.Tween.get(start_btn).to({ alpha: 0 }, 300);
            egret.Tween.get(LoginRegisterbutton).to({ alpha: 0 }, 300);
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
                    }, this);
                    egret.Tween.get(b1, { loop: true }).to({ rotation: 360 }, 2500);
                }
            }, this);
            //------scale end-------
            //   var gameui = ScenceManage.create(this.stage);
            //   gameui.loadScence("ResultUI",this,ReceiveUI);
        }, this);
        //注册登录按钮
        var LoginRegisterbutton = createRegisterLoginButton(0, 1295);
        LoginRegisterbutton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var info = ScenceManage.create(this.stage);
            info.loadScence("info", this, Info1UI);
        }, this);
        this.addChild(LoginRegisterbutton);
        //游戏规则弹窗
        var mask = createBitmap("Rules_png", 375, 603);
        mask.touchEnabled = true;
        mask.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            egret.Tween.get(mask).to({ scaleX: 0, scaleY: 0 }, 500).call(function () {
                start_btn.touchEnabled = true;
                LoginRegisterbutton.touchEnabled = true;
                mask.visible = false;
            }, this);
            egret.Tween.get(myPrizeButton).to({ x: 556 }, 300).call(function () {
                myPrizeButton.visible = true; //我的奖品复位
            }, this);
            egret.Tween.get(gameRule).to({ x: 440 }, 300).call(function () {
                gameRule.visible = true; //游戏规则复位
            }, this);
            egret.Tween.get(LoginRegisterbutton).to({ x: 0 }, 300).call(function () {
                gameRule.visible = false; //login
            }, this);
        }, this);
        this.addChild(mask);
        mask.visible = false; //隐藏对象
        mask.scaleX = 0;
        mask.scaleY = 0;
        mask.anchorOffsetX = mask.width * .5;
        mask.anchorOffsetY = mask.height * .5;
        //游戏规则弹窗里面的圣诞老头
        var old_man = createBitmap("old_man_png", 750, 1000);
        // this.addChild(old_man);
        // old_man.visible = false;
        //点击显示/隐藏游戏规则弹出窗
        gameRule.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //this.textColor = 0x000000;
            // scoreText. = 0xbf0c21;
            if (mask.visible == false) {
                start_btn.touchEnabled = false;
                LoginRegisterbutton.touchEnabled = false;
                mask.visible = true; //显示游戏规则弹窗
                egret.Tween.get(myPrizeButton).to({ x: 750 }, 300).call(function () {
                    myPrizeButton.visible = false; //将我的奖品移出页面可见
                }, this);
                egret.Tween.get(gameRule).to({ x: 750 }, 300).call(function () {
                    gameRule.visible = false; //将我的奖品移出页面可见
                }, this);
                egret.Tween.get(LoginRegisterbutton).to({ x: -300 }, 300).call(function () {
                    gameRule.visible = false; //将我的奖品移出页面可见
                }, this);
                egret.Tween.get(mask).to({ scaleX: 1, scaleY: 1 }, 500).call(function () { }, this);
            }
            else {
                start_btn.touchEnabled = true;
            }
        }, this);
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
        var jsonObject = JSON.parse(request.response);
        this.isFinishSpin = true;
        var resultText = jsonObject.data.text2;
    };
    IndexUI.prototype.pauseAllBalls = function (balls) {
        for (var i = 0; i < balls.length; i++) {
            egret.Tween.pauseTweens(balls[i]);
        }
    };
    IndexUI.prototype.doLotteryRequest = function () {
        // var request = requestPost_Lottery(Main.baseUrl + Main.lotteryApi,"?token=" + this.token + "&memberId=" + "");
        var request = requestPost_Lottery(Main.baseUrl + Main.lotteryApi, "");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.lotteryResultComplete, this);
        this.isFirstLoop = true;
    };
    IndexUI.prototype.popUpResult = function (that, callBack) {
        var shader = createShaderMask(this.stage.width, this.stage.height, 0x000000, 0.6);
        var popupPrizeContainer = new egret.DisplayObjectContainer();
        popupPrizeContainer.x = 160;
        popupPrizeContainer.y = 630;
        //Big Capsule(Glow)_png,Glow2_png
        var capsule = createBitmap("Big Capsule(Glow)_png");
        // capsule.anchorOffsetX = capsule.width * 0.5;
        // capsule.anchorOffsetY = capsule.height * 0.5;
        // capsule.x = capsule.anchorOffsetX + capsule.x;
        // capsule.y = capsule.anchorOffsetY + capsule.y;
        // var glow = createBitmap("Glow2_png");
        // glow.alpha = 0.5
        // glow.anchorOffsetX = glow.width * 0.5;
        // glow.anchorOffsetY = glow.height * 0.5;
        // glow.x = glow.anchorOffsetX + glow.x;
        // glow.y = glow.anchorOffsetY + glow.y;
        // glow.x = capsule.x-5;
        // glow.y = capsule.y-70;
        this.addChild(shader);
        var black_mask = createBitmap("black_mask_png");
        black_mask.alpha = 0;
        black_mask.width = this.stage.width;
        black_mask.height = this.stage.height;
        // popupPrizeContainer.addChild(glow);
        popupPrizeContainer.addChild(capsule);
        this.addChild(popupPrizeContainer);
        this.addChildAt(black_mask, 99999);
        popupPrizeContainer.anchorOffsetX = popupPrizeContainer.width * 0.5;
        popupPrizeContainer.anchorOffsetY = popupPrizeContainer.height * 0.5;
        popupPrizeContainer.x = popupPrizeContainer.anchorOffsetX + popupPrizeContainer.x;
        popupPrizeContainer.y = popupPrizeContainer.anchorOffsetY + popupPrizeContainer.y;
        popupPrizeContainer.scaleX = 0.3;
        popupPrizeContainer.scaleY = 0.3;
        egret.Tween.get(popupPrizeContainer).to({ scaleX: 1, scaleY: 1 }, 2000, egret.Ease.quadInOut).wait(100).call(function () {
            var _whiteShader = createShaderMask(this.stage.width, this.stage.height, 0xFFFFFF, 1);
            this.addChild(_whiteShader);
            popupPrizeContainer.removeChild(capsule);
            var openCapsule = createBitmap("OpenCapsule_png", capsule.x - 120, capsule.y + 50);
            var prizeSymbol = createBitmap("OpenCapsule- Just Dollar_png", capsule.x + 115, capsule.y - 40);
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
        var prizeSymbol = createBitmap("Platform Prize Symbol- Dollar_png");
        var congText = createBitmap("Congratulations Text box_png");
        var valueText = createTextFiledNoEui("$888 \n REWARD DOLLARS");
        valueText.size = 34;
        valueText.textColor = 0xFFFFFF;
        var glodenGlow = glowFilter(0xFFC951, 0.8, 50, 50, 2, false, false);
        prizeSymbol.filters = [glodenGlow];
        egret.Tween.get(glodenGlow, { loop: true }).to({ alpha: 0.3 }, 1000).to({ alpha: 0.8 }, 500);
        prizeSymbol.x = (platform.x + platform.width * 0.5) - prizeSymbol.width * 0.5;
        prizeSymbol.y = platform.y - platform.height - 40;
        congText.x = (platform.x + platform.width * 0.5) - congText.width * 0.5;
        congText.y = platform.y + platform.height + 10;
        valueText.x = (congText.x + congText.width * 0.5) - valueText.width * 0.5;
        valueText.y = congText.y + congText.height * 0.5;
        _container.addChild(platform);
        _container.addChild(prizeSymbol);
        _container.addChild(congText);
        _container.addChild(valueText);
        _container.x = this.stage.width * 0.5 - platform.width;
        _container.y = 670;
        this.addChild(_container);
        var inf_rdmp_pa_btn_cnt = new egret.DisplayObjectContainer();
        var rdm_btn = createBitmap("How to redeem button_png");
        var my_prize = createBitmap("PrizesRulesButton_png");
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
    return IndexUI;
}(egret.Sprite));
__reflect(IndexUI.prototype, "IndexUI");
//# sourceMappingURL=IndexUI.js.map