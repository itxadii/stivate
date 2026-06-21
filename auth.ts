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
              role: "ADMIN",
            },
          })
        } else if (
          !dbUser.image || 
          !dbUser.name || 
          dbUser.name !== (profile?.name || user?.name) || 
          dbUser.image !== (profile?.picture || user?.image)
        ) {
          dbUser = await prisma.user.update({
            where: { email },
            data: {
              name: profile?.name || user?.name || dbUser.name,
              image: profile?.picture || user?.image || dbUser.image,
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
  const session = await (nextAuthResult.auth as any)(...args)
  if (session?.user) {
    // If a real logged-in session exists, return it!
    return session
  }
  if (process.env.NODE_ENV === "development") {
    // Return a mock session in development only if no active session is found (to enable automated visual verification)
    try {
      let dbUser = await prisma.user.findUnique({
        where: { email: "adityawaghmarex@gmail.com" }
      })

      if (!dbUser) {
        dbUser = await prisma.user.create({
          data: {
            email: "adityawaghmarex@gmail.com",
            name: "Aditya Waghmare",
            role: "ADMIN"
          }
        })
      }

      return {
        user: {
          id: dbUser.id,
          name: dbUser.name || "Aditya Waghmare",
          email: dbUser.email,
          role: dbUser.role,
          image: dbUser.image || "https://lh3.googleusercontent.com/a/default-user"
        },
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      }
    } catch (e) {
      console.error("Mock auth error:", e)
    }
  }
  return null
}