CREATE TABLE public."Category" (
	"idCategory" int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	"nameCategory" varchar NOT NULL,
	"entryDate" date NOT NULL,
	CONSTRAINT categoria_pk PRIMARY KEY ("idCategory"),
	CONSTRAINT categoria_unique UNIQUE ("nameCategory")
); 

CREATE TABLE public."State" (
	"idState" int4 NOT NULL,
	"nameState" varchar NOT NULL,
	CONSTRAINT estado_pk PRIMARY KEY ("idState"),
	CONSTRAINT estado_unique UNIQUE ("nameState")
);

CREATE TABLE public."Product" (
	"idProduct" int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	"nameProduct" varchar NOT NULL,
	"entryDate" date NOT NULL,
	"idCategory" int4 NOT NULL,
	"modelProduct" varchar NOT NULL,
	"idState" int4 NOT NULL,
	CONSTRAINT producto_pk PRIMARY KEY ("idProduct"),
	CONSTRAINT producto_categoria_fk FOREIGN KEY ("idCategory") REFERENCES public."Category"("idCategory"),
	CONSTRAINT producto_estado_fk FOREIGN KEY ("idState") REFERENCES public."State"("idState")
);

CREATE TABLE public."User" (
	"idUser" int4 NOT NULL,
	"firstName" varchar NOT NULL,
	"dateBirth" date NOT NULL,
	"lastName" varchar NOT NULL,
	gender bpchar(1) NOT NULL,
	"idState" int4 NOT NULL,
	CONSTRAINT user_pk PRIMARY KEY ("idUser"),
	CONSTRAINT user_state_fk FOREIGN KEY ("idState") REFERENCES public."State"("idState")
);

INSERT INTO public."Category"("nameCategory", "entryDate") VALUES ('Televisores', '2025-01-01');
INSERT INTO public."State"("idState", "nameState")VALUES(1, 'Activo');
INSERT INTO public."State"("idState", "nameState")VALUES(2, 'Inactivo');
INSERT INTO public."Product"("nameProduct", "entryDate", "idCategory", "modelProduct", "idState")VALUES('Sony', '2025-01-16', 1, 'Bravia', 1);

CREATE TABLE public.keys_history (
	"idApiKeys" int4 GENERATED ALWAYS AS IDENTITY NOT NULL,
	"linkedEmail" varchar NOT NULL,
	"apiKey" varchar NOT NULL,
	"publicKey" varchar NOT NULL,
	CONSTRAINT keys_history_pk PRIMARY KEY (idapikeys),
	CONSTRAINT keys_history_unique UNIQUE (linkedemail),
	CONSTRAINT keys_history_unique_1 UNIQUE (apikey),
	CONSTRAINT keys_history_unique_2 UNIQUE (publickey)
);