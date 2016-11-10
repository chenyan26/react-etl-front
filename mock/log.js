'use strict';

var log =
      [
        {"Id":0,
        "Id_TaskExe":0,
        "Timestamp":"2016-03-18 15:30:23",
        "Type":0, //out
        "Log":"[google 123.124.2.2] client access server: /export/home/macadmin/testdoc - exist such file",
      },
        {"Id":1,
        "Id_TaskExe":2,
        "Timestamp":"2016-03-18 10:30:23",
        "Type":0,
        "Log":"[google 123.124.2.2] client denied by server: /export/home/macadmin/testdoc - no such file",
      },
        {"Id":2,
        "Id_TaskExe":0,
        "Timestamp":"2016-03-17 12:30:23",
        "Type":0, //out
        "Log":"[google 123.124.2.2] client access server: /export/home/macadmin/testdoc - exist such file",
      },
        {"Id":3,
        "Id_TaskExe":2,
        "Timestamp":"2016-03-16 15:30:23",
        "Type":1, //err
        "Log":"[google 123.124.2.2] client denied by server: /export/home/macadmin/testdoc - no such file",
      },
        {"Id":4,
        "Id_TaskExe":0,
        "Timestamp":"2016-03-15 15:30:23",
        "Type":0, //out
        "Log":"[google 123.124.2.2] client access server: /export/home/macadmin/testdoc - exist such file",
      },
        {"Id":5,
        "Id_TaskExe":2,
        "Timestamp":"2016-03-14 15:30:23",
        "Type":0,
        "Log":"[google 123.124.2.2] client denied by server: /export/home/macadmin/testdoc - no such file",
      },
      ];
module.exports = log;
