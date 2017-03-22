import React from 'react';
import { Link, browserHistory } from 'react-router';
import { RouteTransition } from 'react-router-transition';
import SmartSlider, {SliderType} from '../../../components/SmartSlider';
import WheelColor from '../../../components/WheelColor';
import './WhiteCtrl.scss';

export default class WhiteCtrl extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            defaultLight: this.props.light
        }
        this.runOnMount = false;
    }
    componentWillMount() {
        let enterType = this.props.params.enterType;
        this.transitionStyle;

        switch (enterType) {
            case 'slideUp':
                this.transitionStyle = {
                    atEnter: { translateY: 100 },
                    atLeave: { translateY: -100 },
                    atActive: { translateY: 0 },
                    mapStyles: styles => ({ transform: `translateY(${styles.translateY}%)` })
                }
                break;
            case 'rotateY':
                this.transitionStyle = {
                    atEnter: { rotateY: -180 },
                    atLeave: { rotateY: 180 },
                    atActive: { rotateY: 0 },
                    mapStyles: styles => ({ transform: `rotateY(${styles.rotateY}deg)` })
                }
                break;
            default:
                this.transitionStyle = {
                    atEnter: { translateY: 0 },
                    atLeave: { translateY: 0 },
                    atActive: { translateY: 0 },
                    mapStyles: styles => ({ transform: `translateY(${styles.translateY}%)` })
                }
                break;
        }
    }
    render() {
        return (
            <div>
                <RouteTransition
                    pathname={this.props.location.pathname}
                    {...this.transitionStyle}
                >
                    <div>
                        <p onClick={this.props.uploadData}>X</p>
                        <p>白光</p>
                        <p>不是自然，胜似自然</p>
                        <Link to="/colorfulLightCtrl/rotateY">
                            <p>彩光</p>
                        </Link>
                    </div>
                    <WheelColor
                        color={this.props.color}
                        moonSliderOpt={this.props.moonSliderOpt}
                        disabled={true}
                        onMove={(data) => this.props.handlerMove(data)}
                    ></WheelColor>
                    <div className="brightness">
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
    moonSliderOpt: React.PropTypes.object,
    light: React.PropTypes.number.isRequired,
    handlerMove: React.PropTypes.func.isRequired,
    changeLight: React.PropTypes.func.isRequired,
    uploadData: React.PropTypes.func.isRequired
};
