import React from 'react';
import {
  Icon,
} from 'amazeui-react';

const NoTimer = React.createClass({
  render() {
    return (
      <div className="adm-msg-default">
        <Icon icon="frown-o" className="notimer-icon"/>
        <div>
          未选取定时任务
        </div>
      </div>
    );
  }
});

export default NoTimer;
