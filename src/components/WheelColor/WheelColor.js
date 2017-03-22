import React from 'react';
import './WheelColor.scss';
import MoonSlider from './moon-slider';

export default class WheelColor extends React.Component {
    componentDidMount () {
        let remUnit = parseFloat(window.getComputedStyle(this.refs.wheelWrapper, null).getPropertyValue('font-size'));
        let defaultOpt = {
            min_value: 0,
            max_value: 100,
            radius: 14.5 * remUnit / 2,
            color: 'transparent',
            start_value: 0
        };
        let opt = this.props.moonSliderOpt || {};
        opt = Object.assign({}, defaultOpt, opt);
        MoonSlider.generateMoonSlider(
            'slider-transportation',
            opt,
            {
                onMoveHandler: (event) => this.sliderMoveHandler(event)
            }
        );

        let deg = opt.start_value / 100 * 360;
        let initEvent = {
            deg: deg,
            id: 'slider-transportation',
            value: opt.start_value
        };
        this.sliderMoveHandler(initEvent);
    }
    sliderMoveHandler (event) {
        let deg = event.deg.toFixed(2);
        let area = Math.floor(deg / 60);
        let delta = Math.round((deg % 60) / 60 * 255);
        //  变化规律奇数区域00-FF，偶数区域FF-00
        delta = area % 2 === 0 ? delta : 255 - delta;
        let deltaCode = delta === 0 ? '00' : delta.toString(16);
        let color = '#';
        let cb = this.props.onMove || (() => '');

        switch (area) {
            case 0:
                color += 'FF' + deltaCode + '00';
                break;
            case 1:
                color += deltaCode + 'FF00';
                break;
            case 2:
                color += '00FF' + deltaCode;
                break;
            case 3:
                color += '00' + deltaCode + 'FF';
                break;
            case 4:
                color += deltaCode + '00FF';
                break;
            case 5:
                color += 'FF00' + deltaCode;
                break;
            default:
                color = '';
                break;
        }

        cb({
            event: event,
            color: color
        });
    }
    render () {
        let selectedColorStyle = {
            'backgroundColor': this.props.color || '#F00'
        };

        return (
            <div className='wheelWrapper' ref='wheelWrapper'>
                <div className='wheel'>
                    <ul className={'umbrella ' + (this.props.disabled ? 'disabled' : '')}>
                        <li className='color' />
                        <li className='color' />
                        <li className='color' />
                        <li className='color' />
                        <li className='color' />
                        <li className='color' />
                        <li className='color' />
                        <li className='color' />
                        <li className='color' />
                        <li className='color' />
                        <li className='color' />
                        <li className='color' />
                    </ul>
                </div>
                <div id='slider-transportation' className='slider'>
                    <div className='cover'>
                        <div className='selectedColor'
                            style={selectedColorStyle} />
                    </div>
                </div>
            </div>
        );
    }
}

WheelColor.propTypes = {
    color: React.PropTypes.string.isRequired,
    moonSliderOpt: React.PropTypes.object,
    disabled: React.PropTypes.bool,
    onMove: React.PropTypes.func
};
