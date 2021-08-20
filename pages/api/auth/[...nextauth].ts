import NextAuth from "next-auth"
import Adapters from "next-auth/adapters"
import axios from 'axios'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Credentials({
    name: 'Credentials',
    authorize: async (credentials) => {
        const account = await axios.post('http://localhost:3000/api/account/findLoginAccount',
            {
              account: {
                  password: credentials.password,
                  email: credentials.email
              }
            },
            {
            headers: {
                accept: '*/*',
                'Content-Type': 'application/json'
            }
        })

        if (account) {
            return account
        } else {
            return null
        }   
    }
    })
  ],
  session: { jwt: true },
  callbacks: {
    async jwt(token, account, profile, isNewAccount) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      if (account?.roles) {
        token.roles = account.roles;
      }
      return token;
    },
    async session(session, token) {
      if(token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token?.roles) {
        session.account.roles = token.roles;
      }
      return session;
    }
  }
})