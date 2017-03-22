import { connect } from 'react-redux';
import { changeLight, uploadData } from '../modules/whiteLightCtrl';

import WhiteCtrl from '../components/WhiteCtrl';

const mapDispatchToProps = {
    changeLight,
    uploadData
};

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function mapStateToProps (state) {
    return {
        color: state.whiteCtrl.color,
        light: state.whiteCtrl.light
    };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(mapStateToProps, mapDispatchToProps)(WhiteCtrl);
