import React from 'react';
import { Link } from 'react-router';
import { RouteTransition } from 'react-router-transition';
import WheelColor from '../../../components/WheelColor';

export const WhiteCtrl = (props) => (
    <div>
        <RouteTransition
            pathname={props.location.pathname}
            atEnter={{ rotateY: -180 }}
            atLeave={{ rotateY: 180 }}
            atActive={{ rotateY: 0 }}
            mapStyles={styles => ({ transform: `rotateY(${styles.rotateY}deg)` })}
        >
            <div>
                <p>白光</p>
                <p>不是自然，胜似自然</p>
                <Link to="/colorfulLightCtrl">
                    <p>彩光</p>
                </Link>
            </div>
            <WheelColor
                color={props.color}
                moonSliderOpt={props.moonSliderOpt}
                disabled={true}
                onMove={(data) => props.handlerMove(data)}
            ></WheelColor>
        </RouteTransition>
    </div>
);

WhiteCtrl.propTypes = {
    color: React.PropTypes.string.isRequired,
    moonSliderOpt: React.PropTypes.object,
    handlerMove: React.PropTypes.func.isRequired,
    uploadData: React.PropTypes.func.isRequired,
};

export default WhiteCtrl;
