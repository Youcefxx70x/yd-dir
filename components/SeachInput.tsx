
import Form from "next/form"
import SearchFormReset from "./SearchFormReset"
import { Search } from "lucide-react"
const SeachInput = ({query}:{query?:string}) => {
    
  return (
   <Form action="/" scroll={false} className="search-form">
            <input type="text" name="query" className="search-input" placeholder="search startups" defaultValue={query}/>

            <div className="flex gap-2">
                {query&&<SearchFormReset/>}
                <button type="submit" className="search-btn text-white" ><Search className="size-5"/></button>
                

            </div>
   </Form>
  )
}

export default SeachInput