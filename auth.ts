import NextAuth from "next-auth/next";
import GitHub from "next-auth/providers/github";
import type { AuthOptions } from "next-auth";
import { client } from "./sanity/lib/client";
import { AUTHOR_GITHUB_ID } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!
    })
  ],
});



const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!
    })
  ],
  callbacks: {
    async signIn({user, account,profile}){
      const existingUser=await client.withConfig({useCdn:false}).fetch(AUTHOR_GITHUB_ID,{id:account?.providerAccountId})
      if(!existingUser){
        await writeClient.create({
          _type: 'author',
          id: account?.providerAccountId,
          name: user?.name,
          username: profile?.name,
          email: user?.email,
          image: user?.image,
          bio:account?.bio || '',

        
      })
    }
    return true
    },
    async jwt({token,account,profile}){
    
      if(account && profile){
        console.log("Account:", account);
        console.log("Token Email:", token.email);
      
        const user=await client.withConfig({useCdn:false}).fetch(AUTHOR_GITHUB_ID,{id:account?.providerAccountId})

        if(user){
          console.log("id",user._id);
          token.id=user._id
        }

       
      }
    
      return token
    },
    async session({session,token}){
      
      Object.assign(session,{id:token.id})
      
      return session
    }

    
  }
  // other options...
};

// Create the NextAuth handler using the authOptions.
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export { authOptions,handlers, signIn, signOut, auth }
