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
/*
* <OptionBtn type="chart" onClick={function () {}}/>
* type指定图标类型"control", "discontrol", "chart", "timer"，'situation'
* onClick可以自定义点击事件
* */
import React from 'react';
import Enum from './setting';
import './index.scss';

var arrayList = ['control', 'discontrol', 'chart', 'timer', 'situation'];
export class OptionBtn extends React.Component {
    constructor (props, context) {
        super(props, context);
    // this.state = {
    //   bgImage: ""
    // }
    }
    setBackground=(type) => {
        for (let i = 0; i < arrayList.length; i++) {
            if (type == Enum.default[arrayList[i]].type) {
                return Enum.default[arrayList[i]].bgImage;
            }
        }
        return '';
    // switch (type){
    //   case Enum.default.control.type:
    //     return Enum.default.control.bgImage;
    //     break;
    //   case Enum.default.discontrol.type:
    //     return Enum.default.discontrol.bgImage;
    //     break;
    //   case Enum.default.chart.type:
    //     return Enum.default.chart.bgImage;
    //     break;
    //   case Enum.default.timer.type:
    //     return Enum.default.chart.bgImage;
    //     break;
    //   default:
    //     return "";
    // }
    };

    render () {
        return (
          <div>
            <img className='icon'
              src={this.setBackground(this.props.type)}
              onClick={this.props.onClick} />
          </div>
        );
    }
}

export default OptionBtn;
