import React from 'react';
import { browserHistory } from 'react-router';
import OnImg from '../assets/开@2x.png';
import OffImg from '../assets/关闭@2x.png';
import OffLineImg from '../assets/离线@2x.png';
import './Panel.scss';

export default class Panel extends React.Component {
    toCtrl() {
        browserHistory.push('/colorfulLightCtrl/slideUp');
    }
    render() {
        let url;
        let lightStyle = null, tips = "", scene = "";
        let offLineTip = (
            <div>
                <p className="offLineText">设备离线</p>
                <p className="offLineTip">请检查网络和设备</p>
            </div>
        );
        let sceneTemplate = (
            <div className="sceneName">标准场景</div>
        );

        switch (this.props.status) {
            case "ON":
                url = OnImg;
                scene = sceneTemplate;
                break;
            case "OFF":
                url = OffImg;
                lightStyle = {
                    backgroundColor: '#000'
                };
                break;
            case "OFF_LINE":
                url = OffLineImg;
                tips = offLineTip;
                break;
            default:
                url = "";
                break;
        }
        return (
            <div style={lightStyle} className="wrapper">
                {scene}
                <img
                    alt='device icon'
                    className="deviceIcon"
                    src={url} />
                {tips}
                <div>
                    <img src="" alt="控制" onClick={this.toCtrl}/>
                    <img src="" alt="场景"/>
                    <img src="" alt="定时"/>
                </div>
            </div>
        );
    }
};

Panel.propTypes = {
    status: React.PropTypes.oneOf([
        "ON",
        "OFF",
        "OFF_LINE"
    ])
};
