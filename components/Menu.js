import React, { Component } from 'react';
import Link from 'next/link';
import { Config } from '../config.js';
import AnchorLink from 'react-anchor-link-smooth-scroll';

class Menu extends Component {
    constructor() {
        super();
    }

    getSlug(url) {
        const parts = url.split('/');
        return parts.length > 2 ? parts[parts.length - 2] : '';
    }

    handleMobileMenu() {
        const body = document.querySelector('body');
        const header = document.querySelector('.header');

        body.classList.toggle('-hideOverflow');
        header.classList.toggle('-open');
    }

    setActivePage(el) {
        const menuLinks = document.querySelectorAll('.header__menu li');
        const activeLink = el.target;
        menuLinks.forEach(link => {
            link.classList.remove('-active');
        });
        activeLink.parentNode.classList.add('-active');
    }

    render() {
      const menuItems = this.props.menu.items.map((item, index) => {
        if (item.object === 'custom') {
            return (
                <li key={item.ID}>
                    <AnchorLink href={item.url}>
                        {item.title}
                    </AnchorLink>
                </li>
            );
        }
        const slug = this.getSlug(item.url);
        const actualPage = item.object === 'category' ? 'category' : 'post';
        if (slug === 'tu-aporte-suma') {
            return (
                <li key={item.ID}>
                    <Link
                        prefetch
                        as={`/${slug}`}
                        href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
                    >
                        <a
                            className='header__menu__cta'
                            onClick={this.setActivePage}
                        >
                            {item.title}
                        </a>
                    </Link>
                </li>
            );
        }
        return (
            <li key={item.ID}>
                <Link
                    prefetch
                    as={`/${slug}`}
                    href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
                >
                    <a onClick={this.setActivePage}>{item.title}</a>
                </Link>
            </li>
        );
    });

    return(
        <header className='header -ontop'>
        <div className='container header__container'>
            <div className='header__logo'>
                <Link prefetch href='/'>
                    <a>
                        <img src='/static/images/logo-white.png' />
                    </a>
                </Link>
            </div>
            <ul className='header__social'>
                <li><a href='https://facebook.com' target='_blank'><i className='fa fa-facebook'></i></a></li>
                <li><a href='https://facebook.com' target='_blank'><i className='fa fa-instagram'></i></a></li>
                <li><a href='https://facebook.com' target='_blank'><i className='fa fa-twitter'></i></a></li>
                <li><a href='https://facebook.com' target='_blank'><i className='fa fa-youtube'></i></a></li>
            </ul>
            <div className='header__hamburguer' onClick={this.handleMobileMenu}>
                <span></span><span></span><span></span>
            </div>
            <nav className='header__nav'>
                <ul className='header__menu'>
                    {menuItems}
                </ul>
                <ul className='header__nav__social'>
                    <li>
                        <p>Seguínos en:</p>
                    </li>
                    <li><a href='https://facebook.com' target='_blank'><i className='fa fa-facebook'></i></a></li>
                    <li><a href='https://facebook.com' target='_blank'><i className='fa fa-instagram'></i></a></li>
                    <li><a href='https://facebook.com' target='_blank'><i className='fa fa-twitter'></i></a></li>
                    <li><a href='https://facebook.com' target='_blank'><i className='fa fa-youtube'></i></a></li>
                </ul>
            </nav>
        </div>
        </header>
    )
    }
}

export default Menu;
