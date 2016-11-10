import React from 'react';
import {
  Icon,
} from 'amazeui-react';

const NoTrigger = React.createClass({
  render() {
    return (
      <div className="adm-msg-default">
        <Icon icon="frown-o" className="notimer-icon"/>
        <div>
          未选取触发任务
        </div>
      </div>
    );
  }
});

export default NoTrigger;
