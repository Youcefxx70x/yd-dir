import StartupForm from "@/components/StartupForm"
import { authOptions} from "@/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
const page = async () => {
    

  const session = await getServerSession(authOptions);
  if (!session) {redirect("/")}
  return (
    <>
    <section className="pink_container !min-h-[230px]">
        <h1 className="heading"> Submint your Startup Pitch</h1>

    </section>
    <StartupForm/>
    </>
  )
}

export default page