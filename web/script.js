// Select the chat area, message input, and send button elements
const chatArea = document.getElementById('chat-area');
const messageInput = document.querySelector('.msger-input');
const sendButton = document.querySelector('.msger-send-btn');

// Declare an empty array to store message elements
const chatMessages = [];

// Add a click event listener to the send button
sendButton.addEventListener('click', () => {
  // Get the message text
  const messageText = messageInput.value.trim();

  // Check if message is empty
  if (!messageText) return;

  // Create a message element
  const messageElement = createMessageElement('Vos', messageText);

  // Add user message to the chat area and messages array
  chatArea.appendChild(messageElement);
  chatMessages.push(messageElement);

  // Clear the message input
  messageInput.value = '';

  // Simulate bot response after a short delay
  /*setTimeout(() => {
    const botResponse = generateBotResponse(messageText);
    const botMessage = createMessageElement('BOT', botResponse);
    chatArea.appendChild(botMessage);
    chatMessages.push(botMessage);
  }, 1000);*/
});

// Display existing messages from the chatMessages array
chatMessages.forEach(messageElement => {
  chatArea.appendChild(messageElement);
});

// Function to create a message element
function createMessageElement(name, text) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('msg');
  if (name === 'Vos') {
    messageElement.classList.add('right-msg');
  }

  messageElement.innerHTML = `
    <div class="msg-bubble">
      <div class="msg-info">
        <div class="msg-info-name">${name}</div>
        <div class="msg-info-time">Just now</div>
      </div>
      <div class="msg-text">${text}</div>
    </div>
  `;

  return messageElement;
}

// Replace this with your actual bot logic
function generateBotResponse(messageText) {
  // Simple example responses
  const responses = {
    "hola": "Hola!  ¿Cómo puedo ayudarte hoy?",
    "bien": "¡Me alegro de escucharlo! ",
    "mal": "Lo siento que te sientas así.  ¿Hay algo en lo que te pueda ayudar?",
    "default": "No estoy seguro de cómo responder a eso.  ¿Puedes intentar decirlo de otra manera?"
  };

  return responses[messageText.toLowerCase()] || responses.default;
}
