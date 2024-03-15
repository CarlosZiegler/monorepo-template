import {
  pgTable,
  pgEnum,
  uuid,
  text,
  timestamp,
  bigint,
  varchar,
  unique,
  foreignKey,
  boolean,
  primaryKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { jsonb } from "drizzle-orm/pg-core";

export const keyStatus = pgEnum("key_status", [
  "default",
  "valid",
  "invalid",
  "expired",
]);
export const keyType = pgEnum("key_type", [
  "aead-ietf",
  "aead-det",
  "hmacsha512",
  "hmacsha256",
  "auth",
  "shorthash",
  "generichash",
  "kdf",
  "secretbox",
  "secretstream",
  "stream_xchacha20",
]);
export const factorType = pgEnum("factor_type", ["totp", "webauthn"]);
export const factorStatus = pgEnum("factor_status", ["unverified", "verified"]);
export const aalLevel = pgEnum("aal_level", ["aal1", "aal2", "aal3"]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
  "s256",
  "plain",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull(),
  email: text("email"),
  createdAt: timestamp("created_at", { mode: "string" }),
  updatedAt: timestamp("updated_at", { mode: "string" }),
});

export const whitelist = pgTable("whitelist", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  domain: varchar("domain").notNull(),
  organisation: varchar("organisation"),
});

export const gesture = pgTable(
  "gesture",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    title: varchar("title", { length: 50 }).notNull(),
    muxPlaybackId: varchar("mux_playback_id", { length: 100 }),
    muxAssetId: varchar("mux_asset_id", { length: 100 }),
    insertedAt: timestamp("inserted_at", { withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      gestureTitleKey: unique("gesture_title_key").on(table.title),
      gestureMuxPlaybackIdKey: unique("gesture_mux_playback_id_key").on(
        table.muxPlaybackId
      ),
      gestureMuxAssetIdKey: unique("gesture_mux_asset_id_key").on(
        table.muxAssetId
      ),
    };
  }
);

export const tag = pgTable(
  "tag",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    title: varchar("title", { length: 50 }).notNull(),
    insertedAt: timestamp("inserted_at", { withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      tagTitleKey: unique("tag_title_key").on(table.title),
    };
  }
);

export const gestureRelation = pgTable("gesture_relation", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  primaryGestureId: bigint("primary_gesture_id", { mode: "number" }).references(
    () => gesture.id,
    { onDelete: "cascade", onUpdate: "cascade" }
  ),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  secondaryGestureId: bigint("secondary_gesture_id", {
    mode: "number",
  }).references(() => gesture.id, { onDelete: "cascade", onUpdate: "cascade" }),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    orderId: text("orderId"),
    purchaseToken: text("purchaseToken").primaryKey().notNull(),
    active: boolean("active").default(false).notNull(),
    // TODO: failed to parse database type 'jsonb[]'
    purchases: jsonb("purchases").array().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    expires: bigint("expires", { mode: "number" }).default(0),
    creationDate: timestamp("creationDate", {
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      subscriptionsPurchaseTokenKey: unique(
        "subscriptions_purchaseToken_key"
      ).on(table.purchaseToken),
    };
  }
);

export const gestureTag = pgTable(
  "gesture_tag",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    gestureId: bigint("gesture_id", { mode: "number" })
      .notNull()
      .references(() => gesture.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    tagId: bigint("tag_id", { mode: "number" })
      .notNull()
      .references(() => tag.id, { onDelete: "cascade", onUpdate: "cascade" }),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      gestureTagPkey: primaryKey({
        columns: [table.gestureId, table.tagId],
        name: "gesture_tag_pkey",
      }),
    };
  }
);
