import 'bootstrap/dist/js/bootstrap';
import convert from "./tocgen";

const inputTextArea = document.getElementById('ta-input')! as HTMLTextAreaElement;
const outputTextArea = document.getElementById('ta-output')! as HTMLTextAreaElement;
const convertButton = document.getElementById('ta-btn')! as HTMLButtonElement;

const input = '';

function handleClickConvert() {
    const input = inputTextArea.value;
    const result = convert(input);
    outputTextArea.value = result;
}

function init() {
    console.log("I'm here!");

    convertButton.addEventListener('click', handleClickConvert);
}
init();
