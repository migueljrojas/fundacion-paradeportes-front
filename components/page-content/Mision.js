import React, { Component } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';

class Nosotros extends Component {

    render() {
        const nosotrosData = this.props.data.acf;

        return(
            <main className='nosotros'>
                <section className='nosotros__hero'>
                    <img
                        src={nosotrosData.imagen.url}
                        className='nosotros__hero__img'
                    />
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xs-24 col-sm-12'>
                                <h1 className='nosotros__hero__title wow fadeInUp'>
                                    {nosotrosData.title}
                                </h1>
                            </div>
                            <div className='col-xs-24 col-sm-12'>
                                <div className='cta wow fadeInRight'>
                                  <h2 className='cta__title'>Tu aporte suma</h2>
                                  <a href='#' className='cta__button'>Hacé la diferencia</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='nosotros__body'>
                    <div className='container'>
                        <div className='row'>
                            <div
                                className='col-xs-24 col-sm-20 col-sm-offset-2 col-md-16 col-md-offset-4'
                                dangerouslySetInnerHTML={{
                                    __html: nosotrosData.contenido_top
                                }}
                            />
                            <div className='col-xs-24 col-sm-20 col-md-16'>
                                <div className='nosotros__quote wow fadeInLeft'>
                                    <p className='nosotros__quote__text'>{nosotrosData.frase}</p>
                                </div>
                            </div>
                            <div
                                className='col-xs-24 col-sm-20 col-sm-offset-2 col-md-16 col-md-offset-4'
                                dangerouslySetInnerHTML={{
                                    __html: nosotrosData.contenido_middle
                                }}
                            />
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

export default Nosotros;
