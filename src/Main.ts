//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;
    static jp_onoff=false;
    static mask_onoff=false;
    static laohujiButOnoff=true;
    static registLoginShow = false;
    static  baseUrl = "http://150.109.32.241:4503";
    private getProbabilityData = "/services/h5game/property";
    static zpname = "请进行抽奖";//奖的名称

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

    }


    private serverDataLoadCompelete(event:egret.Event){
         var request = <egret.HttpRequest>event.currentTarget;

         var jsonObject= JSON.parse(request.response);
         if(jsonObject.code == '200'){
         console.log(jsonObject);
         console.log(jsonObject.data.PrizeProperty);
         setLocalStorage("prizeList",jsonObject.data.PrizeProperty,1);
            //初始化Resource资源加载库
            //initiate Resource loading library
         RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
         RES.loadConfig("resource/default.res.json", "resource/");
         }
    }




    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        var request = requestGet(Main.baseUrl + this.getProbabilityData,"");
        request.send();
        request.addEventListener(egret.Event.COMPLETE,this.serverDataLoadCompelete,this);

    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("index");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "index") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO+
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "index") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {

        // var scence=new ScenceManage(this.stage);


        // var scence=ScenceManage.create(this.stage);
        // scence.loadScence("preload",null,GameUI,function(){});
        var bg= createBitmap("common_bg_png",0,0);
        this.addChild(bg);

        // 雪花飘落效果
        // 雪花飘落效果
        var snowflake_1 = createBitmap("snowflake_png",0,0);
        var snowflake_2 = createBitmap("snowflake_png",0,-1206);
       
        this.addChild(snowflake_1);
        this.addChild(snowflake_2);        
        
        egret.Tween.get(snowflake_1,{loop:true}).to({y:1206},10000);
        egret.Tween.get(snowflake_2,{loop:true}).to({y:0},10000);
       




        var index=new IndexUI();
        this.stage.addChild(index);
        //音乐图标__可做点击播放/暂停
        var music_logo = createBitmap("music_logo_png",55, 350);
        this.addChild(music_logo);
        music_logo.anchorOffsetX = 65*.5;
        music_logo.anchorOffsetY = 65*.5;
        var tw = egret.Tween.get(music_logo,{loop:true}).to({rotation:360},2000);
        music_logo.touchEnabled = true;
        
        //声音加载
        var sound = new egret.Sound;
        var soundChannel;
        var totalLength = 0;
        var curTime = 0;//当前播放进度的时间
        sound.addEventListener(egret.Event.COMPLETE,function(){
            soundChannel = sound.play(curTime,0);
            totalLength = sound.length;//获取音乐的总时长
        },this);
        sound.load("resource/assets/music.mp3");

        //实现点击music_logo图标播放/暂停功能
        music_logo.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            if(soundChannel===null){
                soundChannel = sound.play(curTime);
                soundChannel.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                        
                })
                egret.Tween.resumeTweens(music_logo);
            }else{
                curTime = soundChannel.position;//保存暂停前的最后播放时间
                soundChannel.stop();//停止播放
                soundChannel=null;//释放该变量的值
                egret.Tween.pauseTweens(music_logo);
            }
            
        },this);
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: string[]) {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }
}


