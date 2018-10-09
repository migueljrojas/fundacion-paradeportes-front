import React, { Component } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';

class Novedades extends Component {

    generateMainArticles(news) {
        news.map((nota, index) => {

            const date = new Date(nota.date);
            const dateFormatted = date.toLocaleDateString('es-AR');

            return (
                <div className='col-xs-24 col-sm-8' key={index}>
                    <div className='novedades__main__article__img'>
                        <Link
                            as={`/nota/${nota.slug}`}
                            href={`/custom?slug=${nota.slug}&apiRoute=news`}
                        >
                            <a>
                                <img src={nota.acf.image.url} />
                                <span className='novedades__main__article__date'>
                                    {dateFormatted}
                                </span>
                            </a>
                        </Link>
                    </div>
                    <div className='novedades__main__article__data'>
                        <Link
                            as={`/nota/${nota.slug}`}
                            href={`/custom?slug=${nota.slug}&apiRoute=news`}
                        >
                            <a>
                                <h3 className='novedades__main__article__title'>
                                    {nota.title.rendered}
                                </h3>
                                <p className='novedades__main__article__text'>
                                    {nota.acf.excerpt}
                                </p>
                            </a>
                        </Link>
                        <Link
                            as={`/nota/${nota.slug}`}
                            href={`/custom?slug=${nota.slug}&apiRoute=news`}
                        >
                            <a className='novedades__main__article__readmore'>
                                Seguir leyendo...
                            </a>
                        </Link>
                    </div>
                </div>
            );
        });
    }

    generateTopArticle(topArticle) {
        const topArticleDate = new Date(news[0].date);
        const topArticleDateFormatted = topArticleDate.toLocaleDateString('es-AR');

        return (
            <article className='novedades__heading__article'>
                <div className='novedades__heading__article__img'>
                    <Link
                        as={`/nota/${topArticle.slug}`}
                        href={`/custom?slug=${topArticle.slug}&apiRoute=news`}
                    >
                        <a>
                            <img src={topArticle.acf.image.url} />
                        </a>
                    </Link>
                </div>
                <div className='novedades__heading__article__data'>
                    <span className='novedades__heading__article__date'>
                        {topArticleDateFormatted}
                    </span>
                    <Link
                        as={`/nota/${topArticle.slug}`}
                        href={`/custom?slug=${topArticle.slug}&apiRoute=news`}
                    >
                        <a>
                            <h3 className='novedades__heading__article__title'>
                                {topArticle.title.rendered}
                            </h3>
                            <p className='novedades__heading__article__text'>
                                {topArticle.acf.excerpt}
                            </p>
                        </a>
                    </Link>
                    <Link
                        as={`/nota/${topArticle.slug}`}
                        href={`/custom?slug=${topArticle.slug}&apiRoute=news`}
                    >
                        <a className='novedades__heading__article__readmore'>
                            Seguir leyendo...
                        </a>
                    </Link>
                </div>
            </article>
        );
    }

    generateOtherArticles(news) {
        news.map((nota, index) => {
            return (
                <li className='novedades__body__article' key={index}>
                    <div className='novedades__body__article__data'>
                        <Link
                            as={`/nota/${nota.slug}`}
                            href={`/custom?slug=${nota.slug}&apiRoute=news`}
                        >
                            <a>
                                <h3 className='novedades__body__article__title'>
                                    {nota.title.rendered}
                                </h3>
                                <p className='novedades__body__article__text'>
                                    {nota.acf.excerpt}
                                </p>
                            </a>
                        </Link>
                        <Link
                            as={`/nota/${nota.slug}`}
                            href={`/custom?slug=${nota.slug}&apiRoute=news`}
                        >
                            <a className='novedades__body__article__readmore'>
                                Seguir leyendo...
                            </a>
                        </Link>
                    </div>
                </li>
            );
        });
    }

    generateNewsBody(news) {
        if (news.length <= 3) {
            const mainArticles = this.generateMainArticles(news);
            return (
                <section className='novedades__main'>
                    <div className='container'>
                        <div className='row'>
                            {mainArticles}
                        </div>
                    </div>
                </section>
            );
        } else if (news.length <= 4) {
            const topArticle = news[0];
            const mainArticles = news.slice(-3);

            return (
                <div>
                <section className='novedades__heading'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-24'>
                            {this.generateTopArticle(topArticle)}
                        </div>
                    </div>
                </div>
                </section>
                <section className='novedades__main'>
                    <div className='container'>
                        <div className='row'>
                            {this.generateMainArticles(mainArticles)}
                        </div>
                    </div>
                </section>
                </div>
            );
        } else {
            const topArticle = news[0];
            const mainArticles = news.slice(1,4);
            const otherArticles = news.slice(4);

            return (
                <div>
                <section className='novedades__heading'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-24'>
                            {this.generateTopArticle(topArticle)}
                        </div>
                    </div>
                </div>
                </section>
                <section className='novedades__main'>
                    <div className='container'>
                        <div className='row'>
                            {this.generateMainArticles(mainArticles)}
                        </div>
                    </div>
                </section>
                <section className='novedades__body'>
                    <ul className='novedades__body__list'>
                        {this.generateOtherArticles(otherArticles)}
                    </ul>
                </section>
                </div>
            );
        }
    }

