import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserLogin from "@/libs/userLogIn";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await UserLogin(credentials.email, credentials.password);

        if (res?.success) {
          return {
            _id: res._id,
            name: res.name,
            email: res.email,
            role: res.role,
            token: res.token,
          } as any;
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
};