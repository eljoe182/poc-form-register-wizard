import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { PreInscription, Confirmation, db, eq, and, gte } from "astro:db";

export const CodeConfirmationAction = {
  checkCode: defineAction({
    input: z.object({
      codeConfirmation: z.string(),
    }),
    handler: async ({ codeConfirmation }, context) => {
      if (!context.cookies.has("x-session-id")) {
        throw new Error("Session ID not found");
      }
      const sessionId = context.cookies.get("x-session-id");
      const result = await db
        .select()
        .from(Confirmation)
        .where(
          and(
            eq(Confirmation.code_confirmation, codeConfirmation),
            eq(Confirmation.pre_inscription_id, sessionId?.value!),
            gte(Confirmation.time_of_validity, new Date())
          )
        );

      if (result.length === 0) {
        throw new Error("Code confirmation is invalid");
      }

      await db
        .update(PreInscription)
        .set({ current_step: 2, pending_step: 3 })
        .where(eq(PreInscription.id, sessionId?.value!));

      return result;
    },
  }),
};
