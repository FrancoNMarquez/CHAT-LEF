import os
import openai
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify
from langchain_community.vectorstores import Pinecone
from langchain_openai import OpenAIEmbeddings
from openai import OpenAI
from pathlib import Path

from gtts import gTTS

#from transcriber import Transcriber
#import whisperx



#Cargar llaves del archivo .env
load_dotenv('.env')
openai.api_key = os.getenv('OPENAI_API_KEY')
pinecone_key=os.environ.get("PINECONE_API_KEY")

model_name = 'text-embedding-ada-002'
OPENAI_API_KEY=os.environ.get("OPENAI_API_KEY")
indice="videos"
embedding= OpenAIEmbeddings(
    model=model_name,
    openai_api_key=OPENAI_API_KEY
)
client = OpenAI()
# Cargo el los vectores desde Pienecone
vector_store=Pinecone.from_existing_index(indice,embedding)

from langchain.chains import ConversationalRetrievalChain  # lo usamos para hacer una convesasion parecida a chat gpt
from langchain_openai import ChatOpenAI
# ChatOpenAI: Genera respuestas basadas en el contexto de la conversación utilizando el modelo de lenguaje GPT.
llm1 = ChatOpenAI(model="gpt-3.5-turbo", temperature=1)
#llm1=ChatOpenAI(model="gpt-3.5-turbo-0613",temperature=1)
# vector_store: Almacena vectores representativos de las consultas para facilitar la recuperación de información relevante durante una conversación.
retriever=vector_store.as_retriever(search_type="similarity",search_kwargs={"k":3}) # modelo de recuperacion de la consulta
# ConversationalRetrievalChain: Gestiona la lógica de la conversación y coordina entre el modelo de lenguaje y el recuperador de consultas.
crc=ConversationalRetrievalChain.from_llm(llm=llm1,retriever=retriever)
memoria=[]



app = Flask(__name__)
@app.route("/")
def index():
    return render_template("index.html")


# Ruta para recibir el texto enviado desde el frontend
@app.route("/texto", methods=["POST"])
def recibir_texto():
    # Obtener el texto del mensaje enviado desde el frontend
    mensaje = request.json.get("message")
    
    # Procesar el mensaje utilizando la función texto
    respuesta = texto(mensaje)
    
    # Devolver la respuesta al frontend
    return jsonify({"respuesta": respuesta})

# Función para procesar el texto del mensaje
def texto(pregunta):
     respuesta = crc({"question": pregunta, "chat_history": memoria})
     memoria.append((pregunta, respuesta["answer"]))
     respuesta = respuesta["answer"]
     return respuesta


@app.route("/audio", methods=["POST"])
def audio():
    #Obtener audio grabado y transcribirlo
    audio = request.files.get("audio")
    audio.save("static/pregunta.mp3")
    audio_file=open("static/pregunta.mp3","rb")
    transcription = client.audio.transcriptions.create(
        model="whisper-1", 
        file=audio_file
    )
   
   
   # print(transcription.text)
    return {"result": "ok", "text": transcription.text}
    #return  jsonify({"respuesta": transcript})
    

# Ruta para recibir el texto enviado desde el frontend
@app.route("/texto_voz", methods=["POST"])
def recibir_texto_voz():
    # Obtener el texto del mensaje enviado desde el frontend
    mensaje = request.json.get("message")
    speech_file_path = Path(__file__).parent / "static/respuestaia.mp3"
    resp = client.audio.speech.create(
           model="tts-1",
           voice="alloy",
           input=mensaje
    )

    resp.stream_to_file(speech_file_path)



    # Guardar el archivo de audio en el directorio "static"
    #with open(speech_file_path , "wb") as f:
     #   f.write(resp.audio_content)
    #tts=gTTS(mensaje,lang="es",tld="com.mx") 
    #tts.save("static/respuestaia.mp3")
    # Procesar el mensaje utilizando la función texto

    # Devolver la respuesta al frontend
    return jsonify({"respuesta":"respuestaia.mp3"})


if __name__ == "__main__":
   app.run(debug=False)
