import Reflux from 'reflux';


const TimerActions = Reflux.createActions(
	[{deleteTimer: {
        children: ['completed', 'failed']}
     },
		 'resetDeleteTimerError',

	 {getAllTimers: {
		children: ['completed', 'failed', 'always']}
	 },
	 'resetShouldRefreshTimers',

	{getTimer: {
	 children: ['completed', 'failed', 'always']}
	},
	"resetGetTimerErrorAndDone",

	 {newTimer: {
   children: ['completed', 'failed']}
   },
	 'resetNewTimerError',

	 {editTimer: {
   children: ['completed', 'failed']}
   },
   'resetEditTimerError',
	]
);

// shouldEmit的使用（防止action的频繁触发）

// 获取timers
let requesting = false;
TimerActions.getAllTimers.shouldEmit = function () {
    return !requesting;
}

TimerActions.getAllTimers.listen(function() {
    requesting = true;
    let me = this;
    $.get('/backend/timer').done(function (data) {
        me.completed(data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        me.failed(errorThrown);
    }).always(function () {
        requesting = false;
        me.always();
    });
});

TimerActions.getTimer.listen(function(id) {
    let me = this;
    $.get(`/backend/timer/${id}`).done(function (data) {
        me.completed(data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        me.failed(errorThrown);
    }).always(function () {
        me.always();
    });
});

// 删除某条timer
TimerActions.deleteTimer.listen(function(id) {
    let me = this;
		$.ajax({
			 url: `/backend/timer/${id}`,
			 type: 'DELETE'}).done(function (data) {
			        me.completed(data);
			    }).fail(function (jqXHR, textStatus, errorThrown) {
			        me.failed(errorThrown);
			    });
});

// 新建timer
TimerActions.newTimer.listen(function(timer) {
    let me = this;
		let json = JSON.stringify(timer);
    $.post('/backend/timer',json).done(function (data) {
        me.completed(data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        me.failed(errorThrown);
    });
});

// 编辑timer
TimerActions.editTimer.listen(function(timer) {
    let me = this;
		const {Id} = timer;
		let json = JSON.stringify(timer);
		$.post(`/backend/timer/${Id}`,json).done(function (data) {
        me.completed(data, Id);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        me.failed(errorThrown);
    });
});
export default TimerActions
