import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login", // use our custom login UI
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Attach provider profile info on first sign-in
      if (account && profile) {
        token.provider = account.provider;
        token.name = profile.name ?? token.name;
        token.picture = profile.picture ?? token.picture;
      }
      return token;
    },
    async session({ session, token }) {
      // expose token fields on session
      session.user.name = token.name ?? session.user.name;
      session.user.image = token.picture ?? session.user.image;
      session.provider = token.provider ?? session.provider;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
