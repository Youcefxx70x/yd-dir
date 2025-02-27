import { client } from "@/sanity/lib/client"
import { AUTHOR_BY_ID } from "@/sanity/lib/queries"
import Image from "next/image"
import { notFound } from "next/navigation"
import { authOptions} from "@/auth";
import { getServerSession } from "next-auth/next";
import UserStartups from "@/components/UserStartups";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const experimental_ppr=true



const Page = async ({params}:{params:Promise<{id:string}>}) => {
    const id= (await params).id
    const arr =id.split("%7D")
    const session = await getServerSession(authOptions);

    console.log(id)
    const author=await client.fetch(AUTHOR_BY_ID,{id:arr[0]})
    console.log("author",author)
    if(!author) return notFound()

  return (
    <>
    <section className="profile_container border-2">
        <div className="profile_card">
            <div className="profile_title">
                <h3 className="text-24-black uppercase text-center line-clamp-1 ">{author.name}</h3>

            </div>
            <Image src={author.image}
            alt={author.name}
            width={220}
            height={220}
            className="profile_image"
            />

            <p className="text-30-extrabold mt-7 text-center">@{author.username||author.name}</p>
            <p className=" mt-1 text-center text-14-normal">{author.bio||"no bio"}</p>
            

        </div>
        <div className=" flex-1 flex flex-col gap-5 lg:-mt-5">
            <p className="text-30-bold">
                {session?.id===arr[0]?"Your":"All"} Startups
            </p>
            <ul className="card_grid-sm">
            <Suspense fallback={<Skeleton/>}>
                    <UserStartups id={arr[0]}/>
            </Suspense>
            </ul>

        </div>

    </section>
   </>
  )
}

export default Page


