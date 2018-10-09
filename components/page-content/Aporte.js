import React, { Component } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';

class Aporte extends Component {

    render() {
        const aporteData = this.props.data.acf;

        return(
            <main className='nosotros'>
                <section className='nosotros__hero'>
                    <img
                        src={aporteData.imagen.url}
                        className='nosotros__hero__img'
                    />
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xs-24 col-sm-12'>
                                <h1 className='nosotros__hero__title wow fadeInUp'>
                                    {aporteData.title}
                                </h1>
                            </div>
                            <div className='col-xs-24 col-sm-12'>
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
                                    __html: aporteData.contenido_top
                                }}
                            />
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

export default Aporte;
