const {ccclass, property} = cc._decorator;

import global_data from './global_data'
import {CDB} from './CDB'

@ccclass
export default class game extends cc.Component {

    @property(cc.WebView)
    webUrl: cc.WebView = null;

    @property(cc.Node)
    loading: cc.Node = null;

    getParam() {
        let url = window.location.href
        let index = url.indexOf("?");
        let ret = {}
        if (index != -1) {
            url = url.substring(index + 1);
            let params = url.split("&");
            params.forEach(function (item) {
                if (item && item.length > 0) {
                    let kv = item.split("=");
                    if (kv.length == 2 && kv[0] && kv[0].length > 0) {
                        ret[kv[0]] = kv[1];
                    }
                }
            });
        }
        return ret;
    }

    start () {
        CDB.debugMode=true;
        console.log("game started...."+window.location.href)
        let that = this
        if (!global_data.Instance.isLogin()) {//用户还未登录
            console.log("user hasn't login yet.")
            let param = that.getParam()
            if (param['code']) {
                that.loading.active=true
                //webview授权登录成功，带着code返回游戏
                //TODO 初始化CDB登录，完成登录流程
                let params = {
                    gameId: 2,
                    channelId: 10001,
                    platId: 5,
                    code: param['code'],
                    timestamps: Math.floor((new Date()).valueOf() / 1000).toString(),
                    success: function(result)
                    {
                        console.log('CDB login Success 上行:' + JSON.stringify(params) + " 下行:" + JSON.stringify(result))
                        global_data.Instance.login();
                        cc.director.loadScene("running");
                        that.loading.active=false;
                    },
                    fail: function(reason) {
                        console.error('CDB login Fail 上行:' + JSON.stringify(params) + " 下行:" + JSON.stringify(reason))
                    }
                }
                CDB.login(params);
            }
        }
    }

    startGame(){
        //玩家已经登录，直接开始游戏
        if (global_data.Instance.isLogin()) {
            console.log("user has logined in.")
            cc.director.loadScene("running");
        }else{
            console.log("not login.");
            //如果玩家未登录，并且用户来自手机H5页面，则跳出授权登录页面
            if(cc.sys.platform === cc.sys.MOBILE_BROWSER||cc.sys.platform===cc.sys.DESKTOP_BROWSER){
                console.log("show login page.")
                this.webUrl.node.active=true
            }else{
                console.log("run game...")
                cc.director.loadScene("running");
            }
        }
    }

    // update (dt) {}
}
