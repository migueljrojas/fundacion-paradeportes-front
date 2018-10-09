import Layout from '../components/Layout.js';
import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
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

    constructor() {
        super();

        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.setState({
            loading: false
        });
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

        Router.onRouteChangeStart = (url) => handleRouteChange(url);
        Router.onRouteChangeComplete = (url) => handleRouteComplete(url);

        if (!this.props.post[0].title) return <Error statusCode={404} />;

        const isLoading = this.state.loading;

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
                <Notas data={this.props.post[0]} />}
            </Layout>
        );
    }
}

export default PageWrapper(Custom);
