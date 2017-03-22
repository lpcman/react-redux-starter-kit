/**
 * File Created by cherish at 2017-03-21.
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
 * @author cherish
 * @date 2017-03-21
 * @version
 */
import controlImg from './assets/control@2x.png';
import discontrolImg from './assets/discontrol@2x.png';
import chartImg from './assets/chart@2x.png';
import timerImg from './assets/timer@2x.png';
import situationImg from './assets/situation@2x.png';
const Enum = {
    control: {
        type: 'control',
        bgImage: controlImg
    },
    discontrol: {
        type: 'discontrol',
        bgImage: discontrolImg
    },
    chart: {
        type: 'chart',
        bgImage: chartImg
    },
    timer: {
        type: 'timer',
        bgImage: timerImg
    },
    situation: {
        type: 'situation',
        bgImage: situationImg
    }
};
exports.default = Enum;
