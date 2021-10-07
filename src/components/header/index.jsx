import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'


import style from './Header.module.scss'
export default function Header() {
    const [isBurger, setIsBurger] = useState(false)
    const [menuShow, setMenuShow] = useState(false)
    function burgerShow() {
       setIsBurger(!isBurger)
       if(isBurger) {
        setMenuShow(true)
       }
       return
    }

    return (
        <section className={style.header}>
            <div className="container">
                <div className={style.headerInner}>
                    <div className={classNames(style.headerBlock, "header-block")}>
                        <Link to="/">
                            <span className="logo">News App</span>
                        </Link>

                        <div className={style.headerFind}>
                            <span className="icon-find"></span>

                            <label htmlFor="find">
                                <input id="find" type="text" value='' placeholder="Type something to start search"/>
                            </label>
                        </div>
                    </div>

                   {isBurger &&
                    <nav className={style.menu}>
                        <ul className={style.list}>
                            <li className={style.item}>
                                Categories
                            </li>

                            <li className={style.item}>
                                ⚡️ Trending news
                            </li>
                        </ul>
                    </nav>}

                    <div className="burger-wrap" onClick={() => burgerShow()}>
                        <div 
                        className={classNames("burger", isBurger && "active")} 
                        >
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
