import React from 'react';
import { Link } from 'react-router';
import { RouteTransition } from 'react-router-transition';
import WheelColor from '../../../components/WheelColor';

export default class WhiteCtrl extends React.Component {
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
                </RouteTransition>
            </div>
        );
    }
}

WhiteCtrl.propTypes = {
    color: React.PropTypes.string.isRequired,
    moonSliderOpt: React.PropTypes.object,
    handlerMove: React.PropTypes.func.isRequired,
    uploadData: React.PropTypes.func.isRequired,
};
