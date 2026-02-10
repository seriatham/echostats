import NextAuth from "next-auth";

// This is a placeholder setup
const handler = NextAuth({
  providers: [],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };