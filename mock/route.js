'use strict';

module.exports = function (req, res, next) {
    console.log(req.url+':'+req.method);

    var url = req.url;
    var method = req.method;
    if (req.data) {
      var data = JSON.parse(req.data);
      console.log(data);
    }
    /*
    * 获取 exe      /exe/{id}           GET           传参:{"Type":0}; 以JSON格式返回ID为{id}的Logs消息列表
    * 获取 log      /log/{id}           GET           以JSON格式返回ID为{id}的Logs消息列表（ID为exe的ID）


    * 获取 timers   /timer              GET           以JSON格式返回Timers（Name、Id）消息列表
    * 获取 timer   /timer/{id}          GET           以JSON格式返回Timer消息
    * 新建 timer    /timer              POST          创建一个Timer，以JSON格式返回它的Id
    * 编辑 timer    /timer/{id}         POST           更新ID为{id}的Timer，以JSON格式返回状态或错误信息
    * 删除 timer    /timer/{id}         DELETE        删除ID为{id}的Timer，以JSON格式返回状态或错误信息
    */

    if (url.startsWith('/backend/exe/')) {
      var id = parseInt(url.substr(url.lastIndexOf('/')+1));

      var exe = require('./exe');
      var num = Math.floor(Math.random()*4);
      var exeT = exe.slice(0,num);

      res.write(JSON.stringify(exeT));
    	res.end();
    }
    if (url.startsWith('/backend/log/')) {
      var id = parseInt(url.substr(url.lastIndexOf('/')+1));
      var log = require('./log');

      var num = Math.floor(Math.random()*5);
      var logT = log.slice(0,num);

    	res.write(JSON.stringify(logT));
    	res.end();
    }

    if (url == '/backend/timer') {
        if (method == 'GET') { //获取 timers
          var list = require('./timerName');
          res.write(JSON.stringify(list)); //[]
          res.end();
        }else if (method == 'POST') { //新建 timer
        	res.write(JSON.stringify({"newId":11}));
        	res.end();
        }
    }else if (url.startsWith('/backend/timer/')) {
        var id = parseInt(url.substr(url.lastIndexOf('/')+1));

        if (method == 'POST' ) { //编辑 timer
          res.write(JSON.stringify({"msg":1}));
        	res.end();
        }else if (method == 'DELETE') { //删除 timer
          res.write(JSON.stringify({"msg":1}));
          res.end();
        }else if (method == 'GET') { //获取 timer
          var list = require('./timer');
          var obj = list[id];
          res.write(JSON.stringify(obj));
          res.end();
        }
    }

    next();

    /*
    * 获取 triggers   /trigger              GET           以JSON格式返回Triggers（Name、Id）消息列表
    * 获取 trigger   /trigger/{id}          GET           以JSON格式返回Trigger消息
    * 新建 trigger    /trigger              POST          创建一个Timer，以JSON格式返回它的Id
    * 编辑 trigger    /trigger/{id}         POST           更新ID为{id}的Trigger，以JSON格式返回状态或错误信息
    * 删除 trigger    /trigger/{id}         DELETE        删除ID为{id}的Trigger，以JSON格式返回状态或错误信息
    */

    if (url == '/backend/trigger') {
        if (method == 'GET') { //获取 triggers
          var list = require('./triggerName');
          res.write(JSON.stringify(list)); //[]
          res.end();
        }else if (method == 'POST') { //新建 trigger
        	res.write(JSON.stringify({"newId":11}));
        	res.end();
        }
    }else if (url.startsWith('/backend/trigger/')) {
        var id = parseInt(url.substr(url.lastIndexOf('/')+1));

        if (method == 'POST' ) { //编辑 trigger
          res.write(JSON.stringify({"msg":1}));
        	res.end();
        }else if (method == 'DELETE') { //删除 trigger
          res.write(JSON.stringify({"msg":1}));
          res.end();
        }else if (method == 'GET') { //获取 trigger
          var list = require('./trigger');
          var obj = list[id];
          res.write(JSON.stringify(obj));
          res.end();
        }
    }
}
