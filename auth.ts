import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ profile }) {
      const email = profile?.email
      if (!email) return false

      const ALLOWED_EMAILS = [
        "kolpeprathamesh@gmail.com",
        "adityawaghmarex@gmail.com",
      ]

      if (!ALLOWED_EMAILS.includes(email)) {
        return false
      }

      try {
        let user = await prisma.user.findUnique({
          where: { email },
        })

        if (!user) {
          // Auto-create the user if they are in the allowed list but not in DB yet
          user = await prisma.user.create({
            data: {
              email,
              name: profile?.name,
              image: profile?.picture as string | undefined,
              role: email === "kolpeprathamesh@gmail.com" ? "SUPERADMIN" : "ADMIN",
            },
          })
        }

        if (user.isArchived) {
          return false
        }

        return true
      } catch (error) {
        console.error("SignIn error:", error)
        return false
      }
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        })
        if (dbUser) {
          token.id = dbUser.id
          token.role = dbUser.role
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
})