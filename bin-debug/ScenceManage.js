//场景管理类
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ScenceManage = (function () {
    function ScenceManage(stage) {
        this._stage = stage;
    }
    ScenceManage.create = function (stage) {
        if (stage === void 0) { stage = null; }
        if (!ScenceManage._self) {
            return ScenceManage._self = new ScenceManage(stage);
        }
        return ScenceManage._self;
    };
    ScenceManage.prototype.loadScence = function (scenceName, curScence, nextScence, callback) {
        if (callback === void 0) { callback = null; }
        this._scenceName = scenceName;
        this._nextScence = nextScence;
        this._curScence = curScence;
        this._callback = callback;
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this._stage.addChild(this.loadingView);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup(scenceName); //开始加载组素材
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    ScenceManage.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == this._scenceName) {
            this._stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            //创建新场景
            //--------------------------------------------------------------------
            var newScence = new this._nextScence();
            newScence.scaleX = 1;
            newScence.alpha = 0;
            newScence.x = this._stage.$stageWidth * .5;
            newScence.y = this._stage.$stageHeight * .5;
            newScence.anchorOffsetX = this._stage.$stageWidth * .5;
            newScence.anchorOffsetY = this._stage.$stageHeight * .5;
            this._stage.addChild(newScence);
            if (this._curScence != null) {
                this._stage.removeChild(this._curScence);
            }
            egret.Tween.get(newScence).to({ alpha: 1 }, 0.5).call(function () {
                this._callback ? this._callback() : "";
            }.bind(this));
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    ScenceManage.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    ScenceManage.prototype.onResourceLoadError = function (event) {
        //TODO+
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    ScenceManage.prototype.onResourceProgress = function (event) {
        if (event.groupName == this._scenceName) {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    ScenceManage.prototype.createGameScene = function () {
    };
    return ScenceManage;
}());
__reflect(ScenceManage.prototype, "ScenceManage");
//# sourceMappingURL=ScenceManage.js.map