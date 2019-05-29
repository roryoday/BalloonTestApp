/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var BALLOON_CD = 2;
var MAX_BALLOONS = 30;
var MAX_SPEED = 30;
var MIN_SPEED = 15;
var l_balloonLayer = new cc.Layer();
l_balloonLayer.retain();
var b_balloon = [];
var b_count = 0;
var blueAnimation,greenAnimation,orangeAnimation,pinkAnimation,purpleAnimation,redAnimation,yellowAnimation;
var blueAnimate,greenAnimate,orangeAnimate,pinkAnimate,purpleAnimate,redAnimate,yellowAnimate;
var b_cooldown = BALLOON_CD;
var b_maxBalloons=false;

b_StartBalloon = function (x, y, s, t, b){
    b.m_balloonType=Math.floor(t); //color of b_balloon
    b.m_x = x;
    b.m_y = y;
    b.m_speed = s;
    b.m_canClick = true;
    switch (b.m_balloonType) { //first balloon sprite
        case 1:
            b.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("green1.png"));
            break;
        case 2:
            b.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("orange1.png"));
            break;
        case 3:
            b.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("pink1.png"));
            break;
        case 4:
            b.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("purple1.png"));
            break;
        case 5:
            b.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("red1.png"));
            break;
        case 6:
            b.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("yellow1.png"));
            break;
        default:
            b.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("blue1.png"));
    }
}
b_update = function(b, deltaTime){ //update position of balloon
    b.m_y += b.m_speed*deltaTime;
    b.setPosition (cc.p(b.m_x, b.m_y));

}
l_balloonLayer.update = function (deltaTime){
    b_cooldown-=deltaTime;
    if(b_cooldown<deltaTime) //spawn balloon
    {
        b_cooldown=BALLOON_CD;
        var b;
        if(b_maxBalloons)
            b=b_balloon[b_count];
        else
        {
            b = new Balloon(l_balloonLayer); //create new balloon
            b_balloon.push(b);
            b.retain();
        }

        b_StartBalloon(Math.random()*cc.winSize.width,0,MIN_SPEED + Math.random()*MAX_SPEED,Math.random()*7,b); //reset position, set random color, speed and x position
        b_count++;
        if(b_count>MAX_BALLOONS){ //num of balloons must be less than MAX_BALLOONS
            b_count=0;
            b_maxBalloons=true;
        }
    }
    for (var i=0; i<b_balloon.length; i++) {
        b_update(b_balloon[i],deltaTime); //updates position of all balloons in scene
    }
}
b_clicked = function (location,b){
    for (var i=0; i<b_balloon.length; i++) {
        var bounding = b.getBoundingBox();
        if (cc.rectContainsPoint(bounding, location)) {

            if(b.m_canClick) //balloon not already clicked
            {
                b.m_canClick = false;
                switch (b.m_balloonType) { //run popping animation of current balloon color
                    case 1:
                        b.runAction(b.greenAction);
                        break;
                    case 2:
                        b.runAction(b.orangeAction);
                        break;
                    case 3:
                        b.runAction(b.pinkAction);
                        break;
                    case 4:
                        b.runAction(b.purpleAction);
                        break;
                    case 5:
                        b.runAction(b.redAction);
                        break;
                    case 6:
                        b.runAction(b.yellowAction);
                        break;
                    default:
                        b.runAction(b.blueAction);
                }
                cc.audioEngine.playEffect(res.balloon_pop_sound);
            }
        }
    }
}
var l_bg = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        this.sky = new cc.Sprite(res.sky);
        this.sky.attr({
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2
        });
        this.sky.setScale(2.5,3);
        this.addChild(this.sky);

        return true;
    }
});

var l_main = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        this.grass = new cc.Sprite(res.grass_png);
        this.grass.attr({
            x: size.width / 2,
            y: 100
        });
        this.addChild(this.grass);

        return true;
    }
});
var s_MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var bg_layer = new l_bg();
        var layer = new l_main();
        this.addChild(bg_layer,0) //sky
        this.addChild(layer,2); //grass
        this.addChild(l_balloonLayer,1); //balloons
        l_balloonLayer.scheduleUpdate(); //l_balloonLayer.update() every frame
        //get balloon spritesheet
        cc.spriteFrameCache.addSpriteFrames(res.balloon_blue_plist);
        cc.spriteFrameCache.addSpriteFrames(res.balloon_green_plist);
        cc.spriteFrameCache.addSpriteFrames(res.balloon_orange_plist);
        cc.spriteFrameCache.addSpriteFrames(res.balloon_pink_plist);
        cc.spriteFrameCache.addSpriteFrames(res.balloon_purple_plist);
        cc.spriteFrameCache.addSpriteFrames(res.balloon_red_plist);
        cc.spriteFrameCache.addSpriteFrames(res.balloon_yellow_plist);
        var i,fb,fg,fo,fpi,fpu,fr,fy;
        var framesBlue   = [];
        var framesGreen  = [];
        var framesOrange = [];
        var framesPink   = [];
        var framesPurple = [];
        var framesRed    = [];
        var framesYellow = [];
        for (i=1; i <= 6; i++) { //creates frames
            fb = cc.spriteFrameCache.getSpriteFrame("blue"+i+".png");
            fg = cc.spriteFrameCache.getSpriteFrame("green"+i+".png");
            fo = cc.spriteFrameCache.getSpriteFrame("orange"+i+".png");
            fpi = cc.spriteFrameCache.getSpriteFrame("pink"+i+".png");
            fpu = cc.spriteFrameCache.getSpriteFrame("purple"+i+".png");
            fr = cc.spriteFrameCache.getSpriteFrame("red"+i+".png");
            fy = cc.spriteFrameCache.getSpriteFrame("yellow"+i+".png");
            framesBlue.push(fb);
            framesGreen.push(fg);
            framesOrange.push(fo);
            framesPink.push(fpi);
            framesPurple.push(fpu);
            framesRed.push(fr);
            framesYellow.push(fy);
        }
        //creates animation sequences
        blueAnimation=new cc.Animation(framesBlue,0.1);
        blueAnimation.retain();
        greenAnimation=new cc.Animation(framesGreen,0.1);
        greenAnimation.retain();
        orangeAnimation=new cc.Animation(framesOrange,0.1);
        orangeAnimation.retain();
        pinkAnimation=new cc.Animation(framesPink,0.1);
        pinkAnimation.retain();
        purpleAnimation=new cc.Animation(framesPurple,0.1);
        purpleAnimation.retain();
        redAnimation=new cc.Animation(framesRed,0.1);
        redAnimation.retain();
        yellowAnimation=new cc.Animation(framesYellow,0.1);
        yellowAnimation.retain();
        //creates animations
        blueAnimate = new cc.Animate(blueAnimation);
        blueAnimate.retain();
        greenAnimate = new cc.Animate(greenAnimation);
        greenAnimate.retain();
        orangeAnimate = new cc.Animate(orangeAnimation);
        orangeAnimate.retain();
        pinkAnimate = new cc.Animate(pinkAnimation);
        pinkAnimate.retain();
        purpleAnimate = new cc.Animate(purpleAnimation);
        purpleAnimate.retain();
        redAnimate = new cc.Animate(redAnimation);
        redAnimate.retain();
        yellowAnimate = new cc.Animate(yellowAnimation);
        yellowAnimate.retain();

    }
});

