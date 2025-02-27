import { client } from "@/sanity/lib/client"
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries"
import StartupCard,{ startupTypeCard } from "./StartupCard"



const UserStartups = async ({id}:{id:string}) => {
    const data=await client.fetch(STARTUPS_BY_AUTHOR_QUERY,{id})
    const data_el=data.map((item:startupTypeCard,index:number)=>{
        return(<StartupCard key={index} post={item}/>)
    })
  return (
    <>
    {data.length>0?data_el:"No Startups"}
    
    </>
  )
}

export default UserStartups