class MyPrizeAndRules extends eui.UILayer {

    private currentAc="0";

    private currentAd="0";

    private currentAe="0";


    public constructor() {
        super();    
        //this.createView();
        this.once(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }
     
    private createView(): void {
        var _that = this;
         
        var tokenId = getLocalStorage(Main.TOKENID_SYB);
        var memberId = getLocalStorage(Main.MEMBERID_SYB);

        Main.jp_onoff = true;
        var myPrizeInfo_cnt = new egret.DisplayObjectContainer();
        myPrizeInfo_cnt.visible = false;
        myPrizeInfo_cnt.alpha = 0;

        var my_prize_info_bg = createBitmap("TextBG_png");

        var coins_png = createBitmap("Ox symbol_png");
        var ac_content = createTextFiledNoEui(" AUSPICIOUS OX\r\n COLLECTIBLE");
        ac_content.size = 36
        ac_content.x = 200;
        ac_content.textColor =  0x7E1E08;
        ac_content.y = 695;
        ac_content.text = this.currentAc + ac_content.text;

        var dd_png = createBitmap("Dollar Symbol_png");
        var ad_content = createTextFiledNoEui(" REWARD DOLLARS");
        ad_content.size = 36;
        ad_content.x = 200;
        ad_content.textColor =  0x7E1E08;
        ad_content.y = 607;
        ad_content.text = this.currentAd + ad_content.text;


        var rp_png = createBitmap("Red Packet Symbol_png");
        var ae_content = createTextFiledNoEui(" RED PACKET ENVELOP");
        ae_content.size = 36;
        ae_content.x = 200;
        ae_content.textColor =  0x7E1E08;
        ae_content.y = 815;
        ae_content.text = this.currentAe + ae_content.text;


        var title = createTextFiledNoEui("MY PRIZE");
        title.textColor = 0x7E1E08;
        title.size = 36;


        var bindingPatronBtn = createRegisterLoginButton(200,950);
        bindingPatronBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                Main.isBindingAction = true;
                var info = ScenceManage.create(this.stage);
                info.loadScence("info",this,Info1UI);
        },this)



        my_prize_info_bg.x = _that.stage.stageWidth * 0.5 - my_prize_info_bg.width*0.5;
        my_prize_info_bg.y = _that.stage.stageHeight * 0.3;


        title.x = (my_prize_info_bg.x + my_prize_info_bg.width * 0.5) - title.width*0.5;
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
        if(!getLocalStorage(Main.MEMBERID_SYB)){
            myPrizeInfo_cnt.addChild(bindingPatronBtn);
        }
        _that.addChild(myPrizeInfo_cnt);

        
        myPrizeInfo_cnt.visible = true;

        egret.Tween.get(myPrizeInfo_cnt).to({alpha : 1},800);

        myPrizeInfo_cnt.touchEnabled = true;

        myPrizeInfo_cnt.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
             if(myPrizeInfo_cnt.visible){
                egret.Tween.get(myPrizeInfo_cnt).to({alpha :0},500).call(function(){
                        myPrizeInfo_cnt.visible = false;
                        Main.jp_onoff = false;
                });
             }
        },this)
        loading(false);

    }

}
