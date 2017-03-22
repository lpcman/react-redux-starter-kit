/**
 * File Created by lpcma at 2017/3/21.
 * Copyright 2016 CMCC Corporation Limited.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of
 * ZYHY Company. ("Confidential Information").  You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license.
 *
 *
 * @Desc
 * @author lpcma
 * @date 2017/3/21
 * @version
 */

import React from 'react';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import './VoiceSlider.scss';

export const VoiceSlider = (props) => (
  <div className="smart-slider">
    <Slider {...props} className='voice-slider'/>
  </div>
);

export default VoiceSlider;
