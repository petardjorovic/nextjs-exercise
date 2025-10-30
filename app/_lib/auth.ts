import NextAuth, { Account, Profile, Session, User } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { config } from "@/app/_utils/config";
import { NextRequest } from "next/server";
import { AdapterUser } from "next-auth/adapters";
import { createGuest, getGuest } from "./data-service";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: config.AUTH_GOOGLE_ID,
      clientSecret: config.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: config.AUTH_GITHUB_ID,
      clientSecret: config.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    authorized: (params: { request: NextRequest; auth: Session | null }) => {
      return !!params.auth?.user;
    },
    signIn: async (params: {
      user: User | AdapterUser;
      account?: Account | null;
      profile?: Profile;
    }) => {
      try {
        const existingGuest = await getGuest(params.user.email || "");

        if (!existingGuest) {
          await createGuest({
            email: params.user.email as string,
            fullName: params.user.name as string,
          });
        }

        return true;
      } catch {
        return false;
      }
    },
    session: async ({ session }: { session: Session }) => {
      const guest = await getGuest(session.user?.email || "");
      if (guest?.id) session.user.guestId = guest?.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
