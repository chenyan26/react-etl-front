import Reflux from 'reflux';
import StateMixin from 'reflux-state-mixin';
import ValidateActions from '../actions/validateActions';

const ValidateStore = Reflux.createStore({
	mixins:[StateMixin.store],
	listenables: [ValidateActions],

	getInitialState(){      //that's a must!
    return{
			nameValidated:false,
      scriptValidated:false,
      exeIntervalValidated:false,
      urlValidated:false,
    }
  },

	onValidateName(val){
    this.setState({
      nameValidated:val
    });
  },
  onValidateScript(val){
    this.setState({
      scriptValidated:val
    });
  },
  onValidateExeInterval(val){
    this.setState({
      exeIntervalValidated:val
    });
  },
  onValidateUrl(val){
    this.setState({
      urlValidated:val
    });
  },

});

export default ValidateStore;
