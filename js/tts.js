var tts = {
    readText: function (text, callback) {
        var msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'it-it';
        if(typeof callback !== 'undefined'){
            msg.onend = callback
        }
        console.log('[tts][reading]', text);
        window.speechSynthesis.speak(msg);
    }
};