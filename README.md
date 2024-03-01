

# Asistente virtual Chatlef
Este repositorio contiene códigos y archivos adicionales para el Asistente Virtual Chatlef. Está organizado para que pueda ejecutar directamente Chatlef accediendo a la carpeta **web** y siguiendo las indicaciones en su **README**. Por otro lado, si quiere ejecutar todo el proceso de carga de datos, limpieza y depuración hasta la vectorización y el alojamiento de los vestores en Pinecone, siga el código en **TF1.ipynb**. Tenga en cuenta que el acceso a los archivos para la ejecución desde Colab requiere el path adecuado según usted guarde los archivos a procesar (sugerimos crear una carpeta espacífica en Drive). Los archivos que se han usado como entrada de datos y los que se han generado en cada etapa del proceso están en la carpeta txt. Tenga en cuenta también que necesitará de un archivo .env con su api.key de OpenIA y de Pinecone. Si desea correr por etapas cada uno de los pasos en los que se desarrolló este trabajo, puede seguir el orden que se indica a continuación.


 ## TF1
 Colab unificado **TF1.ipynb**.
 ## TF_obtener_txt
Para ejecutar la parte de obtener la transcripción a texto de cada video de cada clase use el código  **TF_obtener_txt.ipynb**.


## TF_depurarr_txt
Para ejecutar la parte de depurar la transcripción obtenida use el código  **TF_depurarr_txt.ipynb**.


## TF__juntar_textos_fragmentar
Para ejecutar la parte de union de todos los archivos txt  **TF__juntar_textos_fragmentar.ipynb**.


## TF_Costos_Embeddings
Para ejecutar la parte de vectorizar (previo a juntar cada transcripción individual en un sólo archivo), almacenar los vectores en Pinecone y estimar el costo del uso de OpenIA use el código  **TF_Costos_Embeddings.ipynb**.


## TF_Conectar_CHATLEF
Para ejecutar la parte de concetarse a Pinecone para vincular los vectores allí alojados y usar Chatlef en el entorno de Colab con una interfaz dentro de dicho entorno use el código  **TF_Conectar_CHATLEF.ipynb**.


## Que puedes consultar a este Chatlef (si usas tus datos será lo que esos datos tengan)
	- Todo los referido al Curso de ia dictado en el IFES por Gustavo Cabrera
	- Puedes pedirle el link de las clases
	- algunos datos como correo para cotactarse con los alumnos del curso
    - la idea que te ayude a refrescar todo lo que necesites del curso

## Créditos
Este proyecto fue creado por:

- **Luis Maria Nowak**

- **Franco Marquez**

- **Eduardo Priotti**

Curso Inteligencia Artificial Dictado por el IFES, Neuquén, Argentina.

Duración 1 año - Ciclo 2023.

Profesor: Gustavo Cabrera
