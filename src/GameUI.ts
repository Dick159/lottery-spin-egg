

class GameUI extends egret.Sprite {

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }
    private score = 0;
    private frameTime;
    private countdownSprite;//倒计时显示对象
    private scoreSprite;//分数时显示对象
    private gifArr;//物品数组
    private adLogo;
    private addScore;;
    private countdownMaxNumber = 30;
    private countdownCurNumber;
    private gameStatus = 1;
    private curIndex = 0;  //当前的物品索引
    private timer;//物品定时器
    private star=false;
    private starBtn;
    private oldMask;
    private oi;
    private allScoreSprite;
    private goOn;
    private share;
    private goOn2;
    private snowman1;
    private snowman2;
    private cj;
    private shareMsak;
    private shareBit;
    private cj2;
    private shareTxt;
    private shareLg;
    private defeated;
    private win;
    private click;
    private bruise;
    private jj="+";
    private fa;
    private dd;
    private bl=true;
    private createView(): void {
        this.countdownCurNumber = this.countdownMaxNumber;
        //添加背景
        var bg = createBitmap("");
        this.addChild(bg);
        this.frameTime = 1 / this.$stage.frameRate;
        //添加倒计时

        var countdownText = createTextFiled("倒计时", 267, 15, 18, 0xffffff);
        this.addChild(countdownText);
        this.countdownSprite = createTextFiled(this.countdownMaxNumber.toString(), 0, 36, 48, 0xffffff, "center", 750);
        this.addChild(this.countdownSprite);
        //圆角矩形
        var rounRect = new egret.Shape();
        rounRect.graphics.lineStyle(2, 0xffffff);
        rounRect.graphics.drawRoundRect(516, 26, 222, 55, 55, 55);
        rounRect.graphics.endFill();
        this.addChild(rounRect);
        //添加分数文本
        var scoreText = createTextFiled("分数:", 536, 40, 28, 0xffffff);
        this.addChild(scoreText);
        //添加分数文本
        this.scoreSprite = createTextFiled("0000", 600, 40, 28, 0xffffff, "right", 110);
        this.addChild(this.scoreSprite);
        //初始化物品数组
        this.gifArr = [];
        var self = this;
        for (var i = 1; i <= 10; i++) {
            var bitmap = createBitmap("gift" + i + "_png");
            bitmap.x = 375;
            bitmap.y = 1450;
            bitmap.alpha = .4;
            bitmap.anchorOffsetX = bitmap.width * .5;
            bitmap.anchorOffsetY = bitmap.height * .5;
            bitmap.scaleX = .6;
            bitmap.scaleY = .6;
            this.addChild(bitmap);
            bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                this.touchEnabled=false;
                egret.Tween.get(this).to({ scaleX: 0, scaleY: 0 }, 250).call(function () {
                    this.touchEnabled=true;
                    var index = Math.floor(Math.random() * 9 + 1);
                    this.adLogo.texture = RES.getRes("logo" + index + "_png");
                    this.adLogo.anchorOffsetX = this.adLogo.width * .5;
                    this.adLogo.anchorOffsetY = this.adLogo.height * .5;
                    this.adLogo.x = e.stageX;
                    this.adLogo.y = e.stageY;
                    this.adLogo.scaleX = 0;
                    this.adLogo.scaleY = 0;


                    this.addScore.text = jj + data["score"];
                    this.addScore.anchorOffsetX = this.addScore.width * .5;
                    this.addScore.anchorOffsetY = this.addScore.height * .5;
                    this.addScore.x = e.stageX;
                    this.addScore.y = e.stageY;
                    this.addScore.scaleX = 0;
                    this.addScore.scaleY = 0;
                    egret.Tween.get(this.addScore).to({ scaleX: 1.2, scaleY: 1.2, y: this.addScore.y - 100 }, 1000).call(function(){
                        this.addScore.scaleX = 0;
                        this.addScore.scaleY = 0;
                    }.bind(self));
                    
                    egret.Tween.get(this.adLogo).to({ scaleX: 1.2, scaleY: 1.2 }, 250)
                        .to({ scaleX: 0, scaleY: 0 }, 250);
                }.bind(self));
                var data;
                var jj;
                for (var k in self.gifArr) {
                    if (self.gifArr[k].bitmap == this) {
                        data = self.gifArr[k];

                    }
                }
                if (data["isGift"]) {
                    self.score += data["score"];
                    jj = "+";
                    dd.play(0,1);
                } else {
                    self.score -= data["score"];
                    jj = "-";
                    fa.play(0,1);
                    setTimeout(function(){
                        self.bruise.play(0,1);
                    },500);
                    
                };
                self.score = self.score <= 0 ? 0 : self.score;
                self.scoreSprite.text = self.score;
                self.allScoreSprite.text=self.score;
            }, bitmap);
            var tmpJson = {
                "bitmap": bitmap,
                "score": i * 100,
                "isGift": i > 8 ? false : true
            };
            this.gifArr.push(tmpJson);
        }
        //添加地板
        var floor = createBitmap("bottom_bg_png", 0, 957);
        this.addChild(floor);
        //广告
        this.adLogo = createBitmap("");
        this.addChild(this.adLogo);
        //加分数
        this.addScore = createTextFiled("", 0, 0, 60, 0xffcc00);
        this.addChild(this.addScore);
        //准备，GO
        var go = createTextFiled("", 750*.5, 750*.5, 100, 0xffcb01);
        this.addChild(go);
        
        go.scaleX = 0;
        go.scaleY = 0;
            
        //创建定时器
        this.timer = new egret.Timer(1000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.giftLoop, this);
        this.timer.start();
        //圣诞老人mask
        var oldMask=new egret.DisplayObjectContainer;
        this.addChild(oldMask);
        var oi=createBitmap("oi_png");
        oi.y=220;
        oldMask.addChild(oi);
        var old=createBitmap("old_png");
        oldMask.addChild(old);
        oldMask.width=oi.width;
        old.x=(oi.width-old.width)*.5;
        this.starBtn=createBitButton("seven_btnblue_png", 0, 730, 0xffffff, "开始","four_btnpink_png" , 0xff0000);
        oldMask.addChild(this.starBtn);
        //声音加载
        //爆炸
        var fa = new egret.Sound;
        
        fa.load("resource/assets/far.mp3");

        //成功
        var dd = new egret.Sound;
        dd.load("resource/assets/dd.mp3");

        //ReadyGO
        var readyGo = new egret.Sound;
        
        readyGo.load("resource/assets/readyGo.mp3");
        //失败
        this.defeated = new egret.Sound;
        
        this.defeated.load("resource/assets/defeated.mp3");
        //胜利
        this.win = new egret.Sound;
        
        this.win.load("resource/assets/win.mp3");

        //点击
         this.click = new egret.Sound;
        
        this.click.load("resource/assets/click.mp3");
        //受伤bruise
        this.bruise = new egret.Sound;
        
        this.bruise.load("resource/assets/bruise.mp3");
        //总分数
        this.allScoreSprite = createTextFiled("", 0, 0, 40, 0xff0000);
        oldMask.addChild(this.allScoreSprite);
        this.allScoreSprite.x=355;
        this.allScoreSprite.y=460;
        this.allScoreSprite.width=150;
        this.starBtn.x=(oi.width-211)*.5;
        oldMask.anchorOffsetX=oldMask.width*.5;
        oldMask.anchorOffsetY=oldMask.height*.5;
        oldMask.x=(oldMask.width)*.5+17;
        oldMask.y=oldMask.height*.5+200;
        this.oldMask=oldMask;
        this.oi=oi;
         //按钮
            this.goOn = createBitButton("four_btnpink_png", 100, 750, 0xffffff, "继续游戏", "seven_btnblue_png", 0xff0000);
            this.oldMask.addChild(this.goOn);
            this.share = createBitButton("seven_btnblue_png", 400, 750, 0xffffff, "分享好友","four_btnpink_png" , 0xff0000);
            this.oldMask.addChild(this.share);
            
            this.cj = createBitButton("four_btnpink_png", 100, 750, 0xffffff, "抽奖", "seven_btnblue_png", 0xff0000);
            this.oldMask.addChild(this.cj);
                    this.goOn.scaleX=0;
                    this.goOn.scaleY=0;
                    
                    this.share.scaleX=0;
                    this.share.scaleY=0;
                    this.cj.scaleX=0;
                    this.cj.scaleY=0;
        this.dd=dd;
        this.fa=fa
        //滑雪人
        this.snowman1=createBitmap("four_stan_png");
        this.snowman1.x=750;
        this.snowman1.y=1206-197;
        this.addChild(this.snowman1);
        
        var rect:egret.Rectangle = new egret.Rectangle(0,0,this.$stage.width,this.$stage.height);  
        oldMask.mask = rect;
        //雪人动画
        this.snowman1.scaleX=0;
        this.snowman1.scaleY=0;
        
        this.snowman1.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(e){
            
            egret.Tween.pauseTweens( this.snowman1);
           this.snowman1.addEventListener(egret.TouchEvent.TOUCH_MOVE,function(e){
           this.snowman1.x=e.stageX-(this.snowman1.width*.5);
            },this);

        },this);
        this.snowman1.addEventListener(egret.TouchEvent.TOUCH_END,function(e){

            egret.Tween.get(this.snowman1).to({ x: -this.snowman1.width}, e.stageX/750*3000).call(function(){
                            this.snowman1.x=this.oldMask.width;
                            egret.Tween.get(this.snowman1,{loop:true}).to({ x: -this.snowman1.width}, 3000);
           }.bind(this));
            this.snowman1.removeEventListener(egret.TouchEvent.TOUCH_MOVE,function(e){
               this.snowman1.x=e.stageX-(this.snowman1.width*.5);
            },this);
        },this);


         
        this.starBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e){
            this.starBtn.scaleX=0;
            this.starBtn.scaleY=0;
            
            egret.Tween.get(oldMask).to({ scaleX: 0, scaleY:0 }, 100).call(function(){
                go.text = "Ready?";
                go.width=go.width;
                go.anchorOffsetX = go.width * .5;
                go.anchorOffsetY = go.height * .5;
                readyGo.play(0,1);
                egret.Tween.get(go).to({ scaleX: 1.2, scaleY: 1.2 }, 500)
                .to({ scaleX: 0, scaleY: 0 }, 250).call(function(){
                    go.text = "GO!";
                    egret.Tween.get(go).to({ scaleX: 1.2, scaleY: 1.2 }, 300)
                    .to({ scaleX: 0, scaleY: 0 }, 250).call(function(){
                        this.snowman1.scaleX=1;
                        this.snowman1.scaleY=1;

                        egret.Tween.get(this.snowman1,{loop:true}).to({ x: -this.snowman1.width}, 3000);
                        this.snowman1.touchEnabled = true;
                        self.star=true;
                        this.gameStatus = 1;
                        //游戏主循环，可以给当前场景添加一个“进入帧”事件
                        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
                    }.bind(self));
                         
                }.bind(self));

                
            }.bind(self));

        },this);


        //分享
        this.shareMsak=new egret.DisplayObjectContainer();
        this.shareMsak.width=750;
        this.addChild(this.shareMsak);


        this.shareLg=createBitmap("seven_share_png");
        this.shareLg.x=this.shareMsak.width-this.shareLg.width-17;
        this.shareLg.y=26;
        this.shareMsak.addChild(this.shareLg);
        this.share_lg();

        var shareText=createBitmap("fun_title_png");
        shareText.x=(this.shareMsak.width-shareText.width)*.5;
        shareText.y=35+ this.shareLg.height;
        this.shareMsak.addChild(shareText);


        this.shareBit=createBitmap("seven_gameover_png");
        this.shareBit.x=(this.shareMsak.width-this.shareBit.width)*.5;
        this.shareBit.y=35+ this.shareLg.height+shareText.height+20;
        this.shareMsak.addChild(this.shareBit);

        this.goOn2 = createBitButton("btn_green_png", 0, 1000, 0xffffff, "继续游戏","btn_green_png" , 0xff0000);
        this.shareMsak.addChild(this.goOn2);
        this.goOn2.x=(oi.width-402)*.5;
        this.goOn2.scaleX=0;
        this.goOn2.scaleY=0;

        this.cj2 = createBitButton("four_btnpink_png", 0, 1000, 0xffffff, "抽奖","seven_btnblue_png" , 0xff0000);
        this.shareMsak.addChild(this.cj2);
        this.cj2.x=(750-this.cj2.width)*.5;
        this.cj2.scaleX=0;
        this.cj2.scaleY=0;

        this.shareTxt=createTextFiled("游戏结束!",0,650,80,0x9a9893);
        this.shareTxt.x=(750-this.shareTxt.width)*.5;
        this.shareMsak.addChild(this.shareTxt);
        this.shareTxt.scaleX=0;
        this.shareTxt.scaleY=0;
        this.shareMsak.anchorOffsetX=this.shareMsak.width*.5;
        this.shareMsak.anchorOffsetY=this.shareMsak.height*.5;
        this.shareMsak.scaleX=0;
        this.shareMsak.x=this.shareMsak.width*.5;
        this.shareMsak.y=this.shareMsak.height*.5;


        
    }
    
    
    //指向动画
    private share_lg(){
        egret.Tween.get(this.shareLg).to({ alpha:0}, 1000).call(function(){
                this.shareLg.alpha=1;
                
                this.share_lg();
            }.bind(this));
    }



    private giftLoop() {
        
        if(this.star){
            this.allScoreSprite.text=this.scoreSprite.text;
                 var target = this.gifArr[this.curIndex];
                egret.Tween.get(target.bitmap).to({ y: -100 }, 300).call(function () {
                    target.bitmap.alpha = 1;
                    target.bitmap.x = Math.random() * 650 + 50;
                    target.bitmap.scaleX = 1;
                    target.bitmap.scaleY = 1; 
                    target.bitmap.touchEnabled = true;
                    this.setChildIndex(target.bitmap, this.numChildren - 2);
            }.bind(this))//向上
                .to({ y: 1350 }, 2500).call(function () {
                    target.bitmap.alpha = .4;
                    target.bitmap.x = 375;
                    target.bitmap.scaleX = .6;
                    target.bitmap.scaleY = .6;
                    target.bitmap.touchEnabled = false;
                    this.setChildIndex(target.bitmap, 9);
                    
                }.bind(this));//向下
            this.curIndex++;
            if (this.curIndex >= 10) {
                this.curIndex = 0;
            };
            
            
             
        }

    }
    private loop() {
        //倒计时
        if (this.gameStatus == 1) {
            this.countdownCurNumber -= this.frameTime;
            if (this.countdownCurNumber <= 0) {
                this.countdownCurNumber = 0;
                this.gameStatus = 0;

            }

            this.countdownSprite.text = this.countdownCurNumber.toFixed(2);

            //雪人碰撞
            var This=this;
            for(var k in this.gifArr){
                if(this.gifArr[k].bitmap.touchEnabled ==true){
                    
                    if(
                        this.gifArr[k].bitmap.y-this.gifArr[k].bitmap.height*.5>=this.snowman1.y&&
                        this.gifArr[k].bitmap.y-this.gifArr[k].bitmap.height*.5<=this.$stage.height+this.gifArr[k].bitmap.height
                        &&this.gifArr[k].bitmap.x-this.gifArr[k].bitmap.width*.5>=this.snowman1.x&&
                        this.gifArr[k].bitmap.x-this.gifArr[k].bitmap.width*.5<=(this.snowman1.x+this.snowman1.width)
                        &&this.bl==true
                    ){
                         if (this.gifArr[k]["isGift"]) {
                            this.score += this.gifArr[k]["score"];
                            this.jj = "+";
                            this.dd.play(0,1);
                        } else {
                            this.score -= this.gifArr[k]["score"];
                            this.jj = "-";
                            this.fa.play(0,1);
                        };
                        this.score = this.score <= 0 ? 0 : this.score;
                        this.scoreSprite.text = this.score;
                        this.allScoreSprite.text=this.score;


                        this.bl=false;
                        egret.Tween.get(this.gifArr[k].bitmap).to({ scaleX: 0, scaleY: 0 }, 100);
                         this.addScore.text = this.jj +This.gifArr[k]["score"];
                        this.addScore.anchorOffsetX = this.addScore.width * .5;
                        this.addScore.anchorOffsetY = this.addScore.height * .5;
                        this.addScore.x = this.snowman1.x;
                        this.addScore.y = this.snowman1.y;
                        this.addScore.scaleX = 0;
                        this.addScore.scaleY = 0;
                        egret.Tween.get(this.addScore).to({ scaleX: 1.2, scaleY: 1.2, y: this.addScore.y - 100 }, 1000).call(function(){
                            this.addScore.scaleX = 0;
                            this.addScore.scaleY = 0;
                            this.bl=true;
                            
                        }.bind(this));
                         
                        

                    }
                }
                    
                    
            }
        } else {
            this.star=false;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.loop, this);

            // var scence = ScenceManage.create(this.stage);
            // scence.loadScence("index", this, ResultUI);

            //出现游戏结果
            this.snowman1.scaleX=0;
            this.snowman1.scaleY=0;
                    
                    this.share.scaleX=1;
                    this.share.scaleY=1;
            if(this.score>=5000){//判断分数
                this.cj.scaleX=1;
                this.cj.scaleY=1;
                this.oi.texture = RES.getRes("award_png");
                this.win.play(0,1);
                
            }else{
                this.goOn.scaleX=1;
                this.goOn.scaleY=1;
                this.oi.texture = RES.getRes("jx_game_jpg");
                this.defeated.play(0,1);
            }        
            
            this.setChildIndex(this.oldMask, this.numChildren - 1);
            egret.Tween.get(this.oldMask).to({ scaleX: 1, scaleY: 1 }, 1000);
            this.goOn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.go_on,this);
            this.goOn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.go_on,this);
            this.cj.addEventListener(egret.TouchEvent.TOUCH_TAP,this.info,this);
            
            this.share.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                this.click.play(0,1);
                if(this.score<2000){
                    egret.Tween.get(this.oldMask).to({ scaleX: 0, scaleY: 0 }, 10000).call(function(){
                        this.shareBit.texture = RES.getRes("seven_gameover_png");
                        this.goOn.scaleX=0;
                        this.goOn.scaleY=0;
                        this.cj.scaleX=0;
                        this.cj.scaleY=0;
                        this.share.scaleX=0;
                        this.share.scaleY=0;


                        this.goOn2.scaleX=1;
                        this.goOn2.scaleY=1;
                        this.shareTxt.scaleX=1;
                        this.shareTxt.scaleY=1;
                        this.allScoreSprite.text="";

                        egret.Tween.get(this.shareMsak).to({ scaleX: 1 }, 500);
                        
                    }.bind(this)); 
                }else{
                    
                    this.info1();


                }
            },this)
            

        }


        //礼物上升下降


        //判断游戏状态
    }

    private go_on(){
        egret.Tween.get(this.shareMsak).to({ scaleX: 0}, 200).call(function(){
            this.click.play(0,1);
                egret.Tween.get(this.oldMask).to({ scaleX: 0, scaleY: 0 }, 500).call(function(){
                    this.goOn.scaleX=0;
                    this.goOn.scaleY=0;
                    this.goOn2.scaleX=0;
                    this.goOn2.scaleY=0;
                    this.share.scaleX=0;
                    this.share.scaleY=0;
                    this.cj2.scaleX=0;
                    this.cj2.scaleY=0;
                    this.shareTxt.scaleX=0;
                    this.shareTxt.scaleY=0;
                    
                    this.starBtn.scaleX = 1;
                    this.starBtn.scaleY = 1;
                    this.scoreSprite.text="0000";
                    this.score=0;
                    this.allScoreSprite.text="";
                    this.oi.texture = RES.getRes("tow_png");
                    this.countdownCurNumber=this.countdownMaxNumber;
                    this.countdownSprite.text=this.countdownMaxNumber;
                    egret.Tween.get(this.oldMask).to({ scaleX: 1, scaleY: 1 }, 500);
                }.bind(this));
          }.bind(this));  
    }
    private info(){
        this.click.play(0,1);
        var gameui = ScenceManage.create(this.stage);
        gameui.loadScence("info",this,InfoUI);
    }
    private info1(){
        this.click.play(0,1);
        var gameui = ScenceManage.create(this.stage);
        gameui.loadScence("info",this,Info1UI);
    }
}
