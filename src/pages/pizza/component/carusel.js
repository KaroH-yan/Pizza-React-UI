import React from "react"
import { Carousel } from 'antd';

export default ()=>{
    return(
        <Carousel autoplay>
            <div>
                <img alt="example" src={require(`../../../assets/images/bannerpizza4.jpg`)} className="banner" />
                <span className="banner-of-date"> Discount <b>-25%</b> only Today</span>
            </div>
            <div>
                <img alt="example" src={require(`../../../assets/images/bannerPizza.jpg`)} className="banner" />
                <div className="banner-discount"> Discount <b>-25%</b> only Today</div>
            </div>
            <div>
                <img alt="example" src={require(`../../../assets/images/bannerPizza2.jpg`)} className="banner" />
                <div className="banner-discount banner-of-date">  Only Every Sunday <b>-10%</b></div>
            </div>
            <div>
                <img alt="example" src={require(`../../../assets/images/pizzabanner3.jpg`)} className="banner" />
            </div>
            <div>
                <img alt="example" src={require(`../../../assets/images/pizzabanner5.jpg`)} className="banner" />
            </div>
        </Carousel>
    )
}