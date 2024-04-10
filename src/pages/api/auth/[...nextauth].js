import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "openid https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"
                }
            }
        })
    ],
    debug: true,
    callbacks: {
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
