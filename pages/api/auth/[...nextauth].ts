import NextAuth from "next-auth"
import axios from "axios";
import Providers from 'next-auth/providers'

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    authorize: async (credentials) => {
      try {
        const user = await axios.post("http://localhost:3000/api/user/findLoginUser",
        {
          user: {
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

        if (user) {
          return {status: 'success', data: user.data}
        } 

      } catch (e) {
        const errorMessage = !e.response.data.success;
        throw new Error(errorMessage + '&email=' + credentials.email)
      }
    }
  })
]

const callbacks = {
  async jwt(token, user) {
    if (user) {
      token.accessToken = user.data.data;
    }

    return token
  },

  async session(session, token) {
    session.accessToken = token.accessToken;
    session.user.role = token.accessToken.role;
    return session
  }
}

const options = {
  providers,
  callbacks,
  pages: {
    error: '/login'
  }
}

export default (req, res) => NextAuth(req, res, options);