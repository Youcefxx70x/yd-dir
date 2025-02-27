"use client";

import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formSchema } from "@/lib/validation"
import {z} from 'zod'
import { toast } from "sonner"

import { createPitch } from "@/actions"


const StartupForm = () => {
    const router = useRouter()

    const handleFormSubmit=async (prevState:any,formData:FormData,pitch:string,setError:()=>void)=>{
        try {
          const formValues={
            title: formData.get("title"),
            description: formData.get("description"),
            category:formData.get("category"),
            link: formData.get("link"),
            pitch:pitch,
      
          }
          await formSchema.parseAsync(formValues)
          console.log("my form",formValues)
          const result=await createPitch(prevState,formValues,pitch)
          console.log(result)
        
          if (result.status==="SUCCESS"){
            console.log("success")
            toast.success("Form submitted successfully")
            router.push(`/startup/${result._id}`)
          }
          return result
        }catch(e){
          if(e instanceof z.ZodError ){
            const fieldErrors=e.flatten().fieldErrors
            setError(fieldErrors)
            toast.error("Validation Failed")
            return {...prevState,error:"Validation Failed",status: "ERROR"}
          }
          return {...prevState,error:"Unexpected thing happened",status: "ERROR"}
      
        }
      
      }
      
      
   
    const [vals,setVals]=useState({title:"",category:"",description:"",link:""})

    const [pitch,setPitch]=useState("")
    const [errors,setError]=useState<Record<string,string>>({})
    const [state,formAction,isPending]=useActionState(async(prevState:any,formData:FormData)=>await handleFormSubmit(prevState,formData,pitch,setError),{error:"",status:"INITIAL"})
  return (
    <>
    <form className="startup-form" action={formAction} >
        <div>
            <label htmlFor='title' className="startup-form_label">Title</label>
            <Input value={vals.title} onChange={(e)=>setVals((prev)=>{return {...prev,title:e.target.value}})} id="title" name="title" className="startup-form_input" required placeholder='startup title'/>
            {errors.title&&<p className="startup-form_error">{errors.title}</p>}
        </div>


        <div>
            <label htmlFor='description' className="startup-form_label">Description</label>
            <Textarea value={vals.description} onChange={(e)=>setVals((prev)=>{return {...prev,description:e.target.value}})} id="description" name="description" className="startup-form_textarea" required placeholder='startup description'/>
            {errors.description&&<p className="startup-form_error">{errors.description}</p>}
        </div>


        <div>
            <label htmlFor='category' className="startup-form_label">Category</label>
            <Input value={vals.category} onChange={(e)=>setVals((prev)=>{return {...prev,category:e.target.value}})} id="category" name="category" className="startup-form_input" required placeholder='startup category (health,tech ...etc)'/>
            {errors.category&&<p className="startup-form_error">{errors.category}</p>}
        </div>


        <div>
            <label htmlFor='link' className="startup-form_label">Image URL</label>
            <Input value={vals.link} onChange={(e)=>setVals((prev)=>{return {...prev,link:e.target.value}})} id="link" name="link" className="startup-form_input " required placeholder='Image URL'/>
            {errors.link&&<p className="startup-form_error">{errors.link}</p>}
        </div>

        <div>
            <label htmlFor='link' className="startup-form_label">Pitch</label>
            <MDEditor
                preview="edit"
                value={pitch}
                height={200}
                onChange={(value) => {
                    setPitch(value as string);
                }}
                style={{ borderRadius: 20, overflow: "hidden" }}
                id="pitch"
                textareaProps={{ placeholder: "Briefly Describe your Idea and what problem it solves" }}
                previewOptions={{ disallowedElements: ["style"] }}
            />

            {errors.link&&<p className="startup-form_error">{errors.pitch}</p>}
        </div>

        <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>{isPending? "Submitting...." :"Submit Startup"}<Send className="size-6 ml-2"/></Button>

    </form>
    </>   
  )
}

export default StartupForm