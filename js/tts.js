var tts = {
    readText: function (text, callback) {
        // TODO add a text box with the text is read.
        var msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'it-it';
        if(typeof callback !== 'undefined'){
            msg.onend = callback
        }
        console.log('[tts][reading]', text);
        window.speechSynthesis.speak(msg);
    }
};