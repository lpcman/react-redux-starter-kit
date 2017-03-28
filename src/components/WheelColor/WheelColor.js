import React from 'react';
import Chroma from 'chroma-js';
import './WheelColor.scss';
import MoonSlider from './moon-slider';
import ColorCirlce from './assets/色环@2x.png';
import WhiteCirlce from './assets/调控@2x.png';

export default class WheelColor extends React.Component {
    componentDidMount () {
        // let remUnit =
        // parseFloat(window.getComputedStyle(this.refs.wheelWrapper, null).getPropertyValue('font-size'));
        let defaultOpt = {
            min_value: 0,
            max_value: 360,
            radius: 116,
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
        // let factor = area % 2 === 0 ? 1 : -1;
        let delta = parseInt(deltaCode, 16) / 256;
        delta = area % 2 === 0 ? delta : 1 - delta;
        let deltaDegree = delta * 60;

        return start + deltaDegree;
    }
    translateColorToDegree (color) {
        let degree = Chroma(color).hsl()[0];
        
        return degree;
    }
    sliderMoveHandler (event) {
        let deg = event.deg || 0;
        deg = deg.toFixed(2);
        let color = Chroma.hsl(deg, 1, 0.6).toString();
        let cb = this.props.onMove || (() => '');

        this.transformButton(deg);
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
                <div className='wheel' id={this.props.disabled ? 'disabledWheelPanel' : 'wheelPanel'}>
                    <img className='wheel-img' src={this.props.disabled ? WhiteCirlce : ColorCirlce}
                        alt='circle' />
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
