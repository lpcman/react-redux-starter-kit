import React from 'react';
import { browserHistory } from 'react-router';
import { RouteTransition } from 'react-router-transition';
import SmartSlider, { SliderType } from '../../../components/SmartSlider';
import WheelColor from '../../../components/WheelColor';
import './WhiteCtrl.scss';

export default class WhiteCtrl extends React.Component {
    constructor (props, context) {
        super(props, context);

        this.state = {
            defaultLight: this.props.light
        };
        this.runOnMount = false;
        this.degree = 0;
        this.moonSliderOpt = { disabled: true };
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
                    mapStyles: styles => ({ transform: `translateY(${styles.translateY}%)` })
                };
                break;
            case 'rotateY':
                this.transitionStyle = {
                    atEnter: { rotateY: -180 },
                    atLeave: { rotateY: 180 },
                    atActive: { rotateY: 0 },
                    mapStyles: styles => ({ transform: `rotateY(${styles.rotateY}deg)` })
                };
                break;
            default:
                this.transitionStyle = {
                    atEnter: { translateY: 0 },
                    atLeave: { translateY: 0 },
                    atActive: { translateY: 0 },
                    mapStyles: styles => ({ transform: `translateY(${styles.translateY}%)` })
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
        sessionStorage.setItem('light', this.props.light);
        browserHistory.push('/colorfulLightCtrl/rotateY');
    }

    onClose (event) {
        if (this.props.uploadData()) {
            browserHistory.push('/colorfulLightPanel');
        }
    }

    render () {
        return (
          <div>
            <RouteTransition
                    /* eslint-disable */
                    pathname={this.props.location.pathname}
                    /* eslint-enable */
              {...this.transitionStyle}
                >
              <div>
                <p onClick={() => this.onClose()}>X</p>
                <p>白光</p>
                <p>不是自然，胜似自然</p>
                <p onClick={() => this.change()}>彩光</p>
              </div>
              <WheelColor
                color={this.props.color}
                moonSliderOpt={this.moonSliderOpt}
                disabled
                    />
              <div className='brightness'>
                <p>亮度</p>
                <p>{this.props.light}</p>
                <SmartSlider
                  type={SliderType.LIGHT}
                  defaultValue={this.state.defaultLight}
                  onChange={this.props.changeLight}
                        />
              </div>
            </RouteTransition>
          </div>
        );
    }
}

WhiteCtrl.propTypes = {
    color: React.PropTypes.string.isRequired,
    light: React.PropTypes.number.isRequired,
    changeLight: React.PropTypes.func.isRequired,
    uploadData: React.PropTypes.func.isRequired
};
