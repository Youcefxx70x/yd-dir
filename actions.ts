"use server";
import { authOptions} from "@/auth";
import { getServerSession } from "next-auth/next";
import { parseServerResponse } from "./lib/utils";
import slugify from 'slugify';
import { writeClient } from "./sanity/lib/write-client";

export const createPitch=async (state:any,form:FormData,pitch:string)=>{
    
    
    const session = await getServerSession(authOptions);

    if (!session) return parseServerResponse({error:"Not Signed In",status:"ERROR"})
        const array = Object.entries(form);
        console.log("array",array)


    const { title, description, category, link } = Object.fromEntries(
        array.filter(([key]) => key !== "pitch"),
      );

    console.log("title",title)
   
   
    const slug = slugify(String(title),{lower:true,strict:true})
  

    try{
        const startup={
            title,
            description,
            category,
            image:link,
            slug:{
                _type:slug,
                current:slug
            },
            pitch,
            author:{
                _type:"reference",
                _ref:session.id
            }

        }
        const result=await writeClient.create({_type:"startup",...startup})
        return parseServerResponse({...result,error:"",status:"SUCCESS"})

    }catch(e){
        console.error(e,"the issue is here")    }

}