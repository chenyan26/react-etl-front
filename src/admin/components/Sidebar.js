import React from 'react';
import Reflux from 'reflux';
import {
  Link,
} from 'react-router';
import {
  List,
  ListItem,
  Icon,
} from 'amazeui-react';

const navs = [
    {
	id: 'home',
	title: '首页',
	icon: 'home'
    },
    {
	id: 'timer',
	title: '定时任务',
	icon: 'clock-o'
    },
    {
	id: 'trigger',
	title: '触发任务',
	icon: 'bolt'
    },
    {
	id: 'about',
	title: '系统信息',
	icon: 'info'
    }
];

const Siderbar = React.createClass({
    propTypes: {
	active: React.PropTypes.bool,
    },

    getInitialState() {
	return {
	    dataSource: []
	};
    },

    renderItems() {
    	return navs.map((nav, i) => {
    	    const {
    		id,
    		icon,
    		title,
                } = nav;

    	    return (
    <ListItem key={`nav-${i}`}>
      <Link activeClassName="active"
         to={`/${id}`}
         query={{breadcrumb: title}}>
      <Icon icon={icon} />
      {` ${title}`}
      </Link>
    </ListItem>
    	    );
    	});
    },

    render() {
	const active = this.props.active ? 'active' : '';

	return (
      <div
        className={`adm-sidebar ${active}`}
      >
        <List>
          {this.renderItems()}
        </List>
      </div>
	);
    }
});

export default Siderbar;
