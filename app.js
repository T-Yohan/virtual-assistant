const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(sentence) {
    const text_speak = new SpeechSynthesisUtterance(sentence);
    text_speak.rate = 1.75;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak); 
}

function wishMe() {
    var day = new Date();
    var hr = day.getHours();

    if(hr >= 0 && hr<12) {
        speak("Bonjour Patron");
    }
    else if(hr == 12) {
        speak("Bon midi Patron");
    }
    else if(hr > 12 && hr <= 17) {
        speak("Bon après-midi Patron");
    }
    else {
        speak("Bon soir Patron");
    }
}

window.addEventListener('load',()=>{
    speak("Activation de Butler");
    speak("mise en service");
    wishMe();
})

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    speakThis(transcript.toLowerCase());
}

btn.addEventListener('click',()=>{
    recognition.start();
})

function speakThis(message) {
    const speech = new SpeechSynthesisUtterance();

    speech.text = "Je n'ai pas compris réessayez s'il vous plait";

    if(message.includes('bonjour') || message.includes('salut')){
        const finalText = "Bonjour Patron , comment puis-je vous être utile aujourd'hui";
        speech.text = finalText;
    }
    else if(message.includes('comment vas-tu')) {
        const finalText = "Je me porte bien patron , comment puis-je vous aider? ";
        speech.text = finalText;
    }
    else if(message.includes('ton nom')) {
        const finalText = "mon nom est Butler";
        speech.text = finalText;
    }
    else if(message.includes('ouvre google')) {
        window.open("https://google.com", "_blank");
        const finalText = "ouverture de google";
        speech.text = finalText;
    }
    else if(message.includes('ouvre linkedin')) {
        window.open("https://linkedin.com", "_blank");
        const finalText = "ouverture de linkedin";
        speech.text = finalText;
    }
    else if(message.includes('ouvre chatgpt')) {
        window.open("https://chat.openai.com/", "_blank");
        const finalText = "ouverture de chatgpt";
        speech.text = finalText;
    }
    else if(message.includes('ouvre youtube')) {
        window.open("https://www.youtube.com/", "_blank");
        const finalText = "ouverture de youtube";
        speech.text = finalText;
    }
    else if(message.includes('quelle heure est-il')) {
        const time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        const finalText = time;
        speech.text = finalText;
    }
    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined,{month:"short",day:"numeric"})
        const finalText = time;
        speech.text = finalText;
    }

    else if (message.includes('merci')){
        const finalText = "de rien Patron , puis-je faire autre chose pour vous";
        speech.text = finalText;
    }

    else {
        window.open(`https://google.com/search?=${message.replace(" ","+")}`, "_blank");
        const finalText = "I found some information for" + message + "on google";
        speech.text = finalText;
    }
    

    speech.volume = 1.5;
    speech.pitch = 1.5;
    speech.rate = 1.5;

    window.speechSynthesis.speak(speech);

}


