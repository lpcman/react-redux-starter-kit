import React from 'react';
import SmartSlider, { SliderType } from '../../../components/SmartSlider';
import DuckImage from '../assets/Duck.jpg';
import './HomeView.scss';
import Bridge from '../../../components/Bridge';

class HomeView extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            sliderValue: this.props.defaultValue || 20
        };

        this.handleSlider = this.handleSlider.bind(this);
    }

    componentDidMount () {
        // 组件挂载时，添加供native端调用的方法， test为约定的方法名称
        window.JSBRIAGE.push('test', this.handleJsCall);
    }

    componentWillUnmount () {
        // 组件弹出时删除注册的方法以节省内存开销
        window.JSBRIAGE.rmItem('test');
    }

    // 实际处理native调用的方法
    handleJsCall (value) {
        console.log('component js call ---------->');
        console.log(value);
    }

    handleSlider (value) {
        this.setState({ sliderValue: value });
    }
    handleClick (e) {
        // js bridge 调用, test为要调用的函数名称，data为传入的参数
        Bridge('test', { a: 'a', b: 'b' });
    }

    render () {
        return (
          <div>
            <h4>Welcome! {this.state.sliderValue}</h4>
            <img
              alt='This is a duck, because Redux!'
              className='duck'
              src={DuckImage}
              onClick={(e) => this.handleClick(e)} />
            <SmartSlider
              type={SliderType.LIGHT}
              min={0}
              max={100}
              defaultValue={this.state.sliderValue}
              onChange={this.handleSlider}
        />
          </div>
        );
    }
}

HomeView.propTypes = {
    defaultValue: React.PropTypes.number
};

export default HomeView;
