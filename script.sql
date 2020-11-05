drop  database if exists launchstoredb;
create database launchstoredb;

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    category_id INT NOT NULL,
    user_id INT,
    name text not null,
    description text not null,
    old_price int,
    price int not null,
    quantity int default 0,
    status int default 1,
    created_at date default(now()),
    updated_at date default(now())
);

create table categories(
    id serial PRIMARY key,
    name text
);

alter table products add foreign key (category_id) references categories(id);

create table files (
    id serial primary key,
    name text,
    path text not null,
    product_id int
);

alter table files add foreign  key(product_id) references products(id);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name text not null,
    email text unique not null,
    password text not null,
    cpf_cnpj text unique not null,
    cep text,
    address text,
    created_at date default(now()),
    updated_at date default(now())
);

alter table products add foreign key(user_id) references users(id);

create function tigger_set_date()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger set_date
before update on products
for each row
execute procedure tigger_set_date();

create trigger set_date
before update on users
for each row
execute procedure tigger_set_date();

insert into categories(name) values ('comida');
insert into categories(name) values ('eletrônicos');
insert into categories(name) values ('automóveis');

-- CRIACAO DA TABELA DE SESSÃO DE USUÁRIO
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

