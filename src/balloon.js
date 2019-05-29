
var Balloon = cc.Sprite.extend({

    ctor:function (layer) {
        this.m_balloonType = 0;
        this.m_speed = 20;
        this.m_x = 0;
        this.m_y = 0;
        this.m_canClick = true;
        var pFrame = cc.spriteFrameCache.getSpriteFrame("blue1.png");
        this._super(pFrame);
        //set callback when animation is complete
        this.blueAction = cc.sequence(blueAnimate, cc.callFunc(moveOffScreen, this) );
        this.blueAction.retain();
        this.greenAction = cc.sequence(greenAnimate, cc.callFunc(moveOffScreen, this) );
        this.greenAction.retain();
        this.orangeAction = cc.sequence(orangeAnimate, cc.callFunc(moveOffScreen, this) );
        this.orangeAction.retain();
        this.pinkAction = cc.sequence(pinkAnimate, cc.callFunc(moveOffScreen, this) );
        this.pinkAction.retain();
        this.purpleAction = cc.sequence(purpleAnimate, cc.callFunc(moveOffScreen, this) );
        this.purpleAction.retain();
        this.redAction = cc.sequence(redAnimate, cc.callFunc(moveOffScreen, this) );
        this.redAction.retain();
        this.yellowAction = cc.sequence(yellowAnimate, cc.callFunc(moveOffScreen, this) );
        this.yellowAction.retain();
        var clickListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,

            onTouchBegan: onTouchBegan
        });
        cc.eventManager.addListener(clickListener, this);
        clickListener.retain();
        layer.addChild(this,2);
    }

});
var moveOffScreen = function(){
    this.m_y=999;
    this.setPosition (cc.p(this.m_x, this.m_y));
}
var onTouchBegan = function (touch, event) {
    // event.getCurrentTarget() returns the *listener's* sceneGraphPriority node.
    var target = event.getCurrentTarget();

    //Get the position of the current point relative to the button
    var locationInNode = target.convertToNodeSpace(touch.getLocation());
    var s = target.getContentSize();
    var rect = cc.rect(0, 0, s.width, s.height);

    //Check the click area

    if (cc.rectContainsPoint(rect, locationInNode)) {  //if clicked on balloon
        for (var i=0; i<b_balloon.length; i++) {
            b_clicked(touch.getLocation(),b_balloon[i]); //find balloon clicked
        }
        return true;
    }
    return false;
};