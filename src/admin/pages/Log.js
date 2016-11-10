import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {
  Link,
} from 'react-router';
import {
  List,
  ListItem,
  Icon,
  Button,
  Badge
} from 'amazeui-react';

import PageContainer from '../components/PageContainer';
import MessageBar from '../components/MessageBar';

import LogActions from '../actions/logActions';
import LogStore from '../stores/logStore';
import StateMixin from 'reflux-state-mixin';

const Log = React.createClass({
    mixins:[
        StateMixin.connect(LogStore,'logs'),

        StateMixin.connect(LogStore,'getLogsDone'),
        StateMixin.connect(LogStore,'getLogsError'),
        ],

    componentWillMount() {
        LogActions.getLogs(this.props.params.id);
    },

    renderList(){
      if (this.state.getLogsDone) {
        if (this.state.getLogsError) { //加载失败,请重试
          return (
            <div className="log-msg-default">
              <Icon icon="frown-o" className="notimer-icon"/>
              <div>
                执行日志加载失败
              </div>
            </div>
          );
        }else if(this.state.logs.length){ //显示List
          return(
            <List static border striped >
                  {this.state.logs.map((logObj, index) => {
                    const {Id, Timestamp, Type, Log} = logObj;
                    return(
                      <ListItem key={`log-${Id}`}>
                        <div className="am-g">
                          <div className="am-u-md-2 am-text-center">日志时间:</div>
                          <div className="am-u-md-9">{Timestamp}</div>
                          <div className="am-u-md-1">{this.renderBadge(Type)}</div>
                        </div>
                        <div className="am-g">
                          <div className="am-u-md-2 am-text-center">执行日志:</div>
                          <div className="am-u-md-9">{Log}</div>
                          <div className="am-u-md-1"> </div>
                        </div>
                      </ListItem>
                    );
                  })}
            </List>
          );
        }else {
          return (
            <div className="log-msg-default">
              <Icon icon="meh-o" className="notimer-icon"/>
              <div>
                暂无执行日志
              </div>
            </div>
          );
        }
      }else {//正在加载
        return (
        <div className="adm-msg-loading">
          正在加载执行日志<Icon spin icon="spinner" />
        </div>
        );
      }
    },
    renderBadge(type){
      if (type) { //error
        return(
          <Badge amStyle="danger">错误信息</Badge>
        );
      }else {
        return(
          <Badge amStyle="success">输出信息</Badge>
        );
      }
    },
    refreshClicked(){
      if(this.state.getLogsDone){
          console.log("refresh logs");
          LogActions.getLogs(this.props.params.id);
      }
    },
    render() {
    	return (
      <PageContainer
         breadcrumb="执行日志"
         {...this.props}
         >
          <MessageBar>
            <div className="am-g">
              <div className="am-u-md-6 am-text-right">
                执行日志列表
              </div>
              <div className="am-u-md-4">
                <Button className="adm-msgbar-btn" amStyle="secondary"
              	      onClick={this.refreshClicked}>
              	  <Icon spin={!this.state.getLogsDone}
              	  		icon="refresh"/>  刷新</Button>
             </div>
            </div>
          </MessageBar>
          {this.renderList()}
      </PageContainer>
    	);
    },
});

export default Log;
