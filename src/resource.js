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

var res = {
    HelloWorld_png : "res/HelloWorld.png",
    grass_png: "res/grass.png",
    balloon_blue_png:   "res/balloon_blue.png",
    balloon_blue_plist: "res/balloon_blue.plist",
    balloon_green_png:   "res/balloon_green.png",
    balloon_green_plist: "res/balloon_green.plist",
    balloon_orange_png:   "res/balloon_orange.png",
    balloon_orange_plist: "res/balloon_orange.plist",
    balloon_pink_png:   "res/balloon_pink.png",
    balloon_pink_plist: "res/balloon_pink.plist",
    balloon_purple_png:   "res/balloon_purple.png",
    balloon_purple_plist: "res/balloon_purple.plist",
    balloon_red_png:   "res/balloon_red.png",
    balloon_red_plist: "res/balloon_red.plist",
    balloon_yellow_png:   "res/balloon_yellow.png",
    balloon_yellow_plist: "res/balloon_yellow.plist",
    balloon_pop_sound: "res/pop.mp3",
    sky:"res/sky.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

cc.spriteFrameCache.addSpriteFrames(res.balloon_blue_plist);




