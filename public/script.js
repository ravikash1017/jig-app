const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

/* Send Message Function */

async function sendMessage() {

    const userText = input.value.trim();

    if (userText === "") return;

    // User Message

    chatBox.innerHTML += `
        <div class="message user-message">
            ${userText}
        </div>
    `;

    input.value = "";

    scrollBottom();

    // Typing Animation

    const typingDiv = document.createElement("div");

    typingDiv.classList.add("message", "bot-message");

    typingDiv.innerHTML = `
        <div class="typing">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    chatBox.appendChild(typingDiv);

    scrollBottom();

    try {

        const response = await fetch("https://jig-qf5e2kqy-ravi-kashyap-s-projects.vercel.app/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: userText
            })
        });

        const data = await response.json();

        // Remove Typing Animation

        typingDiv.remove();

        // Bot Message

        chatBox.innerHTML += `
            <div class="message bot-message">
                ${data.reply}
            </div>
        `;

        scrollBottom();

    } catch (error) {

        typingDiv.remove();

        chatBox.innerHTML += `
            <div class="message bot-message">
                Error getting response.
            </div>
        `;

        scrollBottom();
    }
}

/* Enter Key Support */

input.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }
});

/* Auto Scroll */

function scrollBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

/* New Chat Button */

document.querySelector(".new-chat-btn")
.addEventListener("click", () => {

    chatBox.innerHTML = `
        <div class="message bot-message">
            New chat started 🚀
        </div>
    `;
});