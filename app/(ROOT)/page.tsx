//import Image from "next/image";
import SeachInput from "../../components/SeachInput";
import StartupCard from "../../components/StartupCard";
import { startupTypeCard } from "../../components/StartupCard";
import { STARTUPS_QUERY } from "../../sanity/lib/queries";
import { sanityFetch,SanityLive } from "../../sanity/lib/live";

export default async function Home({searchParams}:{searchParams:Promise<{query?:string}>}) {
  const query=(await searchParams).query
  const params={search:query || null}
  const {data:posts}:{data:startupTypeCard[]}=await sanityFetch({query:STARTUPS_QUERY , params})
  console.log("searchParams",query)


  /*const posts:startupTypeCard[]=[{
    _createdAt:new Date(),
    _id:1,
    title:"We Robots",
    category:"Robots",
    views:55,
    description:"bla bla bla bla",
    author:{_id:1,name:"youcef"},
    image:"https://images.unsplash.com/photo-1546776310-eef45dd6d63c?q=80&w=2010&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

    
  }]*/



  return (
      <>
      <section className={'pink_container'}>
          <h1 className="heading"> Pitch Your Startup,<br/>
          Connect with Entrepreneurs</h1>
  
          <p className="sub-heading !max-w-3xl"> Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions</p>
  
          <SeachInput query={query}/>
      </section>
  
  
      <section className="section_container">
        <p className="text-30-semibold">{query?`Search Results for ${query}`:"Featured Startups"}</p>
         <ul className="mt-7 card_grid">
          {posts?.length>0?
          (
            posts.map((post,key)=>(
              
              <StartupCard post={post} key={key}/>
            ))
          ):null}
  
        </ul>
      </section>
      <SanityLive/>
      </>
  );
}
