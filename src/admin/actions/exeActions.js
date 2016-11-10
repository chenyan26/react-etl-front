import Reflux from 'reflux';


const ExeActions = Reflux.createActions(
	[
	 {getExes: {
         children: ['completed', 'failed', 'always']}
   },
	 'resetGetExesErrorAndDone',
 ]
);

// 获取exes
ExeActions.getExes.listen(function(id,type) {
    let me = this;
    $.get(`/backend/exe/${id}`,type).done(function (data) {
        me.completed(data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        me.failed(errorThrown);
    }).always(function () {
        me.always();
    });
});

export default ExeActions
