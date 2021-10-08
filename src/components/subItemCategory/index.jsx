import React from 'react'

import style from './SubItemCategory.module.scss'
export default function SubItemCategory({ items, setSelectCategories }) {


    return (
        <>
            {items && items.map((item) => 
            <li className={style.subItem} key={item} onClick={() => setSelectCategories(item)}>
            {item}
            </li>
            )}
        </>
    )
}
