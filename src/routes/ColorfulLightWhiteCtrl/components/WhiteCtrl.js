import React from 'react';
import {browserHistory} from 'react-router';
import {RouteTransition} from 'react-router-transition';
import SmartSlider, {SliderType} from '../../../components/SmartSlider';
import WheelColor from '../../../components/WheelColor';
// import Bridge from '../../../components/Bridge';
import Close from '../assets/close.png';
import './WhiteCtrl.scss';

export default class WhiteCtrl extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            defaultLight: this.props.light
        };
        this.runOnMount = false;
        this.degree = 0;
        this.moonSliderOpt = {sliderWidth: 8.5, sliderHeight: 13.5, disabled: true};
    }

    componentWillUnmount() {
        window.JSBRIAGE.rmItem('finishLightActivity');
    }

    componentWillMount() {
        window.JSBRIAGE.push('finishLightActivity', this.onClose);
        /* eslint-disable */
        let enterType = this.props.params.enterType;
        /* eslint-enable */
        this.transitionStyle;

        switch (enterType) {
            case 'slideUp':
                this.transitionStyle = {
                    atEnter: {translateY: 100},
                    atLeave: {translateY: -100},
                    atActive: {translateY: 0},
                    mapStyles: styles => ({
                        WebkitTransform: `translate3d(0, ${styles.translateY}%, 0)`,
                        transform: `translate3d(0, ${styles.translateY}%,0 )`,
                        height: '100%'
                    })
                };
                break;
            case 'rotateY':
                this.transitionStyle = {
                    atEnter: {rotateY: -180},
                    atLeave: {rotateY: 180},
                    atActive: {rotateY: 0},
                    mapStyles: styles => ({
                        WebkitTransform: `rotateY(${styles.rotateY}deg)`,
                        transform: `rotateY(${styles.rotateY}deg)`,
                        height: '100%'
                    })
                };
                break;
            default:
                this.transitionStyle = {
                    atEnter: {translateY: 0},
                    atLeave: {translateY: 0},
                    atActive: {translateY: 0},
                    mapStyles: styles => ({
                        WebkitTransform: `translate3d(0, ${styles.translateY}%, 0)`,
                        transform: `translate3d(0, ${styles.translateY}%, 0)`,
                        height: '100%'
                    })
                };
                break;
        }

        this.initStatus();
    }

    initStatus() {
        let degree = sessionStorage.getItem('degree') || 0;
        let light = parseInt(sessionStorage.getItem('light'), 10) || (window.tempData && window.tempData.light);

        this.moonSliderOpt = Object.assign({}, this.moonSliderOpt, {start_value: parseFloat(degree)});

        this.setState({
            defaultLight: light
        });
        this.props.changeLight(light);
    }

    change() {
        sessionStorage.setItem('light', this.props.light);
        browserHistory.push(window.BASE_DIR + '/colorfulLightCtrl/rotateY');
    }

    onClose(event) {
        let currentState = window.GLOBAL_STORE.getState();
        currentState.colorfulCtrl = null;
        // Bridge('lightUpdate', { color: this.props.color, light: this.props.light });
        sessionStorage.setItem('light', this.props.light);
        this.refs.wrapper.style.WebkitTransform = 'translate3d(0, 100%, 0)';
        this.refs.wrapper.style.transform = 'translate3d(0, 100%, 0)';
        this.refs.wrapper.style.transition = '.4s ease-in-out';
        setTimeout(() => browserHistory.push(window.BASE_DIR + '/colorfulLightPanel'), 400);
    }

    render() {
        return (
            <div className='lightCtrlWrapper'>
                <div ref='wrapper' className='lightCtrlWrapper'>
                    <RouteTransition
                        /* eslint-disable */
                        pathname={this.props.location.pathname}
                        /* eslint-enable */
                        {...this.transitionStyle}
                        style={{ height:'100%' }}
                    >
                        <div className='textWrapper'>
                            <img className='close'
                                 onTouchStart={() => this.onClose()}
                                 src={Close}
                                 alt='close'
                            />
                            <div className='titleChangeWrapper'>
                                <p className='title'>白光</p>
                                <p
                                    className='change'
                                    onTouchStart={() => this.change()}
                                >切换彩光</p>
                            </div>
                            <p className='text'>不是自然，胜似自然</p>
                        </div>
                        <WheelColor
                            color={this.props.color}
                            moonSliderOpt={this.moonSliderOpt}
                            disabled
                        />
                        <div className='brightness'>
                            <p className='number'>{this.props.light}</p>
                            <p className='lightText'>亮度</p>
                            <div className='lightSlider'>
                                <SmartSlider
                                    type={SliderType.LIGHT}
                                    defaultValue={this.state.defaultLight}
                                    onChange={this.props.changeLight}
                                />
                            </div>
                        </div>
                    </RouteTransition>
                </div>
            </div>
        );
    }
}

WhiteCtrl.propTypes = {
    color: React.PropTypes.string.isRequired,
    light: React.PropTypes.number.isRequired,
    changeLight: React.PropTypes.func.isRequired
};
