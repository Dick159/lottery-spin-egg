
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/eui/eui.js",
	"bin-debug/MBSContent.js",
	"bin-debug/DropDownList.js",
	"bin-debug/GameUI.js",
	"bin-debug/HowToRedeem.js",
	"bin-debug/IndexUI.js",
	"bin-debug/Info1UI.js",
	"bin-debug/InfoUI.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/until.js",
	"bin-debug/ComfirmUtil.js",
	"bin-debug/MyPrizes.js",
	"bin-debug/PrizeAndRules.js",
	"bin-debug/ReceiveUI.js",
	"bin-debug/ResultUI.js",
	"bin-debug/ScenceManage.js",
	"bin-debug/ScrollerPanel.js",
	"bin-debug/Main.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "showAll",
		contentWidth: 750,
		contentHeight: 1624,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};