import NextAuth from "next-auth"
import axios from "axios";
import Providers from 'next-auth/providers'

import {queryLogin} from '../../../service/user.service'
const providers = [
  Providers.Credentials({
    name: 'Credentials',
    authorize: async (credentials) => {
      try {
        const user = await queryLogin(credentials.email, credentials.password);

        if (user && user.activated) {
          return {status: 'success', data: user}
        } 
        return null;

      } catch (e) {
        console.log(e);
        throw new Error("Invalid credentials!")
      }
    }
  })
]

const callbacks = {
  async jwt(token, user) {
    if (user) {
      token.accessToken = {name: user.data.name, role: user.data.role};
    }

    return token
  },

  async session(session, token) {
    session.accessToken = token.accessToken;
    session.user = token.accessToken;
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