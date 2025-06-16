--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-05-29 15:47:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 19383)
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- TOC entry 5840 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 20470)
-- Name: data_routes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.data_routes (
    id bigint NOT NULL,
    start_path public.geography(Point,4326) NOT NULL,
    end_path public.geography(Point,4326) NOT NULL,
    path_routes public.geography(LineString,4326)
);


ALTER TABLE public.data_routes OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 20469)
-- Name: data_routes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.data_routes ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.data_routes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 228 (class 1259 OID 20478)
-- Name: routes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.routes (
    id bigint NOT NULL,
    users_id bigint NOT NULL,
    data_routes_id bigint NOT NULL,
    title character varying NOT NULL,
    photo text,
    description text NOT NULL,
    duration double precision NOT NULL,
    distance double precision NOT NULL,
    rating double precision NOT NULL,
    avarage_speed double precision
);


ALTER TABLE public.routes OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 20477)
-- Name: routes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.routes ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.routes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 19372)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    email character varying NOT NULL,
    phone character varying,
    photo text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 19371)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 5832 (class 0 OID 20470)
-- Dependencies: 226
-- Data for Name: data_routes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.data_routes (id, start_path, end_path, path_routes) FROM stdin;
1	0101000020E6100000B2E048A4C1633CC0BA119A8A35B048C0	0101000020E6100000C912F114B5643CC01FC05CC571C648C0	\N
2	0101000020E6100000B208DCC2AC8C37C034219D56D58F47C0	0101000020E6100000831F70717A9C37C0A489C2DA869447C0	\N
3	0101000020E61000002A55B935F27330C0969C85DB1E8843C0	0101000020E6100000CE55F21A2EB030C04BF89F788D8D43C0	\N
4	0101000020E6100000B20E418783DD2AC038C934A5C39B44C0	0101000020E6100000132AA63937052AC0139E74EA46AF44C0	\N
5	0101000020E61000005B0EF13862083EC031003386A79E49C0	0101000020E6100000692EFD4557143EC0A80CDB2DC19F49C0	\N
6	0101000020E6100000017770BB85B235C0B5695432CCA046C0	0101000020E6100000D8619E88A5D935C0A4F56CC611A646C0	\N
7	0101000020E61000008A1315568B0037C0B80ED02732A345C0	0101000020E61000008AF32EC2CD0A37C014F4EA7DFEC045C0	\N
\.


--
-- TOC entry 5834 (class 0 OID 20478)
-- Dependencies: 228
-- Data for Name: routes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.routes (id, users_id, data_routes_id, title, photo, description, duration, distance, rating, avarage_speed) FROM stdin;
1	1	1	Desafio na Serra do Rio do Rastro - SC	https://images.pexels.com/photos/30352730/pexels-photo-30352730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1	Estrada sinuosa em meio à serra catarinense. Percurso exigente com paisagens deslumbrantes, ideal para ciclistas experientes.	210	24	4.8	6.9
2	2	2	Cicloturismo na Rota do Vinho - SP	https://images.pexels.com/photos/31561191/pexels-photo-31561191/free-photo-of-fileiras-de-vinhedos-exuberantes-sob-um-ceu-azul-claro.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1	Passeio agradável entre vinícolas e colinas suaves em São Roque. Ideal para quem curte um pedal com paradas gastronômicas.	150	18	4.6	7.2
3	3	3	Costa do Descobrimento - Bahia	https://images.pexels.com/photos/31569973/pexels-photo-31569973/free-photo-of-baia-de-todos-os-santos.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1	Rota costeira com belas praias, falésias e vilas históricas. Recomendado para ciclistas intermediários.	240	35	4.7	8.8
4	4	4	Chapada Diamantina Selvagem - BA	https://images.pexels.com/photos/19238829/pexels-photo-19238829/free-photo-of-montanhas-homem-caminhando-andando.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1	Trilha técnica e desafiadora no coração da Chapada. Terreno misto com subidas e descidas intensas.	300	30	4.9	6
5	5	5	Beira Rio Guaíba - Porto Alegre	https://images.pexels.com/photos/544292/pexels-photo-544292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1	Rota urbana e tranquila ao redor do lago Guaíba. Ideal para iniciantes e passeios em família.	90	12	4.5	8
6	6	6	Circuito das Águas - Minas	https://images.pexels.com/photos/3996439/pexels-photo-3996439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1	Rota entre estâncias hidrominerais e matas de Minas. Subidas leves e boa estrutura para cicloturistas.	180	25	4.3	8.3
7	1	7	Praias Selvagens do Rio - RJ	https://images.pexels.com/photos/17299048/pexels-photo-17299048/free-photo-of-mar-praia-litoral-ferias.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1	Trilha off-road até praias isoladas do Rio de Janeiro. Exige condicionamento e bike apropriada.	120	15	4.6	7.5
\.


--
-- TOC entry 5663 (class 0 OID 19705)
-- Dependencies: 221
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- TOC entry 5830 (class 0 OID 19372)
-- Dependencies: 219
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, email, phone, photo) FROM stdin;
1	Marcos	Nunes	marcos@email.com	61999999999	https://images.pexels.com/photos/31630200/pexels-photo-31630200/free-photo-of-gato-preto-e-branco.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
2	Ana	Silva	ana.silva@email.com	61999999998	https://images.pexels.com/photos/731564/pexels-photo-731564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
3	João	Ferreira	joao.ferreira@email.com	61999999997	https://images.pexels.com/photos/31644561/pexels-photo-31644561/free-photo-of-luzes-a-noite-no-japao.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
4	Beatriz	Rocha	beatriz.rocha@email.com	61999999996	https://images.pexels.com/photos/31613570/pexels-photo-31613570/free-photo-of-retrato-caprichoso-em-um-campo-de-flores-encantador.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
5	Lucas	Mendes	lucas.mendes@email.com	61999999995	https://images.pexels.com/photos/31615928/pexels-photo-31615928/free-photo-of-andar-de.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
6	Carla	Almeida	carla.almeida@email.com	61999999994	https://images.pexels.com/photos/31612073/pexels-photo-31612073/free-photo-of-idoso-aproveita-vista-da-praia-com-bicicleta.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
\.


--
-- TOC entry 5841 (class 0 OID 0)
-- Dependencies: 225
-- Name: data_routes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.data_routes_id_seq', 7, true);


--
-- TOC entry 5842 (class 0 OID 0)
-- Dependencies: 227
-- Name: routes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.routes_id_seq', 7, true);


--
-- TOC entry 5843 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- TOC entry 5674 (class 2606 OID 20476)
-- Name: data_routes data_routes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_routes
    ADD CONSTRAINT data_routes_pkey PRIMARY KEY (id);


--
-- TOC entry 5676 (class 2606 OID 20484)
-- Name: routes routes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_pkey PRIMARY KEY (id);


--
-- TOC entry 5666 (class 2606 OID 19380)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 5668 (class 2606 OID 19382)
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- TOC entry 5670 (class 2606 OID 19378)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 5677 (class 2606 OID 20490)
-- Name: routes routes_data_routes_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_data_routes_id_fkey FOREIGN KEY (data_routes_id) REFERENCES public.data_routes(id);


--
-- TOC entry 5678 (class 2606 OID 20485)
-- Name: routes routes_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);


-- Completed on 2025-05-29 15:47:52

--
-- PostgreSQL database dump complete
--

