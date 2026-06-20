import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { prisma } from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ profile, user }) {
      const email = profile?.email || user?.email
      if (!email) return false

      const ALLOWED_EMAILS = [
        "kolpeprathamesh@gmail.com",
        "adityawaghmarex@gmail.com",
      ]

      if (!ALLOWED_EMAILS.includes(email)) {
        return false
      }

      try {
        let dbUser = await prisma.user.findUnique({
          where: { email },
        })

        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email,
              name: profile?.name || user?.name,
              image: profile?.picture || user?.image,
              role: email === "kolpeprathamesh@gmail.com" ? "SUPERADMIN" : "ADMIN",
            },
          })
        }

        if (dbUser.isArchived) {
          return false
        }

        // Attach DB id and role to the user object so JWT callback can pick it up
        user.id = dbUser.id
        user.role = dbUser.role

        return true
      } catch (error) {
        console.error("SignIn error:", error)
        return false
      }
    },
  },
})