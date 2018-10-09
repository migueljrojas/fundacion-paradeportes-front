import React, { Component } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';

class Notas extends Component {

    render() {
        const notaData = this.props.data;

        return(
            <main className='nota'>
                <section className='nota__body'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-24 col-sm-20 col-sm-offset-2 col-md-16 col-md-offset-4'>
                            <div className='nota__img'>
                                <img src={notaData.acf.image.url} />
                            </div>
                            <h1 className='nota__title'>
                                {notaData.title.rendered}
                            </h1>
                        </div>
                        <div
                            className='col-xs-24 col-sm-20 col-sm-offset-2 col-md-16 col-md-offset-4'
                            dangerouslySetInnerHTML={{
                                __html: notaData.acf.content
                            }}
                        />
                    </div>
                </div>
                </section>
            </main>
        )
    }
}

export default Notas;
