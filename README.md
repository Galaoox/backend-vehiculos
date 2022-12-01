## Instalacion

Antes de iniciar la instalacion se debe tener instalado yarn, para instalar yarn se ejecuta el siguiente comando:

```bash
  npm install --global yarn
```


Pasos para la clonacion e instalacion de dependencias:
Se debe tener intalado yarn

```bash
  git clone https://github.com/Galaoox/backend-vehiculos.git
  cd backend-vehiculos
  yarn 
```

Para la ejecucion del proyecto se recomienda usar docker para la base de datos

Para instalar la base de datos y ejecutarla solo es necesario el siguiente comando:
```bash
  docker compose up 
```
    

# Ejecucion

Antes de ejecutar el proyecto se debe crear un archivo en la carpeta del proyecto llamado .env, este archivo contiene las variables de entorno usadas
debe tener las siguientes variables:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDNARY_API_SECRET=
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
PORT=
```
Con el objetivo de facilitar las pruebas hay un archivo llamado .env.example donde contiene unas variables ya definidas.

Pasos para ejecutar el proyecto:

Si se ejecuta por primera vez el proyecto es necesario que ejecutar los seeder, con el siguiente comando:
      ```bash
      seed:run
      ```
Despues de haber ejecutado el anterior comando se ejecuta el siguiente:
```bash
  yarn start:dev
```
El proyecto se ejecutara y se ejecutara en el localhost con el puerto que se haya usado en el archivo .env

## Autor

-   [@Galaoox](https://github.com/Galaoox)

## License

[MIT](https://choosealicense.com/licenses/mit/)