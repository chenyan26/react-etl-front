import Reflux from 'reflux';
import StateMixin from 'reflux-state-mixin';
import LogActions from '../actions/logActions';

const LogStore = Reflux.createStore({
	mixins:[StateMixin.store],
	listenables: [LogActions],

	getInitialState(){      //that's a must!
    return{
      logs:null,
      getLogsDone:false,
	  	getLogsError:null,
    }
  },

// ---------获取logs
	onGetLogsCompleted(data){
		console.log( "get-logs" );
		const obj = JSON.parse(data);
		this.setState({
			logs:obj
		});
	},
	onGetLogsFailed(errorThrown){
		console.log( "error" );
		this.setState({
			getLogsError:errorThrown
		});
	},
	onGetLogsAlways(){
		console.log( "finished" );
		this.setState({
			getLogsDone:true
		});
	},

});

export default LogStore;
