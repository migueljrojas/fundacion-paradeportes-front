import Link from "next/link";

const Footer = () => (
    <footer className="footer">
        <ul className="footer__social">
          <li><a target="_blank" href="https://www.facebook.com/Paradeportes"><i className="fa fa-facebook"></i></a></li>
          <li><a target="_blank" href="https://twitter.com/@ParaDeportesOK"><i className="fa fa-instagram"></i></a></li>
          <li><a target="_blank" href="https://www.instagram.com/paradeportes/"><i className="fa fa-twitter"></i></a></li>
          <li><a target="_blank" href="https://www.youtube.com/channel/UCvIiiZy4RvR3inRJIAhLh5g"><i className="fa fa-youtube"></i></a></li>
        </ul>
        <p className="footer__copy">&reg; Fundación Paradeportes, 2018. Todos los derechos reservados</p>
    </footer>
);

export default Footer;
