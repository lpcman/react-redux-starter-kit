import React from 'react';
import SmartSlider, { SliderType } from '../../../components/SmartSlider';
import DuckImage from '../assets/Duck.jpg';
import './HomeView.scss';

class HomeView extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            sliderValue: this.props.defaultValue || 20
        };

        this.handleSlider = this.handleSlider.bind(this);
    }

    handleSlider (value) {
        this.setState({ sliderValue: value });
    }

    render () {
        return (
          <div>
            <h4>Welcome! {this.state.sliderValue}</h4>
            <img
              alt='This is a duck, because Redux!'
              className='duck'
              src={DuckImage} />
            <SmartSlider
              type={SliderType.LIGHT}
              min={0}
              max={100}
              defaultValue={this.state.sliderValue}
              onChange={this.handleSlider}
        />
          </div>
        );
    }
}

export default HomeView;
