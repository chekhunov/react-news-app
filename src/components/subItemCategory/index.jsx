import React from 'react'
import { Link } from 'react-router-dom'

import style from './SubItemCategory.module.scss'
export default function SubItemCategory({ items, setSelectCategories, burgerShow }) {

    return (
        <>
            {items && items.map((item) => 
            <Link to="/" key={item}>
                <li className={style.subItem} onClick={() =>{setSelectCategories(item); burgerShow()}}>
                {item}
                </li>
            </Link>
            )}
        </>
    )
}
