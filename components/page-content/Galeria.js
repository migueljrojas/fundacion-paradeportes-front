import React, { Component } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';

class Galeria extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isModalOpen: false,
            limit: 0
        };

        this.openImageModal = this.openImageModal.bind(this);
        this.closeImageModal = this.closeImageModal.bind(this);
        this.nextImage = this.nextImage.bind(this);
        this.prevImage = this.prevImage.bind(this);
    }

    componentDidMount() {
        const limit = this.props.data.acf.images.length;
        this.setState({
            ...this.state,
            limit
        });
    }

    nextImage() {
        const index = this.state.photoIndex;
        const limit = this.state.limit;

        if (index < limit) {
            this.setState({
                ...this.state,
                photoIndex: (index + 1) % limit
            });
        }
    }

    prevImage() {
        const index = this.state.photoIndex;

        if (index > 0) {
            this.setState({
                ...this.state,
                photoIndex: index - 1
            });
        }
    }

    openImageModal(el) {
        const index = el.target.getAttribute('index');

        this.setState({
            ...this.state,
            photoIndex: index,
            isModalOpen: true
        });
    }

    closeImageModal() {
        this.setState({
            ...this.state,
            photoIndex: 0,
            isModalOpen: false
        });
    }

    render() {
        const { photoIndex, isModalOpen } = this.state;
        const galeriaData = this.props.data.acf;
        const images = galeriaData.images.map(image => image.url);
        const imagesObj = galeriaData.images.map((image, index) => {
            return (
                <div className='col-xs-12 col-sm-6' key={index}>
                    <div className='galeria__item'>
                        <a className='iLightBox'>
                            <img src={image.sizes.medium} index={index} />
                        </a>
                    </div>
                </div>
            );
        });

        return(
            <main className='galeria'>
            <section className='galeria__hero'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-24 col-sm-12'>
                            <h1 className='galeria__hero__title'>
                                {galeriaData.title}
                            </h1>
                        </div>
                        <div className='col-xs-24 col-sm-12'>
                            <div className='cta wow fadeInRight'>
                                <h2 className='cta__title'>Tu aporte suma</h2>
                                <a href='/tu-aporte-suma' className='cta__button'>Hacé la diferencia</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='galeria__body'>
                <div className='container-fluid'>
                    <div className='row nopadding' onClick={this.openImageModal}>
                        {imagesObj}
                    </div>
                </div>
            </section>
            {isModalOpen &&
                <div className='fpd-modal'>
                    <div
                        className='fpd-modal__backdrop'
                        onClick={this.closeImageModal}
                    />
                    <div className='fpd-modal__container'>
                        <button
                            className='fpd-modal__close'
                            onClick={this.closeImageModal}
                        />
                        <div className='fpd-modal__container__img'>
                            <img src={images[photoIndex]} />
                        </div>
                    </div>
                    <div className='fpd-modal__nav'>
                        {
                            photoIndex > 0 &&
                                <button
                                className='fpd-modal__nav__btn fpd-modal__nav__btn--prev'
                                onClick={this.prevImage}
                                />
                        }
                        {
                            photoIndex < images.length - 1 &&
                                <button
                                    className='fpd-modal__nav__btn fpd-modal__nav__btn--next'
                                    onClick={this.nextImage}
                                />
                        }
                    </div>
                </div>
            }
            </main>
        )
    }
}

export default Galeria;
