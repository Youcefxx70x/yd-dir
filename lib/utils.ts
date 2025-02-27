import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function formatDate(date?: Date) {
  if(date) return new Date(date).toLocaleDateString("en-US",{month:'long', day:'numeric', year:"numeric"})
}


export function ps(num:string|number){

  const number:number=Number(num)
  if (number===1){
    return false
  }
  return true
}


export const parseServerResponse=(response:any)=>{
  return JSON.parse(JSON.stringify(response))
}