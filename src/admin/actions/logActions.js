import Reflux from 'reflux';

const LogActions = Reflux.createActions(
	[
	 {getLogs: {
		children: ['completed', 'failed', 'always']}
	 }
 ]
);

// shouldEmit的使用（防止action的频繁触发）
// 获取logs
let requesting = false;
LogActions.getLogs.shouldEmit = function () {
    return !requesting;
}

LogActions.getLogs.listen(function(id) {
    requesting = true;
    let me = this;
    $.get(`/backend/log/${id}`).done(function (data) {
        me.completed(data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        me.failed(errorThrown);
    }).always(function () {
        requesting = false;
        me.always();
    });
});
export default LogActions
