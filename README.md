
# API Node.js Express

API básica en Node.js con el framework Express, integración con Prisma ORM para la interacción con MYSQL y manejo de Migraciones.



## Requisitos

- Node js version 22.1.0 o superior
- Express
- Prisma ORM
- MySQL
- Docker




## Instalación

Descargar repositorio de github

```bash
git clone https://github.com/OliverosCarlos/express-api.git
```

Instalar dependencias de node js,
dentro de la carpeta **express-api** ejecutar el siguiente comando

```bash
npm install
```

## Configuración

Crear archivo **.env** en la raíz del proyecto y agregar la siguiente variable de entorno 

```bash
DATABASE_URL="mysql://USUARIO:PASSWORD@HOST:3306/BASE_DE_DATOS"


#Remmplezar las siguientes etiquetas por los valores de mysql

#USUARIO => Usuario de mysql
#PASSWORD => Password de usuario
#HOST => IP, Dominio, locahost
#BASE_DE_DATOS => Nombre de la base de datos en MySQL
```

Ejecutar migraciones de base de datos con prisma, el siguiente comando creará las tablas de base de datos segun los modelos definidos.

```bash
npx prisma migrate dev
```

## Run Local



```bash
  node src/index.js
```


## REFERENCIA API

#### API Eventos

| Metodo | Ruta     | Descripción                |
| :-------- | :------- | :------------------------- |
| GET | `GET localhost:3000/eventos` | Obtener todos los eventos |
| GET | `GET localhost:3000/eventos/${id}` | Obtener un evento por id |
| POST | `POST localhost:3000/eventos` | Crear evento |
| PUT | `PUT localhost:3000/eventos/${id}` | Actualizar un evento por id |
| DELETE | `DELETE localhost:3000/eventos/${id}` | Eliminar un evento por id |


#### API Reservas

| Metodo | Ruta     | Descripción                |
| :-------- | :------- | :------------------------- |
| GET | `GET localhost:3000/reservas` | Obtener todas las reservas |
| GET | `GET localhost:3000/reservas/${id}` | Obtener una reserva por id |
| POST | `POST localhost:3000/reservas` | Crear una reserva |
| PUT | `PUT localhost:3000/reservas/${id}` | Actualizar una reserva por id |
| DELETE | `DELETE localhost:3000/reservas/${id}` | Eliminar una reserva por id |



## Instalar MySQL con Docker
En caso de no contar con un servidor local o remoto de mysql, podemos correr mysql en nuestra computadora local gracias a Docker.

Descargar la imagen de Docker **mysql/mysql-server**

```bash
docker pull mysql/mysql-server
```

Iniciar contenedor de la imagen mysql/mysql-server con el comando docker run, el contenedor tendrá el nombre **my_sql_container**.

```bash
docker run --name='my_sql_container' -d -p 3306:3306 mysql/mysql-server
```


Gracias al siguiente comando seremos capaces de visualizar los logs del contenedor y visualizar la contraseña por default que se crea para el usuario root de la instacia de mysql, la cual podremos usar para poder conectarnos y crear un nuevo usuario.

```bash
docker logs my_sql_container
```

![App Screenshot](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*u-o2CDuU_UWDh1OOKGwkqQ.png)

Entrar a la linea de comandos del contenedor

```bash
docker exec -it my_sql_container bash
```

Abrir carpeta de mysql
```bash
cd /var/lib/mysql
```
Conectarse a mysql (La contraseña obtenida en los logs anteriores será solicitada en el prompt)

```bash
mysql -u root -p
```

Cambiar contraseña del usuario root

```bash
ALTER USER 'root'@'localhost' IDENTIFIED BY 'newpassword';
```

Crear un usario especifico para la API

```bash
CREATE USER 'usuario'@'%' IDENTIFIED BY 'contraseña';
GRANT ALL PRIVILEGES ON *.* TO 'usuario'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

Ahora podemos conectarnos desde cualquier cliente a con la siguiente ruta
```bash
mysql://usuario:contraseña@localhost:3306
```


