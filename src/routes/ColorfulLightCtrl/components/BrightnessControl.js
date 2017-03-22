import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export const BrightnessControl = (props) => (
  <div>
    <div className='light'>
      <p>亮度</p>
      <p>{this.props.brightness}</p>
      <img src='' alt='暗' />
      <Slider onChange={(value) => this.props.onBrightnessChange(value)} />
      <img src='' alt='亮' />
    </div>
  </div>
);

BrightnessControl.propTypes = {
    brightness: React.PropTypes.number.isRequired,
    onBrightnessChange: React.PropTypes.func.isRequired
};

export default BrightnessControl;
