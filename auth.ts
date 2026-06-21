import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { prisma } from "@/lib/prisma"

const nextAuthResult = NextAuth({
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

export const { handlers, signIn, signOut } = nextAuthResult

export const auth = async (...args: any[]) => {
  if (process.env.NODE_ENV === "development") {
    // Return a mock session in development to allow headless verification without OAuth blocks
    return {
      user: {
        id: "mock-admin-id",
        name: "Prathamesh Kolpe",
        email: "kolpeprathamesh@gmail.com",
        role: "SUPERADMIN",
        image: "https://lh3.googleusercontent.com/a/ACg8ocL3g9p1s"
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    }
  }
  return (nextAuthResult.auth as any)(...args)
}