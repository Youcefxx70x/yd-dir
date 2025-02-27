// components/Navbar.tsx (server component)
import { authOptions} from "../auth";
import { getServerSession } from "next-auth/next";

import Link from "next/link";
import AuthButtons from "./AuthButtons";

const Navbar = async () => {
  const session = await getServerSession(authOptions);


  

  return (
    <header className="px-4 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <img src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <AuthButtons userName={session?.user?.name ?? null} id={session?.id} session={session} />
      </nav>
    </header>
  );
};

export default Navbar;
