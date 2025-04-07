import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db, PreInscription } from "astro:db";
import { v4 } from "uuid";

export const TermsAndConditionsAction = {
  sendTermsAndConditions: defineAction({
    input: z.object({
      acceptTerms: z.boolean(),
      acceptCommunications: z.boolean(),
    }),
    handler: async ({ acceptTerms, acceptCommunications }, context) => {
      const id = v4();
      const result = await db
        .insert(PreInscription)
        .values({
          id: id.toString(),
          accept_terms: acceptTerms,
          accept_communication: acceptCommunications,
          current_step: 0,
          pending_step: 1,
        })
        .returning({ preInscriptionId: PreInscription.id });

      context.cookies.set("x-session-id", result[0].preInscriptionId, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      return result[0];
    },
  }),
};
