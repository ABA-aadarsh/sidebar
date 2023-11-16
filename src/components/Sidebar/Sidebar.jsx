import React, { useEffect, useRef, useState } from 'react'
import style from "./Sidebar.module.css"
import {GrDocumentPdf} from "react-icons/gr"
import { FaAngleDown } from "react-icons/fa";
import FolderIcon from './FolderIcon/FolderToggleBtn'
import FolderToggleBtn from './FolderIcon/FolderToggleBtn';
import Menu from './Menu/Menu';

function Sidebar() {
    const [menuOptionActive,setMenuOptionActive]=useState(false)
    const folderStructure={
        name:"root",
        type:"folder",
        child:[
            {
                name:"folder 2",
                type:"folder",
                child:[
                    {
                        name:"2-1folder",
                        type:"folder",
                        child:[
                            {
                                name:"2-2file",
                                type:"file"
                            }
                        ]
                    }
                ]
            },
            {
                name:"folder 1",
                type:"folder",
                child:[
                    {
                        name:"file2",
                        type:"file"
                    }
                ]
            }
        ]
    }
    const figureOutStructure=(element)=>{
        if(element.name=="root"){
            return (
                <li>
                    <div className='root'>
                        <div>
                            <FolderToggleBtn
                                onclick={(e)=>{
                                    e.currentTarget.parentElement.parentElement.querySelector("ul").classList.toggle("hide")
                                }}
                            />
                            <span>$ROOT</span>
                        </div>
                        <ul className={style.children}
                        >
                        {
                                element.child.map((i,index)=>(
                                    <li key={index}>
                                        {
                                            figureOutStructure(i)
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </li>
            )
        }
        else if(element.type=="file"){
            return (
                <div className={style.file}>
                    <GrDocumentPdf/>
                    <span >{element.name}</span>
                </div>
            )
        }
        else if( element.type=="folder" && element.child.length==0){
            return (
                <div >
                    <div className={style.folder}>
                    <FolderToggleBtn
                        onclick={(e)=>{
                            e.currentTarget.parentElement.parentElement.querySelector("ul").classList.toggle("hide")
                        }}
                    />
                    <span >{element.name}</span>
                    </div>
                    <ul className={style.children} ></ul>
                </div>
            )
        }
        else {
            return (
                    <div >
                        <div className={style.folder}>
                        <FolderToggleBtn
                                onclick={(e)=>{
                                    e.currentTarget.parentElement.parentElement.querySelector("ul").classList.toggle("hide")
                                }}
                        />
                        <span >{element.name}</span>
                        </div>
                        <ul className={style.children}>
                            {
                                element.child.map((i,index)=>(
                                    <li key={index}>
                                        {
                                            figureOutStructure(i)
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
            )
        }
    }
    
    useEffect(()=>{
        const folders=[...document.querySelectorAll("."+style.folder)]
        folders.forEach(folder=>{
            folder.addEventListener("contextmenu",(e)=>{
                e.preventDefault()
                console.log("hello")
                const menuContainer=document.querySelector("."+style.menuContainer)
                menuContainer.style.left=e.clientX+3+"px"
                menuContainer.style.top=e.clientY+3+"px"
                setMenuOptionActive(true)
            })
        })


        document.addEventListener("click",(e)=>{
            var menuContainer = document.querySelector('.'+style.menuContainer);

            if (e.target !== menuContainer && !menuContainer.contains(e.target)) {
                setMenuOptionActive(false)
            }
        })
    },[])
  return (
    <div className={style.sidebar}
        onContextMenu={(e)=>e.preventDefault()}
    >
        <ul>
            {
                figureOutStructure(folderStructure)
            }
        </ul>
        <div className={style.menuContainer}
        >
            {
                menuOptionActive &&
                <Menu/>
            }
        </div>
    </div>

  )


}

export default Sidebar