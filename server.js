/* jshint node: true */
/* globals console */

'use strict';

var express = require('express')
    , app = express()
    ;

var db = require('./data')();

//db.insertUser({name:'ldc',password:'ldc'});
//db.checkUserLogin(0,'ldc','111');

app.use(express.static('public'));

//下面是路由，定义了web API

//主页，返回SPA主页面，这也是唯一的一个页面
app.get('/', function (request, response) {
    response.sendFile(__dirname + "/" + "index.htm");
});

//显示所有的用户信息，密码被设置为空白
app.get('/users/list', function(request, response){
    db.findUser({groupID:0}, function(doc){
        response.send(doc);
    },function(err){
        response.send(err);
    });
});

//登录，采用POST的方法，三个参数：groupID（集团id），name（用户名），password（密码）
app.post('/login', function(request, response){
    
});

var server = app.listen(4000, function () {
    let host = server.address().address,
        port = server.address().port;

    console.log('server in running at  http://%s:%s', host, port);
});
