class Info1UI extends eui.UILayer {
    private time=61;

    private registerLabelX = 50;

    private registerLabelY = 92;

    private registerLabelYBias = 130;

    private registerInputX = 160;

    private registerInputY = 126;

    private registerInputYBias = 210;

    private firstNameText;

    private lastNameText;

    private emailText;

    private marketingConsent = "N";

    private mobilePhone;

    private dateY = "";
    
    private dateM = "";

    private dateD = "";

    private errorText;

    private _registerScollerView = new eui.Scroller();

    private _loginView = new eui.Group();

    private memerIdInput;

    private register_view;

    private tempPatronId;

    private cj_btn;

    public constructor() {
        super();    
        //this.createView();
        this.once(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }
    private shareLg;
    private createView(): void {
        this.touchThrough = true;
        //this.getCountryListData();
        this.createLoginView();

        this.createRegisterView();
    }

    private createLoginView(){
        this._loginView.touchThrough = true;
       var img = new eui.Image("/resource/assets/djy_wbk.png"); 
       var srlCard = new eui.Image("/resource/assets/SRL_Cards.png");
       var loginPanel = new eui.Image("/resource/assets/login_input.png");
       var loginBtn = new eui.Image("/resource/assets/login_btn.png");
       var sigUpText = new eui.Image("/resource/assets/signup_text.png");
       img.scaleY = 1.15;
       this._loginView.y = 200;
       this._loginView.width =this.stage.stageWidth;
       this._loginView.height = 1080;
       var last_name_label=createTextFiled("会员ID:",this.registerLabelX,this.registerLabelYBias+this.registerLabelY*1,24,0x000000);
       this.memerIdInput=createTextFiled("请输入ID", 149 + 62 , 433, 25,  0xa1a1a1, "left",320,72, "middle", false,  0x000000, false,egret.TextFieldType.INPUT);
  
       

       srlCard.x = 115;
       srlCard.y = 220;

       loginPanel.x = 149;
       loginPanel.y = 400;

       loginBtn.x = 149;
       loginBtn.y = 530;

       sigUpText.x = 226;
       sigUpText.y = 630;

       this._loginView.addChild(srlCard);
       this._loginView.addChild(loginPanel);
       this._loginView.addChild(sigUpText);

       this._loginView.addChild(loginBtn);

       this._loginView.addChild(this.memerIdInput);


    //    var login_btn=createBitmap("login_btn2_png",350,824);
    //    this._loginView.addChild(login_btn);

       //登录 //pattern /^\d\d{8}$/
       loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                var v = this.memerIdInput.text
                console.log(v);
                var pattern = /^\d\d{8}$/
                if(pattern.test(v)){
                     if(Main.isBindingAction){
                         this.tempPatronId = v;

                         var tokenId = getLocalStorage(Main.TOKENID_SYB);
                         var params = "memberId=" + this.tempPatronId + "&tokenId=" + tokenId+"&remark=" + "binding";

                         var request = requestPost(Main.baseUrl + Main.PostBindingMember,"?" + params);
                         loading(true);
                         request.send();
                         
                         request.addEventListener(egret.Event.COMPLETE,this.bindingResultSuccess,this);
                         request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.bindingError,this);
                         Main.isBindingAction=false;
                     }
                     else{
                        this.addChild(ConfirmUtil.popUpTips("登录成功",false,150,150,400,250));
                        setLocalStorage(Main.MEMBERID_SYB,v);
                        var gameui = ScenceManage.create(this.stage);
                        gameui.loadScence("index", this, IndexUI);
                     }
                }else{
                    this.addChild(ConfirmUtil.popUpTips("格式错误",false,150,300,400,250));
                }
       },this);
       loginBtn.touchEnabled = true;    //开启点击侦听




    //    var toRegisterBtn=createBitmap("patronRegister_png",130,824);
    //    this._loginView.addChild(toRegisterBtn);

       //登录 //pattern /^\d\d{8}$/
       sigUpText.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
               this.removeChild(this._loginView);
               this.addChild(this._registerScollerView);
       },this);
       sigUpText.touchEnabled = true;    //开启点击侦听

       this.addChild(this._loginView);
    }

    private bindingError(event:egret.Event){
          this.tempPatronId = "";
          this.pupUpErrorTips(this,"Network Error.\r\nTry Again Later.");
    }

    private bindingResultSuccess(event:egret.Event){
         loading(false);
         var request = <egret.HttpRequest>event.currentTarget;
         var jsonObject= JSON.parse(request.response);

         if(jsonObject.code == "200"){
             if(jsonObject.data.Output.Response.StatusCode == "00"){
                 setLocalStorage(Main.MEMBERID_SYB,this.tempPatronId);
                 this.pupUpErrorTips(this,"Login success.");
                 this.toMainPage();
             }else{
                 this.pupUpErrorTips(this,"Login fail.\r\nTry Again Later.");
                 this.tempPatronId = "";
             }
         } else{
             this.tempPatronId = "";
         }
    }

   private pupUpErrorTips(_that,message){
        var width = 300;
        var height = 500;
        _that.addChild(ConfirmUtil.popUpTips(message,true,_that.stage.stageWidth * 0.5 - width * 0.5,_that.stage.stageHeight * 0.6,width,height));
    }

    private createRegisterView(){
        var dropDwonList = new euiextendsion.DropDwonList();
        dropDwonList.x = this.registerInputX;
        dropDwonList.y = this.registerInputYBias + 5 + this.registerInputY * 3;
        var img = new eui.Image("/resource/assets/djy_wbk.png");
        img.scaleY = 1;
        img.y = 140;
       
       this.register_view=new eui.Group();


       this.addChild(this.register_view);
       this.register_view.addChild(img);

       var euiben = new eui.Button();
       euiben.width = 700;
       euiben.width = 50;
       this.register_view.addChild(euiben);
       
    //    _registerScollerView.width = 540;
    //    _registerScollerView.height = 380;
       this._registerScollerView.y = 200;
       this._registerScollerView.width = this.stage.stageWidth;
       this._registerScollerView.x = 15;
       this._registerScollerView.height =  this.stage.stageHeight;
       this._registerScollerView.scrollPolicyH = eui.ScrollPolicy.OFF;
       this._registerScollerView.scrollPolicyV = eui.ScrollPolicy.OFF;
       this._registerScollerView.viewport = this.register_view;
       //this.addChild(this._registerScollerView);
       //_registerScollerView.verticalScrollBar.autoVisibility = false;

       this._registerScollerView.addChild(dropDwonList);

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
      mcCheckBox.skinName = "resource/eui_skins/CheckBoxSkin.exml";
      mcCheckBox.x = this.registerLabelX;
      mcCheckBox.y = this.registerLabelYBias+this.registerLabelY*8;
      mcCheckBox.label = "          我希望于通过邮件、电邮、简讯及/或电话搜集\r\n接收此处所述的最新营销动态。";
      this.register_view.addChild(mcCheckBox);


       //var yzm=createTextFiled("验证码：",0,207,35,0x54734a);
       this.firstNameText=createTextFiled("请输入姓氏", this.registerInputX + 5, this.registerInputYBias + this.registerInputY * 0, 25, 0xb1b1b1, "left",390,61, "middle", false,  0xa0a0a0, false,egret.TextFieldType.INPUT); 
       var f_name_border=new egret.Shape();
       f_name_border.graphics.lineStyle(2, 0xb1b1b1);
       f_name_border.graphics.drawRoundRect(this.registerInputX , this.registerInputYBias + this.registerInputY * 0, 420, 61, 25, 25);
       f_name_border.graphics.endFill;
       
       this.lastNameText=createTextFiled("请输入名字", this.registerInputX + 5, this.registerInputYBias + this.registerInputY * 1, 25, 0xb1b1b1, "left",390,61, "middle", false,  0xa0a0a0, false,egret.TextFieldType.INPUT);
       var l_name_border=new egret.Shape();
       l_name_border.graphics.lineStyle(2, 0xb1b1b1);
       l_name_border.graphics.drawRoundRect(this.registerInputX ,  this.registerInputYBias + this.registerInputY * 1, 420, 61, 25, 25);
       l_name_border.graphics.endFill;

       var dob_y_text=createTextFiled("年", this.registerInputX + 5, 9+this.registerInputYBias + this.registerInputY * 2 , 25, 0xb1b1b1, "left",130,61, "middle", false,  0xa0a0a0, false,egret.TextFieldType.INPUT);
       var dob_y_border=new egret.Shape();
       dob_y_border.graphics.lineStyle(2, 0xb1b1b1);
       dob_y_border.graphics.drawRoundRect(this.registerInputX ,  this.registerInputYBias + this.registerInputY * 2, 200, 61, 25, 25);
       dob_y_border.graphics.endFill;

       var dob_m_text=createTextFiled("月", this.registerInputX + 5 + 170, 9+this.registerInputYBias + this.registerInputY * 2 , 25, 0xb1b1b1, "left",100,61, "middle", false,  0xa0a0a0, false,egret.TextFieldType.INPUT);
       var dob_m_border=new egret.Shape();
       dob_m_border.graphics.lineStyle(2, 0xb1b1b1);
       dob_m_border.graphics.drawRoundRect(this.registerInputX + 210 ,  this.registerInputYBias + this.registerInputY * 2, 100, 61, 25, 25);
       dob_m_border.graphics.endFill;

       var dob_d_text=createTextFiled("日", this.registerInputX + 5 + 320, 9+this.registerInputYBias + this.registerInputY * 2 , 25, 0xb1b1b1, "left",100,61, "middle", false,  0xa0a0a0, false,egret.TextFieldType.INPUT);
       var dob_d_border=new egret.Shape();
       dob_d_border.graphics.lineStyle(2, 0xb1b1b1);
       dob_d_border.graphics.drawRoundRect(this.registerInputX + 320,  10+this.registerInputYBias + this.registerInputY * 2, 100, 61, 25, 25);
       dob_d_border.graphics.endFill;

       this.mobilePhone=createTextFiled("电话号码", this.registerInputX + 5 + 130, 10+this.registerInputYBias + this.registerInputY * 3, 25, 0xb1b1b1, "left",280,61, "middle", false,  0xa0a0a0, false,egret.TextFieldType.INPUT);
       var tel_border=new egret.Shape();
       tel_border.graphics.lineStyle(2, 0xb1b1b1);
       tel_border.graphics.drawRoundRect(this.registerInputX + 100,  this.registerInputYBias + this.registerInputY * 3, 320, 61, 25, 25);
       tel_border.graphics.endFill;

       this.emailText=createTextFiled("电邮", this.registerInputX + 5, 12+this.registerInputYBias + this.registerInputY * 4, 25, 0xb1b1b1, "left",250,61, "middle", false,  0xa0a0a0, false,egret.TextFieldType.INPUT);
       var mail_border=new egret.Shape();
       mail_border.graphics.lineStyle(2, 0xb1b1b1);
       mail_border.graphics.drawRoundRect(this.registerInputX,  this.registerInputYBias + this.registerInputY * 4,420, 61, 25, 25);
       mail_border.graphics.endFill;

       //出错显示
       var chucuo_title=createTextFiled("", this.registerInputX-50,  this.registerInputYBias + this.registerInputY * 6,25 , 0xff0000, "center",545,30);
       this.errorText = chucuo_title;
    //    this.register_view.addChild(chucuo_title);
    //    this.register_view.addChild(first_name_label);
    //    this.register_view.addChild(last_name_label);
    //    this.register_view.addChild(bod_label);
    //    this.register_view.addChild(tel_label);
    //    this.register_view.addChild(email_label);

       this.register_view.addChild(this.firstNameText);
       this.register_view.addChild(this.lastNameText);
       this.register_view.addChild(this.mobilePhone);
       this.register_view.addChild(dob_y_text);
       this.register_view.addChild(dob_m_text);
       this.register_view.addChild(dob_d_text);
       this.register_view.addChild(this.emailText);

    //    this.register_view.addChild(f_name_border);
    //    this.register_view.addChild(tel_border);

    //    this.register_view.addChild(l_name_border);
       
    //    this.register_view.addChild(mail_border);
    //    this.register_view.addChild(dob_y_border);
    //    this.register_view.addChild(dob_m_border);
    //    this.register_view.addChild(dob_d_border);

       var nameYN=false;
       var telYN=false;
       var yzmYN=false;
       var yzmNum;
       this.firstNameText.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){console.log("aaa")},this)
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


       dob_y_text.addEventListener(egret.TouchEvent.FOCUS_OUT,function(){
           var v = dob_y_text.text;
           var pattern = /^(19\d{2}|20[01][0-9]|2020)$/
           if(pattern.test(v)){
               this.dateY = v;
           }else{
                this.showErrorText("Invalid Date Format.")
           }
        },this)

       dob_m_text.addEventListener(egret.TouchEvent.FOCUS_OUT,function(){
           var v = dob_m_text.text;
           var pattern = /^(0[0-9]|1[0-2])$/
           if(pattern.test(v)){
               this.dateM = v;
           }else{
               this.showErrorText("Invalid Date Format.")
           }
        },this)


       dob_d_text.addEventListener(egret.TouchEvent.FOCUS_OUT,function(){
           var v = dob_d_text.text;
           this.dateD = v;
        },this)

       //添加按钮
       this.cj_btn=createBitmap("patronRegister_png",140,1024);
       this.register_view.addChild(this.cj_btn);

       //注册按钮点击
       this.cj_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
         this.cj_btn.touchEnabled = false;
         loading(true);
         var request = requestRegisterPost(Main.baseUrl+Main.patronRegisterUrl,"?" + this.getPatronPostData());
         request.send();
         request.addEventListener(egret.Event.COMPLETE,this.registerCompelete,this);
         
       },this);
       this.cj_btn.touchEnabled = true;    //开启点击侦听


    //    var toLogin_btn=createBitmap("login_btn2_png",370,824);
    //    this.register_view.addChild(toLogin_btn);

    //    //转到登录页
    //    toLogin_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            
    //         this.removeChild(this._registerScollerView);
    //         this.addChild(this._loginView);
             
    //    },this);
    //    toLogin_btn.touchEnabled = true;    //开启点击侦听
    }

     private registerCompelete(event:egret.Event){
         loading(false);
         var request = <egret.HttpRequest>event.currentTarget;
         var jsonObject= JSON.parse(request.response);
            if(jsonObject.result == 'SUCCESS'){
            var patronId = jsonObject.data.PatronId;
            setLocalStorage(Main.MEMBERID_SYB,patronId);
            this.addChild(ConfirmUtil.popUpTips("注册成功,patron ID:" + patronId,false,150,300,450,350));
            var gameui = ScenceManage.create(this.stage);
            gameui.loadScence("index", this, IndexUI);
         }
         else if(jsonObject.result == 'ERROR'){
             this.addChild(ConfirmUtil.popUpTips("注册失败\r\n可能已存在会员信息。" + patronId,false,150,300,450,350));
         }
         this.cj_btn.touchEnabled = true; 
    }

    private getPatronPostData():string{
        var firstName = "firstName=" + this.firstNameText.text;
        var lastName = "lastName=" + this.lastNameText.text;
        var mobilePhone = "mobilePhone=" + this.mobilePhone.text;
        var parimaryEmail = "primaryEmail=" + this.emailText.text;
        var DOB = "DOB=" + this.dateY + "-" + this.dateM + "-" + this.dateD;
        var marketConsent = "marketingConsent=" + "Y"; 
        return firstName+ "&" +lastName+"&" + mobilePhone + "&" + parimaryEmail + "&" + DOB + "&" + marketConsent;
     }

    //指向动画
    private share_lg(){
        egret.Tween.get(this.shareLg).to({ alpha:0}, 1000).call(function(){
                this.shareLg.alpha=1;
                this.share_lg();
        }.bind(this));
    }

    private showErrorText(text){
        this.errorText.text = text;
        this.errorText.alpha = 1
         egret.Tween.get(this.errorText,{loop:false}).to({alpha:0},2500);
    }

    private toMainPage(){
            var gameui = ScenceManage.create(this.stage);
            gameui.loadScence("index", this, IndexUI);
    }

}
