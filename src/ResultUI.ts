

class ResultUI extends egret.Sprite {

        
    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.createView,this);

    }
    private createView():void {
          var lu=createBitmap("bg_jpg");
          this.addChild(lu);
        
    }
    
    
}
