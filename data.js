'use strict';

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var crypto = require('crypto');
//var ObjectId = require('mongodb').ObjectID;
const url = 'mongodb://localhost/CRM';

function sha1sum (input){
    return crypto.createHash('sha1').update(JSON.stringify(input)).digest('hex')
}


function insertUser(user){
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('users').insertOne({
            groupID: user.groupID || 0,
            name:user.name,
            password: sha1sum(user.password),
            profile:user.profile || {}
        },function(err, result){
            //assert.equal(err,null);
            if(err){
                console.log("插入users数据错误");
            }else{
                console.log("插入users数据成功");
            }
            db.close();
        })
    });
}

function findUser(selector,  ok_callback, fail_callback){
    MongoClient.connect(url, function(err,db){
        assert.equal(null, err);
        console.log(selector);
        var cursor = db.collection('users').find(selector).toArray(
            function(err, doc){
                if(err || doc.length===0){
                    fail_callback(err);
                }
                else{
                    //注意返回的数据里面密码设为空白（''）
                    for(let k in doc){
                        //console.log(doc[k]);
                        doc[k].password ='';
                    }
                    ok_callback(doc);
                }
            }
        )
    });
}

function checkUserLogin(groupID, name, password){
    findUser({groupID:groupID, name:name, password:sha1sum(password)},
        function(doc){
            console.log(doc);
        },
        function(err){
            console.log('cannot find it:'+err);
        });
}

module.exports = function(){
    return {
        db:MongoClient,
        insertUser:insertUser,
        findUser:findUser,
        checkUserLogin:checkUserLogin,
        sha1sum:sha1sum
    }
};

