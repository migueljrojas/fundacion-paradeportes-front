import React, { Component } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import { Config } from '../../config.js';
import fetch from 'isomorphic-unfetch';

class Programas extends Component {
    render() {
        const programasData = this.props.data.acf;
        const programasList = this.props.collection;

        const programas = programasList.map((programa, index) => {
            return (
                <article className='programas__item__wrapper wow fadeInUp' key={index}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-24'>
                            <div className='programas__item'>
                                <div className='programas__item__img'>
                                    <img src={programa.acf.image.url} />
                                </div>
                                <div className='programas__item__data'>
                                    <h2 className='programas__item__title'>
                                        {programa.title.rendered}
                                    </h2>
                                    <p className='programas__item__desc'>
                                        {programa.acf.descripcion}
                                    </p>
                                    <div className='programas__item__actions'>
                                        <Link
                                            as={`/programa/${programa.slug}`}
                                            href={`/custom?slug=${programa.slug}&apiRoute=programas`}
                                        >
                                            <a className='programas__item__actions__info'>Más Información</a>
                                        </Link>
                                        <a href='#' className='programas__item__actions__cta'>Tu Aporte Suma</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </article>
            );
        });

        return(
            <main className='programas'>
                <section className='programas__hero'>
                    <img src={programasData.imagen.url} className='programas__hero__img' />
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xs-24 col-sm-12'>
                                <h1 className='programas__hero__title wow fadeInUp'>
                                    {programasData.title}
                                </h1>
                            </div>
                            <div className='col-xs-24 col-sm-12'>
                                <div className='cta wow fadeInRight'>
                                    <h2 className='cta__title'>Tu aporte suma</h2><a href='/tu-aporte-suma' className='cta__button'>Hacé la diferencia</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='programas__body'>
                    {programas}
                </section>
            </main>
        )
    }
}

export default Programas;
