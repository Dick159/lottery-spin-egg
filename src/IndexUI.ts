class IndexUI extends egret.Sprite {
    private isRegistPopUp = false;
    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }
    private createView(): void {
        //添加背景
        var bg = createBitmap("");
        this.addChild(bg);
        

       //添加底部地板
        var diban = createBitmap("diban_png");
        diban.x = 250;
        diban.y = 1000;
        this.addChild(diban);
        egret.Tween.get(diban, { loop: true }).to({ y: diban.y+30 }, 900,egret.Ease.quadOut).to({ y: diban.y }, 900,egret.Ease.quadOut);
        //标题
        var title = createBitmap("index_title_png", 0, 10);
        this.addChild(title);
        //铃铛
        //声音
        var dd = new egret.Sound;
        dd.load("resource/assets/dd.mp3");
        var bell = createBitmap("index_bell_png", 29, 233);
        this.addChild(bell);
        bell.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
           
            egret.Tween.get(bell).to({ rotation: 30 }, 300).call(function () {
                dd.play(0,1);
                egret.Tween.get(bell).to({ rotation: -30 }, 300).call(function () {
                    bell.rotation=0;
                    //dog.play(0,1);
                    egret.Tween.get(fawn2).to({ alpha: 0 }, 300).to({alpha: 1},300).to({alpha: 0},300).call(function () {
                        fawn2.alpha=1;
                     }.bind(this));
                    
                }.bind(this));
            }.bind(this));
        },this);
       bell.touchEnabled = true; 

        //袜子
        var gameRule = createBitmap("index_sock_png", 556, 176);
        this.addChild(gameRule);
        gameRule.touchEnabled = true;
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
        var man = createBitmap("index_man_png", 0, 500);
        this.addChild(man);       
        
        var Machine_Glass = createBitmap("Machine_Glass", 120, 440);
        this.addChild(Machine_Glass);  


        //鹿
        //声音
        // var dog = new egret.Sound;
        // dog.load("resource/assets/dog.mp3");
        var fawn = createBitmap("index_fawn_1_png", 40, 725);
        this.addChild(fawn);
        var fawn2 = createBitmap("index_fawn_2_png", 190, 820);
        this.addChild(fawn2);
        
        //我的奖品
        // var Prize = createBitmap("index_mine_png", 543, 1011);
        // if(Main.jp_onoff){
        //     this.addChild(Prize);
        // }
        tree.touchEnabled=true;
        tree.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            Main.mask_onoff=true;
            var receiveui = ScenceManage.create(this.stage);
              receiveui.loadScence("ResultUI",this,ReceiveUI); 
        },this)
        //开始游戏按钮
        // var start_btn = createButton(273, 1034, 210, 70, 0x299a0e, 0xffffff, "开始游戏", 0xbf0c21, 0xffffff);
        // this.addChild(start_btn);
        var start_btn = createBitmap("start_btn_png",440,1295);
        this.addChild(start_btn);
        start_btn.touchEnabled = true;
        start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
              Main.jp_onoff=true;
              var gameui = ScenceManage.create(this.stage);
              gameui.loadScence("ResultUI",this,ReceiveUI);
        },this);
        

        //注册登录按钮
        var LoginRegisterbutton = createRegisterLoginButton(0,1295);

        LoginRegisterbutton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                var info = ScenceManage.create(this.stage);
                info.loadScence("info",this,Info1UI);
         },this)

        this.addChild(LoginRegisterbutton);

        //游戏规则弹窗
        var mask = createBitmap("rule_jpg", 375, 603);
        mask.touchEnabled = true;
        mask.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                egret.Tween.get(mask).to({ scaleX: 0, scaleY: 0 }, 500).call(function () {
                    start_btn.touchEnabled = true;
                    LoginRegisterbutton.touchEnabled = true;
                    mask.visible = false;
                }, this);
            
                
                egret.Tween.get(tree).to({ x: 556 }, 300).call(function () {
                        tree.visible = true;      //我的奖品复位
                    }, this);
                egret.Tween.get(gameRule).to({ x: 556 }, 300).call(function () {
                    gameRule.visible = true;      //游戏规则复位
                }, this);

        },this)
        this.addChild(mask);
        mask.visible = false;   //隐藏对象
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
                mask.visible = true;            //显示游戏规则弹窗
                egret.Tween.get(tree).to({ x: 750 }, 300).call(function () {
                    tree.visible = false;      //将我的奖品移出页面可见
                }, this);
                egret.Tween.get(gameRule).to({ x: 750 }, 300).call(function () {
                    gameRule.visible = false;      //将我的奖品移出页面可见
                }, this);
                egret.Tween.get(mask).to({ scaleX: 1, scaleY: 1 }, 500).call(function () {}, this);
            } else {
                start_btn.touchEnabled = true;
                // egret.Tween.get(mask).to({ scaleX: 0, scaleY: 0 }, 500).call(function () {
                //     mask.visible = false;
                // }, this);
            }
        }, this);

    }
}
