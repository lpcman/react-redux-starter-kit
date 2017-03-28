import React from 'react';
import { browserHistory } from 'react-router';
import OptionBtn from '../../../components/OptionBtn';
import OnImg from '../assets/开@2x.png';
import OffImg from '../assets/关闭@2x.png';
import OffLineImg from '../assets/离线@2x.png';
import Header from '../../../components/Header';
import Bridge from '../../../components/Bridge';
import './Panel.scss';

export default class Panel extends React.Component {

    toCtrl () {
        let whiteSrc = window.BASE_DIR + '/whiteLightCtrl/slideUp';
        let color = sessionStorage.getItem('color');
        if (window.tempData) {
            if (window.tempData.color.toUpperCase() === 'FFFFF') {
                sessionStorage.setItem('degree', 0);
                browserHistory.push(whiteSrc);
            } else {
                browserHistory.push(window.BASE_DIR + '/colorfulLightCtrl/slideUp');
            }
        } else if (color && color.toUpperCase() === '#FFFFFF') {
            sessionStorage.setItem('degree', 0);
            browserHistory.push(whiteSrc);
        } else {
            browserHistory.push(window.BASE_DIR + '/colorfulLightCtrl/slideUp');
        }
    }

    componentDidMount () {
        this.props.setStatus(this.props.location.query.status || 'ON');
        window.tempData = this.props.location.query; // 给从这个页面派生的页面使用
        if (Object.keys(window.tempData).length !== 0) {
            window.tempData.light = parseInt(window.tempData.light, 10) || 0; // 给从这个页面派生的页面使用
        } else {
            window.tempData = null;
        }
        window.JSBRIAGE.push('finishLightActivity', this.leave);
    }

    componentWillUnmount () {
        window.JSBRIAGE.rmItem('finishLightActivity');
    }

    leave () {
        let currentState = window.GLOBAL_STORE.getState();
        let param = { status: currentState.colorfulLightPanel.status };

        param.light = sessionStorage.getItem('light');
        param.color = sessionStorage.getItem('color');

        Bridge('lightUpdate', param);
        Bridge('finish', 'light');
    }

    changeStatus (status) {
        let newStatus;
        switch (status) {
            case 'ON':
                newStatus = 'OFF';
                break;
            case 'OFF':
                newStatus = 'ON';
                break;
            default:
                newStatus = status;
                break;
        }
        this.props.setStatus(newStatus);
    }

    render () {
        let url;
        let lightStyle = null;
        let tips = '';
        let scene = '';
        let offLineTip = (
            <div>
                <p className='offLineText'>设备离线</p>
                <p className='offLineTip'>请检查网络和设备</p>
            </div>
        );
        let sceneTemplate = (
            <div className='sceneName'>标准场景</div>
        );
        let ctrlBtn = <OptionBtn type='control' onTouchStart={this.toCtrl} />;
        let sceneBtn = <OptionBtn type='situation' />;
        let timeBtn = <OptionBtn type='timer' />;

        switch (this.props.status) {
            case 'ON':
                url = OnImg;
                scene = sceneTemplate;
                break;
            case 'OFF':
                url = OffImg;
                lightStyle = {
                    backgroundColor: '#000'
                };
                ctrlBtn = <OptionBtn type='discontrol' />;
                sceneBtn = null;
                break;
            case 'OFF_LINE':
                url = OffLineImg;
                lightStyle = {
                    backgroundColor: '#F4F4F4'
                };
                tips = offLineTip;
                ctrlBtn = <OptionBtn type='discontrol' />;
                sceneBtn = null;
                break;
            default:
                url = '';
                break;
        }
        return (
            <div style={lightStyle} className='panelWrapper'>
                <Header
                    leftHandler={e => this.leave()}
                    rightHandler={e => console.log(e)}
                    title='炫彩灯'
                    bgColor='#fff'
                    titleColor='#000'
                    reverse
                />
                {scene}
                <img
                    alt='device icon'
                    className='deviceIcon'
                    src={url}
                    onTouchStart={() => this.changeStatus(this.props.status)}
                />
                {tips}
                <div className='btnGroup'>
                    {ctrlBtn}
                    {sceneBtn}
                    {timeBtn}
                </div>
            </div>
        );
    }
};

Panel.propTypes = {
    status: React.PropTypes.oneOf([
        'ON',
        'OFF',
        'OFF_LINE'
    ]),
    setStatus: React.PropTypes.func.isRequired
};
