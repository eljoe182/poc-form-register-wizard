import { defineAction } from "astro:actions";
import { db, eq, PreInscription, Confirmation } from "astro:db";
import { Resend } from "resend";

export const SMTPAction = {
  sendCodeConfirmation: defineAction({
    handler: async (_, context) => {
      if (!context.cookies.has("x-session-id")) {
        throw new Error("Session ID not found");
      }

      const sessionId = context.cookies.get("x-session-id");

      const resultConfirmation = await db
        .select({
          codeConfirmation: Confirmation.code_confirmation,
          email: PreInscription.email,
          firstName: PreInscription.first_name,
          lastName: PreInscription.last_name,
        })
        .from(Confirmation)
        .leftJoin(
          PreInscription,
          eq(Confirmation.pre_inscription_id, PreInscription.id)
        )
        .where(eq(Confirmation.pre_inscription_id, sessionId?.value!))
        .get();

      const resend = new Resend(import.meta.env.RESEND_API_KEY);

      const { data, error } = await resend.emails.send({
        from: "POC wizard <no-reply@eljoe182.com>",
        to: [resultConfirmation?.email!],
        subject: "Code confirmation for RNR-FIT",
        text: `
        Hi ${resultConfirmation?.firstName} ${resultConfirmation?.lastName}
        Your code is ${resultConfirmation?.codeConfirmation}
        `,
        html: `
        <h1>Hi ${resultConfirmation?.firstName} ${resultConfirmation?.lastName}</h1>
        <p>Your code is ${resultConfirmation?.codeConfirmation}</p>
        `,
      });

      if (error) {
        throw new Error("Sending email failed");
      }

      console.log({ resendResponse: data });

      return {
        message: "Email was sent",
      };
    },
  }),
  sendQRPreInscription: defineAction({
    handler: async (_, context) => {
      if (!context.cookies.has("x-session-id")) {
        throw new Error("Session ID not found");
      }

      const sessionId = context.cookies.get("x-session-id");

      const result = await db
        .select({
          firstName: PreInscription.first_name,
          lastName: PreInscription.last_name,
          email: PreInscription.email,
          qrCode: PreInscription.qr_code,
        })
        .from(PreInscription)
        .where(eq(PreInscription.id, sessionId?.value!))
        .get();

      const resend = new Resend(import.meta.env.RESEND_API_KEY);

      const { data, error } = await resend.emails.send({
        from: "POC wizard <no-reply@eljoe182.com>",
        to: [result?.email!],
        subject: "Pre-inscription for RNR-FIT",
        text: `
        Hi ${result?.firstName} ${result?.lastName}
        Your QR Pre-inscription code is ${result?.qrCode}
        `,
        html: `
        <h1>Hi ${result?.firstName} ${result?.lastName}</h1>
        <p>Your QR Pre-inscription code is ${result?.qrCode}</p>
        `,
      });

      if (error) {
        throw new Error("Sending email failed");
      }

      console.log({ resendResponse: data });

      return {
        message: "Email was sent",
      };
    },
  }),
};
