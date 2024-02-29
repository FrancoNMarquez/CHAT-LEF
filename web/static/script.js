let blobs = [];
let stream;
let rec;
let recordUrl;
let audioResponseHandler;
// Select the chat area, message input, and send button elements
const chatArea = document.getElementById('chat-area');
const messageInput = document.getElementById('messageInput');
const sendButton = document.querySelector('.msger-send-btn');
// Add a click event listener to the send button
sendButton.addEventListener('click', enviarMensaje);
//sendButton.addEventListener('click', enviar);

function enviarMensaje(event) {
  event.preventDefault(); // Evitar el envío del formulario
  // Obtener el texto del mensaje
  const messageText = messageInput.value.trim();
  // Comprobar si el mensaje está vacío
  if (!messageText) return;
  // Crear un elemento de mensaje para el usuario
  const userMessageElement = createMessageElement('Tú', messageText);
  // Agregar el mensaje de usuario al área de chat
  chatArea.appendChild(userMessageElement);
  // Limpiar el campo de entrada de mensaje
  messageInput.value = '';
  // Llamar a la función enviarTexto con el texto del mensaje la llm
  enviarTexto(messageText);

}


// Function to create a message element
function createMessageElement(name, text) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('msg');

  if (name === 'Tú') {
    messageElement.classList.add('right-msg');
  }
  // Crear un objeto Date para obtener la hora actual
  const currentTime = new Date();

  // Obtener la hora, los minutos y los segundos
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  // Formatear la hora en un formato legible
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  // Agregar el tiempo al elemento de mensaje
  messageElement.innerHTML = `
  <div class="msg-bubble">
    <div class="msg-info">
      <div class="msg-info-name">${name}</div>
      <div class="msg-info-time">${formattedTime}</div>
    </div>
    <div class="msg-text">${text}</div>
  </div>
`;


  return messageElement;
}


function enviarTexto(texto) {
  // Crear un objeto con los datos a enviar al servidor
  const data = { message: texto };

  // Realizar una solicitud POST al servidor
  fetch('/texto', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      // Verificar si la solicitud fue exitosa
      if (!response.ok) {
        throw new Error('Error al enviar el mensaje');
      }
      // Limpiar el campo de entrada de mensaje después de enviarlo
      messageInput.value = '';
      // Devolver la respuesta como JSON
      return response.json();
    })
    .then(data => {
      // Manejar la respuesta del servidor si es necesario
      //console.log('Respuesta del servidor:', data)


      const botMessage = createMessageElement('Asistente', data.respuesta);
      chatArea.appendChild(botMessage);
      chatArea.scrollTop = chatArea.scrollHeight; // Desplazar hacia abajo después de agregar el mensaje del asistente

      const checkbox = document.getElementById("vozCheckbox");
      // Verificar si está marcado ra reproducir la voz  
      if (checkbox.checked) {
        enviarTextoVoz(data.respuesta)
        console.log("Reproducir voz");
      } else {
        console.log("El checkbox no está marcado");
      }
    })
    .catch(error => {
      // Manejar errores de la solicitud
      console.error('Error:', error);
    });
}

function enviarTextoVoz(texto) {
  // Crear un objeto con los datos a enviar al servidor
  const data = { message: texto };
  
  // Realizar una solicitud POST al servidor
  fetch('/texto_voz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    // Verificar si la solicitud fue exitosa
    if (!response.ok) {
      console.log('Error al enviar el mensaje');
      //throw new Error('Error al enviar el mensaje');
    } else {
      // Obtener el nombre del archivo de la respuesta
      return response.json();
    }
  })
  .then(data => {
    if (data && data.respuesta) {
      console.log("Nombre del archivo recibido:", data.respuesta);
      // Crear un nuevo objeto de audio con el nombre del archivo
      
      audioFile = data.respuesta;
      let audio = new Audio();
      audio.setAttribute("src", "static/" + audioFile);
      audio.play();
      
      // Reproducir el audio
      
    }
  })
  .catch(error => {
    // Manejar errores de la solicitud
    console.error('Error:', error);
  });
}










function recorder(url, handler) {
  recordUrl = url;
  if (typeof handler !== "undefined") {
    audioResponseHandler = handler;
  }
}

/*
* Al ser un proyecto pequeño uso doc.getById como maniaco
* Si no te gusta, puedes cambiarlo ;)
*/
async function record() {
  //console.log('recording');
  //
  //navigator.mediaDevices.getUserMedia({ audio: true })
  //console.log(A)
  try {
    //document.getElementById("text").innerHTML = "<i>Grabando...</i>";
    document.getElementById("record1").style.display = "none";
    document.getElementById("stop1").style.display = "";
    document.getElementById("record-stop-label").style.display = "block"
    document.getElementById("record-stop-loading").style.display = "none"
    document.getElementById("stop1").disabled = false
    blobs = [];
    //Grabar audio, blabla
    stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    rec = new MediaRecorder(stream);
    rec.ondataavailable = e => {
      if (e.data) {
        blobs.push(e.data);
      }
    }
    //console.log(e.data);
    rec.onstop = doPreview;
    rec.start();

  } catch (e) {
    console.log(e)
    alert("No fue posible iniciar el grabador de audio! Favor de verificar que se tenga el permiso adecuado, estar en HTTPS, etc...");
  }
}

function doPreview() {
  if (!blobs.length) {
    console.log("No hay blobios!");
  } else {
    console.log("Tenemos blobios!");
    const blob = new Blob(blobs);

    //Usar fetch para enviar el audio grabado a Pythonio
    var fd = new FormData();
    fd.append("audio", blob, "audio");


    fetch(recordUrl, {
      method: "POST",
      body: fd,
    })
      .then((response) => response.json())
      .then(audioResponseHandler)
      .catch(err => {
        console.log("Oops: Ocurrió un error al convertir la respuesta a JSON", err);
      })
      .then(() => {

        console.log("La promesa anterior se completó correctamente");
      })
      .catch(err => {
        console.log("Oops: Ocurrió un error en alguna parte de la cadena", err);
      });
  }
}

function stop() {
  document.getElementById("record-stop-label").style.display = "none";
  document.getElementById("record-stop-loading").style.display = "block";
  document.getElementById("stop1").disabled = true;

  rec.stop();
}


function handleAudioResponse(response) {
  if (!response || response == null) {
    console.log("No response");
    return;
  }
  // Mostrar o modificar la visualización de los elementos relacionados con la grabación de audio
  document.getElementById("record1").style.display = "";
  document.getElementById("stop1").style.display = "none";

  // Obtener el área de chat
  const chatArea = document.getElementById('chat-area');
  console.log("response")
  // Verificar si la respuesta contiene la transcripción
  if (response.respuesta) {
    // Crear un nuevo mensaje para mostrar la transcripción en el área de chat
    const transcripcionMessage = createMessageElement('tu', response.respuesta);
    console.log("entro a  respuesta")
    // Agregar el mensaje al área de chat
    chatArea.appendChild(transcripcionMessage);

    // Desplazar hacia abajo para mostrar el mensaje recién agregado
    chatArea.scrollTop = chatArea.scrollHeight;
  } else {
    console.log("No se encontró la transcripción en la respuesta");
  }
}

