import React, { Component } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';

class Home extends Component {

    componentDidMount() {
        this.initTabs();
    }

    initTabs() {
        const tabSelectors = [].slice.call(document.querySelectorAll('[data-target]'));
        const tabs = [].slice.call(document.querySelectorAll('[data-tab]'));

        tabSelectors[0].classList.add('-active');
        tabs[0].classList.add('-active');
    }

    setActiveTab(el) {
        const currentTabSelector = el.target;
        const tabSelectors = [].slice.call(document.querySelectorAll('[data-target]'));
        const tabs = [].slice.call(document.querySelectorAll('[data-tab]'));
        const activeTabId = currentTabSelector.getAttribute('data-target');
        const activeTab = tabs.find(tab => {
            return tab.getAttribute('data-tab') === activeTabId;
        });

        tabs.forEach(tab => {
            tab.classList.remove('-active');
        });

        tabSelectors.forEach(tabSelector => {
            tabSelector.classList.remove('-active');
        });

        currentTabSelector.classList.add('-active');
        activeTab.classList.add('-active');
    }

    render() {
        const homeData = this.props.data.acf;
        const homeNews = this.props.news;

        const sliderSettings = {
            dots: true,
            fade: true,
            arrows:  false,
            infinite: true,
            autoplay: true
        }

        const newsSliderSettings = {
            dots: true,
            infinite: true,
            arrows: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
            autoplay: true,
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

        const randomSlides = homeData.slider.sort(() => .5 - Math.random());

        const slides = randomSlides.map((slide, index) => {
            return (
                <div className="home__hero__slide" key={index}>
                    <div className="home__hero__slide__img">
                        <img
                            src={slide.imagen.url}
                            alt={slide.imagen.title}
                        />
                    </div>
                </div>
            );
        });

        const tabsSwitch = homeData.tabs.map((tab, index) => {
            return (
                <li
                    data-target={`tab-${index}`}
                    key={index}
                    onClick={this.setActiveTab}
                >
                    <span>{tab.nombre}</span>
                </li>
            );
        });

        const tabs = homeData.tabs.map((tab, index) => {
            const tabLink = tab.link.replace(/^.*\/\/[^\/]+/, '');
            return (
                <div data-tab={`tab-${index}`} className="home__fundacion__tabs__content" key={index}>
                    <h3 className="home__fundacion__tabs__title">{tab.nombre}</h3>
                    <p className="home__fundacion__tabs__text">
                        {tab.texto}
                    </p>
                    <Link href={tabLink}>
                        <a className="home__fundacion__tabs__link">Descubre más</a>
                    </Link>
                </div>
            );
        });

        const notas = homeNews.map((nota, index) => {
            return (
                <div className="home__news__slide" key={index}>
                    <article className="home__news__article">
                        <div className="home__news__article__img">
                            <Link
                                as={`/nota/${nota.slug}`}
                                href={`/custom?slug=${nota.slug}&apiRoute=news`}
                            >
                                <a>
                                    <img src={nota.acf.image.url} />
                                </a>
                            </Link>
                        </div>
                        <Link
                            as={`/nota/${nota.slug}`}
                            href={`/custom?slug=${nota.slug}&apiRoute=news`}
                        >
                            <a>
                                <h3 className="home__news__article__title">
                                    {nota.title.rendered}
                                </h3>
                            </a>
                        </Link>
                        <Link
                            as={`/nota/${nota.slug}`}
                            href={`/custom?slug=${nota.slug}&apiRoute=news`}
                        >
                            <a>
                                <p className="home__news__article__text">
                                    {nota.acf.excerpt}
                                </p>
                            </a>
                        </Link>
                        <Link
                            as={`/nota/${nota.slug}`}
                            href={`/custom?slug=${nota.slug}&apiRoute=news`}
                        >
                            <a className="home__news__article__readmore">Seguir leyendo...</a>
                        </Link>
                    </article>
                </div>
            );
        });

        return(
            <main className='home'>
                <section className="home__hero">
                    <div className="home__hero__slider__wrapper">
                        <Slider
                            {...sliderSettings}
                            className="_slider home__hero__slider"
                        >
                            {slides}
                        </Slider>
                    </div>
                    <div className="home__hero__content">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-24 col-sm-12">
                                    <div className="home__hero__logo wow fadeInLeft">
                                        <img
                                            src="/static/images/logo-white.png"
                                            alt="Fundación Paradeportes"
                                            className="img-responsive"
                                        />
                                    </div>
                                    <h1
                                        className="home__hero__title wow fadeInLeft"
                                    >
                                        {homeData.quote}
                                        <span>{homeData.quote_author}</span>
                                    </h1>
                                </div>
                                <div className="col-xs-24 col-sm-12">
                                    <div className="cta wow fadeInRight">
                                        <h2 className="cta__title">Tu aporte suma</h2><a href="#" className="cta__button">Hacé la diferencia</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="home__fundacion">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-24">
                                <h2 className="section-title">La fundacion</h2>
                            </div>
                            <div className="col-xs-24 col-sm-16">
                                <div className="home__fundacion__tabs wow fadeInUp">
                                    <ul className="home__fundacion__tabs__selector">
                                        {tabsSwitch}
                                    </ul>
                                    <div className="home__fundacion__tabs__wrapper">
                                        {tabs}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-24 col-sm-8">
                                <div className="home__fundacion__logo">
                                    <img src="/static/images/logo.png" className="img-responsive wow fadeInUp" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="home__news">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-24">
                                <h2 className="section-title">Novedades</h2>
                            </div>
                        </div>
                        <div className="row nopadding">
                            <div className="col-xs-24">
                                <Slider
                                    {...newsSliderSettings}
                                    className="_slidermulti home__news__slider"
                                >
                                    {notas}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

export default Home;
