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

class LoadingUI extends egret.Sprite {

    //private loadingTextT = 

    public constructor() {
        super();
        this.createView();
    }

    private baseY = 800;

    private textField: egret.TextField;
    private barBg;
    private bar;
    public static bg = new egret.Bitmap();
    private createView(): void {

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
        this.barBg.graphics.drawRect(175, this.baseY+ 40, 400, 20);
        this.barBg.graphics.endFill();
        this.addChild(this.barBg);

        this.bar = new egret.Shape();
        this.bar.graphics.beginFill(0xffffff);
        this.bar.graphics.drawRect(175, this.baseY + 40, 0, 20);
        this.bar.graphics.endFill();
        this.addChild(this.bar);

    }

    public setProgress(current: number, total: number): void {
        var percent = Math.ceil(current / total * 400);
        var percent1 = Math.ceil(current / total * 100);
        this.textField.text = `Loading...${percent1}%`;
        this.bar.graphics.beginFill(0xffffff);
        this.bar.graphics.drawRect(175, this.baseY + 40, percent, 20);
        this.bar.graphics.endFill();
    }
}
