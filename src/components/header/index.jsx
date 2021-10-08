import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'


import style from './Header.module.scss'
import SubItemCategory from '../subItemCategory'
export default function Header({ setSelectCategories }) {
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
                                <input id="find" type="text"  placeholder="Type something to start search"/>
                            </label>
                        </div>
                    </div>

                  
                    <nav className={classNames(style.menu,"menu", {active: isBurger})}>
                        <ul className={style.list}>
                            <li className={style.item}>
                                Categories

                                <span className={style.subListWrapper}>
                                    <span></span>
                                 <ul className={style.subList}>
                                    <SubItemCategory 
                                    items = {['Sport', 'World', 'Covid', 'Business', 'Politics', 'Science', 'Religion', 'Health']}
                                    setSelectCategories = {setSelectCategories}
                                    />
                                </ul>
                                </span>
                            </li>

                            <li className={style.item}>
                                ⚡️ Trending news
                            </li>
                        </ul>
                    </nav>

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
