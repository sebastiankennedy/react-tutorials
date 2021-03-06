import React, {Component} from 'react';
import './index.less';
import MenuConfig from './../../config/menuConfig';
import {Menu, Icon} from 'antd';
import logo from './../../resources/image/antd.svg';
import {NavLink} from "react-router-dom";

const {SubMenu} = Menu;

class LeftSidebar extends Component {
    state = {
        menuNodes: null,
        collapsed: false
    };

    generateMenuNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu
                        key={item.key}
                        title=
                            {
                                <span>
                                    <Icon type={item.icon}/>
                                    <span>{item.title}</span>
                                </span>
                            }
                    >
                        {this.generateMenuNodes(item.children)}
                    </SubMenu>
                )
            }

            if (item.icon) {
                return (
                        <Menu.Item key={item.key}>
                            <NavLink to={item.key}>
                                <Icon type={item.icon}/>
                                <span>{item.title}</span>
                            </NavLink>
                        </Menu.Item>
                )
            }

            return (
                    <Menu.Item key={item.key}>
                        <NavLink to={item.key}>
                            <span>{item.title}</span>
                        </NavLink>
                    </Menu.Item>
            )
        })
    }

    componentWillMount() {
        const menuNodes = this.generateMenuNodes(MenuConfig);
        this.setState({menuNodes})
    }

    render() {
        return (
            <div className="left-sidebar">
                <div className="left-sidebar-logo">
                    <a href="">
                        <img src={logo} alt="antd"/>
                        <h1>Ant Design Pro</h1>
                    </a>
                </div>
                <Menu
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    {this.state.menuNodes}
                </Menu>
            </div>
        );
    }
}

export default LeftSidebar;