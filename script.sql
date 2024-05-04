CREATE DATABASE repertorio ;

\c repertorio

drop table canciones;

CREATE TABLE canciones (
    id SERIAL PRIMARY KEY, 
    titulo VARCHAR(50), 
    artista VARCHAR(50), 
    tono VARCHAR(10)
);

select * from canciones;

-- Autor: Javier Vergara