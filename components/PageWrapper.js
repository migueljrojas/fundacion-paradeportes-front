import React from "react";
import { Config } from "../config.js";
import Router from 'next/router';

const PageWrapper = Comp => (
  class extends React.Component {
    static async getInitialProps(args) {
      let videos;
      let headerMenu;
      let contact;
      let paradeportes;
      let empresas;
      let news;
      let programas;

      if (!headerMenu) {
          const headerMenuRes = await fetch(`${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`);
          const headerMenuJson = await headerMenuRes.json();
          headerMenu = headerMenuJson;
      }

      if (!contact) {
          const contactRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/modules?slug=contacto`);
          const contactJson = await contactRes.json();
          contact = contactJson;
      }


      if (!paradeportes) {
          const paradeportesRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/modules?slug=paradeportes`);
          const paradeportesJson = await paradeportesRes.json();
          paradeportes = paradeportesJson;
      }

      if (!empresas) {
          const empresasRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/modules?slug=empresas`);
          const empresasJson = await empresasRes.json();
          empresas = empresasJson;
      }

      if (!videos) {
          const videosRes = await fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDVNqeG-8VOwmezDfFJE4AZEuT342eeXZU&channelId=UCvIiiZy4RvR3inRJIAhLh5g&part=snippet,id&order=date&maxResults=15`);
          const videosJson = await videosRes.json();
          videos = videosJson;
      }

      if (!news) {
          const newsRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/news?_embed`);
          const newsJson = await newsRes.json();
          news = newsJson;
      }

      if (!programas) {
          const programasRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/programas?_embed`);
          const programasJson = await programasRes.json();
          programas = programasJson;
      }

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
