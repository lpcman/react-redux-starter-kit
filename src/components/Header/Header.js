import React from 'react';
import leftImg from './assets/arrow-left.png';
import moreImg from './assets/dot-three.png';
import './Header.scss';

export default class Header extends React.Component {

    render(){
        return (
            <div className="main-header" style={{ backgroundColor: this.props.bgColor || "#23c0b1" }}>
                <img
                    src={leftImg} alt="返回" className="img-btn back-btn"
                    onClick={(e) => this.props.leftHandler(e) }
                />
                <div className="header-title"
                     style={{ color: this.props.titleColor || "#fff" }}>{this.props.title}</div>
                <img
                    src={moreImg} alt="返回" className="img-btn more-btn"
                    onClick={(e) => this.props.rightHandler(e) }
                />
            </div>
        );
    }
}

Header.propTypes = {
    title: React.PropTypes.string.isRequired,
    bgColor: React.PropTypes.string,
    titleColor: React.PropTypes.string,
    leftHandler: React.PropTypes.func.isRequired,
    rightHandler: React.PropTypes.func.isRequired
};
