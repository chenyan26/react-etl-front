import Reflux from 'reflux';
import StateMixin from 'reflux-state-mixin';
import TriggerActions from '../actions/triggerActions';

const TriggerStore = Reflux.createStore({
  mixins:[StateMixin.store],
  listenables:[TriggerActions],

  getInitialState(){
    return {
      triggers:null,
      getTriggersDone:false,
	  	getTriggersError:null,

      shouldRefreshTriggers:false,

      newTriggerError:null,
      deleteTriggerError:null,
      editTriggerError:null,

      triggerO:null,
			getTriggerError:null,
	  	getTriggerDone:false,
    }
  },
// ---------获取triggers
  onGetAllTriggersCompleted(data){
    console.log("get-triggers");
    const obj = JSON.parse(data);
    this.setState({
      triggers:obj
    });
  },
  onGetAllTriggersFailed(errorThrown){
    console.log("error");
    this.setState({
      getTriggersError:errorThrown
    });
  },
  onGetAllTriggersAlways(){
    console.log("finished");
    this.setState({
      getTriggersDone:true
    });
  },
  onResetShouldRefreshTriggers(){
		this.setState({
			shouldRefreshTriggers:false
		});
	},
  // ---------删除某条trigger
  	onDeleteTriggerCompleted(data){
  		console.log("onDeleteTriggerCompleted");
  		const {msg} = JSON.parse(data);
  		console.log("data"+data);
  		if (msg == 1) {
        console.log("删除成功");
  			this.setState({
  				shouldRefreshTriggers:true
  			});
  			window.location.assign("/admin/#/trigger");
  		}else {
  			console.log("删除失败");
        this.setState({
          deleteTriggerError:msg
        });
  		}
  	},
  	onDeleteTriggerFailed(errorThrown){
      console.log("error");
      this.setState({
        deleteTriggerError:errorThrown
      });
  	},

    onResetDeleteTriggerError(){
      this.setState({
        deleteTriggerError:null
      });
    },
    // ---------获取某条trigger
  		onGetTriggerCompleted(data){
  			console.log( "get-trigger" );
  			const obj = JSON.parse(data);
  			this.setState({
  				triggerO:obj
  			});
  		},
  		onGetTriggerFailed(errorThrown){
  			this.setState({
  				getTriggerError:errorThrown,
          triggerO:null
  			});
  		},
  		onGetTriggerAlways(){
  			this.setState({
  				getTriggerDone:true
  			});
  		},
  		onResetGetTriggerErrorAndDone(){
  			this.setState({
  				getTriggerDone:false,
  				getTriggerError:null
  			});
  		},

  // ---------新建trigger
    onNewTriggerCompleted(data){
      console.log("onNewTrigger-Completed");
      if (data) {
        const obj = JSON.parse(data);
        const {newId} = obj;
        this.setState({
          shouldRefreshTriggers:true
        });
        const address = `/admin/#/trigger/${newId}`;
        window.location.assign(address);
      }else {
        console.log("新建失败");
        this.setState({
          newTriggerError:"no data"
        });
      }
    },
    onNewTriggerFailed(errorThrown){
      console.log("error");
      this.setState({
        newTriggerError:errorThrown
      });
    },

    onResetNewTriggerError(){
      this.setState({
        newTriggerError:null
      });
    },

  // ---------编辑trigger
    onEditTriggerCompleted(data, Id){
      console.log("onEditTriggerCompleted");
  		const {msg} = JSON.parse(data);
  		console.log("data"+data);
  		if (msg == 1) {
        console.log("编辑成功");
        this.setState({
          shouldRefreshTriggers:true
        });
        const address = `/admin/#/trigger/${Id}`;
        window.location.assign(address);
  		}else {
  			console.log("编辑失败");
        this.setState({
          editTriggerError:msg
        });
  		}
    },
    onEditTriggerFailed(errorThrown){
      console.log("error");
      this.setState({
        editTriggerError:errorThrown
      });
    },

    onResetEditTriggerError(){
      this.setState({
        editTriggerError:null
      });
    },
});

export default TriggerStore;
