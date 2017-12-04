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
        console.log('[GameEngine][setNextQuestion]', this.questionCounter, question);
        tts.readText(question.startingText);
        this.setImageInTv(question.placeToBe.src);
        this.setEntryPointInTv();
        // say to the child to "click" the tv to "fly" into the place
    },
    "setImageInTv": function (src) {
        console.log('[GameEngine][setImageInTv]', src);
        var material = document.querySelector('#tv-screen').getAttribute('material');
        document.querySelector('#tv-screen').setAttribute('material', {src: src, color: '#ffffff'})
    },
    "setEntryPointInTv": function () {
        // activate the listener on the tv
        // add arrows pointing to the tv
    },
    "startQuestion": function () {
        // it calls the setLevel passing "top"
    },
    "levelCounter": "top",
    "transition" : function(){
        document.querySelector('#place').setAttribute('src', database.questions[this.questionCounter].placeToBe.src)
        document.querySelector('#room').setAttribute('visible', false)
        document.querySelector('#place').setAttribute('visible', true)
    },
    "setLevel": function () {
        // it adds the clothes of level, using the counter, into the room
        
        // it changes the src (setAttribute) of the boxes used for options
    },
    "checkLevel": function (option) {
        // it checks if the selected option is the right one for the current level

        // if not, show the "explanation"

        // if yes change the levelCounter and call the setLevel
        // if last level(now is bottom) go to next question.
        // TODO [future] show an explanation or something also with correct answers
    }
};