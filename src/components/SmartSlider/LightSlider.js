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
import darkX from './assets/暗度@3x.png';
import bright from './assets/明度@2x.png';
import brightX from './assets/明度@3x.png';
import 'rc-slider/assets/index.css';
import './LightSlider.scss';

export const LightSlider = (props) => (
    <div className='smart-slider'>
        <picture>
            <source
                media='(min-width: 414px)'
                srcSet={darkX} />
            <source
                media='(min-width: 375px)'
                srcSet={dark} />
            <img
                alt='dark icon'
                className='sliderIcon sliderLeftImg'
                src={dark} />
        </picture>
        <Slider {...props} className='light-slider' />
        <picture>
            <source
                media='(min-width: 414px)'
                srcSet={brightX} />
            <source
                media='(min-width: 375px)'
                srcSet={bright} />
            <img
                alt='bright icon'
                className='sliderIcon sliderRightImg'
                src={bright} />
        </picture>
    </div>
);

export default LightSlider;
