import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db, eq, PreInscription } from "astro:db";

export const GeneralInformationAction = {
  sendGeneralInformation: defineAction({
    input: z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      gender: z.string(),
    }),
    handler: async ({ firstName, lastName, email, gender }, context) => {
      if (!context.cookies.has("x-session-id")) {
        throw new Error("Session ID not found");
      }
      const sessionId = context.cookies.get("x-session-id");
      const result = await db
        .update(PreInscription)
        .set({
          first_name: firstName,
          last_name: lastName,
          email: email,
          gender: gender,
          current_step: 1,
          pending_step: 2,
        })
        .where(eq(PreInscription.id, sessionId?.value!))
        .returning({ id: PreInscription.id });

      return {
        id: result[0].id,
      };
    },
  }),
};
