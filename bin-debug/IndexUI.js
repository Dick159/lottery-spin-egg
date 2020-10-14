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
        _this.once(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    IndexUI.prototype.createView = function () {
        //添加背景
        var bg = createBitmap("");
        this.addChild(bg);
        //添加底部地板
        var diban = createBitmap("diban_png");
        diban.x = 0;
        diban.y = 842;
        this.addChild(diban);
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
                    dog.play(0, 1);
                    egret.Tween.get(fawn2).to({ alpha: 0 }, 300).to({ alpha: 1 }, 300).to({ alpha: 0 }, 300).call(function () {
                        fawn2.alpha = 1;
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        }, this);
        bell.touchEnabled = true;
        //袜子
        var sock = createBitmap("index_sock_png", 556, 176);
        this.addChild(sock);
        //背景树
        var tree = createBitmap("index_mine_png", 556, 276);
        this.addChild(tree);
        //人物的手
        // var hand = createBitmap("index_hand_png",308,740);
        // this.addChild(hand);        
        // hand.anchorOffsetX = hand.width;
        // hand.anchorOffsetY = hand.height;
        // hand.rotation=-15;
        // egret.Tween.get(hand,{loop:true}).to({rotation:0},250).to({rotation:-15},500).to({rotation:-15},750).to({rotation:-15},1000)
        //人物
        var man = createBitmap("index_man_png", 70, 180);
        this.addChild(man);
        //手上的礼物
        var handgift = createBitmap("index_handgift_png", 350, 610);
        this.addChild(handgift);
        handgift.anchorOffsetX = handgift.width * .5;
        handgift.anchorOffsetY = handgift.height * .5;
        egret.Tween.get(handgift, { loop: true }).to({ y: 560 }, 200).to({ y: 480 }, 800).to({ y: 520 }, 150).to({ y: 600 }, 350).to({ y: 600 }, 1000);
        egret.Tween.get(handgift, { loop: true }).to({ rotation: -90 }, 200).to({ rotation: -720 }, 800).to({ rotation: -720 }, 500).to({ rotation: -720 }, 1000);
        //鹿
        //声音
        var dog = new egret.Sound;
        dog.load("resource/assets/dog.mp3");
        var fawn = createBitmap("index_fawn_1_png", 40, 725);
        this.addChild(fawn);
        var fawn2 = createBitmap("index_fawn_2_png", 190, 820);
        this.addChild(fawn2);
        //我的奖品
        var Prize = createBitmap("ingdex_Prize_jpg", 543, 1011);
        if (Main.jp_onoff) {
            this.addChild(Prize);
        }
        Prize.touchEnabled = true;
        Prize.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Main.mask_onoff = true;
            var receiveui = ScenceManage.create(this.stage);
            receiveui.loadScence("ResultUI", this, ReceiveUI);
        }, this);
        //开始游戏按钮
        // var start_btn = createButton(273, 1034, 210, 70, 0x299a0e, 0xffffff, "开始游戏", 0xbf0c21, 0xffffff);
        // this.addChild(start_btn);
        var start_btn = createBitmap("start_btn_png", 230, 1095);
        this.addChild(start_btn);
        start_btn.touchEnabled = true;
        start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Main.jp_onoff = true;
            var gameui = ScenceManage.create(this.stage);
            gameui.loadScence("ResultUI", this, ReceiveUI);
        }, this);
        //游戏规则字体
        // var scoreText = createTextFiled("游戏规则", 0, 1140, 30, 0x717171, "center", 750);
        // this.addChild(scoreText);
        // scoreText.touchEnabled = true;
        //游戏规则弹窗
        // var mask = createBitmap("rule_jpg", 375, 603);
        // this.addChild(mask);
        // mask.visible = false;   //隐藏对象
        // mask.scaleX = 0;
        // mask.scaleY = 0;
        // mask.anchorOffsetX = mask.width * .5;
        // mask.anchorOffsetY = mask.height * .5;
        // //游戏规则弹窗里面的圣诞老头
        // var old_man = createBitmap("old_man_png", 750, 1000);
        // this.addChild(old_man);
        // old_man.visible = false;
        // //点击显示/隐藏游戏规则弹出窗
        // scoreText.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        //     this.textColor = 0x000000;
        //     // scoreText. = 0xbf0c21;
        //     if (mask.visible == false) {
        //         start_btn.touchEnabled = false;
        //         mask.visible = true;            //显示游戏规则弹窗
        //         egret.Tween.get(Prize).to({ x: 750 }, 300).call(function () {
        //             Prize.visible = false;      //将我的奖品移出页面可见
        //         }, this);
        //         egret.Tween.get(mask).to({ scaleX: 1, scaleY: 1 }, 500).call(function () {
        //             old_man.visible = true;     //老头从右边不可见出缓慢移动到可见出
        //             egret.Tween.get(old_man).to({ x: 500 }, 1000).call(function () {
        //             }, this);
        //         }, this);
        //     } else {
        //         start_btn.touchEnabled = true;
        //         egret.Tween.get(mask).to({ scaleX: 0, scaleY: 0 }, 500).call(function () {
        //             mask.visible = false;
        //             egret.Tween.get(old_man).to({ x: 750 }, 300).call(function () {
        //                 old_man.visible = false;
        //                 Prize.visible = true;
        //                 egret.Tween.get(Prize).to({ x: 543 }, 1000).call(function () {
        //                 }, this);
        //             }, this);
        //         }, this);
        //     }
        // }, this);
        //下滑线
        // var Line = drawReactShape("", 306, 1172, 140, 2, 0x717171);
        // this.addChild(Line);
    };
    return IndexUI;
}(egret.Sprite));
__reflect(IndexUI.prototype, "IndexUI");
//# sourceMappingURL=IndexUI.js.map