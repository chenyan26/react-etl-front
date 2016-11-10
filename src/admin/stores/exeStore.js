import Reflux from 'reflux';
import StateMixin from 'reflux-state-mixin';
import ExeActions from '../actions/exeActions';

const ExeStore = Reflux.createStore({
	mixins:[StateMixin.store],
	listenables: [ExeActions],

	getInitialState(){      //that's a must!
    return{
      exes:null,
      getExesDone:false,
      getExesError:null,
    }
  },

	// ---------获取exes
  onGetExesCompleted(data){
    console.log("get-exes");
    const obj = JSON.parse(data);
    this.setState({
      exes:obj
    });
  },
  onGetExesFailed(errorThrown){
    console.log("error");
    this.setState({
      getExesError:errorThrown
    });
  },
  onGetExesAlways(){
    console.log("finish");
    this.setState({
      getExesDone:true
    });
  },

  onResetGetExesErrorAndDone(){
    this.setState({
      getExesError:null,
      getExesDone:false
    });
  },

});

export default ExeStore;
