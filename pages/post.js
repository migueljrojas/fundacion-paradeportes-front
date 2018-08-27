import Layout from '../components/Layout.js';
import React, { Component } from 'react';
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
import Notas from '../components/page-content/Notas';

class Post extends Component {
    static async getInitialProps(context) {
        const { slug, apiRoute } = context.query;
        const res = await fetch(`${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`);
        const post = await res.json();
        return { post };
    }

    componentDidMount() {
        this.setActivePage();
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
            default:
                return <Notas data={data} />
        }
    }

    render() {
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
            {this.getPageContent(this.props.post)}
            </Layout>
        );
    }
}

export default PageWrapper(Post);
