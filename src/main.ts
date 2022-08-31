import "./style.css";
import { connectToServer } from "./socket-client";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="counter">
    <h2>Websocket - Client</h2>
    <input id="jwtToken" placeholder="Json Web Token"/>
    <button id="btn-connect">Connect</button>

    <br/>
    <br/>
    <br/>
    <span id="server-status"></span>
    <ul id="clients-ul">
      
    </ul>

    <form id="message-form">
      <input placeholder="message" id="message-input"/>
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`;

const inputHwt = document.querySelector<HTMLInputElement>("#jwtToken")!;
const btnConnect = document.querySelector<HTMLButtonElement>("#btn-connect")!;

btnConnect.addEventListener("click", () => {
	if (inputHwt.value.trim().length === 0) {
		return alert("Enter a valid JWT");
	}
	connectToServer(inputHwt.value.trim());
});

