var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ReceiveUI = (function (_super) {
    __extends(ReceiveUI, _super);
    function ReceiveUI() {
        var _this = _super.call(this) || this;
        _this.lotteryApi = "/services/h5game/lottery";
        _this.num = 0;
        _this.balls = [];
        _this.topX = 10;
        _this.topY = 100;
        _this.bottomX = -10;
        _this.bottomY = -50;
        _this.isFinishSpin = true;
        _this.laohujiBasePos = 303;
        _this.lotteryExitBasePos = 505;
        _this.shockRange = [6, -5, 8, -3, 4, -7];
        _this.isRegistPopUp = false;
        _this.xLeftBorder = 150;
        _this.xRightBorder = 640;
        _this.yTopBorder = 460;
        _this.yBottomBorder = 770;
        _this.token = "";
        _this.ballMap = [
            //U: (150,460) D (610,770)
            //small
            { src: "gift9_png", size: 50, x: 200, y: 615 },
            { src: "gift9_png", size: 50, x: 390, y: 660 },
            { src: "gift9_png", size: 50, x: 495, y: 630 },
            { src: "gift9_png", size: 50, x: 550, y: 580 },
            // // //medium
            { src: "gift9_png", size: 80, x: 250, y: 640 },
            { src: "gift10_png", size: 80, x: 280, y: 720 },
            { src: "gift9_png", size: 80, x: 380, y: 720 },
            { src: "gift10_png", size: 80, x: 550, y: 730 },
            // //big
            { src: "gift9_png", size: 120, x: 210, y: 710 },
            { src: "gift10_png", size: 120, x: 330, y: 710 },
            { src: "gift9_png", size: 120, x: 450, y: 710 },
            { src: "gift10_png", size: 120, x: 550, y: 650 }
        ];
        //this.createView();
        _this.once(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    ReceiveUI.prototype.createLotteryBall = function (src, size, x, y) {
        //var ball = createBitmap("gift" + ( 9 + (i%2)).toString() + "_png");
        var ball = createBitmap(src);
        ball.width = size;
        ball.height = size;
        ball.x = x;
        ball.y = y;
        ball.anchorOffsetX = ball.width * .5;
        ball.anchorOffsetY = ball.height * .5;
        return ball;
    };
    ReceiveUI.prototype.pauseAllBalls = function (balls) {
        for (var i = 0; i < balls.length; i++) {
            egret.Tween.pauseTweens(balls[i]);
        }
    };
    ReceiveUI.prototype.createView = function () {
        this.width = 750;
        this.height = 1206;
        //添加背景
        // var bg=createBitmap("zj_bg_png");
        // this.addChild(bg);
        //添加标题
        var title = createBitmap("index_title_png");
        title.anchorOffsetX = title.width * .5;
        title.anchorOffsetY = title.height * .5;
        title.x = 18 + title.width * .5;
        title.y = 110 + title.height * .5;
        this.addChild(title);
        this.title = title;
        title.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var gameui = ScenceManage.create(this.stage);
            gameui.loadScence("index", this, IndexUI);
        }, this);
        title.touchEnabled = true;
        //添加中奖标题
        var zj_title = createBitmap("zj_bt_png");
        zj_title.anchorOffsetX = zj_title.width * .5;
        zj_title.anchorOffsetY = zj_title.height * .5;
        zj_title.x = 32 + zj_title.width * .5;
        zj_title.y = 19 + zj_title.height * .5;
        zj_title.scaleX = 0;
        zj_title.scaleY = 0;
        this.addChild(zj_title);
        //添加底部地板
        var diban = createBitmap("diban_png");
        diban.x = 0;
        diban.y = 842;
        this.addChild(diban);
        //添加老虎机的启动杆
        // this.rocker = createBitmap("qidong_png", 320, 339);
        // this.addChild(this.rocker);
        // this.rocker.anchorOffsetX = 0;
        // this.rocker.anchorOffsetY = this.rocker.height;
        // this.rocker.touchEnabled = true;
        //添加老虎机
        this.laohuji = createBitmap("lottery_box2_png");
        this.laohuji.x = 30;
        this.laohuji.y = this.laohujiBasePos;
        this.addChild(this.laohuji);
        this.laohuji.touchEnabled = true;
        //出奖口
        this.lotteryExit = createBitmap("asuzx-doomm_png");
        this.lotteryExit.x = 40;
        this.lotteryExit.y = 505;
        //this.addChild(this.lotteryExit);
        //声音
        this.dd = new egret.Sound;
        this.dd.load("resource/assets/dd.mp3");
        //摇杆声音
        this.rockeer_mp3 = new egret.Sound;
        this.rockeer_mp3.load("resource/assets/rocker.mp3");
        //老虎机声音
        this.laohuji_mp3 = new egret.Sound;
        this.laohuji_mp3.load("resource/assets/jiqi.mp3");
        for (var _i = 0, _a = this.ballMap; _i < _a.length; _i++) {
            var ball = _a[_i];
            var obj = this.createLotteryBall(ball.src, ball.size, ball.x, ball.y);
            this.addChild(obj);
            this.balls.push(obj);
        }
        //this.addChild(this.laohuji);
        this.addChild(this.lotteryExit);
        this.addChild(this.laohuji);
        //添加领取按钮
        var lq_btn = createBitmap("lingq_btn_png");
        lq_btn.x = 171;
        lq_btn.y = 1045;
        this.addChild(lq_btn);
        this.lq_btn = lq_btn;
        //添加领奖容器
        var ljDisplay = new egret.DisplayObjectContainer();
        //ljDisplay.y=148;
        if (Main.mask_onoff) {
            ljDisplay.y = 148;
            title.scaleX = 0;
            title.scaleY = 0;
            egret.Tween.get(zj_title).to({ scaleX: 1, scaleY: 1 }, 300);
        }
        else {
            ljDisplay.y = 1206;
            zj_title.scaleX = 0;
            zj_title.scaleY = 0;
            egret.Tween.get(title).to({ scaleX: 1, scaleY: 1 }, 300);
        }
        ljDisplay.x = 15;
        ljDisplay.width = 720;
        ljDisplay.height = 1047;
        this.addChild(ljDisplay);
        //添加容器内容背景
        var ljDisplayBg = createBitmap("djy_wbk_png");
        ljDisplayBg.x = 0;
        ljDisplayBg.y = 217;
        ljDisplay.addChild(ljDisplayBg);
        //添加容器圣诞老人背景
        var sdlaorenBg = createBitmap("zj_title_png");
        sdlaorenBg.y = 0;
        sdlaorenBg.x = 89;
        ljDisplay.addChild(sdlaorenBg);
        //添加容器内容
        var content = createBitmap("djy_hbk_png");
        content.y = 288;
        content.x = 95;
        ljDisplay.addChild(content);
        // 添加注册登录也页面
        var loginRegist = createBitmap("login_regist_jpg", 375, 603);
        loginRegist.width = this.$stage.width;
        loginRegist.height = this.$stage.height * 0.5;
        loginRegist.scaleX = 0;
        loginRegist.scaleY = 0;
        loginRegist.anchorOffsetX = loginRegist.width * .5;
        loginRegist.anchorOffsetY = loginRegist.height * .5;
        this.addChildAt(loginRegist, 999);
        loginRegist.touchEnabled = true;
        loginRegist.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (this.isRegistPopUp) {
                egret.Tween.get(loginRegist)
                    .to({ scaleX: 0, scaleY: 0 }, 500);
                this.isRegistPopUp = false;
            }
        }, this);
        //
        var jptext = createTextFiled(Main.zpname, 195, 450, 50, 0xff0000);
        ljDisplay.addChild(jptext);
        var text1 = createTextFiled("(优惠券or现金)", 269, 720, 35, 0xffffff);
        ljDisplay.addChild(text1);
        var text2 = createTextFiled("恭喜你获奖，请火速前来领取", 170, 778, 30, 0xffffff);
        ljDisplay.addChild(text2);
        var text4 = createTextFiled("领取方式：", 102, 850, 30, 0xffffff);
        ljDisplay.addChild(text4);
        var Rec = crawReactShape(null, 253, 830, 360, 80, 0xffffff, 0xfffff, 2);
        Rec.touchEnabled = true;
        Rec.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (!this.isRegistPopUp) {
                egret.Tween.get(loginRegist)
                    .to({ scaleX: 1, scaleY: 1 }, 500);
                this.isRegistPopUp = true;
            }
        }, this);
        ljDisplay.addChild(Rec);
        var text6 = createTextFiled("登录/注册 领取", 253, 850, 30, 0x000, "center", 360, 80, "", false, 0x000000, true);
        ljDisplay.addChild(text6);
        text1.bold = true;
        text2.bold = true;
        text4.bold = true;
        text6.bold = true;
        //可点击对象
        lq_btn.touchEnabled = true;
        ljDisplay.touchEnabled = true;
        //点击领取按钮事件
        var This = this;
        lq_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            jptext.text = Main.zpname;
            egret.Tween.get(title).to({ scaleX: 0, scaleY: 0 }, 200).call(function () {
                egret.Tween.get(zj_title).to({ scaleX: 1, scaleY: 1 }, 300);
            });
            egret.Tween.get(ljDisplay)
                .to({ y: 148 }, 500);
        }, this);
        ljDisplay.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            egret.Tween.get(zj_title).to({ scaleX: 0, scaleY: 0 }, 200).call(function () {
                egret.Tween.get(title).to({ scaleX: 1, scaleY: 1 }, 300);
            });
            egret.Tween.get(ljDisplay)
                .to({ y: 1206 }, 500);
        }, this);
        var onoff = true;
        this.laohuji.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (Main.laohujiButOnoff) {
                //生成randomToken;
                this.token = randomToken();
                title.touchEnabled = false;
                lq_btn.touchEnabled = false;
                Main.laohujiButOnoff = false;
                this.isFinishSpin = true;
                this.rockeer_mp3.play(0, 1);
                this.soundChannel = this.laohuji_mp3.play(0, 1);
                egret.Tween.get(this.laohuji, { loop: true }).to({ y: this.laohujiBasePos + this.shockRange[0] }, 100).to({ y: this.laohujiBasePos + this.shockRange[1] }, 100).to({ y: this.laohujiBasePos + this.shockRange[2], x: this.laohuji.x - 5 }, 100).to({ y: this.laohujiBasePos + this.shockRange[3] }, 100).to({ y: this.laohujiBasePos + this.shockRange[4], x: this.laohuji.x + 5 }, 100).to({ y: this.laohujiBasePos }, 100);
                egret.Tween.get(this.lotteryExit, { loop: true }).to({ y: this.lotteryExitBasePos + this.shockRange[0] }, 100).to({ y: this.lotteryExitBasePos + this.shockRange[1] }, 100).to({ y: this.lotteryExitBasePos + this.shockRange[2] }, 100).to({ y: this.lotteryExitBasePos + this.shockRange[3] }, 100).to({ y: this.lotteryExitBasePos + this.shockRange[4] }, 100).to({ y: this.lotteryExitBasePos }, 100);
                //开始抽奖，后台生成
                var request = requestPost(Main.baseUrl + this.lotteryApi, "?token=" + this.token + "&memberId=" + "");
                request.send();
                request.addEventListener(egret.Event.COMPLETE, this.lotteryResultComplete, this);
                //抽奖动画
                for (var i = 0; i < this.balls.length; i++) {
                    var b = this.balls[i];
                    var ori_x = b.x;
                    var ori_y = b.y;
                    //抖动动画
                    egret.Tween.get(b, { loop: true }).to({ x: this.randomLimitMoveBoxX(b.width), y: this.randomLimitMoveBoxY(b.width) }, 800).to({ x: this.randomLimitMoveBoxX(b.width), y: this.randomLimitMoveBoxY(b.width) }, 800).to({ x: this.randomLimitMoveBoxX(b.width), y: this.randomLimitMoveBoxY(b.width) }, 800).to({ x: ori_x, y: ori_y }, 800).call(function () {
                        if (this.isFinishSpin) {
                            this.pauseAllBalls(this.balls);
                            egret.Tween.pauseTweens(this.laohuji);
                            egret.Tween.pauseTweens(this.lotteryExit);
                            this.soundChannel.stop();
                            var randomBall = this.balls[this.random_num(0, this.balls.length - 1)];
                            randomBall.anchorOffsetX = 50 * .5;
                            randomBall.anchorOffsetY = 50 * .5;
                            //出奖
                            egret.Tween.get(randomBall, { loop: false }).to({ x: 210, y: 900, width: 50, height: 50 }, 1000).call(function () {
                                this.addChild(randomBall);
                                egret.Tween.get(randomBall).to({ y: 960, scaleX: 2.5, scaleY: 2.5, rotation: 360 }, 1000).to({}, 500).call(function () {
                                    //完毕
                                    randomBall.visible = false;
                                    jptext.text = this.getPrizeResult();
                                    egret.Tween.get(title).to({ scaleX: 0, scaleY: 0 }, 200).call(function () {
                                        egret.Tween.get(zj_title).to({ scaleX: 1, scaleY: 1 }, 300);
                                    });
                                    egret.Tween.get(ljDisplay)
                                        .to({ y: 148 }, 500);
                                }, this);
                                this.title.touchEnabled = true;
                                this.lq_btn.touchEnabled = true;
                                Main.laohujiButOnoff = true;
                            }, this);
                        }
                    }, this);
                }
            }
        }, this);
    };
    ReceiveUI.prototype.getPrizeResult = function () {
        var result = getLocalStorage(this.token);
        if (result) {
            return result.value;
        }
        else {
            return "The prize has expired";
        }
    };
    ReceiveUI.prototype.lotteryResultComplete = function (event) {
        var request = event.currentTarget;
        var jsonObject = JSON.parse(request.response);
        this.isFinishSpin = true;
        console.log(jsonObject.data);
        var resultText = jsonObject.data.text2;
        setLocalStorage(this.token, resultText, 1);
        var tokenSet = getLocalStorage("tokenSet");
        var _s;
        if (tokenSet) {
            _s = tokenSet.value;
            _s.push(this.token);
        }
        else {
            _s = [];
            _s.push(this.token);
        }
        setLocalStorage("tokenSet", _s);
    };
    ReceiveUI.prototype.randomLimitMoveBoxX = function (obj_width) {
        return this.random_num(this.xLeftBorder + obj_width, this.xRightBorder - obj_width);
    };
    ReceiveUI.prototype.randomLimitMoveBoxY = function (obj_width) {
        return this.random_num(this.yTopBorder + obj_width, this.yBottomBorder - obj_width);
    };
    // private Mask(mask, time, j, num, x) {
    //     egret.Tween.get(mask).to({ y: 290 }, time).call(function () {
    //         mask.y = 695;
    //         j++;
    //         if (j < num) {
    //             time *= .9;
    //             time < 30 ? time = 30 : time = time;
    //         } else {
    //             time *= 1.1;
    //             time > 1000 ? time = 1000 : time = time;
    //         }
    //         if (time >= 1000) {
    //             egret.Tween.pauseTweens(mask);
    //             if (x * 135 + 290 == 695) {
    //                 egret.Tween.get(mask).to({ y: (x * 135 + 290) }, 100).call(function () {
    //                     this.dd.play(0, 1);
    //                     this.num++;
    //                     if (this.num == 1) {
    //                         egret.Tween.pauseTweens(this.laohuji);
    //                         egret.Tween.pauseTweens(this.rocker);
    //                         this.title.touchEnabled=true;
    //                         this.lq_btn.touchEnabled=true;
    //                     }
    //                 }.bind(this));
    //             } else {
    //                 egret.Tween.get(mask).to({ y: (x * 135 + 290) }, 1500).call(function () {
    //                     this.dd.play(0, 1);
    //                     this.num++;
    //                     if (this.num == 1) {
    //                         egret.Tween.pauseTweens(this.laohuji);
    //                         egret.Tween.pauseTweens(this.rocker);
    //                         this.laohuji.x = 30;
    //                         this.laohuji.y = 300;
    //                         this.title.touchEnabled=true;
    //                         this.lq_btn.touchEnabled=true;
    //                     }
    //                 }.bind(this));
    //             }
    //         } else {
    //             this.Mask(mask, time, j, num, x);
    //         }
    //     }.bind(this));
    // }
    ReceiveUI.prototype.random_num = function (min, max) {
        var Range = max - min;
        var Rand = Math.random();
        return (min + Math.round(Rand * Range));
    };
    ReceiveUI.prototype.done = function () {
        for (var i = 0; i < this.balls.length; i++) {
            console.log(i);
        }
    };
    return ReceiveUI;
}(egret.Sprite));
__reflect(ReceiveUI.prototype, "ReceiveUI");
//# sourceMappingURL=ReceiveUI.js.map