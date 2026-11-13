const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const typingIndicator = document.getElementById('typing-indicator');
const clearChatButton = document.getElementById('clear-chat');

let isTyping = false;
let typingTimer = null;

// Функция добавления сообщения
function addMessage(text, isUser) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.classList.add(isUser ? "user-message" : "bot-message");

    const userAvatar = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
    const botAvatar = "https://cdn-icons-png.flaticon.com/512/4712/4712039.png";

    messageElement.innerHTML = `
        <img src="${isUser ? userAvatar : botAvatar}" alt="${isUser ? 'Пользователь' : 'Бот'}" class="message-avatar"> 
        <div class="message-text">${text}</div>
    `;
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Логика ответов
function getBotResponse(userText) {
    userText = userText.toLowerCase();
    
    if (userText.includes("привет") || userText.includes("здравствуй")) {
        return "Привет! как твои дела?";
    } else if (userText.includes('погода')) {
        return "К сожалению, я не могу проверить погоду( я всего лишь учебный бот";
    } else if (userText.includes('имя')) {
        return "Меня зовут Ботти, приятно познакомиться!";
    } else if (userText.includes('пока') || userText.includes("до свидания")) {
        return "До свидания! Хорошего дня!";
    } else {
        return "Извините, я не понял, я только учусь. Можете переформулировать вопрос?";
    }
}

// Отправка сообщения
function handleSendMessage() {
    const userText = userInput.value.trim(); // ИСПРАВЛЕНО (было ariaValueMax)
    if (userText === "" || isTyping) return;
    
    addMessage(userText, true);
    userInput.value = "";
    
    isTyping = true;
    typingIndicator.style.display = "flex";
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    if (typingTimer) {
        clearTimeout(typingTimer);
    }
    
    typingTimer = setTimeout(() => {
        isTyping = false;
        typingIndicator.style.display = "none";
        const botResponse = getBotResponse(userText);
        addMessage(botResponse, false);
        typingTimer = null;
    }, 3000);
}

// Очистка истории (Исправленная версия)
function clearChatHistory() {
    if (typingTimer) {
        clearTimeout(typingTimer);
        typingTimer = null;
        isTyping = false;
        typingIndicator.style.display = "none";
    }
    
    const welcomeMessage = chatMessages.querySelector(".bot-message");
    chatMessages.innerHTML = '';
    
    if (welcomeMessage) {
        chatMessages.appendChild(welcomeMessage);
    }
}

// Привязка событий
sendButton.addEventListener('click', handleSendMessage);

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleSendMessage();
    }
});

clearChatButton.addEventListener("click", clearChatHistory);