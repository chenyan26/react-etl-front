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

import TriggerActions from '../actions/triggerActions';
import TriggerStore from '../stores/triggerStore';
import StateMixin from 'reflux-state-mixin';

const TriggerList = React.createClass({
  mixins:[
    StateMixin.connect(TriggerStore,'triggers'),
    StateMixin.connect(TriggerStore,'shouldRefreshTriggers'),

    StateMixin.connect(TriggerStore,'getTriggersDone'),
    StateMixin.connect(TriggerStore,'getTriggersError'),

    StateMixin.connect(TriggerStore, 'deleteTriggerError'),
  ],

  componentWillMount() {
      TriggerActions.getAllTriggers();
  },

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.params.id);
    if (this.state.shouldRefreshTriggers) {
      TriggerActions.getAllTriggers();
      TriggerActions.resetShouldRefreshTriggers();
    }
  },

  componentDidUpdate(){
    if (this.state.deleteTriggerError) {
      console.log('modal-deleteTriggerError');
      console.log(this.state.deleteTriggerError);
      this.refs.alertTrigger.open();
    }
  },

  refreshClicked(){
    if(this.state.getTriggersDone){
        console.log("refresh Triggers");
        TriggerActions.getAllTriggers();
    }
  },

  newTriggerClicked(){
    window.location.assign("/admin/#/trigger/new");
  },

  //-----------------modal-callback
      onConfirm(e) {
        console.log('Confirmed...deleteTrigger'+this.props.params.id);
        TriggerActions.deleteTrigger(this.props.params.id);
      },

      onCancel() {
        console.log('Canceled...deleteTrigger');
      },

  renderTriggerList() {
    const { getTriggersDone, getTriggersError, triggers } = this.state;
    if(triggers){
        return (
    <List className="adm-msg-list">
          {triggers.map((trigger, index) => {
        const {Id,Name} = trigger;
        return(
      <ListItem
         key={`trigger-${Id}`}
         linkComponent={Link}
         linkProps={{
         to: `/trigger/${Id}`,
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
    }else if(!getTriggersDone){
        return(
    <div className="adm-msg-loading">
      <Icon spin icon="spinner" />
    </div>
        );
    }else return(
    <Badge amStyle="warning">{getTriggersError}</Badge>
    );
  },

  alertOnConfirm(){
    TriggerActions.resetDeleteTriggerError();
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
        新建触发任务
        </MessageBar>
        );
      }else if (this.props.routes[2].path == "edit/:id") {
        return(
        <MessageBar>
        编辑触发任务
        </MessageBar>
        );
      }else if (this.props.routes[2].path == ":id") {
        return(
          <MessageBar>
            任务详情及执行情况
           <ModalTrigger
              modal={<Modal type="confirm"
                            title="警告">确定要删除这条触发任务吗？</Modal>}
              onCancel={this.onCancel}
              onConfirm={this.onConfirm}>
            <Button className="am-btn am-btn-danger new-mgb-btn">
              <Icon icon="trash" /> 删除
            </Button>
           </ModalTrigger>
            <Link to={`/trigger/edit/${this.props.params.id}`}>
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
       breadcrumb="触发任务"
       {...this.props}
       >
      <Grid collapse>
        <Col sm={12} md={4} className={`adm-msg-col`}>
        <MessageBar>
    触发任务列表
    <span className="adm-msgbar-btn"
          onClick={this.refreshClicked}>
      <Icon spin={!this.state.getTriggersDone}
          icon="refresh"/>  刷新</span>
        <Link to="/trigger/new">
      <Button className="am-btn am-btn-secondary adm-msgbar-plus"
            onClick={this.newTriggerClicked}>
        <Icon icon="plus" />    新建
      </Button></Link>
        </MessageBar>
           {this.renderTriggerList()}
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

export default TriggerList;
