import 'react-rayr-dropdown/src/RayrDropdown.scss';

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {RayrDropdown, Dropdown} from 'react-rayr-dropdown';

class DropTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="dropdown-title">
                <h1>下拉框-头部内容</h1>
            </div>
        );
    }
}

class DropBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    clickMain() {
        // alert('click something!');
    }

    render() {
        return (
            <div className="dropdown-body">
                <h1 onClick={this.clickMain}>Dropdown 主体部分</h1>
                <p>主体部分|DROPDOWN</p>
            </div>
        );
    }
}

function App() {
    // 测试数据
    let list = [{
        value: 0,
        label: '香蕉'
    },{
        value: 1,
        label: '苹果'
    },{
        value: 2,
        label: '西柚'
    },{
        value: 3,
        label: '火龙果'
    }];

    let list2 = [
        {value: null, label: "全部"},
        {value: "0", label: "待提交 "},
        {value: "1", label: "工单待审核"},
        {value: "2", label: "待定损报价"},
        {value: "3", label: "费用待审核"},
        {value: "4", label: "维修中"},
        {value: "5", label: "待提交（驳回）"},
        {value: "6", label: "待定损报价（驳回）"},
        {value: "7", label: "工单完成"},
        {value: "8", label: "工单取消"}
    ];

    return (
        <div className="com-wrapper">
            <h1>Dropdown测试</h1>
            <div className="item-box" style={{width: "250px"}}>
                <RayrDropdown 
                    list={list}
                    // selected={{value:1, label: '苹果'}}
                    placeholder={'请选择'}
                    valueChange={(res)=>{
                        console.log(res);
                        document.querySelector('#result1').innerHTML = `选择结果：value: ${res.value},label: ${res.label}`;
                    }}
                />
                <div id="result1" className="item-result"></div>
            </div>

            <Dropdown
                className = {"dropdown"}
                titleEle= {<DropTitle />}
                contentEle = {<DropBody />}
            >
            </Dropdown>

            {/* <Dropdown
                className = {"dropdown"}
                titleEle= {<DropTitle />}
                contentEle = {<DropBody />}
            >
            </Dropdown> */}

            <div className="item-box" style={{width: "250px",position: "relative", top: "600px"}}>
                <RayrDropdown 
                    list={list2}
                    // selected={{value:1, label: '苹果'}}
                    placeholder={'请选择'}
                    valueChange={(res)=>{
                        console.log(res);
                        document.querySelector('#result2').innerHTML = `选择结果：value: ${res.value},label: ${res.label}`;
                    }}
                />
                <div id="result2" className="item-result"></div>
            </div>
            
        </div>
    )
}

const run = () => {
    ReactDOM.render(<App/>, document.getElementById('app'));
};

window.addEventListener('DOMContentLoaded', run);
