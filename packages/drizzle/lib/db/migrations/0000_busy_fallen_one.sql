-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "key_status" AS ENUM('default', 'valid', 'invalid', 'expired');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "key_type" AS ENUM('aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_type" AS ENUM('totp', 'webauthn');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_status" AS ENUM('unverified', 'verified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "aal_level" AS ENUM('aal1', 'aal2', 'aal3');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "code_challenge_method" AS ENUM('s256', 'plain');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "whitelist" (
	"id" bigint PRIMARY KEY NOT NULL,
	"domain" varchar NOT NULL,
	"organisation" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gesture" (
	"id" bigint PRIMARY KEY NOT NULL,
	"title" varchar(50) NOT NULL,
	"mux_playback_id" varchar(100),
	"mux_asset_id" varchar(100),
	"inserted_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
	CONSTRAINT "gesture_title_key" UNIQUE("title"),
	CONSTRAINT "gesture_mux_playback_id_key" UNIQUE("mux_playback_id"),
	CONSTRAINT "gesture_mux_asset_id_key" UNIQUE("mux_asset_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag" (
	"id" bigint PRIMARY KEY NOT NULL,
	"title" varchar(50) NOT NULL,
	"inserted_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
	CONSTRAINT "tag_title_key" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gesture_relation" (
	"primary_gesture_id" bigint,
	"secondary_gesture_id" bigint,
	"updated_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscriptions" (
	"id" uuid NOT NULL,
	"orderId" text,
	"purchaseToken" text PRIMARY KEY NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"purchases" jsonb[] DEFAULT '{}' NOT NULL,
	"expires" bigint DEFAULT 0,
	"creationDate" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "subscriptions_purchaseToken_key" UNIQUE("purchaseToken")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gesture_tag" (
	"gesture_id" bigint NOT NULL,
	"tag_id" bigint NOT NULL,
	"updated_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
	CONSTRAINT "gesture_tag_pkey" PRIMARY KEY("gesture_id","tag_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gesture_relation" ADD CONSTRAINT "gesture_relation_primary_gesture_id_fkey" FOREIGN KEY ("primary_gesture_id") REFERENCES "public"."gesture"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gesture_relation" ADD CONSTRAINT "gesture_relation_secondary_gesture_id_fkey" FOREIGN KEY ("secondary_gesture_id") REFERENCES "public"."gesture"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gesture_tag" ADD CONSTRAINT "gesture_tag_gesture_id_gesture_id_fk" FOREIGN KEY ("gesture_id") REFERENCES "public"."gesture"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gesture_tag" ADD CONSTRAINT "gesture_tag_tag_id_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/