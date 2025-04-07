import { defineDb, defineTable, column } from "astro:db";

const PreInscription = defineTable({
  indexes: {
    id_pre_inscription_index: {
      on: "id",
    },
    qr_code_index: {
      on: "qr_code",
    },
    email_index: {
      on: "email",
    },
    current_step_index: {
      on: "current_step",
    },
    pending_step_index: {
      on: "pending_step",
    },
    gender_index: {
      on: "gender",
    },
  },
  columns: {
    id: column.text({ unique: true, primaryKey: true }),
    first_name: column.text({ optional: true }),
    last_name: column.text({ optional: true }),
    email: column.text({ unique: true, optional: true }),
    gender: column.text({ optional: true }),
    document_id: column.text({ unique: true, optional: true }),
    birthdate: column.text({ optional: true }),
    phone_number: column.text({ optional: true }),
    address: column.text({ optional: true }),
    qr_code: column.text({ unique: true, optional: true }),
    current_step: column.number(),
    pending_step: column.number(),
    accept_terms: column.boolean({ optional: true }),
    accept_communication: column.boolean({ optional: true }),
    created_at: column.date({ optional: true }),
    updated_at: column.date({ optional: true }),
  },
});

const Confirmation = defineTable({
  indexes: {
    id_confirmation_index: {
      on: "id",
      unique: true,
    },
    code_confirmation_index: {
      on: "code_confirmation",
    },
  },
  columns: {
    id: column.number({ unique: true, primaryKey: true }),
    pre_inscription_id: column.text({
      references: () => PreInscription.columns.id,
    }),
    code_confirmation: column.text({ unique: true }),
    created_at: column.date(),
    time_of_validity: column.date(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { PreInscription, Confirmation },
});
