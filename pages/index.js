import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
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

    render() {
        return (
            <Layout
                menu={this.props.headerMenu}
                contact={this.props.contact}
                videos={this.props.videos}
                paradeportes={this.props.paradeportes}
                empresas={this.props.empresas}
            >
                <Home
                    data={this.props.page}
                    news={this.props.news}
                />
            </Layout>
        );
    }
}

export default PageWrapper(Index);
