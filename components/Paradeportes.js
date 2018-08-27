import React, { Component } from "react";
import Link from "next/link";
import { Config } from "../config.js";

class Paradeportes extends Component {

    render() {
        const paradeportesData = this.props.data[0].acf;

        return(
            <section className="paradeportes">
                <div className="container-fluid">
                    <div className="row nopadding">
                        <div className="col-xs-12 col-sm-6">
                            <div className="paradeportes__img">
                                <a href="http://paradeportes.com">
                                    <img src={paradeportesData.image_1.url}/>
                                </a>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <div className="paradeportes__img">
                                <a href="http://paradeportes.com">
                                    <img src={paradeportesData.image_2.url}/>
                                </a>
                            </div>
                        </div>
                        <a
                            href="http://paradeportes.com"
                            className="paradeportes__link"
                        >
                            <span className="paradeportes__link__img">
                                <img src="/static/images/paradeportes-logo.png"/>
                            </span>
                            <span className="paradeportes__link__desc">
                                El sitio del deporte adaptado, inclusivo y paralímpico argentino
                            </span>
                        </a>
                        <div className="col-xs-12 col-sm-6">
                            <div className="paradeportes__img">
                                <a href="http://paradeportes.com">
                                    <img src={paradeportesData.image_3.url}/>
                                </a>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <div className="paradeportes__img">
                                <a href="http://paradeportes.com">
                                    <img src={paradeportesData.image_4.url}/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Paradeportes;
