CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "name" varchar NOT NULL,
  "password" varchar NOT NULL,
  "cpf_cnpj" varchar UNIQUE NOT NULL,
  "cep" varchar NOT NULL,
  "address" varcgar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "products_categories" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "ads" (
  "id" uuid PRIMARY KEY,
  "users_id" uuid,
  "products_categories_id" int,
  "name" varchar NOT NULL,
  "description" varchar,
  "price" decimal NOT NULL,
  "old_price" decimal DEFAULT (price),
  "quantity" int NOT NULL,
  "available" boolean DEFAULT true,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "file" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "path" varchar NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "ads_photos" (
  "id" SERIAL PRIMARY KEY,
  "ads_id" uuid,
  "file_id" int,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "order" (
  "id" uuid PRIMARY KEY,
  "users_id" uuid,
  "ads_id" uuid,
  "status" varchar NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "sales" (
  "id" uuid PRIMARY KEY,
  "users_id" uuid,
  "ads_id" uuid,
  "status" varchar NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

ALTER TABLE "ads" ADD FOREIGN KEY ("users_id") REFERENCES "users" ("id");

ALTER TABLE "ads" ADD FOREIGN KEY ("products_categories_id") REFERENCES "products_categories" ("id");

ALTER TABLE "ads_photos" ADD FOREIGN KEY ("ads_id") REFERENCES "ads" ("id");

ALTER TABLE "ads_photos" ADD FOREIGN KEY ("file_id") REFERENCES "file" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("users_id") REFERENCES "users" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("ads_id") REFERENCES "ads" ("id");

ALTER TABLE "sales" ADD FOREIGN KEY ("users_id") REFERENCES "users" ("id");

ALTER TABLE "sales" ADD FOREIGN KEY ("ads_id") REFERENCES "ads" ("id");
