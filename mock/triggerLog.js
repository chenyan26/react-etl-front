'use strict';

// var triggerLog =
//     {"Id":4,
//      "ExeTime":"2016-03-15 15:30:23",
//      "Log":"[Tue Jan 11 17:32:52 2013] [error] [google 123.124.2.2] client denied by server: /export/home/macadmin/testdoc [Tue Jan 11 17:32:52 2013] [error] [google 123.124.2.2] client denied by server: /export/home/macadmin/testdoc - no such file",
//      "Status":0};

var triggerLog =
      [
      {"Id":0,"ExeTime":"2016-03-15 15:30:23","Log":"[google 123.124.2.2] client denied by server: /export/home/macadmin/testdoc","Status":0},
      {"Id":1,"ExeTime":"2016-03-16 15:30:23","Log":"[google 123.124.2.2] client denied by server: /export/home/macadmin/testdoc - no such file","Status":1},
      {"Id":2,"ExeTime":"2016-03-17 15:30:23","Log":"[google 123.124.2.2] client denied by server: /export/home/macadmin/testdoc - exist such file","Status":0},
      ];
module.exports = triggerLog;
