import React from 'react'
import Ping from './Ping'
import { STARTUPS_QUERY_VIEWS } from '@/sanity/lib/queries'
import {client} from "@/sanity/lib/client"
import { ps } from '@/lib/utils'
import { writeClient } from '@/sanity/lib/write-client'
import { after } from 'next/server'
const View = async ({id}:{id:string}) => {

    const {views}:{views:string}=await client.withConfig({useCdn:false}).fetch(STARTUPS_QUERY_VIEWS , {id})
    after(async()=>await writeClient.patch(id).set({views:views+1}).commit())
    
  return (
        <div className="view-container ">
        <div className="absolute -top-2 -right-2"> <Ping/></div>
        <p className="view-text">
            <span className="font-black">{views} View{ps(views)&&"s"}</span>
        </p>
        </div>
  )
}

export default View