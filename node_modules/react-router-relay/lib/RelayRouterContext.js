'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classic = require('react-relay/classic');

var _classic2 = _interopRequireDefault(_classic);

var _QueryAggregator = require('./QueryAggregator');

var _QueryAggregator2 = _interopRequireDefault(_QueryAggregator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  location: _propTypes2.default.object.isRequired,
  children: _propTypes2.default.element.isRequired
};

var childContextTypes = {
  queryAggregator: _propTypes2.default.object.isRequired
};

var RelayRouterContext = function (_React$Component) {
  (0, _inherits3.default)(RelayRouterContext, _React$Component);

  function RelayRouterContext(props, context) {
    (0, _classCallCheck3.default)(this, RelayRouterContext);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props, context));

    _this.renderCallback = function (renderArgs) {
      _this.queryAggregator.setRenderArgs(renderArgs);
      return _this.props.children;
    };

    _this.queryAggregator = new _QueryAggregator2.default(props);
    return _this;
  }

  RelayRouterContext.prototype.getChildContext = function getChildContext() {
    return {
      queryAggregator: this.queryAggregator
    };
  };

  RelayRouterContext.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.location === this.props.location) {
      return;
    }

    this.queryAggregator.updateQueryConfig(nextProps);
  };

  RelayRouterContext.prototype.render = function render() {
    return _react2.default.createElement(_classic2.default.Renderer, (0, _extends3.default)({}, this.props, {
      Container: this.queryAggregator,
      render: this.renderCallback,
      queryConfig: this.queryAggregator.queryConfig
    }));
  };

  return RelayRouterContext;
}(_react2.default.Component);

RelayRouterContext.propTypes = propTypes;
RelayRouterContext.childContextTypes = childContextTypes;

exports.default = RelayRouterContext;
module.exports = exports['default'];