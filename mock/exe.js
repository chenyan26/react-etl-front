'use strict';

var exe =
      [
      {"Id":0,
        "Id_Task":2,
        "Type":0,
        "ExeTime":"2016-03-17 15:30:23",
        "ExitValue":1,
        "Status":3, //已放弃
        "Retry":3,
      },
      {"Id":1,
        "Id_Task":2,
        "Type":0,
        "ExeTime":"2016-03-18 15:30:23",
        "ExitValue":0,
        "Status":2,//已完成
        "Retry":0,
      },
      {"Id":2,
        "Id_Task":2,
        "Type":0,
        "ExeTime":"2016-03-19 15:30:23",
        "ExitValue":0,
        "Status":1, //执行中
        "Retry":2,
      },
      {"Id":3,
        "Id_Task":2,
        "Type":0,
        "ExeTime":"2016-03-20 15:30:23",
        "ExitValue":0,
        "Status":0, //待执行
        "Retry":0,
      },
      {"Id":4,
        "Id_Task":2,
        "Type":0,
        "ExeTime":"2016-03-16 15:30:23",
        "ExitValue":1,
        "Status":2,//已完成
        "Retry":3,
      },

      ];
module.exports = exe;
