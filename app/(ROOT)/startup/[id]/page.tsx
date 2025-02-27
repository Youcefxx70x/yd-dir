


import { startupTypeCard } from '@/components/StartupCard'
import { formatDate } from '../../../../lib/utils';
import { sanityFetch } from '../../../../sanity/lib/live'
import { STARTUPS_QUERY_ID } from '../../../../sanity/lib/queries'
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import markdownit from 'markdown-it'; // Import markdown-it with correct module name//+
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import { authOptions} from "@/auth";
import { getServerSession } from "next-auth/next";


const md=markdownit()

export const experimental_ppr=true;

const page = async ({params}:{params:{id:string}}) => {
  const id=(await params).id
  
  const {data:post}:{data:startupTypeCard}=await sanityFetch({query:STARTUPS_QUERY_ID , params})
   if(!post) return notFound()

    const parsedContent=md.render(post.pitch || '')
    const session = await getServerSession(authOptions);
    console.log(session?.id)

  return (
      <><section className="pink_container !min-h-[230px]">
          <p className="tag">{formatDate(post?._createdAt)}</p>
          <h1 className="heading">{post.title}</h1>
          <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <img src={post.image} alt="thumbnail" className='w-[50%] h-auto rounded-xl mx-auto'/>
        <div className="soace-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5 ">
            <Link className="flex gap-2 items-center mb-3" href={`user/${post.author._id}`}>
              <Image
              src={post.author.image}
              alt="avatar"
              width={120}
              height={120}
              className="rounded-xl drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium">@{post.author.username}</p>
             </div>
             </Link>

             <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent?
          <article dangerouslySetInnerHTML={{__html:parsedContent}} className='prose max-w-4xl mx-auto'></article>
        :<p className="no-result"> no details</p>}
          </div>
        <hr className="divider"/>

       
        

       

        <Suspense fallback={<Skeleton className="view_skeleton"></Skeleton>}>
              <View id={id}/>
        </Suspense>
      </section>
      
  </>)
    
}

export default page