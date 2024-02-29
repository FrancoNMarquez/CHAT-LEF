
# Asistente virtual Chatlef
Este repositorio es el código para el Asistente Virtual Chatlef


## Configuración
Para ejecutar el proyecto es necesario:
- Descargar el repositorio
- Opcional: Crea un ambiente virtual es aconsejable que lo hagas
	 	```  python -m venv env ```
- Instala las dependencias ejecutando 
	- ```  pip install -r requirements.txt ```
- Crea un archivo llamado ```.env```
	- En el archivo coloca las llaves.
	- ```OPENAI_API_KEY=XXXXXX```
	- ```PINECONE_API_KEY=XXXXXX```
	- ```PINECONE_ENV="gcp-starter"```


## Ejecución
- Abre el terminal de tu editor y ejecuta el comando
	 ```python app.py```
- Este proyecto utiliza Flask. Puedes levantar el servidor en modo debug por 	defecto en el puerto 5000 con el comando
	- ```flask --app app run --debug``` 
	- En tu navegador ve a http://localhost:5000
- Aparecera la aplicacion y lo utilizas como si fuera un chat
	- Tildando el la opcion voz , chatlef te contestara
	- Para poder usar el microfono das click y se colocará en rojo significa
	  que esta grabando, cuando termines vuelve a dar click y se enviara tu consulta
	
## Que puedes consultar
	- Todo los referido al Curso de ia dictado en el IFES por Gustavo Cabrera
	- Puedes pedirle el link de las clases
	- algunos datos como correo para cotactarse con los alumnos del curso
    - la idea que te ayude a refrescar todo lo que necesites del curso

