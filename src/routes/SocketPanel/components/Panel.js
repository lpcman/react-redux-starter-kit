import React from 'react';
import OnImg from '../assets/on@2x.png';
import OnXImg from '../assets/on@3x.png';
import OffImg from '../assets/off@2x.png';
import OffXImg from '../assets/off@3x.png';
import OffLineImg from '../assets/offline@2x.png';
import OffLineXImg from '../assets/offline@3x.png';
import bgImg from '../assets/bg@2x.png';
import bgXImg from '../assets/bg@3x.png';
import OptionBtn from '../../../components/OptionBtn';
import Header from '../../../components/Header';
import Bridge from '../../../components/Bridge';
import './Panel.scss';

export default class Panel extends React.Component {
    componentDidMount () {
        // 组件挂载时，添加供native端调用的方法， setSocketStatus为约定的方法名称
        window.JSBRIAGE.push('setSocketStatus', this.props.setState);
        window.JSBRIAGE.push('finishSocketActivity', this.leave);
        this.props.setState(this.props.location.query.status, parseInt(this.props.location.query.power));
        console.log(this.props.status);
    }

    componentWillUnmount () {
        // 组件弹出时删除注册的方法以节省内存开销
        window.JSBRIAGE.rmItem('setSocketStatus');
    }
    leave () {
        // js bridge 调用, socketUpdate为要调用的函数名称，data为传入的参数
        Bridge('socketUpdate', { status: this.props.status,
            power: this.props.power });
        Bridge('finish', 'socket');
        history.back();
    }
    render () {
        let url;
        let urlX;
        let lightStyle = null;
        let tips = '';
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
                urlX = OnXImg;
                tips = onTip;
                lightStyle = {
                    backgroundImage: 'url(' + bgImg + ')'
                };
                break;
            case 'OFF':
                url = OffImg;
                urlX = OffXImg;
                tips = offTip;
                lightStyle = {
                    backgroundImage: 'url(' + bgImg + ')'
                };
                break;
            case 'OFF_LINE':
                url = OffLineImg;
                urlX = OffLineXImg;
                tips = offLineTip;
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
                <picture>
                    <source
                        media='(min-width: 414px)'
                        srcSet={urlX} />
                    <source
                        media='(min-width: 375px)'
                        srcSet={url} />
                    <img
                        alt='device icon'
                        className='deviceIcon'
                        src={url}
                        onTouchStart={() => this.props.statusChange(this.props.status, this.props.power)} />
                </picture>

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
    statusChange: React.PropTypes.func.isRequired,
    setState: React.PropTypes.func
};
