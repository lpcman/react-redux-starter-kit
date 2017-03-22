import { injectReducer } from '../../store/reducers';

export default (store) => ({
    path : 'socketPanel',
    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
         and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
             dependencies for bundling   */
            const SocketPanel = require('./containers/SocketPanelContainer').default;
            const reducer = require('./modules/socketPanel').default;

            injectReducer(store, { key: 'socketPanel', reducer });

            /*  Return getComponent   */
            cb(null, SocketPanel);

            /* Webpack named bundle   */
        }, 'socketPanel');
    }
});
