import Reflux from 'reflux';


const TriggerActions = Reflux.createActions(
  [{deleteTrigger: {
        children: ['completed', 'failed']}
     },
     'resetDeleteTriggerError',

    {getAllTriggers: {
    children: ['completed', 'failed', 'always']}
    },
    'resetShouldRefreshTriggers',

    {getTrigger: {
  	 children: ['completed', 'failed', 'always']}
  	},
  	"resetGetTriggerErrorAndDone",

    {newTrigger: {
    children: ['completed', 'failed']}
    },
    'resetNewTriggerError',

    {editTrigger: {
    children: ['completed', 'failed']}
    },
    'resetEditTriggerError',
  ]
);

// shouldEmit的使用（防止action的频繁触发）
// 获取trigger
let requesting = false;
TriggerActions.getAllTriggers.shouldEmit = function () {
    return !requesting;
}

TriggerActions.getAllTriggers.listen(function() {
    requesting = true;
    let me = this;
    $.get('/backend/trigger').done(function (data) {
        me.completed(data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        me.failed(errorThrown);
    }).always(function () {
        requesting = false;
        me.always();
    });
});

TriggerActions.getTrigger.listen(function(id) {
    let me = this;
    $.get(`/backend/trigger/${id}`).done(function (data) {
        me.completed(data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        me.failed(errorThrown);
    }).always(function () {
        me.always();
    });
});

// 删除某条trigger
TriggerActions.deleteTrigger.listen(function(id) {
    let me = this;
    $.ajax({
			 url: `/backend/trigger/${id}`,
			 type: 'DELETE'}).done(function (data) {
              me.completed(data);
          }).fail(function (jqXHR, textStatus, errorThrown) {
              me.failed(errorThrown);
          });
});

// 新建trigger
TriggerActions.newTrigger.listen(function(trigger) {
    let me = this;
    let json = JSON.stringify(trigger);
    $.post('/backend/trigger',json).done(function (data) {
        me.completed(data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        me.failed(errorThrown);
    });
});

// 编辑trigger
TriggerActions.editTrigger.listen(function(trigger) {
    let me = this;
		const {Id} = trigger;
    let json = JSON.stringify(trigger);
    $.post(`/backend/trigger/${Id}`,json).done(function (data) {
        me.completed(data, Id);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        me.failed(errorThrown);
    });
});
export default TriggerActions
