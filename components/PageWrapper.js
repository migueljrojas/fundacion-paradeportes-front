import React from "react";
import { Config } from "../config.js";
import Router from 'next/router'

Router.onAppUpdated = nextRoute => location.href = nextRoute;

const PageWrapper = Comp => (
  class extends React.Component {
    static async getInitialProps(args) {

      const headerMenuRes = await fetch(`${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`);
      const headerMenu = await headerMenuRes.json();

      const contactRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/modules?slug=contacto`);
      const contact = await contactRes.json();

      const paradeportesRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/modules?slug=paradeportes`);
      const paradeportes = await paradeportesRes.json();

      const empresasRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/modules?slug=empresas`);
      const empresas = await empresasRes.json();

      const videosRes = await fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDVNqeG-8VOwmezDfFJE4AZEuT342eeXZU&channelId=UCvIiiZy4RvR3inRJIAhLh5g&part=snippet,id&order=date&maxResults=15`);
      const videos = await videosRes.json();

      const newsRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/news?_embed`);
      const news = await newsRes.json();

      const programasRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/programas?_embed`);
      const programas = await programasRes.json();

      return {
        headerMenu,
        contact,
        paradeportes,
        news,
        programas,
        empresas,
        videos,
        ...(Comp.getInitialProps ? await Comp.getInitialProps(args) : null),
      };
    }

    render() {
      return (
        <Comp {...this.props} />
      )
    }
  }
)

export default PageWrapper;
