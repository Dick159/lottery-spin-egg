class Info1UI extends eui.UILayer {
    private time=61;
    public constructor() {
        super();
        //this.createView();
        this.once(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }
    private shareLg;
    private createView(): void {
       //var content_bg=createBitmap("info1bg_png2",15,338);
        //var img = new eui.Image("/resource/assets/info1bg.png");
        // img.x = 15;
        // img.y = 338;
       //this.addChild(img);
       

       
       var zl_content=new eui.Group();

       this.addChild(zl_content);
       //zl_content.addChild(img);



       var _scroller = new eui.Scroller();
       
    //    _scroller.width = 540;
    //    _scroller.height = 380;
       _scroller.x = 100;
       _scroller.y = 400;
        _scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        _scroller.scrollPolicyV = eui.ScrollPolicy.ON;
       _scroller.viewport = zl_content;
       this.addChild(_scroller);
       //_scroller.verticalScrollBar.autoVisibility = false;



        var title = createBitmap("index_title_png", 0, 10);
        this.addChild(title);
         title.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var gameui = ScenceManage.create(this.stage);
            gameui.loadScence("index", this, IndexUI);
        }, this);
        title.touchEnabled = true;

        var distanct = 92;
       //容器信息
       var first_name_label=createTextFiled("姓氏：",0,17,24,0x54734a);
       var last_name_label=createTextFiled("名字：",0,17+92*1,24,0x54734a);
       var bod_label=createTextFiled("出生日期：",0,17+92*2,24,0x54734a);
       var tel_label=createTextFiled("电话：",0,17+92*3,24,0x54734a);
       var email_label=createTextFiled("电邮：",0,17+92*4,24,0x54734a);

      //0,17+92*4
      var mcCheckBox = new eui.CheckBox();
      mcCheckBox.skinName = "resource/skins/CheckBoxSkin.exml";
      mcCheckBox.x = 10;
      mcCheckBox.y = 17+92*5;
      mcCheckBox.label = "asdasdasdasdasdasdsa";
      zl_content.addChild(mcCheckBox);


       //var yzm=createTextFiled("验证码：",0,207,35,0x54734a);
       var f_name_text=createTextFiled("请输入姓氏", 150, 0, 25, 0xb1b1b1, "left",390,61, "middle", false,  0xa0a0a0, false,egret.TextFieldType.INPUT); 
       var f_name_border=new egret.Shape();
       f_name_border.graphics.lineStyle(2, 0xb1b1b1);
       f_name_border.graphics.drawRoundRect(120, 0, 420, 61, 25, 25);
       f_name_border.graphics.endFill;
       
       var l_name_text=createTextFiled("请输入名字", 150, 96, 25, 0xb1b1b1, "left",250,61, "middle", false,  0xa0a0a0, false,egret.TextFieldType.INPUT);
       var l_name_border=new egret.Shape();
       l_name_border.graphics.lineStyle(2, 0xb1b1b1);
       l_name_border.graphics.drawRoundRect(120, 96, 286, 61, 25, 25);
       l_name_border.graphics.endFill;

       var dob_text=createTextFiled("生日年月日", 150, 96*2, 25, 0xb1b1b1, "left",250,61, "middle", false,  0xa0a0a0, false,egret.TextFieldType.INPUT);
       var dob_border=new egret.Shape();
       dob_border.graphics.lineStyle(2, 0xb1b1b1);
       dob_border.graphics.drawRoundRect(120, 96*2, 286, 61, 25, 25);
       dob_border.graphics.endFill;

       var tel_text=createTextFiled("电话号码", 150, 96*3, 25, 0xb1b1b1, "left",250,61, "middle", false,  0xa0a0a0, false,egret.TextFieldType.INPUT);
       var tel_border=new egret.Shape();
       tel_border.graphics.lineStyle(2, 0xb1b1b1);
       tel_border.graphics.drawRoundRect(120, 96*3, 286, 61, 25, 25);
       tel_border.graphics.endFill;

       var mail_text=createTextFiled("电邮", 150, 96*4, 25, 0xb1b1b1, "left",250,61, "middle", false,  0xa0a0a0, false,egret.TextFieldType.INPUT);
       var mail_border=new egret.Shape();
       mail_border.graphics.lineStyle(2, 0xb1b1b1);
       mail_border.graphics.drawRoundRect(120, 96*4, 286, 61, 25, 25);
       mail_border.graphics.endFill;



       //出错显示
       var chucuo_title=createTextFiled("", 0,270,30, 0xff0000, "center",545,30);
       zl_content.addChild(chucuo_title);
       zl_content.addChild(first_name_label);
       zl_content.addChild(last_name_label);
       zl_content.addChild(bod_label);
       zl_content.addChild(tel_label);
       zl_content.addChild(email_label);

       zl_content.addChild(f_name_text);
       zl_content.addChild(l_name_text);
       zl_content.addChild(tel_text);
       zl_content.addChild(dob_text);
       zl_content.addChild(mail_text);

       zl_content.addChild(f_name_border);
       zl_content.addChild(tel_border);

       zl_content.addChild(l_name_border);
       
       zl_content.addChild(mail_border);
       zl_content.addChild(dob_border);

       var nameYN=false;
       var telYN=false;
       var yzmYN=false;
       var yzmNum;
       f_name_text.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){f_name_text.text=""},this)
       f_name_text.addEventListener(egret.TouchEvent.FOCUS_OUT,function(){
        //    nameYN=false;
        //    if(/^[\u4E00-\u9FA5]{0,}$/.test(name_text.text)&&name_text.text!=""){
        //        nameYN=true;
        //        chucuo_title.text="";
        //    }else{
        //        chucuo_title.text="请输入正确会员账号";
        //    }
        //    if(name_text.text==""){
        //        name_text.text="请输入正确会员账号";
        //    }
       },this)
       l_name_text.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
           l_name_text.text="";
        },this)
       l_name_text.addEventListener(egret.TouchEvent.FOCUS_OUT,function(){
        //    telYN=false;
        //    if(/1[3|5|7|8|]\d{9}/.test(tel_text.text)){
        //        telYN=true;
        //        chucuo_title.text="";
        //    }else{
        //        chucuo_title.text="请输入正确的联系方式"
        //    }
        //    if(tel_text.text==""){
        //        tel_text.text="请输入真实联系方式";
        //    }
       },this)

    //    var top_title=createTextFiled("输入资料进行注册",263,446,30,0xffffff);
    //    this.addChild(top_title);
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
