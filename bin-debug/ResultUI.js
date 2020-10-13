var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ResultUI = (function (_super) {
    __extends(ResultUI, _super);
    function ResultUI() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    ResultUI.prototype.createView = function () {
        var lu = createBitmap("bg_jpg");
        this.addChild(lu);
    };
    return ResultUI;
}(egret.Sprite));
__reflect(ResultUI.prototype, "ResultUI");
//# sourceMappingURL=ResultUI.js.map