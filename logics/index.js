import { LanguageDetector } from "./logics.js";
const user_input = document.getElementById("text-input");
const result = document.getElementById("detected-language");
const detect_lan = document.getElementById("detect");
const message_box = document.querySelector(".message-to-user");

async function clickHandler() {
	const obj1 = await new LanguageDetector("");
	obj1.setTextToDetect = user_input.value;
	await obj1.detectLan();
	if (obj1.message === "") {
		if (obj1.found) {
			result.textContent = `${obj1.sendDetectedLanguage}`;
		} else {
			result.textContent = "Detecting...";
		}
	} else {
		message_box.style.backgroundColor = "white";
		message_box.textContent = `${obj1.message}`;
	}
}

detect_lan.onclick = clickHandler;
// run the function when hit the Enter key(13)
user_input.onkeyup = function (event) {
	if (event.keyCode === 13) {
		clickHandler();
	}
	return;
};
