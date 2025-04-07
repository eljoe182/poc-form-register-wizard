import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db, eq, PreInscription } from "astro:db";
import { generateCode } from "../lib";

export const AdditionalInformationAction = {
  sendAdditionalInformation: defineAction({
    input: z.object({
      documentId: z.string(),
      birthdate: z.string(),
      phoneNumber: z.string(),
      address: z.string(),
    }),
    handler: async (
      { documentId, birthdate, phoneNumber, address },
      context
    ) => {
      if (!context.cookies.has("x-session-id")) {
        throw new Error("Session ID not found");
      }

      const sessionId = context.cookies.get("x-session-id");
      const result = await db
        .update(PreInscription)
        .set({
          document_id: documentId,
          birthdate: birthdate,
          phone_number: phoneNumber,
          address: address,
          qr_code: generateCode(8),
          current_step: 3,
          pending_step: 4,
        })
        .where(eq(PreInscription.id, sessionId?.value!))
        .returning({
          qrCode: PreInscription.qr_code,
        });
      return result[0].qrCode;
    },
  }),
};
