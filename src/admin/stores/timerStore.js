import Reflux from 'reflux';
import StateMixin from 'reflux-state-mixin';
import TimerActions from '../actions/timerActions';

const TimerStore = Reflux.createStore({
	mixins:[StateMixin.store],
	listenables: [TimerActions],

	getInitialState(){      //that's a must!
    return{
      timers:null,
      getTimersDone:false,
	  	getTimersError:null,

			shouldRefreshTimers:false,

			newTimerError:null,
			deleteTimerError:null,
			editTimerError:null,

			timer:null,
			getTimerError:null,
	  	getTimerDone:false,
    }
  },
// ---------获取timers
	onGetAllTimersCompleted(data){
		console.log( "get-timers" );
		const obj = JSON.parse(data);
		this.setState({
			timers:obj
		});
	},
	onGetAllTimersFailed(errorThrown){
		console.log( "error" );
		this.setState({
			getTimersError:errorThrown
		});
	},
	onGetAllTimersAlways(){
		console.log( "finished" );
		this.setState({
			getTimersDone:true
		});
	},
	onResetShouldRefreshTimers(){
		this.setState({
			shouldRefreshTimers:false
		});
	},
// ---------删除某条timer
	onDeleteTimerCompleted(data){
		console.log("onDeleteTimerCompleted");
		const {msg} = JSON.parse(data);
		console.log("data"+data);
		if (msg == 1) {
			console.log("删除成功");
			this.setState({
				shouldRefreshTimers:true
			});
			window.location.assign("/admin/#/timer");
		}else {
			console.log("删除失败");
			this.setState({
				deleteTimerError:msg
			});
		}
	},
	onDeleteTimerFailed(errorThrown){
		console.log("error");
		this.setState({
			deleteTimerError:errorThrown
		});
	},

	onResetDeleteTimerError(){
		this.setState({
			deleteTimerError:null
		});
	},

	// ---------获取某条timer
		onGetTimerCompleted(data){
			console.log( "get-timer" );
			const obj = JSON.parse(data);
			this.setState({
				timer:obj
			});
		},
		onGetTimerFailed(errorThrown){
			this.setState({
				getTimerError:errorThrown,
				timer:null
			});
		},
		onGetTimerAlways(){
			this.setState({
				getTimerDone:true
			});
		},
		onResetGetTimerErrorAndDone(){
			this.setState({
				getTimerDone:false,
				getTimerError:null
			});
		},

		// ---------新建timer
			onNewTimerCompleted(data){
				if (data) {
					console.log("onNewTimer-Completed");
					const obj = JSON.parse(data);
	        const {newId} = obj;
					this.setState({
						shouldRefreshTimers:true
					});
					const address = `/admin/#/timer/${newId}`;
					window.location.assign(address);
				}else {
					console.log("新建失败");
					this.setState({
						newTimerError:"no data"
					});
				}
			},
			onNewTimerFailed(errorThrown){
				console.log("error");
				this.setState({
	        newTimerError:errorThrown
	      });
			},

			onResetNewTimerError(){
	      this.setState({
	        newTimerError:null
	      });
	    },

  // ---------编辑timer
			onEditTimerCompleted(data, Id){
	      console.log("onEditTimerCompleted");
	  		const {msg} = JSON.parse(data);
	  		console.log("data"+data);
	  		if (msg == 1) {
	        console.log("编辑成功");
					this.setState({
						shouldRefreshTimers:true
					});
					const address = `/admin/#/timer/${Id}`;
					window.location.assign(address);
	  		}else {
	  			console.log("编辑失败");
	        this.setState({
	          editTimerError:msg
	        });
	  		}
	    },
	    onEditTimerFailed(errorThrown){
	      console.log("error");
	      this.setState({
	        editTimerError:errorThrown
	      });
	    },

	    onResetEditTimerError(){
	      this.setState({
	        editTimerError:null
	      });
	    },
  //you can use storeDidUpdate lifecycle in the store,
  //which will get called with every change to the state
  // storeDidUpdate(prevState) {
  //     // if(this.state.dogs !== prevState.dogs){
  //     //   console.log('number of dogs has changed!');
  //     // }
  //     console.log( this.state.isDetail )
  // }
});

export default TimerStore;