    render() {
        const novedadesData = this.props.data.acf;
        const novedadesList = this.props.collection;
        const topArticle = novedadesList[0];
        const mainArticles = novedadesList.slice(1,4);
        const otherArticles = novedadesList.slice(4);

        const topArticleDate = new Date(topArticle.date);
        const topArticleDateFormatted = topArticleDate.toLocaleDateString('es-AR');

        const mainArticlesHtml = mainArticles.map((nota, index) => {
            const date = new Date(nota.date);
            const dateFormatted = date.toLocaleDateString('es-AR');
            return (
                <div className='col-xs-24 col-sm-8' key={index}>
                    <div className='novedades__main__article__img'>
                        <Link
                            as={`/nota/${nota.slug}`}
                            href={`/custom?slug=${nota.slug}&apiRoute=news`}
                        >
                            <a>
                                <img src={nota.acf.image.url} />
                                <span className='novedades__main__article__date'>
                                    {dateFormatted}
                                </span>
                            </a>
                        </Link>
                    </div>
                    <div className='novedades__main__article__data'>
                        <Link
                            as={`/nota/${nota.slug}`}
                            href={`/custom?slug=${nota.slug}&apiRoute=news`}
                        >
                            <a>
                                <h3 className='novedades__main__article__title'>
                                    {nota.title.rendered}
                                </h3>
                                <p className='novedades__main__article__text'>
                                    {nota.acf.excerpt}
                                </p>
                            </a>
                        </Link>
                        <Link
                            as={`/nota/${nota.slug}`}
                            href={`/custom?slug=${nota.slug}&apiRoute=news`}
                        >
                            <a className='novedades__main__article__readmore'>
                                Seguir leyendo...
                            </a>
                        </Link>
                    </div>
                </div>
            );
        });
        const otherArticlesHtml = otherArticles.map((nota, index) => {
            return (
                <li className='novedades__body__article' key={index}>
                    <div className='novedades__body__article__data'>
                        <Link
                            as={`/nota/${nota.slug}`}
                            href={`/custom?slug=${nota.slug}&apiRoute=news`}
                        >
                            <a>
                                <h3 className='novedades__body__article__title'>
                                    {nota.title.rendered}
                                </h3>
                                <p className='novedades__body__article__text'>
                                    {nota.acf.excerpt}
                                </p>
                            </a>
                        </Link>
                        <Link
                            as={`/nota/${nota.slug}`}
                            href={`/custom?slug=${nota.slug}&apiRoute=news`}
                        >
                            <a className='novedades__body__article__readmore'>
                                Seguir leyendo...
                            </a>
                        </Link>
                    </div>
                </li>
            );
        });

        return(
            <main className='novedades'>
                <section className='novedades__hero'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xs-24 col-sm-12'>
                                <h1 className='novedades__hero__title wow fadeInUp'>
                                    {novedadesData.title}
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
                <section className='novedades__heading'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xs-24'>
                                <article className='novedades__heading__article'>
                                    <div className='novedades__heading__article__img'>
                                        <Link
                                            as={`/nota/${topArticle.slug}`}
                                            href={`/custom?slug=${topArticle.slug}&apiRoute=news`}
                                        >
                                            <a>
                                                <img src={topArticle.acf.image.url} />
                                            </a>
                                        </Link>
                                    </div>
                                    <div className='novedades__heading__article__data'>
                                        <span className='novedades__heading__article__date'>
                                            {topArticleDateFormatted}
                                        </span>
                                        <Link
                                            as={`/nota/${topArticle.slug}`}
                                            href={`/custom?slug=${topArticle.slug}&apiRoute=news`}
                                        >
                                            <a>
                                                <h3 className='novedades__heading__article__title'>
                                                    {topArticle.title.rendered}
                                                </h3>
                                                <p className='novedades__heading__article__text'>
                                                    {topArticle.acf.excerpt}
                                                </p>
                                            </a>
                                        </Link>
                                        <Link
                                            as={`/nota/${topArticle.slug}`}
                                            href={`/custom?slug=${topArticle.slug}&apiRoute=news`}
                                        >
                                            <a className='novedades__heading__article__readmore'>
                                                Seguir leyendo...
                                            </a>
                                        </Link>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='novedades__main'>
                    <div className='container'>
                        <div className='row'>
                            {mainArticlesHtml}
                        </div>
                    </div>
                </section>
                <section className='novedades__body'>
                    <ul className='novedades__body__list'>
                        {otherArticlesHtml}
                    </ul>
                </section>
            </main>
        );
    }
}

export default Novedades;
