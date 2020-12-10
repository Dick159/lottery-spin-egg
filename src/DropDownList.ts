module euiextendsion {
    export class DropDwonList extends eui.Component {
        //展开、收回列表的按钮
        private btn: eui.Button;
        //滚动的列表
        private scroller: eui.Scroller;
        //滚动列表上的遮罩
        private spMask: egret.Shape;
        //列表是否展开了
        private isShow: boolean = false;
        //滚动区域消失位置的 y 坐标
        private posScrollerClose: number;

        public selectText = "";

        private _width = 180;

        private _height = 200;

        constructor() {
            super();
            //创建滚动区域和列表
            var arr = [];
            for (var i = 0; i < 16; i++) {
                var data = {text:"text"+i,value:"value"+i};
                arr.push(data);
            }
            var list = new eui.List();
            list.itemRendererSkinName = "resource/eui_skins/ItemRendererSkin.exml";
            list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.test, this);
            list.width = this._width;
  
            list.dataProvider = new eui.ArrayCollection(arr);
            var scroller = new eui.Scroller();
            scroller.skinName = "resource/eui_skins/ScrollerSkin.exml"
            scroller.height = this._height;
            scroller.width = this._width;
            
            
            scroller.viewport = list;
            this.addChild(scroller);

            //列表上面的遮罩
            var spMask = new egret.Shape();
            spMask.graphics.beginFill(0x000000);
            spMask.graphics.drawRect(0, 0, this._width*2, this._height);
            spMask.graphics.endFill();
            this.addChild(spMask);
            spMask.x = -15;
            scroller.mask = spMask;

            var btn = new eui.Button();
            btn.width = 100;
            btn.skinName = "resource/eui_skins/ButtonSkin.exml"
            btn.label = "+86";

            this.addChild(btn);
            
            this.btn = btn;
            this.btn.height = 50;
            this.scroller = scroller;
            this.spMask = spMask;
            this.scroller.y = 200;
        }
        protected createChildren() {
            super.createChildren();
            this.spMask.y = this.btn.height;
           
            // //设置消失点坐标
            this.posScrollerClose = this.scroller.y = -this.scroller.height;
            this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeListType, this);
            
        }

        private test(e: egret.TouchEvent): void{
             console.log(e.target.parent.data.text);
             console.log(e.target.parent.data.value);
             this.btn.label = e.target.parent.data.value;
             this.changeListType();
        }

        private changeListType(): void {
            if (!this.isShow) {
                egret.Tween.get(this.scroller).to({y:this.btn.height}, 300);
                this.isShow = true;
            } else {
                egret.Tween.get(this.scroller).to({y:this.posScrollerClose}, 300);
                this.isShow = false;
            }
        }
    }
}
