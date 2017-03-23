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
import dark from './assets/暗度@2x.png';
import bright from './assets/明度@2x.png';
import 'rc-slider/assets/index.css';
import './LightSlider.scss';

export const LightSlider = (props) => (
    <div className='smart-slider'>
        <img
            alt='dark icon'
            className='sliderIcon sliderLeftImg'
            src={dark} />
        <Slider {...props} className='light-slider' />
        <img
            alt='bright icon'
            className='sliderIcon sliderRightImg'
            src={bright} />
    </div>
);

export default LightSlider;
