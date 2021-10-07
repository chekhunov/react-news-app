import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import style from './Footer.module.scss'
export default function Footer() {
    return (
        <section className = {style.footer}>
            <div className="container">
                <p className={classNames("unselectable", style.copy)}>
                    <Link to="/">
                    <span className="logo">News App</span>
                    </Link>

                     2021 copyright all rights reserved
                </p>
            </div>
        </section>
    )
}
