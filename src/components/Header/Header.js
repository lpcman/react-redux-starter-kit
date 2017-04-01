import React from 'react';
import leftImg from './assets/arrow-left@2x.png';
import leftImg3x from './assets/arrow-left@3x.png';
import leftImgBlack from './assets/arrow-left-black@2x.png';
import leftImgBlack3x from './assets/arrow-left-black@3x.png';
import moreImg from './assets/dot-three@2x.png';
import moreImg3x from './assets/dot-three@3x.png';
import moreImgBlack from './assets/dot-three-black@2x.png';
import moreImgBlack3x from './assets/dot-three-black@3x.png';
import './Header.scss';

export default class Header extends React.Component {

    render () {
        let arrowLeftImg2x = this.props.reverse ? leftImgBlack : leftImg;
        let arrowLeftImg3x = this.props.reverse ? leftImgBlack3x : leftImg3x;
        let moreImg2x = this.props.reverse ? moreImgBlack : moreImg;
        let more3xImg = this.props.reverse ? moreImgBlack3x : moreImg3x;
        return (
            <div className='main-header' style={{ backgroundColor: this.props.bgColor }}>
                <div className='img-btn'
                    onTouchStart={(e) => this.props.leftHandler(e)}>
                    <picture>
                        <source
                            media='(min-width: 414px)'
                            srcSet={arrowLeftImg3x} />
                        <source
                            media='(min-width: 375px)'
                            srcSet={arrowLeftImg2x} />
                        <img
                            alt='返回' className='back-btn'
                            src={arrowLeftImg2x} />
                    </picture>
                </div>
                <div className='header-title'
                    style={{ color: this.props.titleColor }}>{this.props.title}</div>
                <div
                    className='img-btn'
                    onTouchStart={(e) => this.props.rightHandler(e)}>
                    <picture>
                        <source
                            media='(min-width: 414px)'
                            srcSet={more3xImg} />
                        <source
                            media='(min-width: 375px)'
                            srcSet={moreImg2x} />
                        <img
                            alt='更多' className='more-btn'
                            src={moreImg2x} />
                    </picture>
                </div>
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
    bgColor: '#ffffff',
    titleColor: '#242424',
    reverse: false
};
