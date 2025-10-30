// import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    guestId?: number;
  }

  interface Session {
    user: User & {
      guestId?: number;
    } & DefaultSession["user"];
  }
}
