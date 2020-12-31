class ConfirmUtil{
    /**
	 * 
	 * 
	 * @static
	 * @param {string} tips				提示的字符串内容
	 * @param {boolean} [flag=false]	提示字符串颜色默认为红色，true为黄色
	 * @returns
	 */
	public static popUpTips(tips:string, flag:boolean=false,x,y,width,height){
		var tip:egret.TextField = new egret.TextField();
		tip.text = tips;
		tip.bold = false;
		tip.size = 48;
		tip.textColor = 0xEEEE00 ;
		var tipBg:egret.Bitmap = new egret.Bitmap(RES.getRes("seven_gameover_png"));
		tipBg.width = width;
		tipBg.height = height;
		var x =x;
		var animation = this.createGetExpAnimate({x:x,y:y},
						{
							bgImg:tipBg,
							txtTips:tip
						},3000,0,30,{x:0,y:-10});
		return animation;
	}

	/**
	 * 
	 * @fn 		 							渐现然后消失
	 * @param {number} x					动画出现在x轴上初始位置
	 * @param {number} y					动画出现在y轴上初始位置
	 * @param {animationsSource} source		动画所需的资源，可扩展
	 * @param {number} time					动画持续时间
	 * @param {number} [movDisX]			动画在x轴上移动距离
	 * @param {number} [movDisY]			动画在y轴上移动距离
	 * @returns {egret.Sprite}				返回创建的动画容器
	 */
	public static createGetExpAnimate(pos, source,
	time:number, movDisX?:number, movDisY?:number, offset={x:0,y:0}): egret.Sprite{
		let sprite:egret.Sprite = new egret.Sprite();
		sprite.x = pos.x;
		sprite.y = pos.y;
		
		sprite.addChild(source.bgImg);
		
		// source.txtTips.size = 24;
		source.txtTips.lineSpacing = 6;
		source.txtTips.multiline = true;
		source.txtTips.x = (sprite.width - source.txtTips.width) * .5 + offset.x;
		source.txtTips.y = (sprite.height - source.txtTips.height) * .5 + offset.y;
		sprite.addChild(source.txtTips);

		sprite.alpha = 0.0;
		let distanceX = pos.x - movDisX;
		let distanceY = pos.y - movDisY;
		let animate = egret.Tween.get(sprite);
		animate.to({x:distanceX, y:distanceY, alpha:1.0}, 400);
		animate.wait(time);
		animate.to({alpha:0.0}, 200).call((self) => {
			if(self.parent){
				self.parent.removeChild(self);
			}
		},this,[sprite]);

		return sprite;
	}
}
