import React, { Component } from 'react';
import Link from 'next/link';
import { Config } from '../config.js';
import Slider from 'react-slick';
import oauthSignature from 'oauth-signature';
import wpapi from 'wpapi';

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            message: '',
            submitEnabled: false,
            formSubmitted: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.isSubmitEnabled = this.isSubmitEnabled.bind(this);
    }

    submitForm(event) {
        event.preventDefault();
        console.log('submit');

        const { name, email, message } = this.state;
        const url = `${Config.apiUrl}/wp-json/wp/v2/messages`;

        let formData = new FormData();
        formData.append('title', `${name} - ${email}`);
        formData.append('status', 'publish');
        formData.append('content', message);

        fetch(url, {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                'Authorization': `Basic QWRtaW46UGFyYWQzcDBydDM1`
            },
            body: formData
        }).then(res => res.json())
        .catch(error => {
            console.error('Error:', error);
        })
        .then(response => {
            console.log('Success');
            this.setState({formSubmitted: true});
        });

    }

    handleChange(event) {
        const key = event.target.name;
        const value = event.target.value;

        this.setState({[key]:[value]});
        this.isSubmitEnabled();
    }

    isSubmitEnabled() {
        const { name, email, message } = this.state;

        if ( name && email && message ) {
            this.setState({submitEnabled: true});
        } else {
            this.setState({submitEnabled: false});
        }
    }

    render() {
        const contactData = this.props.data[0].acf;
        const sliderSettings = {
            dots: true,
            fade: true,
            arrows:  false,
            infinite: true,
            autoplay: true
        }
        const slides = contactData.slider.map((slide, index) => {
            return (
                <div className='contacto__slide' key={index}>
                    <div className='contacto__slide__img'>
                        <img
                            src={slide.image.url}
                            alt={slide.image.title}
                        />
                    </div>
                </div>
            );
        });

        return(
            <section id='contacto' className='contacto'>
                <div className='container-fluid'>
                    <div className='row nopadding'>
                        <div className='col-xs-24 col-sm-8 contacto__form__col'>
                            { !this.state.formSubmitted &&
                                <form
                                className='contacto__form'
                                onSubmit={this.submitForm}
                                >
                                    <h2 className='contacto__title'>
                                    {contactData.titulo}
                                    </h2>
                                    <p className='contacto__text'>
                                    {contactData.texto}
                                    </p>
                                    <div className='contacto__form__group'>
                                        <input
                                        className='contacto__form__input'
                                            name='name'
                                            onChange={this.handleChange}
                                            placeholder='Nombre'
                                            type='text'
                                            value={this.state.name}
                                        />
                                        <label className='contacto__form__label'>Nombre</label>
                                    </div>
                                    <div className='contacto__form__group'>
                                        <input
                                            className='contacto__form__input'
                                            name='email'
                                            onChange={this.handleChange}
                                            placeholder='Email'
                                            type='email'
                                            value={this.state.email}
                                        />
                                        <label className='contacto__form__label'>Email</label>
                                    </div>
                                    <div className='contacto__form__group'>
                                        <textarea
                                            className='contacto__form__input contacto__form__input--textarea'
                                            name='message'
                                            onChange={this.handleChange}
                                            placeholder='Mensaje'
                                            value={this.state.message}
                                        />
                                        <label className='contacto__form__label'>Mensaje</label>
                                    </div>
                                    <div className='contacto__form__group'>
                                        <button
                                            className='contacto__form__submit'
                                            disabled={!this.state.submitEnabled}
                                        >
                                            Enviar mensaje
                                        </button>
                                    </div>
                                </form>
                            }
                            {
                                this.state.formSubmitted &&
                                    <div className='contacto__form'>
                                        <h2 className='contacto__title'>Ya recibimos tu mensaje.</h2>
                                        <p className='contacto__text'>Muchas gracias por comunicarte con la Fundación Paradeportes.</p>
                                        <img className="img-responsive" src='/static/images/logo.png' />
                                    </div>
                            }
                        </div>
                        <div className='col-xs-24 col-sm-16'>
                            <Slider
                                {...sliderSettings}
                                className='_slider contacto__slider'
                            >
                                {slides}
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Contact;
