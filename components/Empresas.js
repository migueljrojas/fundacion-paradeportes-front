import React, { Component } from 'react';
import Link from 'next/link';
import { Config } from '../config.js';

class Empresas extends Component {

    render() {
        const empresasData = this.props.data[0].acf;
        const logos = empresasData.logos.map((logo, index) => {
            return (
                <li className='empresas__item' key={index}>
                    <div className='empresas__item__logo'>
                        <img src={logo.url} alt={logo.title}/>
                    </div>
                </li>
            );
        });

        return(
            <section className='empresas'>
            <div className='container-fluid'>
                <div className='row nopadding'>
                    <div className='col-xs-24 col-sm-6 col-md-4'>
                        <div className='empresas__heading'>
                            <h3 className='empresas__heading__title'>Ellos  <strong>también suman</strong></h3>
                        </div>
                    </div>
                    <div className='col-xs-24 col-sm-18 col-md-20'>
                        <div className='empresas__list__wrapper'>
                            <ul className='empresas__list'>
                                {logos}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        )
    }
}

export default Empresas;
