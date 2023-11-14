import React, { useEffect, useRef, useState } from 'react'
import style from "./Sidebar.module.css"
import {GrDocumentPdf} from "react-icons/gr"
import { FaAngleDown } from "react-icons/fa";
import FolderIcon from './FolderIcon/FolderToggleBtn'
import FolderToggleBtn from './FolderIcon/FolderToggleBtn';

function Sidebar() {
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
                        <ul className='children'
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
                <div className='file'>
                    <GrDocumentPdf/>
                    <span>{element.name}</span>
                </div>
            )
        }
        else if( element.type=="folder" && element.child.length==0){
            return (
                <div className="folder">
                    <div>
                    <FolderToggleBtn
                        onclick={(e)=>{
                            e.currentTarget.parentElement.parentElement.querySelector("ul").classList.toggle("hide")
                        }}
                    />
                    <span>{element.name}</span>
                    </div>
                    <ul className='children' ></ul>
                </div>
            )
        }
        else {
            return (
                    <div className='folder'>
                        <div>
                        <FolderToggleBtn
                                onclick={(e)=>{
                                    e.currentTarget.parentElement.parentElement.querySelector("ul").classList.toggle("hide")
                                }}
                        />
                        <span>{element.name}</span>
                        </div>
                        <ul className='children'>
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
   
  return (
    <div className='sidebar'>
        <ul>
            {
                figureOutStructure(folderStructure)
            }
        </ul>
    </div>
  )


}

export default Sidebar