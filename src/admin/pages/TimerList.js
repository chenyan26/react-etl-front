import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {
  Link,
} from 'react-router';
import {
  Grid,
  Col,
  List,
  ListItem,
  Icon,
  Badge,
  Button,
  Modal,
  ModalTrigger
} from 'amazeui-react';

import PageContainer from '../components/PageContainer';
import MessageBar from '../components/MessageBar';

import TimerActions from '../actions/timerActions';
import TimerStore from '../stores/timerStore';
import StateMixin from 'reflux-state-mixin';

const TimerList = React.createClass({
    mixins:[
        StateMixin.connect(TimerStore,'timers'),
        StateMixin.connect(TimerStore,'shouldRefreshTimers'),

        StateMixin.connect(TimerStore,'getTimersDone'),
        StateMixin.connect(TimerStore,'getTimersError'),

        StateMixin.connect(TimerStore, 'deleteTimerError'),
        ],

    componentWillMount() {
        TimerActions.getAllTimers();
    },

    componentWillReceiveProps(nextProps) {
      // console.log(nextProps.params.id);
      if (this.state.shouldRefreshTimers) {
        TimerActions.getAllTimers();
        TimerActions.resetShouldRefreshTimers();
      }
    },

    componentDidUpdate(){
      if (this.state.deleteTimerError) {
        console.log('modal-ddeleteTimerError');
        console.log(this.state.deleteTimerError);
        this.refs.alertTrigger.open();
      }
    },

    refreshClicked(){
      if(this.state.getTimersDone){
          console.log("refresh Triggers");
          TimerActions.getAllTimers();
      }
    },

    newTimerClicked(){
      window.location.assign("/admin/#/timer/new");
    },

//-----------------modal-callback
    onConfirm(e) {
      console.log('Confirmed...deleteTimer'+this.props.params.id);
      TimerActions.deleteTimer(this.props.params.id);
    },

    onCancel() {
      console.log('Canceled...deleteTimer');
    },

    renderTimerList() {
    	const { getTimersDone, getTimersError, timers } = this.state;
    	if(timers){
    	    return (
      <List className="adm-msg-list">
    		    {timers.map((timer, index) => {
    			const {Id,Name} = timer;
    			return(
        <ListItem
           key={`timer-${Id}`}
           linkComponent={Link}
           linkProps={{
           to: `/timer/${Id}`,
           activeClassName: "active"
           }}
           >
          <div className="adm-msg-list-main am-text-truncate">
    	<em>{Id}-</em>{Name}
          </div>
          <Icon icon="chevron-right" className="adm-msg-icon"/>
        </ListItem>
    			)
    		    })}
      </List>
    	    );
    	}else if(!getTimersDone){
    	    return(
      <div className="adm-msg-loading">
        <Icon spin icon="spinner" />
      </div>
    	    );
    	}else return(
      <Badge amStyle="warning">{getTimersError}</Badge>
    	);
    },

    alertOnConfirm(){
      TimerActions.resetDeleteTimerError();
    },
    renderAlert(){
      return(
        <ModalTrigger
          ref="alertTrigger"
          onConfirm={this.alertOnConfirm}
          modal={<Modal type="alert" title="错误提示">删除失败，请重试</Modal>}>
        <div ></div>
        </ModalTrigger>
      );
    },

    renderRightMessageBar(){
      if (this.props.routes[2].path) {
        if (this.props.routes[2].path == "new") {
          return(
          <MessageBar>
          新建定时任务
          </MessageBar>
          );
        }else if (this.props.routes[2].path == "edit/:id") {
          return(
          <MessageBar>
          编辑定时任务
          </MessageBar>
          );
        }else if (this.props.routes[2].path == ":id") {
          return(
            <MessageBar>
              任务详情及执行情况
             <ModalTrigger
                modal={<Modal type="confirm"
                              title="警告">确定要删除这条定时任务吗？</Modal>}
                onCancel={this.onCancel}
                onConfirm={this.onConfirm}>
              <Button className="am-btn am-btn-danger new-mgb-btn">
                <Icon icon="trash" /> 删除
              </Button>
             </ModalTrigger>
              <Link to={`/timer/edit/${this.props.params.id}`}>
              <Button className="am-btn am-btn-secondary new-mgb-btn">
                <Icon icon="edit" /> 编辑
              </Button></Link>
          </MessageBar>
        );
        }
      }else {
        return(
           <MessageBar>
          任务详情及执行情况
          </MessageBar>
        );
      }
     },

    render() {
    	return (
      <PageContainer
         breadcrumb="定时任务"
         {...this.props}
         >
        <Grid collapse>
          <Col sm={12} md={4} className={`adm-msg-col`}>
          <MessageBar>
    	定时任务列表
    	<span className="adm-msgbar-btn"
    	      onClick={this.refreshClicked}>
    	  <Icon spin={!this.state.getTimersDone}
    	  		icon="refresh"/>  刷新</span>
    	  <Link to="/timer/new">
    	  <Button className="am-btn am-btn-secondary adm-msgbar-plus"
    	  		  onClick={this.newTimerClicked}>
      		<Icon icon="plus" />    新建
    	  </Button></Link>
          </MessageBar>
             {this.renderTimerList()}
          </Col>
          <Col sm={12} md={8} className="adm-msg-detail">
          {this.renderRightMessageBar()}
          {this.props.children}
          </Col>
        </Grid>
        {this.renderAlert()}
      </PageContainer>
    	);
    },
});

export default TimerList;
