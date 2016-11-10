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
  ModalTrigger,
  Icon
} from 'amazeui-react';

import TimerActions from '../actions/timerActions';
import TimerStore from '../stores/timerStore';
import StateMixin from 'reflux-state-mixin';

import ValidateActions from '../actions/validateActions';
import ValidateStore from '../stores/validateStore';

const EditTimer = React.createClass({
  mixins:[
        StateMixin.connect(TimerStore, 'timers'),
        StateMixin.connect(TimerStore, 'timer'),

        StateMixin.connect(ValidateStore, 'nameValidated'),
        StateMixin.connect(ValidateStore, 'scriptValidated'),
        StateMixin.connect(ValidateStore, 'exeIntervalValidated'),

        StateMixin.connect(TimerStore, 'editTimerError'),
        ],

   getInitialState(){
    return {
            name:'',
            script:'',
            args:'',
            exeTime:'',
            exeInterval:'',
            description:'',
            nowDate:'',
        };
   },

   componentWillMount(){
     if (this.state.timer) {
       const { Name, Script, Args, ExeTime, ExeInterval, Description } = this.state.timer;
       var now = new Date();
       var nowDate = now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();
       this.setState({
         name:Name,
         script:Script,
         args:Args,
         exeTime:ExeTime,
         exeInterval:ExeInterval,
         description:Description,
         nowDate:nowDate
       });
     }else {
       window.location.assign(`/admin/#/timer/${this.props.params.id}`);
     }
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
  }
  if (name == this.state.timer.Name) {
    ValidateActions.validateName(true);
    return 'success';
  }else {
    let msg = 'success';
    {this.state.timers.map((timer, index) => {
          const {Name} = timer;
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
//---------------------------exeTime--------------------
handleSelectTime(time){
  const t = time + ":00";
  this.setState({
      exeTime: t
    });
},
//---------------------------exeInterval--------------------
exeIntervalHandleChange() {
  this.setState({
    exeInterval: this.refs.exeIntervalField.getValue()
  });
},
validateExeInterval(){
  const exeInterval = this.state.exeInterval;
  if (/^\d+$/.test(exeInterval)) {
      ValidateActions.validateExeInterval(true);
      return 'success';
  }else {
      ValidateActions.validateExeInterval(false);
    return 'error';
  }
},
//---------------------------description--------------------
descriptionChanged(event) {
  this.setState({
    description: event.target.value
  });
},
//-----------------
  renderDetail() {
    if (this.state.timer) {
      const { name, script, args, exeTime, exeInterval, description } = this.state;
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
                 执行时间
                 </div>
                 <div className="am-u-md-5">
                   <DateTimeInput
                     amSize="sm"
                     dateTime={this.state.timer.ExeTime}
                     onSelect={this.handleSelectTime}
                     minDate={this.state.nowDate} />
              </div>
                <div className="am-u-md-4 newt-item-text">
                  *必填
                </div>
              </div>

              <div className="am-g">
                  <div className="am-u-md-2 newt-item-text">
                  执行间隔
                  </div>
                  <div className="am-u-md-5">
                    <Input
                     amSize="sm"
                     value={exeInterval}
                     validation={this.validateExeInterval()}
                     hasFeedback
                     ref="exeIntervalField"
                     onChange={this.exeIntervalHandleChange} />
                 </div>
                 <div className="am-u-md-4 newt-item-text">
                   *必填，正整数，单位秒，0代表一次性任务
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
    }
  },

  componentDidUpdate(){
    if (this.state.editTimerError) {
      this.refs.modalTrigger.close();
      console.log('modal-editTimerError');
      console.log(this.state.editTimerError);
      this.refs.alertTrigger.open();
    }
  },
  submitClick(){
        const timer = {
                          Id:this.state.timer.Id,
                          Name:this.state.name ,
                          Script:this.state.script,
                          Args:this.state.args,
                          ExeTime:this.state.exeTime,
                          ExeInterval:this.state.exeInterval,
                          Description:this.state.description};
        TimerActions.editTimer(timer);
        console.log("submitClick");
  },
  renderButtonGroup() {
    const address = "/timer/" + this.props.params.id;
    if (this.state.nameValidated
      &&this.state.scriptValidated
      &&this.state.exeIntervalValidated) {
        return(
          <div className="am-margin">
            <Link to={address}>
            <Button amStyle="secondary newt-btn">放弃编辑</Button>
            </Link>
            <ModalTrigger
              ref="modalTrigger"
              modal={<Modal type="loading" title="正在提交保存..." />}>
            <Button amStyle="secondary newt-btn"
              onClick={this.submitClick}>提交保存</Button>
            </ModalTrigger>
          </div>
        );
    }else {
      return(
        <div className="am-margin">
          <Link to={address}>
          <Button amStyle="secondary newt-btn">放弃编辑</Button>
          </Link>
          <ModalTrigger
            modal={<Modal type="alert" title="错误提示">请按要求填写完整</Modal>}>
          <Button amStyle="secondary newt-btn">
            提交保存</Button>
          </ModalTrigger>
        </div>
      );
    }
  },
  alertOnConfirm(){
    TimerActions.resetEditTimerError();
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

export default EditTimer;
