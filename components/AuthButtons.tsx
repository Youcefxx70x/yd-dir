// components/AuthButtons.tsx
"use client";

import { BadgePlus, LogOut } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function AuthButtons({ userName ,id,session}: { userName?: string|null ,id?:string|undefined,session?:any}) {
  if (userName) {
    return (
      <div className="flex items-center gap-5 text-black">
         <Link href="/startup/create"><span className="max-sm:hidden">create</span>
         <BadgePlus className="sm:hidden size-6"/>
         </Link>

        <button onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>
        <span className="max-sm:hidden">Log Out</span>
        <LogOut className="sm:hidden text-red-500 size-6"/>
        </button>
        <Link href={`/user/${id}}`}>
                    <Avatar className="size-10">
                      <AvatarImage
                      src={session?.user?.image}
                      alt={userName|| ""}
                      />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-5 text-black">
        <button onClick={() => signIn("github", { callbackUrl: "/" })}>
          Log In
        </button>
      </div>
    );
  }
}
