import NextAuth from "next-auth"
import Adapters from "next-auth/adapters"
import Models from "../../../models"

export default NextAuth({
  providers: [],  
  adapter: Adapters.TypeORM.Adapter(
    // The first argument should be a database connection string or TypeORM config object
    process.env.MONGODB_URL,
    // The second argument can be used to pass custom models and schemas
    {
      models: {
        User: Models.User,
      },
    }
  ),
  session: { jwt: true },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      if (user?.roles) {
        token.roles = user.roles;
      }
      return token;
    },
    async session(session, token) {
      if(token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token?.roles) {
        session.user.roles = token.roles;
      }
      return session;
    }
  }
})