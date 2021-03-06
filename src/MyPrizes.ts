class MyPrizes extends eui.UILayer {

    static currentAc="0";

    static currentAd="0";

    static currentAe="0";


    public constructor() {
        super();    
        //this.createView();
        this.once(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }
     
    private createView(): void {
         this.createPrize();
         this.createBackBtn();
    }
    
    private createBackBtn(){
        var back = createBitmap("back_png");

        back.x = (this.stage.stageWidth - back.width) * 0.5;
        back.y = this.stage.stageHeight * 0.6;
        this.addChild(back);

        back.touchEnabled = true;
        
        back.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                this.toMainPage();
        },this);
    }

    private createPrize(){
        var textColor = 0x851c1c;
        var textSize = 40;
        var _that = this;

        Main.jp_onoff = true;
        var myPrizeInfo_cnt = new egret.DisplayObjectContainer();
        myPrizeInfo_cnt.visible = false;
        myPrizeInfo_cnt.alpha = 0;

        var my_prize_info_bg = createBitmap("TextBG_png");
        my_prize_info_bg.x = _that.stage.stageWidth * 0.5 - my_prize_info_bg.width*0.5;
        my_prize_info_bg.y = _that.stage.stageHeight * 0.15;

        var title = createTextFiledNoEui(mc_content.MYPRIZE);
        title.textColor = textColor;
        title.size = textSize;

        myPrizeInfo_cnt.addChild(my_prize_info_bg);
        myPrizeInfo_cnt.addChild(title);

        var coins_png = createBitmap("Ox symbol_png");
        var ac_content = createTextFiledNoEui(MyPrizes.currentAc + " "+mc_content.OX);
        ac_content.bold = true;
        ac_content.size = textSize
        ac_content.x = 200;
        ac_content.textColor = textColor;
        ac_content.y = my_prize_info_bg.y + 330;
        myPrizeInfo_cnt.addChild(ac_content);

        var rp_png = createBitmap("Red Packet Symbol_png");
        var aeTextBold = createTextFiledNoEui(MyPrizes.currentAe + mc_content.redPack);
        aeTextBold.x = 200;
        aeTextBold.bold = true;
        aeTextBold.textColor = textColor;
        aeTextBold.size = textSize;
        aeTextBold.y = my_prize_info_bg.y + 505 ;
        myPrizeInfo_cnt.addChild(aeTextBold);


        var aeTextBold2 = createTextFiledNoEui(mc_content.ENVELOPES);
        aeTextBold2.x = 200;
        aeTextBold2.bold = true;
        aeTextBold2.textColor = textColor;
        aeTextBold2.size = textSize;
        aeTextBold2.y = my_prize_info_bg.y + 505 + textSize;
        myPrizeInfo_cnt.addChild(aeTextBold2);



        var dd_png = createBitmap("Dollar Symbol_png");
        var ad_text = "$" + MyPrizes.currentAd + mc_content.ad_content;
        var ad_content = createTextFiledNoEui(ad_text);
        ad_content.bold = true;
        ad_content.size = textSize;
        ad_content.x = 200;
        ad_content.textColor = textColor;
        ad_content.y = my_prize_info_bg.y + 155;
        myPrizeInfo_cnt.addChild(ad_content);




        title.x = (my_prize_info_bg.x + my_prize_info_bg.width * 0.5) - title.width*0.5;
        title.y =  my_prize_info_bg.y + 32;

        var _scale = 1.5;

        
        dd_png.scaleX = _scale;
        dd_png.scaleY = _scale;
        dd_png.x = 150 - dd_png.width;
        dd_png.y =  my_prize_info_bg.y + 130;


        coins_png.scaleX = _scale;
        coins_png.scaleY = _scale;
        coins_png.x = 150 - coins_png.width;
        coins_png.y = my_prize_info_bg.y + 315;

        rp_png.scaleX = _scale + 0.2;
        rp_png.scaleY = _scale + 0.2;
        rp_png.x = 150 - rp_png.width;
        rp_png.y = my_prize_info_bg.y + 500;


        myPrizeInfo_cnt.addChild(coins_png);
        myPrizeInfo_cnt.addChild(dd_png);
        myPrizeInfo_cnt.addChild(rp_png);

        var tipsContent = createTextFiledNoEui(mc_content.RedeemTime);
        tipsContent.textColor = 0xFFFFFF;
        tipsContent.size = 30;
        tipsContent.x = (this.stage.stageWidth - tipsContent.width)*0.5;
        tipsContent.y =this.stage.stageHeight * 0.56;
        this.addChild(tipsContent);


        _that.addChild(myPrizeInfo_cnt);

        
        myPrizeInfo_cnt.visible = true;

        egret.Tween.get(myPrizeInfo_cnt).to({alpha : 1},800);

    }

    private toMainPage(){
            var gameui = ScenceManage.create(this.stage);
            gameui.loadScence("index", this, IndexUI);
    }

}
