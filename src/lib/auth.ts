import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import User from '@/models/User';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

async function connectDB() {
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }
  } catch (error) {
    console.error('DB connection error:', error);
    throw error;
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email });
          if (!user || !user.password) return null;

          const isValid = await bcrypt.compare(credentials.password as string, user.password);
          if (!isValid) return null;

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image ?? null,
            role: user.role,
          };
        } catch (error) {
          console.error('Credentials authorize error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'google' && user.email) {
          await connectDB();

          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            await User.create({
              name: user.name || 'User',
              email: user.email,
              image: user.image,
              emailVerified: new Date(),
              provider: 'google',
              role: 'client',
            });
            // Return true ensures the user is logged in successfully.
            // Returning a string would abort the login process.
            return true;
          } else if (existingUser.provider !== 'google') {
            existingUser.provider = 'google';
            existingUser.image = user.image;
            existingUser.emailVerified = new Date();
            await existingUser.save();
          }
        }
        return true;
      } catch (error) {
        console.error('SignIn callback error:', error);
        return true;
      }
    },

    async jwt({ token, user, account, trigger, session }) {
      if (trigger === 'update') {
        if (session?.name) token.name = session.name;
        // If hasPassword is explicitly passed in update, sync it to token
        if (typeof session?.hasPassword === 'boolean') {
          token.hasPassword = session.hasPassword;
        }
      }
      
      if (user) {
        token.id = user.id;
        token.provider = account?.provider ?? 'credentials';
      }

      // ALWAYS sync token with DB to ensure we have the most up-to-date name, email, and role
      if (token.email || user?.email) {
        const targetEmail = token.email || user?.email;
        try {
          await connectDB();
          const dbUser = await User.findOne({ email: targetEmail });
          if (dbUser) {
            token.id = dbUser._id.toString(); // Use MongoDB ID
            token.name = dbUser.name;
            token.email = dbUser.email;
            token.role = dbUser.role;
            token.hasPassword = !!dbUser.password;
            token.image = dbUser.image || token.image;
          }
        } catch (error) {
          console.error('Error syncing token with DB:', error);
          if (!token.role) token.role = 'client';
          if (typeof token.hasPassword === 'undefined') token.hasPassword = false;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).provider = token.provider as string;
        (session.user as any).role = token.role as string;
        (session.user as any).hasPassword = token.hasPassword as boolean;
        session.user.image = token.image as string;
        if (token.name) {
          session.user.name = token.name as string;
        }
        if (token.email) {
          session.user.email = token.email as string;
        }
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      try {
        if (new URL(url).origin === baseUrl) return url;
      } catch {
        return baseUrl + '/client';
      }
      return baseUrl + '/client';
    },
  },
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
};

import NextAuth from 'next-auth';

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
