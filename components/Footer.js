import Link from "next/link";

const Footer = () => (
    <footer className="footer">
        <ul className="footer__social">
          <li><a href="https://facebook.com"><i className="fa fa-facebook"></i></a></li>
          <li><a href="https://facebook.com"><i className="fa fa-instagram"></i></a></li>
          <li><a href="https://facebook.com"><i className="fa fa-twitter"></i></a></li>
          <li><a href="https://facebook.com"><i className="fa fa-youtube"></i></a></li>
        </ul>
        <p className="footer__copy">&reg; Fundación Paradeportes, 2018. Todos los derechos reservados</p>
    </footer>
);

export default Footer;
