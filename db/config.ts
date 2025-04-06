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
    gender_index: {
      on: "gender",
    },
  },
  columns: {
    id: column.text({ unique: true, primaryKey: true }),
    first_name: column.text(),
    last_name: column.text(),
    email: column.text({ unique: true }),
    gender: column.text(),
    document_id: column.text({ unique: true }),
    birthdate: column.text(),
    phone_number: column.text(),
    address: column.text(),
    qr_code: column.text({ unique: true }),
    current_step: column.text(),
    created_at: column.date(),
    updated_at: column.date(),
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
