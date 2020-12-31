class IndexUI extends egret.Sprite {
    private isRegistPopUp = false;
    private xLeftBorder;
    private xRightBorder;
    private yTopBorder;
    private yBottomBorder;
    private balls = [];
    private isFinishSpin = false;
    private isFirstLoop = false;
    private isNormalError = false;
    private isErrorRequest = false;
    private currentPrizeValue = null;
    private currentPrizeType = null;
    private currentAc = 0;
    private currentAd = 0;
    private _bg:egret.Bitmap;
    private ERROR_MESSAGE = "Network Error."
    private machine_group = new egret.DisplayObjectContainer(); 
    private getTokenFirst = true;
    private ballMove = [
        //[x,y,t]
        // x in [225,455]
        // y in [525,725]
        [[400,560,600],[380,700,600],[230,600,500]],
        [[235,580,450],[360,666,600],[380,555,500]],
        [[400,560,600],[380,700,600],[230,600,500]],
        [[400,560,600],[380,700,600],[230,600,500]],
        [[400,560,600],[380,700,600],[230,600,500]],
        [[400,560,600],[380,700,600],[230,600,500]],
        [[400,560,600],[380,700,600],[230,600,500]],
        [[400,560,600],[380,700,600],[230,600,500]]
    ];

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }
    private createView(): void {

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
        bell.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
           
            egret.Tween.get(bell).to({ rotation: 30 }, 300).call(function () {
                dd.play(0,1);
                egret.Tween.get(bell).to({ rotation: -30 }, 300).call(function () {
                    bell.rotation=0;
                    //dog.play(0,1);
                    // egret.Tween.get(fawn2).to({ alpha: 0 }, 300).to({alpha: 1},300).to({alpha: 0},300).call(function () {
                    //     fawn2.alpha=1;
                    //  }.bind(this));
                    
                }.bind(this));
            }.bind(this));
        },this);
       bell.touchEnabled = true; 

        //gameRule
        var gameRule = createBitmap("PrizesRulesButton_png",440,1295);
        this.addChild(gameRule);
        gameRule.touchEnabled = true;
        //game rule pop up
        var myPrizeButton = createBitmap("PrizesRulesButton_png",300,1495);
        //this.addChild(myPrizeButton);
        
        //人物
        var machineMain = createBitmap("lotteryMachine_png", 0, 500);
        this.machine_group.addChild(machineMain);       

        this.addCapsuleToGroup(this.machine_group);

        var Machine_Glass = createBitmap("Machine_Glass", 120, 440);

        this.machine_group.addChild(Machine_Glass);  

        this.addChild(this.machine_group);

        
        //我的奖品
        var MyPrizeBtn = createBitmap("MyPrizes_png");
        MyPrizeBtn.x = this.stage.stageWidth - MyPrizeBtn.width;
        MyPrizeBtn.y = this.stage.stageHeight * 0.12;
        this.addChild(MyPrizeBtn);
        MyPrizeBtn.touchEnabled = true;



        myPrizeButton.touchEnabled=true;


        var start_btn = createBitmap("gameStartBtn_png",250,1000);
        this.addChild(start_btn);
        var _gFilter = glowFilter(0xFFFFFF,0.8,25,25,2,true,false);
        start_btn.filters = [_gFilter];
        egret.Tween.get(start_btn, { loop: true }).to({ y: start_btn.y+30 }, 900,egret.Ease.quadOut).to({ y: start_btn.y }, 900,egret.Ease.quadOut);
        egret.Tween.get(_gFilter,{loop : true}).to({alpha : 0.3},1000).to({alpha : 0.8},1000);
        start_btn.touchEnabled = true;
        start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
              if(Main.jp_onoff){
                  return ;
              }
              Main.jp_onoff=true;
              //-----alpha to 0-------
              //disable button;
              start_btn.touchEnabled = false;
              LoginRegisterbutton.touchEnabled = false;
              gameRule.touchEnabled = false;
              sign_out_btn.touchEnabled = false;
              egret.Tween.get(start_btn).to({alpha : 0},300)
              egret.Tween.get(sign_out_btn).to({alpha : 0},300)
              egret.Tween.get(LoginRegisterbutton).to({alpha : 0},300)
              egret.Tween.get(gameRule).to({alpha : 0},300)
              //-----alpha 


              //----scale start-----
              this.setBgAnchor(true);

              egret.Tween.get(this._bg).to({scaleX : 1.4,scaleY : 1.35,y : this._bg.y + 80},1000)
              
              this.machine_group.anchorOffsetX = this.machine_group.width * 0.57;
              this.machine_group.anchorOffsetY = this.machine_group.height;
              this.machine_group.x = this.machine_group.x + this.machine_group.anchorOffsetX;
              this.machine_group.y = this.machine_group.y + this.machine_group.anchorOffsetY;
              egret.Tween.get(this.machine_group).to({scaleX : 1.35,scaleY : 1.35},1000).wait(500).call(function(){

                  for(var i=0;i<this.balls.length;i++){
                    var b1:egret.Bitmap = this.balls[i];
                    egret.Tween.get(b1,{ loop: true }).to({x:this.ballMove[i][0][0]+b1.anchorOffsetX,y:this.ballMove[i][0][1] + +b1.anchorOffsetY},this.ballMove[i][0][2] ,egret.Ease.sineIn).to({x:this.ballMove[i][1][0]+b1.anchorOffsetX,y:this.ballMove[i][1][1] + b1.anchorOffsetY},this.ballMove[i][1][2],egret.Ease.sineOut).to({x:this.ballMove[i][2][0] + b1.anchorOffsetX,y:this.ballMove[i][2][1] + b1.anchorOffsetY},this.ballMove[i][2][2],egret.Ease.sineIn).to({x:b1.x,y:b1.y},500,egret.Ease.sineIn).call(function(){
                        if(!this.isFirstLoop){
                            this.doLotteryRequest();
                        }
                        if(this.isFinishSpin){
                            this.pauseAllBalls(this.balls);
                            this.popUpResult(that);
                        }
                        if(this.isErrorRequest){
                            this.pauseAllBalls(this.balls);
                            //this.popUpMyPrizeList(that);
                            this.pupUpErrorTips(that);
                        }
                        if(this.isNormalError){
                            this.pauseAllBalls(this.balls);
                            this.popUpMessageTip("You had played today.\r\nPlease try again tomorrow",that);
                        }
                    },this)
                    egret.Tween.get(b1,{ loop: true }).to({rotation : 360},2500);
                  }
              },this)
              //------scale end-------

              


            //   var gameui = ScenceManage.create(this.stage);
            //   gameui.loadScence("ResultUI",this,ReceiveUI);
             
        },this);
        //注册登录按钮
        var LoginRegisterbutton = createRegisterLoginButton(0,1295);
        LoginRegisterbutton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                var info = ScenceManage.create(this.stage);
                info.loadScence("info",this,Info1UI);
        },this)

        var sign_out_btn = createBitmap("sign_out_png", 375, 603);
        sign_out_btn.x = 0;
        sign_out_btn.y = 1295;
        sign_out_btn.touchEnabled = true;

        this.addChild(LoginRegisterbutton);
        this.addChild(sign_out_btn);

        sign_out_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                removeLocalStorage(Main.MEMBERID_SYB);
                if(!getLocalStorage(Main.MEMBERID_SYB)){
                    this.popUpMessageTip("Sign out success",this);
                    sign_out_btn.visible = false;
                    LoginRegisterbutton.visible = true;
                }
        },this)

        if(getLocalStorage(Main.MEMBERID_SYB)){
             sign_out_btn.visible = true;
             LoginRegisterbutton.visible = false;
        }
        else{

             sign_out_btn.visible =false;
             LoginRegisterbutton.visible = true;
            
        }

        //游戏规则弹窗
        var mask = createBitmap("Rules_png", 375, 603);
        mask.touchEnabled = true;
        mask.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                egret.Tween.get(mask).to({ scaleX: 0, scaleY: 0 }, 500).call(function () {
                    start_btn.touchEnabled = true;
                    LoginRegisterbutton.touchEnabled = true;
                    mask.visible = false;
                }, this);
            
                
                egret.Tween.get(myPrizeButton).to({ x: 556 }, 300).call(function () {
                        myPrizeButton.visible = true;      //我的奖品复位
                    }, this);
                egret.Tween.get(gameRule).to({ x: 440 }, 300).call(function () {
                    gameRule.visible = true;      //游戏规则复位
                }, this);
                egret.Tween.get(LoginRegisterbutton).to({ x: 0 }, 300).call(function () {
                    gameRule.visible = true;      //login
                }, this);
                egret.Tween.get(sign_out_btn).to({ x: 0 }, 300).call(function () {
                    gameRule.visible = true;      //login
                }, this);
        },this)
        this.addChild(mask);
        mask.visible = false;   //隐藏对象
        mask.scaleX = 0;
        mask.scaleY = 0;
        mask.anchorOffsetX = mask.width * .5;
        mask.anchorOffsetY = mask.height * .5;


        //我的奖品点击逻辑;
        MyPrizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            if(!Main.jp_onoff && !mask.visible){
                
                var mId = getLocalStorage(Main.MEMBERID_SYB);
                var tId = getLocalStorage(Main.TOKENID_SYB);
                var _url = Main.GetTokenUserDetail;
                var params = "?"
                if(mId){
                    _url = Main.GetMemberUserDetail;
                    params += "memberId=" + mId;
                }
                else if(tId){
                    params += "tokenId=" + tId;
                }
                loading(true);
                var request = requestPost(Main.baseUrl + _url,params);
                request.send();
                request.addEventListener(egret.Event.COMPLETE,this.getPrizeDetailFinish,this);
                request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.getPrizeDetailError,this);
            }
        },this)

        //游戏规则弹窗里面的圣诞老头
        var old_man = createBitmap("old_man_png", 750, 1000);
        // this.addChild(old_man);
        // old_man.visible = false;

        //点击显示/隐藏游戏规则弹出窗
        gameRule.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //this.textColor = 0x000000;
            // scoreText. = 0xbf0c21;
            if (mask.visible == false && !Main.jp_onoff) {
                start_btn.touchEnabled = false;
                LoginRegisterbutton.touchEnabled = false;
                mask.visible = true;            //显示游戏规则弹窗
                egret.Tween.get(myPrizeButton).to({ x: 750 }, 300).call(function () {
                    myPrizeButton.visible = false;      //将我的奖品移出页面可见
                }, this);
                egret.Tween.get(gameRule).to({ x: 750 }, 300).call(function () {
                    gameRule.visible = false;      //将我的奖品移出页面可见
                }, this);
                egret.Tween.get(LoginRegisterbutton).to({ x: -300 }, 300).call(function () {
                    //gameRule.visible = false;      //登录出页面可见
                }, this);
                egret.Tween.get(sign_out_btn).to({ x: -300 }, 300).call(function () {
                    //gameRule.visible = false;      //登录出页面可见
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

    private addCapsuleToGroup(group:egret.DisplayObjectContainer){
        // x in [225,455]
        // y in [525,725]
         var pos = [
             [235,660],
             [260,710],
             [295,640],
             [330,680],
             [380,620],
             [400,710],
             [425,650],
             [445,660]
         ]
         for(var i=1;i<pos.length+1;i++){
             var b = createBitmap("Capsule" + i + "_png",pos[i-1][0],pos[i-1][1]);
             b.anchorOffsetX = b.width * 0.5;
             b.anchorOffsetY = b.height * 0.5;
             b.x = b.x + b.anchorOffsetX;
             b.y = b.y + b.anchorOffsetY;
             this.balls.push(b);
             group.addChild(b);
         }
    }

    private randomLimitMoveBoxX(obj_width){
        return random_num(this.xLeftBorder + obj_width , this.xRightBorder - obj_width );
    }

    private randomLimitMoveBoxY(obj_width){
        return random_num(this.yTopBorder + obj_width , this.yBottomBorder - obj_width );
    }

    private lotteryResultComplete(event:egret.Event){
        var request = <egret.HttpRequest>event.currentTarget;
        //激活奖品按钮;
        Main.jp_onoff = false;
        if(!request.response){
            this.isErrorRequest = true;
            return ;
        }

        var jsonObject= JSON.parse(request.response);
        console.log(jsonObject);
        if(jsonObject.data.status){
             this.currentAc = jsonObject.data.ac ? jsonObject.data.ac :"0";
             this.currentAd = jsonObject.data.ad ? jsonObject.data.ad: "0";
        }else{
            this.isErrorRequest = true;
            return;
        }
        if(jsonObject.data.status == "00"){ 
             this.currentPrizeValue = jsonObject.data.value;
             this.currentPrizeType = jsonObject.data.type;
             this.isFinishSpin = true;
        }
        else if(jsonObject.data.status == "01"){
            this.isErrorRequest = true;
        }
        else if(jsonObject.data.status == "02"){
            this.isNormalError = true;
        }
        //key for valuel text1 for prob. text2 for type.

        
        
    }

    private pauseAllBalls(balls){
        for(var i=0;i<balls.length;i++){
            egret.Tween.pauseTweens(balls[i]);
        }
    }

    private doLotteryRequest(){
           // var request = requestPost_Lottery(Main.baseUrl + Main.lotteryApi,"?token=" + this.token + "&memberId=" + "");
           if(this.getTokenFirst){
            this.getTokenFirst = false;
            var tmpRequest = requestGet(Main.baseUrl + Main.PostTokenizerApi,"");
            tmpRequest.send();
            tmpRequest.addEventListener(egret.Event.COMPLETE,this.tokenizerRequestCompelete,this);
            tmpRequest.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
           }

    }


    private onPostIOError(event:egret.IOErrorEvent):void{
         this.isErrorRequest = true;
    }

    private tokenizerRequestCompelete(event:egret.Event){

        var request = <egret.HttpRequest>event.currentTarget;
        var jsonObject= JSON.parse(request.response);

        if(jsonObject.code && jsonObject.code == "200"){
            if(jsonObject.data && jsonObject.data.status == "00"){
                var tmp = jsonObject.data.tmp;
                var token = jsonObject.data.token;

                var params = "?tmp=" + tmp + "&" + "token=" + token;

                var memberId = getLocalStorage(Main.MEMBERID_SYB);
                var tokenId = getLocalStorage(Main.TOKENID_SYB);
                var _f = false;
                if(memberId){
                    params += "&memberId=" + memberId;
                    _f = true;
                }
                else if(tokenId){
                    params += "&tokenId=" + tokenId;
                    _f = true;
                }
                console.log(params);
                if(_f){
                    var lottery_request = requestPost(Main.baseUrl + Main.lotteryApi,params);
                    lottery_request.send();
                    lottery_request.addEventListener(egret.Event.COMPLETE,this.lotteryResultComplete,this);
                    lottery_request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
                }else{
                    this.isErrorRequest = true;
                }
            }
        }else{
            this.isErrorRequest = true;
        }
    }

    private popUpResult(that,callBack){
        var shader = createShaderMask(this.stage.width,this.stage.height,0x000000,0.6);

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

        this.addChildAt(black_mask,99999);


        popupPrizeContainer.anchorOffsetX = popupPrizeContainer.width * 0.5;
        popupPrizeContainer.anchorOffsetY = popupPrizeContainer.height * 0.5;
        popupPrizeContainer.x = popupPrizeContainer.anchorOffsetX + popupPrizeContainer.x;
        popupPrizeContainer.y = popupPrizeContainer.anchorOffsetY + popupPrizeContainer.y;

        popupPrizeContainer.scaleX = 0.3;
        popupPrizeContainer.scaleY = 0.3;


        var prizeTypePng = "OpenCapsule- Just Dollar_png";

        if(this.currentPrizeType && this.currentPrizeType == 'C'){
            prizeTypePng = "OpenCapsule- Just Ox_png";
        }

        egret.Tween.get(popupPrizeContainer).to({scaleX : 1,scaleY : 1},2000,egret.Ease.quadInOut).wait(100).call(function(){
              var _whiteShader = createShaderMask(this.stage.width,this.stage.height,0xFFFFFF,1);
              this.addChild(_whiteShader);
              popupPrizeContainer.removeChild(capsule);

              var openCapsule = createBitmap("OpenCapsule_png",capsule.x - 120,capsule.y + 50);
              var prizeSymbol = createBitmap(prizeTypePng,capsule.x+115,capsule.y -40 );

              var glodenGlow = glowFilter(0xFFC951,0.8,50,50,2,false,false)
              prizeSymbol.filters = [glodenGlow];
              popupPrizeContainer.addChild(openCapsule);
              popupPrizeContainer.addChild(prizeSymbol);

              egret.Tween.get(glodenGlow,{loop : true}).to({alpha : 0.3},1000).to({alpha : 0.8},500);
              egret.Tween.get(_whiteShader).to({alpha : 0},2500,egret.Ease.sineIn).wait(500).call(function(){

                      egret.Tween.get(black_mask).to({alpha : 1},300,egret.Ease.quartInOut).call(function(){
                                                            
                            popupPrizeContainer.removeChild(openCapsule);
                            popupPrizeContainer.removeChild(prizeSymbol);
                            that.removeChild(shader);
                            that.removeMachine();
                            that.showPrizePlatform();
                            egret.Tween.get(black_mask).to({alpha : 0},100,egret.Ease.quartInOut).call(function(){

                            },this)
                      },this);

              },this)
        },this);
    }

    private showPrizePlatform(){
        var _container = new egret.DisplayObjectContainer();

        var platform = createBitmap("Platform_png");

        var prizeSymbolPng = "Platform Prize Symbol- Dollar_png"

        var dvText = "\r\n REWARD DOLLARS";
        var cvText = " AUSPICIOUS OX\r\nCOLLECTIBLE"

        var valueText:egret.TextField = createTextFiledNoEui(" \n REWARD DOLLARS");

        valueText.size = 34;
        valueText.textColor = 0xFFFFFF;

        if(this.currentPrizeType && this.currentPrizeType == 'C'){
            prizeSymbolPng = "Platform Prize Symbol- Ox_png";
            valueText.text =this.currentPrizeValue + cvText
        }else if(this.currentPrizeType && this.currentPrizeType == 'D'){
            valueText.text ="$" + this.currentPrizeValue + dvText;
        }

        var prizeSymbol = createBitmap(prizeSymbolPng);

        var congText = createBitmap("Congratulations Text box_png");

        var glodenGlow = glowFilter(0xFFC951,0.8,50,50,2,false,false)
        prizeSymbol.filters = [glodenGlow];
        egret.Tween.get(glodenGlow,{loop : true}).to({alpha : 0.3},1000).to({alpha : 0.8},500);

        prizeSymbol.x = (platform.x + platform.width * 0.5) - prizeSymbol.width * 0.5;

        prizeSymbol.y = platform.y - platform.height - 40;

        congText.x =  (platform.x + platform.width * 0.5) - congText.width * 0.5
        congText.y = platform.y + platform.height + 10;

        valueText.x = (congText.x + congText.width * 0.5) - valueText.width*0.5;
        valueText.y = congText.y + congText.height * 0.5;
   
        _container.addChild(platform);
        _container.addChild(prizeSymbol);
        _container.addChild(congText);
        _container.addChild(valueText);

        _container.x = this.stage.width * 0.5 - platform.width;
        _container.y = 670;
        this.addChild(_container);


        var inf_rdmp_pa_btn_cnt = new egret.DisplayObjectContainer();
        inf_rdmp_pa_btn_cnt.alpha = 0;
        var rdm_btn = createBitmap("How to redeem button_png");
        var my_prize = createBitmap("PrizesRulesButton_png");
        var playAgain = createBitmap("Playagaintomorrow Button_png");

        rdm_btn.x = (platform.x + platform.width * 0.5) - rdm_btn.width * 0.5
        rdm_btn.y = congText.y + congText.height + 200;

        my_prize.x = (platform.x + platform.width * 0.5) - my_prize.width * 0.5
        my_prize.y = rdm_btn.y + rdm_btn.height;

        playAgain.x = (platform.x + platform.width * 0.5) - playAgain.width * 0.5
        playAgain.y = my_prize.y + my_prize.height + 100;


        inf_rdmp_pa_btn_cnt.addChild(rdm_btn);
        inf_rdmp_pa_btn_cnt.addChild(my_prize);
        inf_rdmp_pa_btn_cnt.addChild(playAgain);

        inf_rdmp_pa_btn_cnt.x = this.stage.width * 0.5 - platform.width;
        inf_rdmp_pa_btn_cnt.y =  520
        this.addChild(inf_rdmp_pa_btn_cnt);

        egret.Tween.get(inf_rdmp_pa_btn_cnt).wait(500).to({alpha : 1},700);

                    
        var rdmpInfo = createBitmap("How to redeem info_png");
        rdmpInfo.scaleX = 0;
        rdmpInfo.scaleY = 0;
        rdmpInfo.anchorOffsetX = rdmpInfo.width * 0.5;
        rdmpInfo.anchorOffsetY = rdmpInfo.height * 0.5;
        rdmpInfo.x =375;
        rdmpInfo.y = 653;
        rdmpInfo.visible = false;
        this.addChild(rdmpInfo);
        rdm_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            if(!rdmpInfo.visible){
                rdmpInfo.visible = true;
                egret.Tween.get(rdmpInfo).to({scaleX:1,scaleY:1},500);
            }else{
                egret.Tween.get(rdmpInfo).to({scaleX:0,scaleY:0},500).call(function(){
                    rdmpInfo.visible = false;
                },this)
            }
        },this)

        rdmpInfo.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            if(rdm_btn.visible){
                 egret.Tween.get(rdmpInfo).to({scaleX:0,scaleY:0},500).call(function(){
                    rdmpInfo.visible = false;
                },this)
            }
        },this)
        rdmpInfo.touchEnabled = true;
        rdm_btn.touchEnabled = true;
    }

    private removeMachine(){
        this.removeChild(this.machine_group);
        this._bg.texture = RES.getRes("Background2_png");
        this.setBgAnchor(false);
        this._bg.scaleX = 1;
        this._bg.scaleY = 1;
    }


    private setBgAnchor(isBigScale = true){
        if(isBigScale){
            this._bg.anchorOffsetX = this._bg.width * 0.48;
            this._bg.anchorOffsetY = this._bg.height * 0.3;
            this._bg.x = this._bg.x + this._bg.anchorOffsetX;
            this._bg.y = this._bg.y + this._bg.anchorOffsetY;
        }
        else{
            this._bg.anchorOffsetX = 0;
            this._bg.anchorOffsetY = 0;
            this._bg.x = 0;
            this._bg.y = 0;
        }
    }

    private popUpMyPrizeList(_that){

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

        var title = createTextFiledNoEui("MY PRIZE");
        title.textColor = 0x7E1E08;
        title.size = 36;



        my_prize_info_bg.x = _that.stage.stageWidth * 0.5 - my_prize_info_bg.width*0.5;
        my_prize_info_bg.y = _that.stage.stageHeight * 0.3;


        title.x = (my_prize_info_bg.x + my_prize_info_bg.width * 0.5) - title.width*0.5;
        title.y = (my_prize_info_bg.y + my_prize_info_bg.height * 0.16) - title.height;


        coins_png.x = 150 - coins_png.width * 0.5;
        coins_png.y = 710;


        dd_png.x = 150 - dd_png.width * 0.5;
        dd_png.y = 595;


        myPrizeInfo_cnt.addChild(my_prize_info_bg);
        myPrizeInfo_cnt.addChild(title);
        myPrizeInfo_cnt.addChild(coins_png);
        myPrizeInfo_cnt.addChild(dd_png);
        myPrizeInfo_cnt.addChild(ac_content);
        myPrizeInfo_cnt.addChild(ad_content);
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

    private pupUpErrorTips(_that){
        var width = 300;
        var height = 500;
        _that.addChild(ConfirmUtil.popUpTips(this.ERROR_MESSAGE,true,_that.stage.stageWidth * 0.5 - width * 0.5,_that.stage.stageHeight * 0.6,width,height));
    }

    private popUpMessageTip(str:string,_that){
        var width = 300;
        var height = 500;
        _that.addChild(ConfirmUtil.popUpTips(str,true,_that.stage.stageWidth * 0.5 - width * 0.5,_that.stage.stageHeight * 0.6,width,height));
    }
    private getPrizeDetailFinish(event:egret.Event){
            var request = <egret.HttpRequest>event.currentTarget;
           var jsonObject= JSON.parse(request.response);
           
           var _data = jsonObject.data;

           if(_data.status && _data.status == "01"){
               this.currentAc = _data.ac;
               this.currentAd = _data.ad;
           }

           loading(false);
          this.popUpMyPrizeList(this);
    }   

    private getPrizeDetailError(event:egret.Event){

    }

}
