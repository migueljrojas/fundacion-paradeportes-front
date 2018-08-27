import React, { Component } from 'react';
import Link from 'next/link';
import { Config } from '../config.js';
import Slider from "react-slick";

class Empresas extends Component {

    render() {
        const videoSliderSettings = {
            dots: true,
            infinite: true,
            arrows: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
            autoplay: false,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        centerMode: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        }

        const videosRaw = this.props.data.items;
        const videos = videosRaw.map((video, index) => {
            return(
                <div className="home__videos__slide" key={index}>
                    <div className="home__videos__item">
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe src={`https://www.youtube.com/embed/${video.id.videoId}`} className="embed-responsive-item"></iframe>
                        </div>
                    </div>
                </div>
            );
        });

        return(
            <section className="home__videos">
            <div className="container">
                <div className="row">
                    <div className="col-xs-24">
                        <Slider
                            {...videoSliderSettings}
                            className="_slidermulti home__videos__slider"
                        >
                            {videos}
                        </Slider>
                    </div>
                </div>
            </div>
            </section>
        )
    }
}

export default Empresas;
