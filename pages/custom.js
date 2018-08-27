import Layout from '../components/Layout.js';
import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import PageWrapper from '../components/PageWrapper.js';
import Menu from '../components/Menu.js';
import { Config } from '../config.js';
import Notas from '../components/page-content/Notas';

class Custom extends Component {
    static async getInitialProps(context) {
        const { slug, apiRoute } = context.query;
        const res = await fetch(
            `${Config.apiUrl}/wp-json/wp/v2/${apiRoute}?slug=${slug}`
        );
        const post = await res.json();
        return { post };
    }

    render() {
        if (!this.props.post[0].title) return <Error statusCode={404} />;

        return (
            <Layout
                contact={this.props.contact}
                menu={this.props.headerMenu}
                pageClass={this.props.post.slug}
                videos={this.props.videos}
                paradeportes={this.props.paradeportes}
                empresas={this.props.empresas}
            >
            <Notas data={this.props.post[0]} />
            </Layout>
        );
    }
}

export default PageWrapper(Custom);
