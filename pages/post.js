import Layout from '../components/Layout.js';
import React, { Component } from 'react';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import PageWrapper from '../components/PageWrapper.js';
import Menu from '../components/Menu.js';
import { Config } from '../config.js';
import Nosotros from '../components/page-content/Nosotros';
import Mision from '../components/page-content/Mision';
import Programas from '../components/page-content/Programas';
import Novedades from '../components/page-content/Novedades';
import Galeria from '../components/page-content/Galeria';
import Aporte from '../components/page-content/Aporte';
import Notas from '../components/page-content/Notas';

class Post extends Component {
    static async getInitialProps(context) {
        const { slug, apiRoute } = context.query;
        const res = await fetch(`${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`);
        const post = await res.json();
        return { post };
    }

    constructor() {
        super();

        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.setActivePage();
        this.setState({
            loading: false
        });
    }

    setActivePage() {
        const location = `/${this.props.post.slug}`;
        const menuLinks = [].slice.call(document.querySelectorAll('.header__menu li a'));
        const activeLink = menuLinks.find(link => {
            return link.getAttribute('href') === location;
        });

        menuLinks.forEach(link => {
            link.parentNode.classList.remove('-active');
        });

        activeLink.parentNode.classList.add('-active');
    }

    getPageContent(data) {
        const page = data.slug;

        switch (page) {
            case 'nosotros':
                return <Nosotros data={data} />
                break;
            case 'mision':
                return <Mision data={data} />
                break;
            case 'programas':
                return <Programas data={data} collection={this.props.programas} />
                break;
            case 'novedades':
                return <Novedades data={data} collection={this.props.news} />
                break;
            case 'galeria':
                return <Galeria data={data} />
                break;
            case 'tu-aporte-suma':
                return <Aporte data={data} />
                break;
            default:
                return <Notas data={data} />
        }
    }

    render() {
        const handleRouteChange = url => {
            this.setState({
                loading: true
            });
            console.log('App is changing to: ', url);
        }

        const handleRouteComplete = url => {
            this.setState({
                loading: false
            });
            console.log('App changed to: ', url);
        }

        const isLoading = this.state.loading;

        Router.onRouteChangeStart = (url) => handleRouteChange(url);
        Router.onRouteChangeComplete = (url) => handleRouteComplete(url);

        if (!this.props.post.title) return <Error statusCode={404} />;

        return (
            <Layout
                contact={this.props.contact}
                menu={this.props.headerMenu}
                pageClass={this.props.post.slug}
                videos={this.props.videos}
                paradeportes={this.props.paradeportes}
                empresas={this.props.empresas}
            >
            {isLoading &&
                <div className="loading">
                    <div className="loading__box">
                        <div className="loading__ring"><div></div><div></div><div></div><div></div></div>
                        <span className="loading__text">
                            {'Cargando...'}
                        </span>
                    </div>
                </div>
            }

            {!isLoading &&
                this.getPageContent(this.props.post)}
            </Layout>
        );
    }
}

export default PageWrapper(Post);
