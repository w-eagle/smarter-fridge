import dayjs from "dayjs";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    session: {
        maxAge: 43200,
        strategy: "jwt"
    },
    jwt: {
        maxAge: 43200
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    access_type: "offline",
                    scope: "openid https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"
                }
            }
        })
    ],
    debug: true,
    callbacks: {
        async signIn({ account, profile }) {
            return { account, profile };
        },
        session({ session, token }) {
            if (token.access_token) {
                session.access_token = token.access_token;
            }
            return session;
        },
        jwt({ token, account, profile }) {
            if (account) {
                token.access_token = account.access_token;
            }

            return token;
        }
    }
};

export default NextAuth(authOptions);
