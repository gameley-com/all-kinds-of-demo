# H5GameVerificationDemo

H5游戏实名认证Demo

## 名词解释

|名称|解释|
|---|---|
|CDB|为单机游戏提供的简单服务器功能。比如登录校验，数据存储等|


## 背景

小游戏可能在2020年之后，会要求版号。而游戏申请版号，需要提供实名认证以及防沉迷机制。因此，针对这个情况，乐游为各CP的单机小游戏，提供了实名认证的接口。

调用实名认证接口有一个前提，必须是一个经过系统鉴权之后的用户。如果CP的小游戏只上微信，OPPO，vivo等渠道，借助乐游CDB的功能，即可轻松实现实名验证。具体可参考[CDB接入文档](https://www.yuque.com/docs/share/697bdf56-f42d-4280-9263-ac495abd86bc?#)

对于H5版本的小游戏，流程略有不同，CP需要按规范从乐游账户系统获取授权code，然后再结合CDB登录接口，实现整个后续功能。

## 流程

![流程图](./flow.png)

## 步骤

需要结合[CDB接入文档](https://www.yuque.com/docs/share/697bdf56-f42d-4280-9263-ac495abd86bc?#)，此步骤主要是针对如何获取乐游账户授权code。拿到code之后，和其他渠道一样，调用CDB.login登录。



## cocos creator版本demo
该demo在目录./cocos/下，此demo对应的为cocos creator 2.0.9版本的接入工程。
