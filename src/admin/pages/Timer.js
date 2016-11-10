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

import TimerStore from '../stores/timerStore';
import TimerActions from '../actions/timerActions';
import StateMixin from 'reflux-state-mixin';

import ExeStore from '../stores/exeStore';
import ExeActions from '../actions/exeActions';

const Timer = React.createClass({
	mixins:[
        StateMixin.connect(TimerStore, 'timer'),
        StateMixin.connect(TimerStore, 'getTimerError'),
        StateMixin.connect(TimerStore, 'getTimerDone'),

        StateMixin.connect(ExeStore, 'exes'),
        StateMixin.connect(ExeStore, 'getExesDone'),
        StateMixin.connect(ExeStore, 'getExesError')
        ],

        componentWillMount() {
            TimerActions.getTimer(this.props.params.id);
            ExeActions.getExes(this.props.params.id,"0");
        },

        componentWillReceiveProps(nextProps) {
            console.log(nextProps.params.id);
            TimerActions.getTimer(nextProps.params.id);
            ExeActions.getExes(nextProps.params.id,"0");
        },

        retryGetExesClicked(){
          ExeActions.resetGetExesErrorAndDone();
          ExeActions.getExes(this.props.params.id,"0");
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
                          {this.state.exes.map((timerExe, index) => {
                            return(
                              this.renderList(timerExe)
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
        }
          else {
            return (
            <div className="adm-msg-loading">
              正在加载执行日志<Icon spin icon="spinner" />
            </div>
            );
          }
        },

        renderList(timerExe){
          const {Id,ExeTime,ExitValue,Status,Retry} = timerExe;

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
            <ListItem key={`timerexe-${Id}`}>
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

    retryGetTimerClicked(){
      TimerActions.resetGetTimerErrorAndDone();
      TimerActions.getTimer(this.props.params.id);
    },

    renderDetail() {
      if (this.state.timer) {
        const {
      Id,
      Name,
      Script,
      Args,
      ExeTime,
      ExeInterval,
      Description,
      Status
    } = this.state.timer;
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
                  执行时间:
                  </div>
                  <div className="am-u-sm-8 am-u-md-8">
                    {ExeTime}
                  </div>
                </div>
                <div className="am-g timer-item">
                  <div className="am-u-sm-4 am-u-md-3 am-text-right">
                  执行间隔:
                  </div>
                  <div className="am-u-sm-8 am-u-md-8">
                    {ExeInterval}
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
      }else if (!this.state.getTimerDone) {
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
                onClick={this.retryGetTimerClicked}>重 试</Button>
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

export default Timer;
