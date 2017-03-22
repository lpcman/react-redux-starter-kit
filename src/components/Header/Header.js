import React from 'react';
import leftImg from './assets/arrow-left.png';
import leftImgBlack from './assets/arrow-left-black.png';
import moreImg from './assets/dot-three.png';
import moreImgBlack from './assets/dot-three-black.png';
import './Header.scss';

export default class Header extends React.Component {

    render () {
        return (
            <div className='main-header' style={{ backgroundColor: this.props.bgColor }}>
                <img
                    alt='返回' className='img-btn back-btn'
                    src={this.props.reverse ? leftImgBlack : leftImg}
                    onClick={(e) => this.props.leftHandler(e)}
                />
                <div className='header-title'
                    style={{ color: this.props.titleColor }}>{this.props.title}</div>
                <img
                    alt='更多' className='img-btn more-btn'
                    src={this.props.reverse ? moreImgBlack : moreImg}
                    onClick={(e) => this.props.rightHandler(e)}
                />
            </div>
        );
    }
}

Header.propTypes = {
    title: React.PropTypes.string.isRequired,
    bgColor: React.PropTypes.string,
    titleColor: React.PropTypes.string,
    reverse: React.PropTypes.bool,
    leftHandler: React.PropTypes.func.isRequired,
    rightHandler: React.PropTypes.func.isRequired
};

Header.defaultProps = {
    title: '智慧家庭',
    bgColor: '#23c0b1',
    titleColor: '#fff',
    reverse: false
};
