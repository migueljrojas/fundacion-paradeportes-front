import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";
import Contact from "./Contact";
import Paradeportes from "./Paradeportes";
import Empresas from "./Empresas";
import Videos from "./Videos";

const layoutStyle = {
    margin: 0,
    padding: 0
};

const Layout = props => (
    <div>
        <Header />
        <Menu menu={props.menu} />
        {props.children}
        <Paradeportes data={props.paradeportes} />
        <Videos data={props.videos} />
        <Empresas data={props.empresas} />
        <Contact data={props.contact} form={props.form} />
        <Footer />
    </div>
);

export default Layout;
