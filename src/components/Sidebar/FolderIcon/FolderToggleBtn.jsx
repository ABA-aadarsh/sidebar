import React, { useState } from 'react'
import style from "./FolderToggleBtn.module.css"
import { FaAngleDown, FaAngleUp, FaFolder, FaFolderOpen } from 'react-icons/fa'

function FolderToggleBtn({onclick}) {
  const [open,setOpen]=useState(true)
  return (
    <>
    <button
        className={style.btn}
        onClick={(e)=>{
          onclick(e)
          setOpen(prev=>!prev)
        }}
    >
        {
            open==false?
            <FaAngleDown/>
            :<FaAngleUp/>
        }
    </button>
    {
      open?
      <FaFolderOpen/>
      :<FaFolder/>
    }
    </>
  )
}

export default FolderToggleBtn