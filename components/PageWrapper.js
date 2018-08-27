import React from "react";
import { Config } from "../config.js";

const PageWrapper = Comp => (
  class extends React.Component {
    static async getInitialProps(args) {

      const headerMenuRes = await fetch(`${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`, {mode: 'no-cors'});
      const headerMenu = await headerMenuRes.json();

      const contactRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/modules?slug=contacto`, {mode: 'no-cors'});
      const contact = await contactRes.json();

      const paradeportesRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/modules?slug=paradeportes`, {mode: 'no-cors'});
      const paradeportes = await paradeportesRes.json();

      const empresasRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/modules?slug=empresas`, {mode: 'no-cors'});
      const empresas = await empresasRes.json();

      const videosRes = await fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDVNqeG-8VOwmezDfFJE4AZEuT342eeXZU&channelId=UCvIiiZy4RvR3inRJIAhLh5g&part=snippet,id&order=date&maxResults=15`, {mode: 'no-cors'});
      const videos = await videosRes.json();

      const newsRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/news?_embed`, {mode: 'no-cors'});
      const news = await newsRes.json();

      const programasRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/programas?_embed`, {mode: 'no-cors'});
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
