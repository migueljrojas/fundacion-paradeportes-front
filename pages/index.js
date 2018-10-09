import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Router from 'next/router';
import Link from "next/link";
import PageWrapper from "../components/PageWrapper.js";
import { Config } from "../config.js";
import Home from "../components/page-content/Home.js";

class Index extends Component {
    static async getInitialProps(context) {
        const pageRes = await fetch(
            `${Config.apiUrl}/wp-json/postlight/v1/page?slug=home`
        );
        const page = await pageRes.json();
        const postsRes = await fetch(
            `${Config.apiUrl}/wp-json/wp/v2/posts?_embed`
        );
        const posts = await postsRes.json();
        const pagesRes = await fetch(
            `${Config.apiUrl}/wp-json/wp/v2/pages?_embed`
        );
        const pages = await pagesRes.json();
        return { page, posts, pages };
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

        const isLoading = this.state.loading;


        return (
            <Layout
                menu={this.props.headerMenu}
                contact={this.props.contact}
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
                <Home
                    data={this.props.page}
                    news={this.props.news}
                />}

            </Layout>
        );
    }
}

export default PageWrapper(Index);
