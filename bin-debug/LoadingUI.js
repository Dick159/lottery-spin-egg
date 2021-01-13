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
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.baseY = 800;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        //添加背景
        RES.getResByUrl("resource/assets/common_bg.png", function (texture) {
            var bg = new egret.Bitmap();
            bg.texture = texture;
            this.addChildAt(bg, 0);
        }, this);
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = this.baseY;
        this.textField.width = 750;
        this.textField.height = 100;
        this.textField.textAlign = "center";
        this.barBg = new egret.Shape();
        this.barBg.graphics.beginFill(0x000000);
        this.barBg.graphics.drawRect(175, this.baseY + 30, 400, 20);
        this.barBg.graphics.endFill();
        this.addChild(this.barBg);
        this.bar = new egret.Shape();
        this.bar.graphics.beginFill(0xffffff);
        this.bar.graphics.drawRect(175, this.baseY + 30, 0, 20);
        this.bar.graphics.endFill();
        this.addChild(this.bar);
    };
    LoadingUI.prototype.setProgress = function (current, total) {
        var percent = Math.ceil(current / total * 400);
        var percent1 = Math.ceil(current / total * 100);
        this.textField.text = "Loading..." + percent1 + "%";
        this.bar.graphics.beginFill(0xffffff);
        this.bar.graphics.drawRect(175, this.baseY + 30, percent, 20);
        this.bar.graphics.endFill();
    };
    return LoadingUI;
}(egret.Sprite));
LoadingUI.bg = new egret.Bitmap();
__reflect(LoadingUI.prototype, "LoadingUI");
//# sourceMappingURL=LoadingUI.js.map