import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { connectMongoDB } from "@/app/util/DB";
import User from "@/app/model/userModel";
import bcrypt from "bcryptjs"
const authOption = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const {email , pass } = credentials;
        try{
          await connectMongoDB();
          const user = await User.findOne({email});
          if (!user){
            return null
          }
          const passwordMatch = await bcrypt.compare(pass , user.password)
          if (!passwordMatch){
            return null;
          }
        return user
        }catch(err){
          console.log(err);
        }
      },
    }),
  ],
  session:{
    strategy:'jwt',
  },
  secret:process.env.NEXTAUTH_SECRET,
  pages:{
    signIn:"/login",
  }
};

const handler = NextAuth(authOption)

export {handler as GET , handler as POST}