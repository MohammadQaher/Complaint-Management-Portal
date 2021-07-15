/*
Source Database		  : cmp
Source Schema         : public
Target Server Type    : PGSQL
Date: 2021-07-15 22:54:09
*/

-- ----------------------------
-- complaint table
-- ----------------------------
CREATE TABLE public.complaint (
	rid bigserial NOT NULL,
	description varchar(255) NULL,
	status varchar(255) NULL,
	title varchar(255) NULL,
	user_id int8 NULL,
	CONSTRAINT complaint_pkey PRIMARY KEY (rid)
);

-- ----------------------------
-- roles table
-- ----------------------------
CREATE TABLE public.roles (
	rid bigserial NOT NULL,
	code varchar(255) NULL,
	CONSTRAINT roles_pkey PRIMARY KEY (rid)
);

-- ----------------------------
-- user_roles table
-- ----------------------------
CREATE TABLE public.user_roles (
	user_id int8 NOT NULL,
	role_id int8 NOT NULL,
	CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id)
);

-- ----------------------------
-- users table
-- ----------------------------
CREATE TABLE public.users (
	rid bigserial NOT NULL,
	email varchar(50) NULL,
	"password" varchar(120) NULL,
	username varchar(25) NULL,
	CONSTRAINT uk6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email),
	CONSTRAINT ukr43af9ap4edm43mmtq01oddj6 UNIQUE (username),
	CONSTRAINT users_pkey PRIMARY KEY (rid)
);

-- ----------------------------
-- public.user_roles foreign keys
-- ----------------------------
ALTER TABLE public.user_roles ADD CONSTRAINT fkh8ciramu9cc9q3qcqiv4ue8a6 FOREIGN KEY (role_id) REFERENCES roles(rid);
ALTER TABLE public.user_roles ADD CONSTRAINT fkhfh9dx7w3ubf1co1vdev94g3f FOREIGN KEY (user_id) REFERENCES users(rid);


-- ----------------------------
--Adding roles
-- ----------------------------
INSERT INTO public.roles (code) VALUES('ADMIN');
INSERT INTO public.roles (code) VALUES('USER');

-- ----------------------------
--Inserting into users
-- ----------------------------
/* 
Username: admin
Password: admin
*/
INSERT INTO public.users (email, "password", username)
VALUES('admin@admin.com', '$2a$10$h4ngnoyIrSVDiyKcuxeDLOZfVfJR6jYwY2sFZRXWKEQ.ZX6MOrBw6', 'admin');

INSERT INTO public.user_roles (user_id, role_id) VALUES(1, 1);
