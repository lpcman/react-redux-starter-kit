import React from 'react';
import OnImg from '../assets/on@2x.png';
import OffImg from '../assets/off@2x.png';
import OffLineImg from '../assets/offline@2x.png';
import bgImg from '../assets/bg@2x.png';
import OptionBtn from '../../../components/OptionBtn';
import Header from '../../../components/Header';
import Bridge from '../../../components/Bridge';
import './Panel.scss';

export default class Panel extends React.Component {
    componentDidMount () {
        // 组件挂载时，添加供native端调用的方法， setSocketStatus为约定的方法名称
        window.JSBRIAGE.push('setSocketStatus', this.props.statusChange);
    }

    componentWillUnmount () {
        // 组件弹出时删除注册的方法以节省内存开销
        window.JSBRIAGE.rmItem('setSocketStatus');
    }
    leave () {
        // js bridge 调用, socketUpdate为要调用的函数名称，data为传入的参数
        Bridge('socketUpdate', { status: this.props.status,
            power: this.props.power });
        history.back();
    }
    render () {
        let url;
        let lightStyle = null, tips = '', status = '';
        let offLineTip = (
            <div>
                <p className='text'>设备离线</p>
                <p className='tip'>请检查网络和设备</p>
            </div>
        );
        let onTip = (
            <div>
                <p className='on-text'>{this.props.power}kw</p>
                <p className='tip'>电源已开启，当前功率极低</p>
            </div>
        );
        let offTip = (
            <div>
                <p className='tip'>电源已关闭</p>
            </div>
        );
        switch (this.props.status) {
            case 'ON':
                console.log('状态：' + this.props.status);
                url = OnImg;
                tips = onTip;
                status = this.props.status;
                lightStyle = {
                    backgroundImage: 'url(' + bgImg + ')'
                };
                break;
            case 'OFF':
                url = OffImg;
                tips = offTip;
                status = this.props.status;
                lightStyle = {
                    backgroundImage: 'url(' + bgImg + ')'
                };
                break;
            case 'OFF_LINE':
                url = OffLineImg;
                tips = offLineTip;
                status = this.props.status;
                break;
            default:
                url = '';
                break;
        }
        return (
            <div className='wrapper' style={lightStyle}>
                <Header
                    leftHandler={e => this.leave}
                    rightHandler={e => console.log(e)}
                    title='移动计量插座'
                    bgColor='#fff'
                    titleColor='#000'
                    reverse
                />
                <img
                    alt='device icon'
                    className='deviceIcon'
                    src={url}
                    type={status}
                    onClick={() => this.props.statusChange(status, this.props.power)} />
                {tips}
                <div className='control'>
                    <div className='fix-panel-left'>
                        <OptionBtn type='chart' />
                    </div>
                    <div className='fix-panel-right'>
                        <OptionBtn type='timer' />
                    </div>
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
    power: React.PropTypes.number.isRequired,
    statusChange: React.PropTypes.func.isRequired
};
