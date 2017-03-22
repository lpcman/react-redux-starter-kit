import React from 'react';
import { browserHistory } from 'react-router';
import { RouteTransition } from 'react-router-transition';
import SmartSlider, { SliderType } from '../../../components/SmartSlider';
import WheelColor from '../../../components/WheelColor';
import Close from '../assets/close.png';
import './ColorfulCtrl.scss';

export default class ColorfulCtrl extends React.Component {
    constructor (props, context) {
        super(props, context);

        this.state = {
            defaultLight: this.props.light
        };
        this.runOnMount = false;
        this.degree = 0;
        this.moonSliderOpt = {};
    }

    componentWillMount () {
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
                    mapStyles: styles => ({ transform: `translateY(${styles.translateY}%)`, height:'100%' })
                };
                break;
            case 'rotateY':
                this.transitionStyle = {
                    atEnter: { rotateY: -180 },
                    atLeave: { rotateY: 180 },
                    atActive: { rotateY: 0 },
                    mapStyles: styles => ({ transform: `rotateY(${styles.rotateY}deg)`, height:'100%' })
                };
                break;
            default:
                this.transitionStyle = {
                    atEnter: { translateY: 0 },
                    atLeave: { translateY: 0 },
                    atActive: { translateY: 0 },
                    mapStyles: styles => ({ transform: `translateY(${styles.translateY}%)`, height:'100%' })
                };
                break;
        }

        this.initStatus();
    }

    initStatus () {
        let degree = sessionStorage.getItem('degree') || 0;
        let startValue = (parseFloat(degree) / 360) * 100;
        let light = sessionStorage.getItem('light') || 0;

        light = parseInt(light, 10);
        this.moonSliderOpt = Object.assign({}, this.moonSliderOpt, { start_value: startValue });

        this.setState({
            defaultLight: light
        });
        this.props.changeLight(light);
    }

    change () {
        sessionStorage.setItem('degree', this.degree);
        sessionStorage.setItem('light', this.props.light);
        browserHistory.push('/whiteLightCtrl/rotateY');
    }

    onMove (data) {
        this.degree = data.event.deg;
        this.props.handlerMove(data);
    }

    onClose (event) {
        if (this.props.uploadData()) {
            sessionStorage.setItem('degree', this.degree);
            sessionStorage.setItem('light', this.props.light);
            this.refs.wrapper.style.transform = 'translateY(100%)';
            this.refs.wrapper.style.transition = '.4s ease-in-out';
            setTimeout(() => browserHistory.push('/colorfulLightPanel'), 400);
        }
    }

    render () {
        return (
            <div className='wrapper'>
                <div ref='wrapper' className='wrapper'>
                    <RouteTransition
                        /* eslint-disable */
                        pathname={this.props.location.pathname}
                        /* eslint-enable */
                        {...this.transitionStyle}
                        style={{ height:'100%' }}
                    >
                        <div className='textWrapper'>
                            <img className='close'
                                onClick={() => this.onClose()}
                                onTouch={() => this.onClose()}
                                src={Close}
                                alt='close'
                            />
                            <div className='titleChangeWrapper'>
                                <p className='title'>彩光</p>
                                <p
                                    className='change'
                                    onClick={() => this.change()}
                                    onTouch={() => this.change()}
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
    changeLight: React.PropTypes.func.isRequired,
    uploadData: React.PropTypes.func.isRequired
};
