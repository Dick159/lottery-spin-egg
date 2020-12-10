class Info1UI extends eui.UILayer {
    private time=61;

    private registerLabelX = 50;

    private registerLabelY = 92;

    private registerLabelYBias = 130;
.00
    private registerInputX = 200;

    private registerInputY = 96;

    private registerInputYBias = 110;


    public constructor() {
        super();    
        //this.createView();
        this.once(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }
    private shareLg;
    private createView(): void {
        //this.getCountryListData();
         var dropDwonList = new euiextendsion.DropDwonList();
         dropDwonList.x = this.registerInputX;
         dropDwonList.y = this.registerInputYBias + 5 + this.registerInputY * 3;
        var img = new eui.Image("/resource/assets/djy_wbk.png");
        img.scaleY = 1.15;
        // img.x = 15;
        // img.y = 338;
        // this.addChild(img);
       
       
       var zl_content=new eui.Group();

       this.addChild(zl_content);
       zl_content.addChild(img);

       var euiben = new eui.Button();
       euiben.width = 100;
       euiben.width = 50;
       zl_content.addChild(euiben);

       var _scroller = new eui.Scroller();
       
    //    _scroller.width = 540;
    //    _scroller.height = 380;
       _scroller.x = 15;
       _scroller.y = 200;
       _scroller.width = 750;
        _scroller.height = 1080;
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
       var first_name_label=createTextFiled("姓氏：",this.registerLabelX,this.registerLabelYBias,24,0x000000);
       var last_name_label=createTextFiled("名字：",this.registerLabelX,this.registerLabelYBias+this.registerLabelY*1,24,0x000000);
       var bod_label=createTextFiled("出生日期：",this.registerLabelX,this.registerLabelYBias+this.registerLabelY*2,24,0x000000);
       var tel_label=createTextFiled("电话：",this.registerLabelX,this.registerLabelYBias+this.registerLabelY*3,24,0x000000);
       var email_label=createTextFiled("电邮：",this.registerLabelX,this.registerLabelYBias+this.registerLabelY*4,24,0x000000);

      //0,17+92*4
      var mcCheckBox = new eui.CheckBox();
      mcCheckBox.skinName = "resource/skins/CheckBoxSkin.exml";
      mcCheckBox.x = this.registerLabelX;
      mcCheckBox.y = this.registerLabelYBias+this.registerLabelY*5;
      mcCheckBox.label = "                 我希望于通过邮件、电邮、简讯及/或电话搜集\r\n接收此处所述的最新营销动态。";
      zl_content.addChild(mcCheckBox);


       //var yzm=createTextFiled("验证码：",0,207,35,0x54734a);
       var f_name_text=createTextFiled("请输入姓氏", this.registerInputX + 5, this.registerInputYBias + this.registerInputY * 0, 25, 0xb1b1b1, "left",390,61, "middle", false,  0xa0a0a0, false,egret.TextFieldType.INPUT); 
       var f_name_border=new egret.Shape();
       f_name_border.graphics.lineStyle(2, 0xb1b1b1);
       f_name_border.graphics.drawRoundRect(this.registerInputX , this.registerInputYBias + this.registerInputY * 0, 420, 61, 25, 25);
       f_name_border.graphics.endFill;
       
       var l_name_text=createTextFiled("请输入名字", this.registerInputX + 5, this.registerInputYBias + this.registerInputY * 1, 25, 0xb1b1b1, "left",250,61, "middle", false,  0xa0a0a0, false,egret.TextFieldType.INPUT);
       var l_name_border=new egret.Shape();
       l_name_border.graphics.lineStyle(2, 0xb1b1b1);
       l_name_border.graphics.drawRoundRect(this.registerInputX ,  this.registerInputYBias + this.registerInputY * 1, 420, 61, 25, 25);
       l_name_border.graphics.endFill;

       var dob_text=createTextFiled("生日年月日", this.registerInputX + 5, this.registerInputYBias + this.registerInputY * 2 , 25, 0xb1b1b1, "left",250,61, "middle", false,  0xa0a0a0, false,egret.TextFieldType.INPUT);
       var dob_border=new egret.Shape();
       dob_border.graphics.lineStyle(2, 0xb1b1b1);
       dob_border.graphics.drawRoundRect(this.registerInputX ,  this.registerInputYBias + this.registerInputY * 2, 420, 61, 25, 25);
       dob_border.graphics.endFill;

       var tel_text=createTextFiled("电话号码", this.registerInputX + 5 + 100, this.registerInputYBias + this.registerInputY * 3, 25, 0xb1b1b1, "left",230,61, "middle", false,  0xa0a0a0, false,egret.TextFieldType.INPUT);
       var tel_border=new egret.Shape();
       tel_border.graphics.lineStyle(2, 0xb1b1b1);
       tel_border.graphics.drawRoundRect(this.registerInputX + 100,  this.registerInputYBias + this.registerInputY * 3, 320, 61, 25, 25);
       tel_border.graphics.endFill;

       var mail_text=createTextFiled("电邮", this.registerInputX + 5, this.registerInputYBias + this.registerInputY * 4, 25, 0xb1b1b1, "left",250,61, "middle", false,  0xa0a0a0, false,egret.TextFieldType.INPUT);
       var mail_border=new egret.Shape();
       mail_border.graphics.lineStyle(2, 0xb1b1b1);
       mail_border.graphics.drawRoundRect(this.registerInputX,  this.registerInputYBias + this.registerInputY * 4,420, 61, 25, 25);
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
       f_name_text.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){console.log("aaa")},this)
    //    f_name_text.addEventListener(egret.TouchEvent.FOCUS_OUT,function(){
    //     //    nameYN=false;
    //     //    if(/^[\u4E00-\u9FA5]{0,}$/.test(name_text.text)&&name_text.text!=""){
    //     //        nameYN=true;
    //     //        chucuo_title.text="";
    //     //    }else{
    //     //        chucuo_title.text="请输入正确会员账号";
    //     //    }
    //     //    if(name_text.text==""){
    //     //        name_text.text="请输入正确会员账号";
    //     //    }
    //    },this)
    //    l_name_text.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
    //        l_name_text.text="";
    //     },this)
    //    l_name_text.addEventListener(egret.TouchEvent.FOCUS_OUT,function(){
    //     //    telYN=false;
    //     //    if(/1[3|5|7|8|]\d{9}/.test(tel_text.text)){
    //     //        telYN=true;
    //     //        chucuo_title.text="";
    //     //    }else{
    //     //        chucuo_title.text="请输入正确的联系方式"
    //     //    }
    //     //    if(tel_text.text==""){
    //     //        tel_text.text="请输入真实联系方式";
    //     //    }
    //    },this)

    //    var top_title=createTextFiled("输入资料进行注册",263,446,30,0xffffff);
    //    this.addChild(top_title);
       //添加按钮
       var cj_btn=createBitmap("patronRegister_png",270,1024);
       this.addChild(cj_btn);
       cj_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
        //    if(nameYN&&telYN&&yzmYN){
        //        var gameui = ScenceManage.create(this.stage);
        //         gameui.loadScence("ResultUI",this,ReceiveUI);
        //    }else if(yzmNum==undefined){
        //        chucuo_title.text="填写信息有误";
        //    }else{
        //        chucuo_title.text="填写信息有误";
        //    }
           
       },this);
       cj_btn.touchEnabled = true;    //开启点击侦听

       zl_content.addChild(dropDwonList)

    }

    //指向动画
    private share_lg(){
        egret.Tween.get(this.shareLg).to({ alpha:0}, 1000).call(function(){
                this.shareLg.alpha=1;
                this.share_lg();
        }.bind(this));
    }

}
