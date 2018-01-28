import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {inject, observer} from 'mobx-react';
import DropdownStore from './Store.js';

@observer
class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.propsData = props;
        this.state = {
            winH: window.innerHeight,
            winW: window.innerWidth,
            showTop: false,
            isContentShow: false,
            clickTimes: DropdownStore.clickTimes,
            dropDownId: +new Date()
        };
        console.log(DropdownStore);
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        console.log('props change!');
    }

    setPosition() {
        let title = this.refs.dropTitle;
        let content = this.refs.dropContent;
        let contRect = content.getBoundingClientRect();
        // console.log(contRect);
    }

    closeAllMask() {
        let maskList = document.querySelectorAll('.dropdown-mask');
        let dropBodyList = document.querySelectorAll('.dropdown-content-box');
        let thisMask = this.refs[`dMask_${this.state.dropDownId}`];
        let thisBody = this.refs[`dBody_${this.state.dropDownId}`];
        console.log(thisMask);
        console.log(thisBody);
        maskList.forEach((item)=>{
            item.className = item.className.replace('show', 'hide');
        });
        dropBodyList.forEach((item)=>{
            item.className = item.className.replace('show', 'hide');
        });
        console.log(maskList);
    }

    clickTitle() {
        // console.log('click');
        this.closeAllMask();
        console.log('click title');
        // 关闭所有的
        this.setPosition();
        console.log(!this.state.isContentShow);
        this.setState({
            isContentShow: !this.state.isContentShow
        });
    }

    clickMask() {
        console.log('mask click');
        this.setState({
            isContentShow: false
        });
    }

    clickBody() {
        DropdownStore.changeFoldStatus();
        DropdownStore.addClick();
        console.log(DropdownStore.clickTimes);
    }

    dropdownClick(e) {
        console.log(e.target);
        console.log(e.currentTarget);
    }

    render() {
        console.log('!!!!!');
        console.log(this.state.clickTimes);
        console.log('!!!!!');


        const dropTitle = this.props.titleEle ? this.props.titleEle : '';
        const dropContent = this.props.contentEle ? this.props.contentEle : '';
        let contentCls = this.state.isContentShow ? 'show' : 'hide';
        let maskCls = this.state.isContentShow ? 'show' : 'hide';
        console.log('render-----');
        console.log(DropdownStore.clickTimes);

        return (
            <div className="react-rayr-dropdown" onClick={this.dropdownClick.bind(this)} store={DropdownStore}>
                <div className="dropdown-title-box" ref={"dropTitle"} onClick={this.clickTitle.bind(this)}>
                    {dropTitle}
                </div>
                <div ref={`dBody_${this.state.dropDownId}`} className={`dropdown-content-box ${contentCls}`} ref={"dropContent"}  onClick={this.clickBody.bind(this)}>
                    {dropContent}
                </div>
                <div ref={`dMask_${this.state.dropDownId}`} className={`dropdown-mask ${maskCls}`} onClick={this.clickMask.bind(this)}></div>
            </div>
        );
    }
}

export default Dropdown;