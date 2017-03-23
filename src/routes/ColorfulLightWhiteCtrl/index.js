import { injectReducer } from '../../store/reducers';

export default (store) => ({
    path: 'whiteLightCtrl/:enterType',
    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
         and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
             dependencies for bundling   */
            const WhiteLightCtrl = require('./containers/WhiteLightContainer').default;
            const reducer = require('./modules/whiteLightCtrl').default;

            injectReducer(store, { key: 'colorfulCtrl', reducer });

            /*  Return getComponent   */
            cb(null, WhiteLightCtrl);

            /* Webpack named bundle   */
        }, 'whiteLightCtrl');
    }
});
