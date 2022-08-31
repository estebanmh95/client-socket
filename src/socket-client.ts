import { Manager, Socket } from "socket.io-client";

let socket: Socket;
export const connectToServer = (token: string) => {
	// localhost:3000/socket.io/socket.io.js

	const manager = new Manager("localhost:3000/socket.io/socket.io.js", {
		extraHeaders: {
			authentication: token,
		},
	});

	socket?.removeAllListeners();
	socket = manager.socket("/");
	addListeners();
};

const addListeners = () => {
	const serverStatusLabel = document.querySelector("#server-status")!;
	const socketsList = document.querySelector("#clients-ul")!;
	const messageForm = document.querySelector<HTMLFormElement>("#message-form")!;
	const messagesUl = document.querySelector<HTMLLIElement>("#messages-ul")!;
	const messageInput =
		document.querySelector<HTMLInputElement>("#message-input")!;

	socket.on("connect", () => {
		serverStatusLabel.innerHTML = "CONNECTED";
	});
	socket.on("disconnect", () => {
		serverStatusLabel.innerHTML = "DISCONNECTED";
	});

	socket.on("clients-updated", (clients: string[]) => {
		let clientsHtml = "";

		clients.forEach((clientId) => {
			clientsHtml += "<li>" + clientId + "</li>";
		});

		socketsList.innerHTML = clientsHtml;
	});

	messageForm.addEventListener("submit", (event) => {
		event.preventDefault();
		if (messageInput.value.trim().length <= 0) {
			return;
		}

		socket.emit("message-from-client", {
			id: "Yo",
			message: messageInput.value,
		});

		messageInput.value = "";
	});

	socket.on("messages-from-server", (payload: any) => {
		const newMessage = `
        <li>
            <strong>${payload.fullName}</strong>
            <span>${payload.message}</span>
        </li>`;

		const li = document.createElement("li");
		li.innerHTML = newMessage;

		messagesUl.append(li);
	});
};
