import React from 'react';
import { browserHistory } from 'react-router';
import { RouteTransition } from 'react-router-transition';
import SmartSlider, { SliderType } from '../../../components/SmartSlider';
import WheelColor from '../../../components/WheelColor';
import close2x from '../assets/nav_close_w@2x.png';
import close3x from '../assets/nav_close_w@3x.png';
import './ColorfulCtrl.scss';

export default class ColorfulCtrl extends React.Component {
    constructor (props, context) {
        super(props, context);

        this.state = {
            defaultLight: this.props.light
        };
        this.runOnMount = false;
        this.degree = 0;
        this.moonSliderOpt = { sliderWidth: 18.5, sliderHeight: 23.5 };
    }

    componentWillUnmount () {
        window.JSBRIAGE.rmItem('finishLightActivity');
    }

    componentWillMount () {
        window.JSBRIAGE.push('finishLightActivity', () => this.onClose());
        /* eslint-disable */
        let enterType = this.props.params.enterType;
        /* eslint-enable */
        this.transitionStyle;

        switch (enterType) {
            case 'slideUp':
                this.transitionStyle = {
                    atEnter: { translateY: 100 },
                    atLeave: { translateY: -100 },
                    atActive: { translateY: 0 },
                    mapStyles: styles => ({
                        WebkitTransform : `translate3d(0, ${styles.translateY}%, 0)`,
                        transform : `translate3d(0, ${styles.translateY}%, 0)`,
                        height:'100%'
                    })
                };
                break;
            case 'rotateY':
                this.transitionStyle = {
                    atEnter: { rotateY: -180 },
                    atLeave: { rotateY: 180 },
                    atActive: { rotateY: 0 },
                    mapStyles: styles => ({
                        WebkitTransform : `rotateY(${styles.translateY}%)`,
                        transform : `rotateY(${styles.rotateY}deg)`,
                        height:'100%'
                    })
                };
                break;
            default:
                this.transitionStyle = {
                    atEnter: { translateY: 0 },
                    atLeave: { translateY: 0 },
                    atActive: { translateY: 0 },
                    mapStyles: styles => ({
                        WebkitTransform : `translate3d(0, ${styles.translateY}%, 0)`,
                        transform : `translate3d(0, ${styles.translateY}%, 0)`,
                        height:'100%'
                    })
                };
                break;
        }

        this.initStatus();
    }

    initStatus () {
        if (window.tempData) {
            sessionStorage.setItem('color', '#' + window.tempData.color);
            sessionStorage.setItem('light', window.tempData.light);
        }
        let degree = sessionStorage.getItem('degree');
        let startColor = sessionStorage.getItem('color');
        let light = parseInt(sessionStorage.getItem('light'), 10) || 0;

        let opt = startColor ? { start_color: startColor } : { start_value: parseFloat(degree) };
        this.moonSliderOpt = Object.assign({}, this.moonSliderOpt, opt);

        this.setState({
            defaultLight: light
        });
        this.props.changeLight(light);
        if (startColor) {
            this.props.handlerMove({ color: startColor });
        }
    }

    change () {
        sessionStorage.setItem('degree', this.degree);
        sessionStorage.setItem('light', this.props.light);
        // let currentState = window.GLOBAL_STORE.getState();
        // currentState.whiteCtrl = {color: '#FFFFFF', light: this.props.light};
        browserHistory.push(window.BASE_DIR + '/whiteLightCtrl/rotateY');
    }

    onMove (data) {
        this.degree = data.event.deg;
        this.props.handlerMove(data);
    }

    onClose (event) {
        // let currentState = window.GLOBAL_STORE.getState();
        // currentState.whiteCtrl = null;
        // Bridge('lightUpdate', { color: this.props.color, light: this.props.light });
        sessionStorage.setItem('degree', this.degree);
        sessionStorage.setItem('light', this.props.light);
        sessionStorage.setItem('color', this.props.color);
        window.tempData = null;
        this.refs.wrapper.style.WebkitTransform = 'translate3d(0, 100%, 0)';
        this.refs.wrapper.style.transform = 'translate3d(0, 100%, 0)';
        this.refs.wrapper.style.transition = '.4s ease-in-out';
        setTimeout(() => browserHistory.push(window.BASE_DIR + '/colorfulLightPanel'), 400);
    }

    render () {
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
                            <picture>
                                <source
                                    media='(min-width: 414px)'
                                    srcSet={close3x} />
                                <source
                                    media='(min-width: 375px)'
                                    srcSet={close2x} />
                                <img className='close'
                                    onTouchStart={() => this.onClose()}
                                    src={close2x}
                                    alt='close'
                                />
                            </picture>
                            <div className='titleChangeWrapper'>
                                <p className='title'>彩光</p>
                                <p
                                    className='change'
                                    onTouchStart={() => this.change()}
                                >切换白光</p>
                            </div>
                            <p className='text'>忽得五色光，换了人间彩</p>
                        </div>
                        <WheelColor
                            color={this.props.color}
                            moonSliderOpt={this.moonSliderOpt}
                            onMove={(data) => this.onMove(data)}
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
};

ColorfulCtrl.propTypes = {
    color: React.PropTypes.string.isRequired,
    light: React.PropTypes.number.isRequired,
    handlerMove: React.PropTypes.func.isRequired,
    changeLight: React.PropTypes.func.isRequired
};
