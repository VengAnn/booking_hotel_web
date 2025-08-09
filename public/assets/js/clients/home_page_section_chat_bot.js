function toggleChat() {
    $("#chatWindow").toggleClass("open");
}

function sendMessage() {
    const input = $("#chatInput");
    const msg = input.val().trim();
    if (!msg) {
        showWarning("Vui lòng nhập tin nhắn.");
        return;
    }

    appendMessage(msg, "user-msg");
    input.val("");
    showLoading();

    ajaxRequest({
        url: "/api/chat/gemini",
        method: "POST",
        data: { message: msg },
        success: function (res) {
            hideLoading();
            appendMessage(res.reply || "Không có phản hồi nào.", "bot-msg");
        },
        error: function (err) {
            hideLoading();
            appendMessage(`Xin lỗi, đã có lỗi xảy ra: ${err.message}`, "bot-msg");
        }
    });
}

function handleEnter(e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

function showLoading() {
    if ($(".bot-message.loading").length > 0) return;

    const messageContent = `
        <div class="message-text">
            <div class="thinking-indicator">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>`;

    const loadingDiv = $("<div>")
        .addClass("message bot-message loading")
        .html(messageContent);

    $(".chat-body").append(loadingDiv);
    scrollToBottom();
}

function hideLoading() {
    $(".bot-message.loading").remove();
}

// Hàm chuyển text có link và số điện thoại thành HTML có thể click
function linkify(text) {
    if (!text) return "";

    // Chuyển URL thành link mở tab mới
    let replacedText = text.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Chuyển số điện thoại dạng +856 20 9999 9999 hoặc +84 123 456 789 thành link gọi điện
    replacedText = replacedText.replace(
        /(\+?\d{2,4}[\s\-]?\d{2,4}[\s\-]?\d{3,4}[\s\-]?\d{3,4})/g,
        '<a href="tel:$1">$1</a>'
    );

    return replacedText;
}

function appendMessage(text, className) {
    const chatBody = $("#chatBody").children().first();
    const msgDiv = $("<div>")
        .addClass("chat-msg " + className)
        .html(linkify(text));  // Dùng html và linkify để có link click
    chatBody.append(msgDiv);
    scrollToBottom();
}

function scrollToBottom() {
    const chatBody = $("#chatBody");
    chatBody.scrollTop(chatBody[0].scrollHeight);
}


$(document).ready(function () {
    $("#chatInput").on("keydown", handleEnter);
    $("#sendBtn").on("click", sendMessage);
});
