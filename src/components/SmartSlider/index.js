import React from 'react';
import LightSlider from './LightSlider';
import VoiceSlider from './VoiceSlider';

export const LIGHT = 'LIGHT_SLIDER';
export const VOICE = 'VOICE_SLIDER';

export const SliderType = {
  LIGHT, VOICE
};

function SmartSlider(props) {

  if (props.type === LIGHT) {
    return <LightSlider {...props} />;
  }

  if(props.type === VOICE){
    return <VoiceSlider {...props}/>;
  }
}

SmartSlider.propTypes = {
  type: React.PropTypes.oneOf([
    LIGHT,
    VOICE
  ]).isRequired
};

export default SmartSlider;
