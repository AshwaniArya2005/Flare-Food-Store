const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatToggler = document.querySelector(".chatbot-toggler");
const chatbotClosebtn = document.querySelector(".close-btn");

// Predefined options and responses
const optionsTree = {
  greeting: {
    message: "Hi! How can I assist you today? Please choose one of the following options:",
    options: [
      { text: "What is your name?", next: "nameOptions" },
      { text: "What products do you offer?", next: "productsOptions" },
      { text: "Any current discounts or offers?", next: "offersOptions" },
      { text: "How can I place an order?", next: "orderOptions" },
      { text: "I need help with delivery", next: "deliveryOptions" },
      { text: "How can I contact you?", next: "supportOptions" }
    ]
  },
  nameOptions: {
    message: "I am a chatbot designed to assist you! How else can I help you?",
    options: [
      { text: "Who created you?", answer: "I was created by a developer to assist users." },
      { text: "What is your purpose?", answer: "My purpose is to provide useful information and assistance." }
    ]
  },
  productsOptions: {
    message: "We offer a wide range of products. What are you looking for?",
    options: [
      { text: "Sports items", answer: "Check out our sports section for gear, apparel, and accessories." },
      { text: "Beverages", answer: "We have refreshing beverages including energy drinks, juices, and more." },
      { text: "Food items", answer: "Explore our food section for healthy snacks, groceries, and essentials." },
      { text: "Household supplies", answer: "Browse our household category for cleaning, storage, and home essentials." },
      { text: "Gym equipment", answer: "Find fitness gear, weights, and gym essentials in our gym category." },
      { text: "Gym equipment", answer: "Find fitness gear, weights, and gym essentials in our gym category." },
      { text: "Gym equipment", answer: "Find fitness gear, weights, and gym essentials in our gym category." }
    ]
  },
  offersOptions: {
    message: "We frequently run special discounts. What are you interested in?",
    options: [
      { text: "Sports gear discounts", answer: "Check out our sports category for the latest deals." },
      { text: "Food & Beverages offers", answer: "Look out for bundle deals on drinks and snacks." },
      { text: "Household product offers", answer: "Enjoy great savings on essential household items." },
      { text: "Household product sales", answer: "Enjoy great savings on essential household items." }

    ]
  },
  orderOptions: {
    message: "Placing an order is easy!",
    options: [
      { text: "How do I order?", answer: "Browse products, add them to your cart, and proceed to checkout!" },
      { text: "What payment methods do you accept?", answer: "We accept cards, digital wallets, and cash on delivery (where available)." },
      { text: "What payment methods do you accept?", answer: "We accept cards, digital wallets, and cash on delivery (where available)." }

    ]
  },
  deliveryOptions: {
    message: "We deliver right to your doorstep.",
    options: [
      { text: "How long does delivery take?", answer: "Delivery typically takes 2-5 business days, depending on your location." },
      { text: "Do you offer same-day delivery?", answer: "Currently we don't offer same day delivery!" },
      { text: "Do you offer same-day delivery?", answer: "Currently we don't offer same day delivery!" }

    ]
  },
  supportOptions: {
    message: "We're here to help!",
    options: [
      { text: "How can I contact you?", answer: "Reach us via email, phone, or live chat on our website." },
      { text: "When is support available?", answer: "Our support team is available from 9 AM to 9 PM, Monday to Saturday." }
    ]
  }
};

// Toll-free number response
const tollFreeResponse = {
  message: "If you'd like to speak to someone, please call our toll-free number: 123-456-7890."
};

// Function to create a new chat message (either user or bot message)
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  const chatContent =
    className === "outgoing"
      ? `<p>${message}</p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
  chatLi.innerHTML = chatContent;
  return chatLi;
};

// Function to load options dynamically based on the current node
const loadOptions = (nodeKey) => {
  const node = optionsTree[nodeKey];

  // Check if the .question-options container exists, and create it if necessary
  let questionContainer = document.querySelector(".question-options");
  if (!questionContainer) {
    questionContainer = document.createElement("div");
    questionContainer.className = "question-options";
    chatbox.parentElement.appendChild(questionContainer);
  }

  // Clear old options
  questionContainer.innerHTML = "";

  // Show bot message
  chatbox.append(createChatLi(node.message, "incoming"));

  // Add buttons for the options
  node.options.forEach((option) => {
    const questionBtn = document.createElement("button");
    questionBtn.textContent = option.text;
    questionBtn.className = "question-btn";
    questionBtn.addEventListener("click", () => handleOptionSelection(option, nodeKey));
    questionContainer.appendChild(questionBtn);
  });

  chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the bottom
};

// Function to handle option selection
const handleOptionSelection = (option, parentNodeKey) => {
  chatbox.append(createChatLi(option.text, "outgoing"));

  if (option.answer) {
    setTimeout(() => {
      chatbox.append(createChatLi(option.answer, "incoming"));
      loadOptions(parentNodeKey); // Reload options
    }, 600);
  } else if (option.next) {
    setTimeout(() => loadOptions(option.next), 600);
  }
};

// Function to handle user input (manual messages)
const handleUserMessage = () => {
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  chatbox.append(createChatLi(userMessage, "outgoing"));

  if (userMessage.toLowerCase().includes("talk")) {
    setTimeout(() => {
      chatbox.append(createChatLi(tollFreeResponse.message, "incoming"));
    }, 600);
  } else if (userMessage.toLowerCase() === "hi") {
    setTimeout(() => loadOptions("greeting"), 600);
  } else {
    setTimeout(() => {
      chatbox.append(createChatLi("Please choose an option from below.", "incoming"));
      loadOptions("greeting");
    }, 600);
  }

  chatInput.value = ""; // Clear the input
};

// Open/Close Chatbot
chatToggler.addEventListener("click", () => {
  document.body.classList.toggle("show-chatbot");
});
chatbotClosebtn.addEventListener("click", () => {
  document.body.classList.remove("show-chatbot");
});

// Send Button
sendChatBtn.addEventListener("click", handleUserMessage);

// Enable "Enter" Key to Send Messages
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleUserMessage();
  }
});
