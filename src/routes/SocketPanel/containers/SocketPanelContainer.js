import { connect } from 'react-redux';
import { statusChange } from '../modules/socketPanel';

import Panel from '../components/Panel';

const mapDispatchToProps = {
    statusChange
};

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function mapStateToProps (state) {
    return {
        status: state.socketPanel.status
    };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(mapStateToProps, mapDispatchToProps)(Panel);
