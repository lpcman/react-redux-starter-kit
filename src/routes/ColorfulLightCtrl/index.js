import { injectReducer } from '../../store/reducers';

export default (store) => ({
    path: 'colorfulLightCtrl/:enterType',
    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
         and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
             dependencies for bundling   */
            const ColorfulLightCtrl = require('./containers/ColorfulLightContainer').default;
            const reducer = require('./modules/colorfulLightCtrl').default;

            injectReducer(store, { key: 'colorfulCtrl', reducer });

            /*  Return getComponent   */
            cb(null, ColorfulLightCtrl);

            /* Webpack named bundle   */
        }, 'colorfulLightCtrl');
    }
});
