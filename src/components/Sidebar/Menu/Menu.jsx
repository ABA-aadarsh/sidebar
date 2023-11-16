import React from 'react'
import style from "./Menu.module.css"

function Menu() {
  return (
    <div className={style.menu}>
        <ul>
            <li className={style.option}>New folder</li>
            <li className={style.option}>New file</li>
            <li className={style.option}>Random</li>
            <li className={style.option}>Totally random</li>
        </ul>
    </div>
  )
}

export default Menu