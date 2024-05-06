# Desafío - Mi repertorio

En este desafío validaremos nuestros conocimientos sobre Levantar un servidor con
conexión a PostgreSQL, Insertar registros, Consultar registros, Actualizar registros y Eliminar
registros.

Para lograrlo, necesitarás utilizar el archivo Apoyo Desafío - Mi repertorio.
Lee todo el documento antes de comenzar el desarrollo grupal, para asegurarte de tener el
máximo de puntaje y enfocar bien los esfuerzos.

# Descripción

La escuela de música “E-Sueño” está motivando a sus estudiantes de canto a presentarse en
vivo y se puso en contacto con el restaurante del sector para usar su tarima e iniciar un
calendario de presentaciones. Para conocer y gestionar las canciones que cantarán sus
estudiantes, la escuela contrató a un desarrollador freelance para la creación de una
aplicación tipo CRUD.

En este desafío deberás desarrollar un servidor con Express que utilice el paquete pg para
conectarse con PostgreSQL y utilice funciones asíncronas para hacer las consultas a la base
de datos.

# El servidor deberá disponibilizar las siguientes rutas:

- POST /cancion: Recibe los datos correspondientes a una canción y realiza la inserción
en la tabla canciones.
- GET /canciones: Devuelve un JSON con los registros de la tabla canciones.
- PUT /cancion: Recibe los datos de una canción que se desea editar y ejecuta una
función asíncrona para hacer la consulta SQL y actualice ese registro de la tabla
canciones.
- DELETE /cancion: Recibe por queryString el id de una canción y realiza una consulta
SQL a través de una función asíncrona para eliminarla de la base de datos.

Tienes a disposición un Apoyo Desafío - Mi Repertorio con la aplicación cliente que se
muestra en la siguiente imagen, lista para el consumo de estas rutas, por lo que deberás
enfocarte solo en el desarrollo backend.

Si es de tu agrado, puedes crear tu propia maqueta siempre y cuando cumpla con los
requerimientos del desafío. Para la creación de la base de datos y la tabla canciones utiliza
las siguientes consultas SQL.

CREATE DATABASE repertorio ;

CREATE TABLE canciones (id SERIAL, titulo VARCHAR(50), artista
VARCHAR(50), tono VARCHAR(10));

# Requerimientos

1. Crear una ruta POST /cancion que reciba los datos correspondientes a una canción y
realice a través de una función asíncrona la inserción en la tabla canciones. (3 Puntos)

2. Crear una ruta GET /canciones que devuelva un JSON con los registros de la tabla
canciones. (2 Puntos)

3. Crear una ruta PUT /cancion que reciba los datos de una canción que se desea editar,
ejecuta una función asíncrona para hacer la consulta SQL correspondiente y actualice
ese registro de la tabla canciones. (3 Puntos)

4. Crear una ruta DELETE /cancion que reciba por queryString el id de una canción y
realiza una consulta SQL a través de una función asíncrona para eliminarla de la base
de datos. (2 Puntos)

# Autores

- [Javier Esteban Vergara Cabrera] (https://github.com/javierv96) - Programador