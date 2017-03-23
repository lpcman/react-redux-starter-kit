import React from 'react';
import './WheelColor.scss';
import MoonSlider from './moon-slider';
import ColorCirlce from './assets/色环@2x.png';
import WhiteCirlce from './assets/调控@2x.png';

export default class WheelColor extends React.Component {
    componentDidMount () {
        let remUnit = parseFloat(window.getComputedStyle(this.refs.wheelWrapper, null).getPropertyValue('font-size'));
        let defaultOpt = {
            min_value: 0,
            max_value: 360,
            radius: 14.5 * remUnit / 2,
            color: 'transparent',
            start_value: 0
        };
        if (this.props.moonSliderOpt.start_color) {
            this.props.moonSliderOpt.start_value = this.translateColorToDegree(this.props.moonSliderOpt.start_color);
        }
        let opt = this.props.moonSliderOpt || {};
        opt = Object.assign({}, defaultOpt, opt);
        MoonSlider.generateMoonSlider(
            'slider-transportation',
            opt,
            {
                onMoveHandler: (event) => this.sliderMoveHandler(event)
            }
        );

        let initEvent = {
            deg: opt.start_value,
            id: 'slider-transportation',
            value: opt.start_value
        };
        this.sliderMoveHandler(initEvent);
    }
    transformButton (deg) {
        let btn = document.getElementById('slider-transportation-moon-button');
        let rotate = 'rotate(' + deg + 'deg)';
        btn.style.WebkitTransform = rotate;
        btn.style.transform = rotate;
    }
    calculateDegree (area, deltaCode) {
        let start = area * 60;
        let factor = area % 2 === 0 ? 1 : -1;
        let delta = parseInt(deltaCode, 16) / 256;
        delta = area % 2 === 0 ? delta : 1 - delta;
        let deltaDegree = delta * 60;

        return start + deltaDegree;
    }
    translateColorToDegree (color) {
        color = color.toUpperCase();
        let first = color.slice(0,2);
        let second = color.slice(2,4);
        let third = color.slice(4,6);
        let degree;

        if (first === 'FF') {
            if (second === '00') {
                degree = this.calculateDegree(5, third);
            } else {
                degree = this.calculateDegree(0, second);
            }
        } else if (first === '00') {
            if (second === 'FF') {
                degree = this.calculateDegree(2, third);
            } else {
                degree = this.calculateDegree(3, second);
            }
        } else {
            if (second === 'FF') {
                degree = this.calculateDegree(1, first);
            } else {
                degree = this.calculateDegree(4, first);
            }
        }

        return degree;
    }
    sliderMoveHandler (event) {
        let deg = event.deg.toFixed(2);
        let area = Math.floor(deg / 60);
        let delta = Math.round((deg % 60) / 60 * 255);
        //  变化规律奇数区域00-FF，偶数区域FF-00
        delta = area % 2 === 0 ? delta : 255 - delta;
        let deltaCode = delta < 10 ? '0' + delta : delta.toString(16);
        let color = '#';
        let cb = this.props.onMove || (() => '');

        this.transformButton(deg);
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
                    <img src={this.props.disabled ? WhiteCirlce : ColorCirlce} alt='circle' />
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
