'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RayrDropdown = function (_React$Component) {
    _inherits(RayrDropdown, _React$Component);

    function RayrDropdown(props) {
        _classCallCheck(this, RayrDropdown);

        var _this = _possibleConstructorReturn(this, (RayrDropdown.__proto__ || Object.getPrototypeOf(RayrDropdown)).call(this, props));

        var propsData = props;
        _this.maxHeight = 200;
        _this.state = {
            comName: 'RayrDropdown',
            propsData: propsData,
            selected: _this.props.selected || {},
            list: _this.props.list || [],
            selectFocus: false,
            winH: window.innerHeight,
            winW: window.innerWidth,
            showTop: false
        };
        return _this;
    }

    _createClass(RayrDropdown, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.props.model) {
                this.fetchData();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                value: nextProps.value,
                selected: nextProps.selected || {}
            });
        }
    }, {
        key: 'setSelectPos',
        value: function setSelectPos() {
            var dSelectBox = this.refs.d_selectBox;
            var rect = dSelectBox.getBoundingClientRect();
            var wHeight = this.state.winH;
            var bottom = rect.bottom;
            var optLen = this.state.list.length;
            var height = optLen * 34 + 5 > this.maxHeight ? 200 : optLen * 34 + 5;
            if (wHeight - bottom < height) {
                this.setState({
                    showTop: true
                });
            }
        }
    }, {
        key: 'selectChange',
        value: function selectChange(e) {
            this.setState({
                value: e.value
            });
            this.props.valueChange();
        }
    }, {
        key: 'showSelectList',
        value: function showSelectList() {
            this.setSelectPos();
            this.setState({
                selectFocus: true
            });
        }
    }, {
        key: 'hideSelectList',
        value: function hideSelectList() {
            this.setState({
                selectFocus: false
            });
        }
    }, {
        key: 'clickSelect',
        value: function clickSelect() {
            var old = this.state.selectFocus;
            if (old === true) {
                this.hideSelectList();
            } else {
                this.showSelectList();
            }
        }

        // 点击选项

    }, {
        key: 'optClick',
        value: function optClick(opt) {
            this.props.valueChange(opt);
            this.setState({
                selected: opt
            });
            this.hideSelectList();
        }

        // 获取数据的方法

    }, {
        key: 'fetchData',
        value: function fetchData() {
            var _this2 = this;

            var url = 'dictionaries';
            $_ajax.get(url, { subject: this.props.model, all: 1 }).then(function (res) {
                console.log(res.data);
                var rawList = res.data;
                var list = [];
                rawList.map(function (item, index) {
                    list.push({
                        value: item.id,
                        label: item.name
                    });
                });
                _this2.setState({
                    list: list
                });
            }).catch(function (e) {
                console.log(e);
                $_notify(e);
            }).finally(function () {
                console.log('finally');
            });
        }

        // 选择框

    }, {
        key: 'selectBox',
        value: function selectBox() {
            return _react2.default.createElement(
                'div',
                { className: 'select-box', ref: "d_selectBox" },
                _react2.default.createElement('input', {
                    readOnly: 'readonly',
                    className: 'select-box-ip',
                    ref: 'dDropInput',
                    placeholder: this.props.placeholder || '请选择',
                    value: this.state.selected.label || '',
                    type: 'text',
                    onClick: this.clickSelect.bind(this),
                    onChange: this.selectChange.bind(this)
                })
            );
        }

        // 选择项

    }, {
        key: 'selectOpts',
        value: function selectOpts(optList) {
            var _this3 = this;

            return _react2.default.createElement(
                'ul',
                { className: 'select-opts' },
                optList.map(function (item, index) {
                    var selectedCls = _this3.state.selected.label === item.label ? 'selected' : '';
                    return _react2.default.createElement(
                        'li',
                        { className: 'select-item ' + selectedCls, key: 'selectItem' + index, value: item.value,
                            label: item.label,
                            onClick: _this3.optClick.bind(_this3, item)
                        },
                        item.label
                    );
                })
            );
        }

        // static propTypes = {
        //     type: PropTypes.oneOf(['info', 'success', 'warning', 'error'])
        // };

        // static defaultProps = {
        //     type: 'info'
        // };

    }, {
        key: 'render',
        value: function render() {
            var isOpen = this.state.selectFocus;
            var cls = isOpen ? 'show' : 'hide';
            var optPos = this.state.showTop ? 'top' : 'bottom';
            return _react2.default.createElement(
                'div',
                { ref: this.state.comId, className: 'd-drop-box' },
                this.selectBox(),
                _react2.default.createElement(
                    'div',
                    { className: 'opts-list ' + cls, pos: optPos },
                    this.selectOpts(this.state.list)
                )
            );
        }
    }]);

    return RayrDropdown;
}(_react2.default.Component);

exports.default = RayrDropdown;
module.exports = exports['default'];