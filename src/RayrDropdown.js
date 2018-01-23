import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import $_ajax from 'ajax.js';

class RayrDropdown extends React.Component {
    constructor(props){
        super(props);
        let propsData = props;
        this.maxHeight = 200;
        this.state = {
            comName: 'RayrDropdown',
            propsData: propsData,
            selected: this.props.selected || {},
            list: this.props.list || [],
            selectFocus: false,
            winH: window.innerHeight,
            winW: window.innerWidth,
            showTop: false
        };
    }

    componentWillMount() {
        if(this.props.model){
            this.fetchData();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value,
            selected: nextProps.selected || {}
        });
    }

    setSelectPos() {
        let dSelectBox = this.refs.d_selectBox;
        let rect = dSelectBox.getBoundingClientRect();
        let wHeight = this.state.winH;
        let bottom = rect.bottom;
        let optLen = this.state.list.length;
        let height = (optLen * 34 + 5) > this.maxHeight ? 200 : (optLen * 34 + 5);
        if((wHeight - bottom) < height){
            this.setState({
                showTop: true
            });
        }
    }

    selectChange(e) {
        this.setState({
            value: e.value
        });
        this.props.valueChange();
    }

    showSelectList() {
        this.setSelectPos();
        this.setState({
            selectFocus: true
        });
    }

    hideSelectList() {
        this.setState({
            selectFocus: false
        });
    }

    clickSelect() {
        let old = this.state.selectFocus;
        if(old === true){
            this.hideSelectList();
        }else{
            this.showSelectList();
        }
    }

    // 点击选项
    optClick(opt) {
        this.props.valueChange(opt);
        this.setState({
            selected: opt
        });
        this.hideSelectList();
    }

    // 获取数据的方法
    fetchData() {
        let url = 'dictionaries';
        $_ajax.get(url, {subject: this.props.model , all: 1}).then((res)=>{
            console.log(res.data);
            let rawList = res.data;
            let list = [];
            rawList.map((item, index)=>{
                list.push({
                    value: item.id,
                    label: item.name
                });
            });
            this.setState({
                list: list
            });

        }).catch((e)=>{
            console.log(e);
            $_notify(e);
        }).finally(()=>{
            console.log('finally');
        });
    }

    // 选择框
    selectBox() {
        return (
            <div className="select-box" ref={"d_selectBox"}>
                <input
                    readOnly="readonly"
                    className="select-box-ip"
                    ref="dDropInput"
                    placeholder={this.props.placeholder || '请选择'}
                    value={this.state.selected.label || ''}
                    type="text"
                    onClick={this.clickSelect.bind(this)}
                    onChange={this.selectChange.bind(this)}
                />
            </div>
        );
    }

    // 选择项
    selectOpts(optList) {
        return (
            <ul className={`select-opts`}>
                {
                    optList.map((item, index)=>{
                        let selectedCls = this.state.selected.label === item.label ? 'selected' : '';
                        return (
                            <li className={`select-item ${selectedCls}`} key={'selectItem'+index} value={item.value}
                                label={item.label}
                                onClick={this.optClick.bind(this, item)}
                            >{item.label}</li>
                        )
                    })
                }
            </ul>
        );
    }


    // static propTypes = {
    //     type: PropTypes.oneOf(['info', 'success', 'warning', 'error'])
    // };

    // static defaultProps = {
    //     type: 'info'
    // };

    render() {
        let isOpen = this.state.selectFocus;
        let cls = isOpen ? 'show' : 'hide';
        let optPos = this.state.showTop ? 'top' : 'bottom';
        return (
            <div ref={this.state.comId} className="d-drop-box">
                {this.selectBox()}
                <div className={`opts-list ${cls}`} pos={optPos}>
                    {this.selectOpts(this.state.list)}
                </div>
            </div>
        );
    }
}

export default RayrDropdown;
