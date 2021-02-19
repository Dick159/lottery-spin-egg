class HowToRedeem extends eui.UILayer {




    public constructor() {
        super();    
        //this.createView();
        this.once(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }
     
    private createView(): void {
          var p1 = createBitmap("how to redeem 1_png");
          var p2 = createBitmap("how to redeem 2_png");

          var tips = createBitmap("Redeem your prizes by_text_png");

          var prizeRulesBtn = createBitmap("PrizesRulesButton_png");

          middleObject(this.stage.stageWidth,p1);
          middleObject(this.stage.stageWidth,p2);
          middleObject(this.stage.stageWidth,tips);
          middleObject(this.stage.stageWidth,prizeRulesBtn);
        
        var p1Height = this.stage.stageHeight * 0.45;
        var p2Height = this.stage.stageHeight * 0.35;
        if(p1Height>p1.height){
            p1Height = p1.height;
            p2Height = p2.height;
        }
          p1.height = p1Height;
          p1.y = this.stage.stageHeight * 0.10;

          p2.height = p2Height;
          p2.y = p1.y + p1.height + 30;

          tips.y =  p2.y + p2.height + 25;

        //   prizeRulesBtn.y = tips.y + tips.height + 40;
          prizeRulesBtn.y = this.stage.stageHeight * 0.91
          this.addChild(p1);
          this.addChild(p2);
          this.addChild(tips);
          this.addChild(prizeRulesBtn);

          prizeRulesBtn.touchEnabled = true;

          prizeRulesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            var gameui = ScenceManage.create(this.stage);
            gameui.loadScence("index", this, PrizeAndRules);
          },this)

          this.createHomebtn();
    }
    
    private createBackBtn(){
        var back = createBitmap("back_png");

        back.x = (this.stage.stageWidth - back.width) * 0.5;
        back.y = this.stage.stageHeight * 0.91;
        this.addChild(back);

        back.touchEnabled = true;
        
        back.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                this.toMainPage();
        },this);
    }


    private toMainPage(){
            var gameui = ScenceManage.create(this.stage);
            gameui.loadScence("index", this, IndexUI);
    }

    
    private createHomebtn(){
        var homeBtn = createBitmap("homepageback_button_png");
        homeBtn.x=5;
        homeBtn.y=35;
        homeBtn.touchEnabled = true;
        homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                this.toMainPage();
        },this)

        this.addChild(homeBtn);
    }

}