import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {
  Link,
} from 'react-router';
import {
  Form,
  FormGroup,
  Input,
  DateTimeInput,
  Button,
  Modal,
  ModalTrigger
} from 'amazeui-react';

import TriggerActions from '../actions/triggerActions';
import TriggerStore from '../stores/triggerStore';
import StateMixin from 'reflux-state-mixin';

import ValidateActions from '../actions/validateActions';
import ValidateStore from '../stores/validateStore';

const NewTrigger = React.createClass({
  mixins:[
    StateMixin.connect(TriggerStore, 'triggers'),

    StateMixin.connect(ValidateStore, 'nameValidated'),
    StateMixin.connect(ValidateStore, 'scriptValidated'),
    StateMixin.connect(ValidateStore, 'urlValidated'),

    StateMixin.connect(TriggerStore, 'newTriggerError')
  ],

  getInitialState(){
    return {
            name:'',
            script:'',
            url:'',
            args:'',
            description:'',
          };
  },
  //---------------------------name--------------------
  nameHandleChange() {
    this.setState({
      name: this.refs.nameField.getValue()
    });
  },
  validateName(){
    const name = this.state.name;
    if (name.length == 0) {
      ValidateActions.validateName(false);
      return 'error';
    } else {
      let msg = 'success';
      {this.state.triggers.map((trigger, index) => {
            const {Name} = trigger;
            if (Name == name) {
              msg = 'error';
              return;
            }
          })
      }
      if (msg == 'success') {
        ValidateActions.validateName(true);
      }else if (msg == 'error') {
        ValidateActions.validateName(false);
      }
      return msg;
    }
  },
  //---------------------------script--------------------
  scriptHandleChange() {
    this.setState({
      script: this.refs.scriptField.getValue()
    });
  },
  validateScript(){
    const script = this.state.script;
    if (script.length == 0) {
      ValidateActions.validateScript(false);
      return 'error';
    }else {
      ValidateActions.validateScript(true);
      return 'success';
    }
  },
  //---------------------------args--------------------
  argsHandleChange() {
    this.setState({
      args: this.refs.argsField.getValue()
    });
  },
  //---------------------------url--------------------
  urlHandleChange() {
    this.setState({
      url: this.refs.urlField.getValue()
    });
  },
  validateUrl(){
    const url = this.state.url;
    if (url.length == 0) {
      ValidateActions.validateUrl(false);
      return 'error';
    }else {
      ValidateActions.validateUrl(true);
      return 'success';
    }
  },
  //---------------------------description--------------------
  descriptionChanged(event) {
    this.setState({
      description: event.target.value
    });
  },

  renderDetail() {
    const { name, script, url, args, description } = this.state;
		return(
      <Form className="am-form newt-item-font">
        <div className="am-g">
            <div className="am-u-md-2 newt-item-text">
            任务名称
            </div>
            <div className="am-u-md-5">
              <Input
               amSize="sm"
               value={name}
               validation={this.validateName()}
               hasFeedback
               ref="nameField"
               onChange={this.nameHandleChange} />
           </div>
           <div className="am-u-md-4 newt-item-text">
             *必填，不可重复
           </div>
         </div>

         <div className="am-g">
             <div className="am-u-md-2 newt-item-text">
             执行脚本文件名
             </div>
             <div className="am-u-md-5">
               <Input
                amSize="sm"
                value={script}
                validation={this.validateScript()}
                hasFeedback
                ref="scriptField"
                onChange={this.scriptHandleChange} />
            </div>
            <div className="am-u-md-4 newt-item-text">
              *必填，确保该脚本文件存在
            </div>
          </div>

          <div className="am-g">
              <div className="am-u-md-2 newt-item-text">
              执行参数
              </div>
              <div className="am-u-md-5">
                <Input
                 amSize="sm"
                 value={args}
                 hasFeedback
                 ref="argsField"
                 onChange={this.argsHandleChange} />
             </div>
             <div className="am-u-md-4 newt-item-text">
               可选填，参数间用逗号“,”分隔
             </div>
           </div>

            <div className="am-g">
                <div className="am-u-md-2 newt-item-text">
                触发地址
                </div>
                <div className="am-u-md-5">
                  <Input
                   amSize="sm"
                   value={url}
                   validation={this.validateUrl()}
                   hasFeedback
                   ref="urlField"
                   onChange={this.urlHandleChange} />
               </div>
               <div className="am-u-md-4 newt-item-text">
                 *必填
               </div>
             </div>

             <div className="am-g">
                 <div className="am-u-md-2 newt-item-text">
                 任务描述
                 </div>
                 <div className="am-u-md-10 newt-item-text">
                   <textarea
                   value={description} onChange={this.descriptionChanged}
                   rows="10"></textarea>
                 </div>
              </div>
     </Form>
		);
	},
  componentDidUpdate(){
    if (this.state.newTriggerError) {
      this.refs.modalTrigger.close();
      console.log('modal-newTriggerError');
      console.log(this.state.newTriggerError);
      this.refs.alertTrigger.open();
    }
  },
  submitClick(){
      const trigger = {
                        Id:null,
                        Name:this.state.name ,
                        Script:this.state.script,
                        Url:this.state.url,
                        Args:this.state.args,
                        Description:this.state.description};
      TriggerActions.newTrigger(trigger);
      console.log("submitClick");
  },

	renderButtonGroup() {
    if (this.state.nameValidated
      &&this.state.scriptValidated
      &&this.state.urlValidated) {
      return(
        <div className="am-margin">
          <Link to="/trigger/">
          <Button amStyle="secondary newt-btn">放弃编辑</Button>
          </Link>
          <ModalTrigger
            ref="modalTrigger"
            modal={<Modal type="loading" title="正在提交保存..." />}>
          <Button amStyle="secondary newt-btn"
              onClick={this.submitClick}>
              提交保存
            </Button>
            </ModalTrigger>
        </div>
      );
    }else {
      return(
        <div className="am-margin">
          <Link to="/trigger/">
          <Button amStyle="secondary newt-btn">放弃编辑</Button>
          </Link>
          <ModalTrigger
            modal={<Modal type="alert" title="错误提示">请按要求填写完整</Modal>}>
          <Button amStyle="secondary newt-btn">
              提交保存
          </Button>
          </ModalTrigger>
        </div>
      );
    }
	},
  alertOnConfirm(){
    TriggerActions.resetNewTriggerError();
  },
  renderAlert(){
    return(
      <ModalTrigger
        ref="alertTrigger"
        onConfirm={this.alertOnConfirm}
        modal={<Modal type="alert" title="错误提示">提交失败，请重试</Modal>}>
      <div ></div>
      </ModalTrigger>
    );
  },

	render() {
    return (
    	<div className="newt-default">
        {this.renderDetail()}
        {this.renderButtonGroup()}
        {this.renderAlert()}
      </div>
    );
  }
});


export default NewTrigger;
