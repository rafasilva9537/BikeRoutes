PGDMP      1                }            bike_routes    17.4    17.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    19370    bike_routes    DATABASE     �   CREATE DATABASE bike_routes WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE bike_routes;
                     postgres    false                        3079    19383    postgis 	   EXTENSION     ;   CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;
    DROP EXTENSION postgis;
                        false            �           0    0    EXTENSION postgis    COMMENT     ^   COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';
                             false    2            �            1259    20470    data_routes    TABLE     �   CREATE TABLE public.data_routes (
    id bigint NOT NULL,
    start_path public.geography(Point,4326) NOT NULL,
    end_path public.geography(Point,4326) NOT NULL,
    path_routes public.geography(LineString,4326)
);
    DROP TABLE public.data_routes;
       public         heap r       postgres    false    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2            �            1259    20469    data_routes_id_seq    SEQUENCE     �   ALTER TABLE public.data_routes ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.data_routes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    226            �            1259    20478    routes    TABLE     h  CREATE TABLE public.routes (
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
    DROP TABLE public.routes;
       public         heap r       postgres    false            �            1259    20477    routes_id_seq    SEQUENCE     �   ALTER TABLE public.routes ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.routes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    228            �            1259    19372    users    TABLE     �   CREATE TABLE public.users (
    id bigint NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    email character varying NOT NULL,
    phone character varying,
    photo text
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    19371    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    219            �          0    20470    data_routes 
   TABLE DATA           L   COPY public.data_routes (id, start_path, end_path, path_routes) FROM stdin;
    public               postgres    false    226          �          0    20478    routes 
   TABLE DATA           �   COPY public.routes (id, users_id, data_routes_id, title, photo, description, duration, distance, rating, avarage_speed) FROM stdin;
    public               postgres    false    228   ^                 0    19705    spatial_ref_sys 
   TABLE DATA           X   COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
    public               postgres    false    221   8#       �          0    19372    users 
   TABLE DATA           O   COPY public.users (id, first_name, last_name, email, phone, photo) FROM stdin;
    public               postgres    false    219   U#       �           0    0    data_routes_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.data_routes_id_seq', 7, true);
          public               postgres    false    225            �           0    0    routes_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.routes_id_seq', 7, true);
          public               postgres    false    227            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 6, true);
          public               postgres    false    218            *           2606    20476    data_routes data_routes_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.data_routes
    ADD CONSTRAINT data_routes_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.data_routes DROP CONSTRAINT data_routes_pkey;
       public                 postgres    false    226            ,           2606    20484    routes routes_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.routes DROP CONSTRAINT routes_pkey;
       public                 postgres    false    228            "           2606    19380    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public                 postgres    false    219            $           2606    19382    users users_phone_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_phone_key;
       public                 postgres    false    219            &           2606    19378    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    219            -           2606    20490 !   routes routes_data_routes_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_data_routes_id_fkey FOREIGN KEY (data_routes_id) REFERENCES public.data_routes(id);
 K   ALTER TABLE ONLY public.routes DROP CONSTRAINT routes_data_routes_id_fkey;
       public               postgres    false    226    228    5674            .           2606    20485    routes routes_users_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);
 E   ALTER TABLE ONLY public.routes DROP CONSTRAINT routes_users_id_fkey;
       public               postgres    false    228    5670    219            �   8  x�m�;�� ��l�
�`���c�������^�l{_`��Bc���������.H�A��&��@�t`ً|�>tU��*���Q�BKm�W�3�GƋ�x�ty�V�T��zh0CAX�뚸�������qL�D��8�}�z�V�=���VG�
���"W2e�A�=d�X�i�^��dd�$�V�6�g��W���D�y�t�5i�y�Vمc����X�Z��
SU��U��0z��+$�Ubڋ�j�:NdT5���;�{AGɢ�k��iՂ|����t�i������L��      �   �  x������6���S�J�$˶
E�E0v��zIc��D*��n{�$���aO�������=dkp����8����qc�bK;��"��Ɛ����w� �-B�	]�گ�S�Оm��#�6*u3m��v���,Y���8�px�F?�����N���5l�]iםT�Z�/�~Y��bvwX/��]՚u���T��R�ڒ�F4�Ć���DK��H��r$�l��X-�Q�Yu,��hIZ䫬���}S�JȊ�ƴ{�,ki;�Xڲ�n���$��<�G�`�$pc���7�6�ؽ�<��:xP�g���E���stg�O1�w�fiȆ�Gl�!?��'	�.¾	K�C���ò&�o��%k]����ȵ ��O��0���'�ӑ�+���'������w���{#PԡG���XWS+�^Zj���%�v�͂xڋ`%�4pc��-uad���t��<�y�L�K�G/I$�Q�C�?��U����D��]���v�Z� ���G+=ϣt3�o��x➱�UE8��>%*n����H�4:�ij�`�&P+��@���+I� ���#5݋/s��$]����ۧ�%�F���= o(��T�C�s������@�>�
X@��m
P@Di`54�崇��N�������Go�BV5^P�����Nt��f���I������o{�
��6xۋ����/�ϓ<�D7�n��ԛ��c�~����� -Z�q�i�)�J���K`m;��{vG��TK���K  V�E��F����q�b�}�����a�<_��+ݜ���~�B���J��R��Jw���7*���é�5�%
Mn��ѷ鳥�6���B�w6Ja�t�ĭ��ޮg�d�Cq��Z&y>���,t�^Y�L�CX���:��Bf7G�v��T	��N�GH�.�ȜoxoHA�:�ݭ	Ǩ
�ъ�Nx�g��"!Xr�d�S��&?F���_�Ҳ            x������ � �      �   �  x���M��0�����?�DB��HYD�,�m6զ�q��6�d����b10	5RZ�(x��z_���3Za|49P�x ����((���Z�{�.���9��O���WԷ�eI��iG��l��=Z�W��	û�*��E-?�tz��7u�5�9���R�r�t�������m]��m��Rx��dwA@�܍_������ʒ�̗�goC�>�?�|$kIZ��AÏ�j5buS��(�������B�!�Fz
����-]���[�_�h��vT�(�M(IVT��2�K�0'v����5.L�b�
��k�;Pi��cc��><�n�m�F��$V)��(����rr����fC�>��;E�A��8����m�Ӹʮ�O�2�l�S	�c.$=��t�6.9Jda[v�B��<n ��w��_q��     