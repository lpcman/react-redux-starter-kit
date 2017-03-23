import { connect } from 'react-redux';
import { statusChange, setState } from '../modules/socketPanel';

import Panel from '../components/Panel';

const mapDispatchToProps = {
    statusChange,
    setState
};

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function mapStateToProps (state) {
    return {
        status: state.socketPanel.status,
        power: state.socketPanel.power
    };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(mapStateToProps, mapDispatchToProps)(Panel);
