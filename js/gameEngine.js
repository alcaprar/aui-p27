document.querySelector('a-scene').addEventListener('loaded', function () {
    console.log('Scene loaded. Starting.');
    game.start()
});

var game = {
    "start": function () {
        var text = database.startingText.replace("${childName}", database.childName);
        tts.readText(text)
    },
    "startingButtonPressed": function () {
        var text = database.startingText2;
        tts.readText(text, function () {
            this.setNextQuestion()
        }.bind(this));
    },
    "questionCounter": 0,
    "setNextQuestion": function () {
        var question = database.questions[this.questionCounter];
        console.log('[GameEngine][setQuestion]', this.questionCounter, question);
        tts.readText(question.startingText);
        this.setImageInTv(question.placeToBe.src)
    },
    "setImageInTv": function (src) {
        console.log('[GameEngine][setImageInTv]', src);
        var material = document.querySelector('#tv-screen').getAttribute('material');
        material.src = src;
        document.querySelector('#tv-screen').setAttribute('material', material)
    }
};