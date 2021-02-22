class PrizeAndRules extends eui.UILayer {

    private currentAc="0";

    private currentAd="0";

    private currentAe="0";
    private prizeBg;

    public constructor() {
        super();    
        //this.createView();
        this.once(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }
     
    private createView(): void {
         this.createPrize();
         this.createRules();
         this.createHowToRedeem();
         this.createHomebtn();
    }
    
    private createHowToRedeem(){
        var back = createBitmap("How to redeem button_png");

        back.x = (this.stage.stageWidth - back.width) * 0.5;
        back.y = this.stage.stageHeight * 0.91;
        this.addChild(back);

        back.touchEnabled = true;
        
        back.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
             var gameui = ScenceManage.create(this.stage);
             gameui.loadScence("index", this, HowToRedeem);
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
        this.prizeBg = my_prize_info_bg;
        my_prize_info_bg.x = _that.stage.stageWidth * 0.5 - my_prize_info_bg.width*0.5;
        my_prize_info_bg.y = _that.stage.stageHeight * 0.10;
        var prizeHeight = this.stage.stageHeight * 0.45;
        var multi = my_prize_info_bg.height/prizeHeight;
        if(prizeHeight>my_prize_info_bg.height){
            prizeHeight = my_prize_info_bg.height;
            multi= 1;
        }
        my_prize_info_bg.height = prizeHeight;

        var title = createTextFiledNoEui(mc_content.PRIZE);
        title.textColor = textColor;
        title.size = textSize;
        title.fontFamily="Microsoft YaHei";


    //    var cT = mc_content.MID;
    //     if(getLocalStorage(Main.MEMBERID_SYB)){
    //         cT = mc_content.MID + getLocalStorage(Main.MEMBERID_SYB)
            
    //     }else if(getLocalStorage(Main.TOKENID_SYB)){
    //         cT = mc_content.notLogin;
    //     }
    //     var user = createTextFiledNoEui(cT);
    //     user.textColor = textColor;
    //     user.size = 30;

        myPrizeInfo_cnt.addChild(my_prize_info_bg);
        myPrizeInfo_cnt.addChild(title);
        //myPrizeInfo_cnt.addChild( );


        var coins_png = createBitmap("Ox symbol_png");
        for(var i=0;i<Main.staticEnvPrizeList.length;i++){
            var ac_content = createTextFiledNoEui(Main.staticCoinsPrizeList[i]);
            ac_content.size = textSize
            ac_content.x = 200;
            ac_content.textColor = textColor;
            //ac_content.y = (this.stage.stageHeight * 0.05+305+ textSize*i)/multi;
            ac_content.y = (my_prize_info_bg.y + 380 + textSize*i)/multi;
            ac_content.fontFamily="Microsoft YaHei";
            ac_content.y+= (i?1:0)*15;
            myPrizeInfo_cnt.addChild(ac_content);
        }

        // var rp_png = createBitmap("Red Packet Symbol_png");
        // for(var i=0;i<Main.staticEnvPrizeList.length;i++){
        //     var ae_content = createTextFiledNoEui(Main.staticEnvPrizeList[i]);
        //     ae_content.size = textSize;
        //     ae_content.x = 200;
        //     ae_content.fontFamily="Microsoft YaHei";
        //     ae_content.textColor = textColor;
        //     ae_content.y = (my_prize_info_bg.y + 550+ textSize*i)/multi;
        //     ae_content.y+= (i?1:0)*15;
        //     myPrizeInfo_cnt.addChild(ae_content);
        // }


        var dd_png = createBitmap("Dollar Symbol_png");
         
        for(var i =0;i< Main.staticDDPrizeList.length ; i++){
            var ad_content = createTextFiledNoEui(Main.staticDDPrizeList[i]);
            ad_content.size = textSize;
            ad_content.x = 200;
            ad_content.fontFamily="Microsoft YaHei";
            ad_content.textColor = textColor;
            ad_content.y = (my_prize_info_bg.y + 165 + textSize*i)/multi;
            ad_content.y+= (i?1:0)*15;
            myPrizeInfo_cnt.addChild(ad_content);
        }




        title.x = (my_prize_info_bg.x + my_prize_info_bg.width * 0.5) - title.width*0.5;
        title.y =  (my_prize_info_bg.y + 42)/multi;
        //user.y = title.y +title.height + 8;
        //user.x = (my_prize_info_bg.x + my_prize_info_bg.width * 0.5) - user.width*0.5;
        var _scale = 1.5;

        
        dd_png.scaleX = _scale;
        dd_png.scaleY = _scale;
        dd_png.x = 150 - dd_png.width;
        dd_png.y =  (my_prize_info_bg.y + 165)/multi;


        coins_png.scaleX = _scale;
        coins_png.scaleY = _scale;
        coins_png.x = 150 - coins_png.width;
        //coins_png.y = (my_prize_info_bg.y + 350)/multi;
        coins_png.y = (my_prize_info_bg.y + 365)/multi;

        // rp_png.scaleX = _scale;
        // rp_png.scaleY = _scale;
        // rp_png.x = 150 - rp_png.width;
        // rp_png.y = (my_prize_info_bg.y + 535)/multi;


        myPrizeInfo_cnt.addChild(coins_png);
        myPrizeInfo_cnt.addChild(dd_png);
        // myPrizeInfo_cnt.addChild(rp_png);
        myPrizeInfo_cnt.addChild(ac_content);
        // myPrizeInfo_cnt.addChild(ae_content);

        _that.addChild(myPrizeInfo_cnt);

        _that.addChild(myPrizeInfo_cnt);

        if(egret.Capabilities.isMobile){
            if(document.body.clientHeight <  Main.smallScaleHeight){
                myPrizeInfo_cnt.scaleX = 0.8;
                myPrizeInfo_cnt.scaleY = 0.8;
                middleObject(this.stage.stageWidth,myPrizeInfo_cnt);
            }
         }


        
        myPrizeInfo_cnt.visible = true;

        egret.Tween.get(myPrizeInfo_cnt).to({alpha : 1},800);

    }

    private createRules(){
        var textColor = 0x851c1c;
        var textSize = 40;
        var _that = this;

        var myRulesInfo_cnt = new eui.Group();
        myRulesInfo_cnt.visible = false;
        myRulesInfo_cnt.alpha = 0;

        var rules_title_bg = createBitmap("Rules_title_png");
        rules_title_bg.x = _that.stage.stageWidth * 0.5 - rules_title_bg.width*0.5;
        // if(_that.stage.stageHeight * 0.45>=653){
        //     rules_title_bg.y = _that.stage.stageHeight * 0.05+703;
        // }else{
        //     rules_title_bg.y = _that.stage.stageHeight * 0.5;
        // }
        rules_title_bg.y = this.prizeBg.y + this.prizeBg.height + 50;
        //var rules_title_eui_bg = createBitmapEui("Rules_title_png");

        
        var rules_body_bg = createBitmap("Rules_body_png");
        var rules_body_eui_bg = createBitmapEui("rule_long_content_png");
        rules_body_eui_bg.width = rules_body_bg.width;
        rules_body_eui_bg.y -=  rules_title_bg.height;
 
        var _scroller = new eui.Scroller();
        // _scroller.skinName = "resource/eui_skins/ScrollerSkin.exml"
        // _scroller.verticalScrollBar.autoVisibility = false;
        _scroller.bounces = false;


        var upSilder = createBitmap("upSlider_png");


        upSilder.x =  rules_body_bg.width - upSilder.width - 5;
        upSilder.y =  rules_body_bg.height * 0.7



        _scroller.width = rules_title_bg.width;
        _scroller.height = rules_body_bg.height;
        _scroller.x = _that.stage.stageWidth * 0.5 - _scroller.width*0.5;
        _scroller.y = rules_title_bg.y + rules_title_bg.height - 5;


        var tc = createTextFiledNoEui('点击');
        tc.fontFamily="Microsoft YaHei";
            tc.size = 30;
            tc.x = 397;
            tc.y = 1317;
            tc.textColor = 0x851c1c;
            tc.bold = true;

        
        myRulesInfo_cnt.addChild(rules_body_eui_bg);
        myRulesInfo_cnt.addChild(tc);
        myRulesInfo_cnt.addChild(upSilder);
        myRulesInfo_cnt.touchEnabled = true;
        myRulesInfo_cnt.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            egret.Tween.pauseTweens(upSilder);
            upSilder.alpha = 0;
        },this)
        
        tc.touchEnabled = true;
             tc.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                 window.location.href=Main.baseUrl + "/campaign/fortuneOx2021-terms-and-conditions.html";
            },this);

        this.addChild(rules_title_bg);
        
        this.addChild(_scroller);

        myRulesInfo_cnt.visible = true;

        egret.Tween.get(myRulesInfo_cnt).to({alpha : 1},800);
        egret.Tween.get(upSilder,{loop:true}).to({alpha :0.5, y:upSilder.y-100},1500);


                //设置viewport
        _scroller.viewport = myRulesInfo_cnt;

   if(egret.Capabilities.isMobile){
            if(document.body.clientHeight <  Main.smallScaleHeight){
                var sw = _scroller.width;
                var sh = _scroller.height;
                _scroller.width = myRulesInfo_cnt.width * 0.8;
                _scroller.height = myRulesInfo_cnt.height * 0.8;
                rules_title_bg.scaleX = 0.8;
                rules_title_bg.scaleY = 0.8;
                middleObject(this.stage.stageWidth,_scroller);
                _scroller.width = sw;
                _scroller.height = sh;
                _scroller.scaleX = 0.8;
                _scroller.scaleY = 0.8;
                rules_title_bg.x = _scroller.x;
                rules_title_bg.y = this.prizeBg.y + this.prizeBg.height*0.8 + 40;
                _scroller.y = rules_title_bg.y + rules_title_bg.height - 20;
            }
         }
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
