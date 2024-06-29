import db from "@repo/db/client";
import bcrypt from "bcrypt";
import CredentialProviders from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialProviders({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231243",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      // TODO: User credentials type from next-aut
      async authorize(credentials: any) {
        // TODO: Do zod validation, OTP validation here
        const existingUser = await db.user.findFirst({
          where: {
            number: credentials.phone,
          },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );

          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              number: existingUser.number,
            };
          }
          return null;
        }

        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        try {
          const user = await db.user.create({
            data: {
              email: credentials.email,
              number: credentials.phone,
              password: hashedPassword,
            },
          });

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.number,
          };
        } catch (error) {
          console.error(error);
        }

        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    // TODO: can u fix the type here? Using any is bad
    async session({ token, session }: any) {
      session.user.id = token.sub;

      return session;
    },
  },
};
