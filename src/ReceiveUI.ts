class ReceiveUI extends egret.Sprite {
    private lotteryApi = "/services/h5game/lottery";
    private shpBeMask1;
    private shpBeMask2;
    private shpBeMask3;
    private dd;
    private num = 0;
    private laohuji;
    private rocker;
    private rockeer_mp3;
    private laohuji_mp3;
    private title;
    private lq_btn;
    private balls = [];
    private topX = 10;
    private topY = 100;
    private bottomX = -10;
    private bottomY = -50;
    private soundChannel;
    private isFinishSpin = true;
    private lotteryExit;
    private laohujiBasePos = 303;
    private lotteryExitBasePos = 505;
    private shockRange = [6,-5,8,-3,4,-7];
    private isRegistPopUp = false;
    private xLeftBorder = 150;
    private xRightBorder = 640;
    private yTopBorder = 460;
    private yBottomBorder = 770;
    private token = "";
    private ballMap = [
        //U: (150,460) D (610,770)
        //small
        {src:"gift9_png",size:50,x:200,y:615},
        {src:"gift9_png",size:50,x:390,y:660},
        {src:"gift9_png",size:50,x:495,y:630},
        {src:"gift9_png",size:50,x:550,y:580},
        // // //medium
        {src:"gift9_png",size:80,x:250,y:640},
        {src:"gift10_png",size:80,x:280,y:720},
        {src:"gift9_png",size:80,x:380,y:720},
        {src:"gift10_png",size:80,x:550,y:730},
        // //big
        {src:"gift9_png",size:120,x:210,y:710},
        {src:"gift10_png",size:120,x:330,y:710},
        {src:"gift9_png",size:120,x:450,y:710},
        {src:"gift10_png",size:120,x:550,y:650}
    ];
    private loginRegist;
    public constructor() {
        super();
        //this.createView();
        this.once(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }

    private createLotteryBall(src,size,x,y){
         //var ball = createBitmap("gift" + ( 9 + (i%2)).toString() + "_png");
         var ball = createBitmap(src);
            ball.width=size;
            ball.height = size;
            ball.x = x
            ball.y = y
            ball.anchorOffsetX = ball.width * .5;
            ball.anchorOffsetY = ball.height * .5;
            return ball
    }

    private pauseAllBalls(balls){
        for(var i=0;i<balls.length;i++){
            egret.Tween.pauseTweens(balls[i]);
        }
    }

    private createView(): void {
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
        this.title=title;
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
        diban.x = 250;
        diban.y = 1000;
        this.addChild(diban);

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
        
        // //声音
        // this.dd = new egret.Sound;
        // this.dd.load("resource/assets/dd.mp3");
        // //摇杆声音
        // this.rockeer_mp3 = new egret.Sound;
        // this.rockeer_mp3.load("resource/assets/rocker.mp3");
        // //老虎机声音
        // this.laohuji_mp3 = new egret.Sound;
        // this.laohuji_mp3.load("resource/assets/jiqi.mp3");

        for(let ball of this.ballMap){
            var obj = this.createLotteryBall(ball.src,ball.size,ball.x,ball.y);
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
        this.lq_btn=lq_btn;
        //添加领奖容器
        var ljDisplay = new egret.DisplayObjectContainer();
        //ljDisplay.y=148;


        // 添加注册登录也页面

        if (Main.mask_onoff) {
            ljDisplay.y = 148;
            title.scaleX=0;
            title.scaleY=0;
            egret.Tween.get(zj_title).to({ scaleX: 1, scaleY: 1 }, 300)
        } else {
            ljDisplay.y = 1206;
            zj_title.scaleX=0;
            zj_title.scaleY=0;
            egret.Tween.get(title).to({ scaleX: 1, scaleY: 1 }, 300)
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

        //
        var jptext = createTextFiledNoEui(getPrizeResult(), 195, 450, 50, 0xff0000);
        ljDisplay.addChild(jptext);


         var redeemButton = createRedeemButton(50,850);
         redeemButton.addEventListener(egret.TouchEvent.TOUCH_TAP, (event) => {
             event.stopImmediatePropagation();
         },this);
        
        ljDisplay.addChild(redeemButton);

        this.loginRegist = createRegisterLoginButton(385,850);
        this.loginRegist.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
             this.info();
        },this)
        ljDisplay.addChild(this.loginRegist);


        //可点击对象
        lq_btn.touchEnabled = true;
        ljDisplay.touchEnabled = true;
        //点击领取按钮事件
        var This = this;
        lq_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            jptext.text = getPrizeResult();
            egret.Tween.get(title).to({ scaleX: 0, scaleY: 0 }, 200).call(function () {
                egret.Tween.get(zj_title).to({ scaleX: 1, scaleY: 1 }, 300)
            })
            egret.Tween.get(ljDisplay)
                .to({ y: 148 }, 500);
        }, this)

        ljDisplay.addEventListener(egret.TouchEvent.TOUCH_TAP, function() {
            egret.Tween.get(zj_title).to({ scaleX: 0, scaleY: 0 }, 200).call(function () {
                egret.Tween.get(title).to({ scaleX: 1, scaleY: 1 }, 300)
            })
            egret.Tween.get(ljDisplay)
                .to({ y: 1206 }, 500);
        }, this)



        var onoff = true;
        this.laohuji.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {

            if (Main.laohujiButOnoff) {

                //生成randomToken;
                this.token = randomToken();

                title.touchEnabled=false;
                lq_btn.touchEnabled=false;
                Main.laohujiButOnoff = false;
                this.isFinishSpin = false;
                this.rockeer_mp3.play(0, 1);

                    this.soundChannel = this.laohuji_mp3.play(0, 1);
                    egret.Tween.get(this.laohuji, { loop: true }).to({ y: this.laohujiBasePos + this.shockRange[0] }, 100).to({ y: this.laohujiBasePos + this.shockRange[1] }, 100).to({ y: this.laohujiBasePos + this.shockRange[2], x: this.laohuji.x - 5 }, 100).to({ y: this.laohujiBasePos + this.shockRange[3] }, 100).to({ y: this.laohujiBasePos + this.shockRange[4], x: this.laohuji.x + 5 }, 100).to({ y: this.laohujiBasePos }, 100);
                    egret.Tween.get(this.lotteryExit, { loop: true }).to({ y: this.lotteryExitBasePos + this.shockRange[0] }, 100).to({ y: this.lotteryExitBasePos + this.shockRange[1] }, 100).to({ y: this.lotteryExitBasePos + this.shockRange[2] }, 100).to({ y: this.lotteryExitBasePos + this.shockRange[3] }, 100).to({ y: this.lotteryExitBasePos + this.shockRange[4] }, 100).to({ y: this.lotteryExitBasePos }, 100);


                    //开始抽奖，后台生成
                    var request = requestPost_Lottery(Main.baseUrl + this.lotteryApi,"?token=" + this.token + "&memberId=" + "");
                    request.send();
                    request.addEventListener(egret.Event.COMPLETE,this.lotteryResultComplete,this);


                    //抽奖动画
                    for(var i=0;i<this.balls.length;i++){
                     var b = this.balls[i];
                     var ori_x = b.x;
                     var ori_y = b.y;
                     //抖动动画
                     egret.Tween.get(b, { loop: true }).to({ x : this.randomLimitMoveBoxX(b.width) , y :  this.randomLimitMoveBoxY(b.width)}, 800).to({ x : this.randomLimitMoveBoxX(b.width) , y :  this.randomLimitMoveBoxY(b.width)}, 800).to({ x : this.randomLimitMoveBoxX(b.width) , y :  this.randomLimitMoveBoxY(b.width)}, 800).to({ x : ori_x , y : ori_y}, 800).call(function(){

                            if(this.isFinishSpin){
                                this.pauseAllBalls(this.balls);
                                egret.Tween.pauseTweens(this.laohuji);
                                egret.Tween.pauseTweens(this.lotteryExit);
                                this.soundChannel.stop();


                                var randomBall =  this.balls[this.random_num(0,this.balls.length-1)];
                                randomBall.anchorOffsetX = 50 * .5;
                                randomBall.anchorOffsetY = 50 * .5;
                                //出奖
                                egret.Tween.get(randomBall,{loop:false}).to({x:210,y:900,width:50,height:50},1000).call(function(){
                                        this.addChild(randomBall);
                                        egret.Tween.get(randomBall).to({y:960,scaleX:2.5,scaleY:2.5,rotation:360},1000,egret.Ease.quadOut).wait(500).call(function(){
                                                //完毕
                                        randomBall.visible = false;
                                        jptext.text = getPrizeResult();
                                        egret.Tween.get(title).to({ scaleX: 0, scaleY: 0     }, 200).call(function () {
                                            egret.Tween.get(zj_title).to({ scaleX: 1, scaleY: 1 }, 300)
                                        })
                                        egret.Tween.get(ljDisplay)
                                            .to({ y: 148 }, 500);
                                        },this);
                                        this.title.touchEnabled=true;
                                        this.lq_btn.touchEnabled=true;

                                        //是否可玩多次开关
                                        //Main.laohujiButOnoff = true;
                                },this);
                            }
                        },this); 
                    }
            }
        }, this)

    }


    private lotteryResultComplete(event:egret.Event){
        var request = <egret.HttpRequest>event.currentTarget;
        var jsonObject= JSON.parse(request.response);
        this.isFinishSpin = true;
        var resultText = jsonObject.data.text2;
        egret.localStorage.setItem("token",this.token);
        // setLocalStorage(this.token,resultText,1);
    }

    private randomLimitMoveBoxX(obj_width){
        return this.random_num(this.xLeftBorder + obj_width , this.xRightBorder - obj_width );
    }

    private randomLimitMoveBoxY(obj_width){
        return this.random_num(this.yTopBorder + obj_width , this.yBottomBorder - obj_width );
    }

    private random_num(min:number,max:number){
        let Range = max - min;  
        let Rand = Math.random();  
        return (min + Math.round(Rand * Range));  
    }
    

    private info(){
        var infoui = ScenceManage.create(this.stage);
        infoui.loadScence("info",this,Info1UI);
    }
}
