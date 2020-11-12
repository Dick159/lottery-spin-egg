class Info1UI extends egret.Sprite {
    private time=61;
    public constructor() {
        super();
        //this.createView();
        this.once(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }
    private shareLg;
    private createView(): void {
       var content_bg=createBitmap("info1bg_png",15,338);
       this.addChild(content_bg);

       var zl_content=new egret.DisplayObjectContainer();
       zl_content.width=545;
       zl_content.height=256;
       zl_content.x=100;
       zl_content.y=611;
       this.addChild(zl_content);

        var title = createBitmap("index_title_png", 0, 10);
        this.addChild(title);
         title.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var gameui = ScenceManage.create(this.stage);
            gameui.loadScence("index", this, IndexUI);
        }, this);
        title.touchEnabled = true;

       //容器信息
       var name=createTextFiled("账号：",0,17,35,0x54734a);
       var tel=createTextFiled("电话：",0,109,35,0x54734a);
       //var yzm=createTextFiled("验证码：",0,207,35,0x54734a);
       var name_text=createTextFiled("请输入正确账号", 150, 0, 25, 0xb1b1b1, "left",390,61, "middle", false,  0xa0a0a0, false,egret.TextFieldType.INPUT); 
       var name_border=new egret.Shape();
       name_border.graphics.lineStyle(2, 0xb1b1b1);
       name_border.graphics.drawRoundRect(120, 0, 420, 61, 25, 25);
       name_border.graphics.endFill;
       
       var tel_text=createTextFiled("请输入真实联系方式", 150, 96, 25, 0xb1b1b1, "left",250,61, "middle", false,  0xa0a0a0, false,egret.TextFieldType.INPUT);
       var tel_border=new egret.Shape();
       tel_border.graphics.lineStyle(2, 0xb1b1b1);
       tel_border.graphics.drawRoundRect(120, 96, 286, 61, 25, 25);
       tel_border.graphics.endFill;


       //出错显示
       var chucuo_title=createTextFiled("", 0,270,30, 0xff0000, "center",545,30);
       zl_content.addChild(chucuo_title);
       zl_content.addChild(name);
       zl_content.addChild(tel);

       zl_content.addChild(name_text);
       zl_content.addChild(tel_text);

       zl_content.addChild(name_border);
       zl_content.addChild(tel_border);

       var nameYN=false;
       var telYN=false;
       var yzmYN=false;
       var yzmNum;
       name_text.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){name_text.text=""},this)
       name_text.addEventListener(egret.TouchEvent.FOCUS_OUT,function(){
           nameYN=false;
           if(/^[\u4E00-\u9FA5]{0,}$/.test(name_text.text)&&name_text.text!=""){
               nameYN=true;
               chucuo_title.text="";
           }else{
               chucuo_title.text="请输入正确会员账号";
           }
           if(name_text.text==""){
               name_text.text="请输入正确会员账号";
           }
       },this)
       tel_text.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){tel_text.text=""},this)
       tel_text.addEventListener(egret.TouchEvent.FOCUS_OUT,function(){
           telYN=false;
           if(/1[3|5|7|8|]\d{9}/.test(tel_text.text)){
               telYN=true;
               chucuo_title.text="";
           }else{
               chucuo_title.text="请输入正确的联系方式"
           }
           if(tel_text.text==""){
               tel_text.text="请输入真实联系方式";
           }
       },this)

       var top_title=createTextFiled("输入资料进行注册",263,446,30,0xffffff);
       this.addChild(top_title);
       //添加按钮
       var cj_btn=createBitmap("lzy_aj_png",270,1024);
       this.addChild(cj_btn);
       cj_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
           if(nameYN&&telYN&&yzmYN){
               var gameui = ScenceManage.create(this.stage);
                gameui.loadScence("ResultUI",this,ReceiveUI);
           }else if(yzmNum==undefined){
               chucuo_title.text="填写信息有误";
           }else{
               chucuo_title.text="填写信息有误";
           }
           
       },this);
       cj_btn.touchEnabled = true;    //开启点击侦听
    }

    //指向动画
    private share_lg(){
        egret.Tween.get(this.shareLg).to({ alpha:0}, 1000).call(function(){
                this.shareLg.alpha=1;
                this.share_lg();
        }.bind(this));
    }
}
