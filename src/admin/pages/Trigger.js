import React from 'react';
import ReactMixin from 'react-mixin';
import {
  Link,
} from 'react-router';
import {
    Icon,
    Panel,
    PanelGroup,
    Button,
    List,
    ListItem,
    Badge
} from 'amazeui-react';

import TriggerStore from '../stores/triggerStore';
import TriggerActions from '../actions/triggerActions';
import StateMixin from 'reflux-state-mixin';

import ExeStore from '../stores/exeStore';
import ExeActions from '../actions/exeActions';

const Trigger = React.createClass({
	mixins:[
        StateMixin.connect(TriggerStore, 'triggerO'),
        StateMixin.connect(TriggerStore, 'getTriggerError'),
        StateMixin.connect(TriggerStore, 'getTriggerDone'),

        StateMixin.connect(ExeStore, 'exes'),
        StateMixin.connect(ExeStore, 'getExesDone'),
        StateMixin.connect(ExeStore, 'getExesError')
        ],

        componentWillMount() {
            TriggerActions.getTrigger(this.props.params.id);
            ExeActions.getExes(this.props.params.id,"1");
        },

        componentWillReceiveProps(nextProps) {
            console.log(nextProps.params.id);
            TriggerActions.getTrigger(nextProps.params.id);
            ExeActions.getExes(nextProps.params.id,"1");
        },

        retryGetExesClicked(){
          ExeActions.resetGetExesErrorAndDone();
          ExeActions.getExes(this.props.params.id,"1");
        },

  renderExe() {
    if (this.state.getExesDone) {
      if (this.state.getExesError) {
        return (
          <div className="adm-msg-default timer-logError">
            <Icon icon="frown-o" className="notimer-icon"/>
            <div>
              执行日志加载失败
              <Button amStyle="warning"  amSize="sm"
                className="timer-retry-button"
                onClick={this.retryGetExesClicked}>重 试</Button>
            </div>
          </div>
        );
      }else {
      if (this.state.exes.length) {
        return (
          <div>
            <div className="am-g timer-item">
              <List static border striped >
                    {this.state.exes.map((triggerExe, index) => {
                      return(
                        this.renderList(triggerExe)
                      );
                    })}
              </List>
            </div>
          </div>
        );
      }else {
        return (
          <div className="adm-msg-default timer-logError">
            <Icon icon="meh-o" className="notimer-icon"/>
            <div>
              暂无执行日志
            </div>
          </div>
        );
      }
    }
  } else {
    return (
    <div className="adm-msg-loading">
      正在加载执行日志<Icon spin icon="spinner" />
    </div>
    );
  }
  },

  renderList(triggerExe){
    const {Id,ExeTime,ExitValue,Status,Retry} = triggerExe;

    let statusValue = "";
    let btnStyle = "";

    switch (Status) {
      case 0:
        statusValue = "待执行";
        btnStyle = "secondary";
        break;
      case 1:
        statusValue = "执行中";
        btnStyle = "warning";
        break;
      case 2:
        statusValue = "已完成";
        btnStyle = "success";
        break;
      case 3:
        statusValue = "已放弃";
        btnStyle = "danger";
        break;
      default:
    }
    return(
      <ListItem key={`triggerexe-${Id}`}>
        <div className="am-g">
          <div className="am-u-md-3">
            {this.renderItemButton(Id,Status,btnStyle,statusValue)}
          </div>
          <div className="am-u-md-1"></div>
          <div className="am-u-md-6">
            <div className="am-g">
              <div className="am-u-md-4">执行时间:</div>
              <div className="am-u-md-8">{ExeTime}</div>
              </div>
            <div className="am-g">
              <div className="am-u-md-4">重复次数:</div>
              <div className="am-u-md-8">{Retry}</div>
            </div>
          </div>
          <div className="am-u-md-1">{this.renderBadge(Status,ExitValue)}</div>
        </div>
      </ListItem>
    );
  },
  renderItemButton(Id,Status,btnStyle,statusValue){
    if (Status == 2) { //已完成
      return(
        <Link to= {`/log/${Id}`}>
          <Button amStyle={btnStyle} className="exe-list-button">
            {statusValue} </Button>
       </Link>
      );
    }else {
      return(
        <Button amStyle={btnStyle} className="exe-list-button" disabled>
          {statusValue}</Button>
      );
    }
  },
  renderBadge(Status,ExitValue){
    if (Status == 2) {
      let badgeStyle = "success";
      let exitValue = "成功";
      if (ExitValue != 0) {
        badgeStyle = "danger";
        exitValue = "失败";
      }
      return (
        <Badge amStyle={badgeStyle} className="am-text-default">{exitValue}</Badge>
      );
    }
  },
  retryGetTriggerClicked(){
    TriggerActions.resetGetTriggerErrorAndDone();
    TriggerActions.getTrigger(this.props.params.id);
  },

  renderDetail() {
    if (this.state.triggerO) {
      const {
              Id,
              Name,
              Script,
              Url,
              Args,
              Description,
              Status} = this.state.triggerO;
      return (
        <div className="timer-container" >
          <PanelGroup>
          <Panel header="任务详情">
              <div className="am-g timer-item">
                <div className="am-u-sm-4 am-u-md-3 am-text-right">
                任务名称:
                </div>
                <div className="am-u-sm-8 am-u-md-8">
                  {Name}
                </div>
              </div>
              <div className="am-g timer-item">
                <div className="am-u-sm-4 am-u-md-3 am-text-right">
                执行脚本文件名:
                </div>
                <div className="am-u-sm-8 am-u-md-8">
                  {Script}
                </div>
              </div>
              <div className="am-g timer-item">
                <div className="am-u-sm-4 am-u-md-3 am-text-right">
                执行参数:
                </div>
                <div className="am-u-sm-8 am-u-md-8">
                  {Args}
                </div>
              </div>
              <div className="am-g timer-item">
                <div className="am-u-sm-4 am-u-md-3 am-text-right">
                触发地址:
                </div>
                <div className="am-u-sm-8 am-u-md-8">
                  {Url}
                </div>
              </div>
              <div className="am-g timer-item">
                <div className="am-u-sm-4 am-u-md-3 am-text-right">
                任务描述:
                </div>
                <div className="am-u-sm-8 am-u-md-8">
                  {Description}
                </div>
              </div>
            </Panel>
            <Panel header="执行情况">
                {this.renderExe()}
            </Panel>
          </PanelGroup>
        </div>
      );
    }else if (!this.state.getTriggerDone) {
      return (
        <div className="adm-msg-loading">
          正在加载数据，ID：{this.props.params.id}<Icon spin icon="spinner" />
        </div>
      );
    }else {
      return (
        <div className="adm-msg-default timer-logError">
          <Icon icon="frown-o" className="notimer-icon"/>
          <div>
            任务详情加载失败
            <Button amStyle="warning"  amSize="sm"
              className="timer-retry-button"
              onClick={this.retryGetTriggerClicked}>重 试</Button>
          </div>
        </div>
      );
    }
  },

  render() {
    return (
		<div className="adm-msg-body">
		  <div className="adm-msg-content">
		    {this.renderDetail()}
		  </div>
		</div>
    );
  }
});

export default Trigger;
