import { injectReducer } from '../../store/reducers';

export default (store) => ({
    path: 'colorfulLightPanel',
    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
         and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
             dependencies for bundling   */
            const ColorfulLightPanel = require('./containers/ColorfulLightPanelContainer').default;
            const reducer = require('./modules/colorfulLightPanel').default;

            injectReducer(store, { key: 'colorfulLightPanel', reducer });

            /*  Return getComponent   */
            cb(null, ColorfulLightPanel);

            /* Webpack named bundle   */
        }, 'colorfulLightPanel');
    }
});
