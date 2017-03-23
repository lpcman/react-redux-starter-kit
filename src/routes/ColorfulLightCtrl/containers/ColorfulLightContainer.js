import { connect } from 'react-redux';
import { handlerMove, changeLight } from '../modules/colorfulLightCtrl';

import ColorfulCtrl from '../components/ColorfulCtrl';

const mapDispatchToProps = {
    handlerMove,
    changeLight
};

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function mapStateToProps (state) {
    return {
        color: state.colorfulCtrl.color,
        light: state.colorfulCtrl.light
    };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(mapStateToProps, mapDispatchToProps)(ColorfulCtrl);
