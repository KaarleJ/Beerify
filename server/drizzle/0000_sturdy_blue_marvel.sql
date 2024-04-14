CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
