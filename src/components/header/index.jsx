import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import {SubItemCategory, CloseButton } from '../'


import style from './Header.module.scss'
export default function Header({ setSelectCategories, filter, setFilter, filteredList, handleSubmit }) {
    const [isBurger, setIsBurger] = useState(false)
    const [menuShow, setMenuShow] = useState(false)
    const [removeSearch, setRemoveSearch] = useState("");

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

                        <div className={classNames(style.headerFind, "header-find")}>
                            <span className="icon-find" onClick={() => filteredList(filter)}></span>

                            <label htmlFor="find">
                                <input 
                                id="find" 
                                className="find-input"
                                type="text" 
                                value={filter} 
                                onChange={(e) => setFilter(e.target.value)}
                                placeholder="Type something to start search"
                                />
                            </label>

                            <CloseButton handleSubmit={handleSubmit}/>
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
                                    burgerShow={burgerShow}
                                    />

                                </ul>
                                </span>
                            </li>

                            <li className={style.item} onClick={() => {setSelectCategories('trending'); burgerShow()}}>
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
