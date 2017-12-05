import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay/classic';

import QueryAggregator from './QueryAggregator';

var propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

var childContextTypes = {
  queryAggregator: PropTypes.object.isRequired
};

var RelayRouterContext = function (_React$Component) {
  _inherits(RelayRouterContext, _React$Component);

  function RelayRouterContext(props, context) {
    _classCallCheck(this, RelayRouterContext);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.renderCallback = function (renderArgs) {
      _this.queryAggregator.setRenderArgs(renderArgs);
      return _this.props.children;
    };

    _this.queryAggregator = new QueryAggregator(props);
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
    return React.createElement(Relay.Renderer, _extends({}, this.props, {
      Container: this.queryAggregator,
      render: this.renderCallback,
      queryConfig: this.queryAggregator.queryConfig
    }));
  };

  return RelayRouterContext;
}(React.Component);

RelayRouterContext.propTypes = propTypes;
RelayRouterContext.childContextTypes = childContextTypes;

export default RelayRouterContext;