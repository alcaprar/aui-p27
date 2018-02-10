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
    "isQuestionInit": false,
    "setNextQuestion": function () {
        this.isQuestionInit = false;
        var question = database.questions[this.questionCounter];
        console.log('[GameEngine][setNextQuestion]', this.questionCounter, question);
        tts.readText(question.startingText);
        this.setPlaceImg(question.placeToBe.src);
        this.setImageInTv(question.placeToBe.src);
        this.setEntryPointInTv();
        // say to the child to "click" the tv to "fly" into the place
    },
    "setPlaceImg": function (src) {
        console.log('[GameEngine][setPlaceImg]', src);
        document.querySelector('#place').setAttribute('material', {src: src});
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
    "showPlace" : function(){
        // make the place visible and the room hidden
        document.querySelector('#room').setAttribute('visible', false);
        document.querySelector('#place').setAttribute('visible', true);

        if(!game.isQuestionInit){
            var text = database.questions[this.questionCounter].placeToBe.description;
            tts.readText(text, function () {
                game.hidePlace()
            })
        }else{
            // add a timeout that goes back to the room, making the place hidden and the room visible
            setTimeout(function () {
                game.hidePlace()
            },1000)
        }

    },
    "hidePlace": function hidePlace() {
        document.querySelector('#room').setAttribute('visible', true);
        document.querySelector('#place').setAttribute('visible', false);

        if(!game.isQuestionInit){
            // if it is the first time that the place is shown
            // start with the level of the body
            console.log('[GameEngine][transition] start with the real question');
            game.isQuestionInit = true;

            var text = database.questions[game.questionCounter].textBeforeClothes;
            tts.readText(text, function () {
                game.setLevel();
            });
        }
    },
    "levelCounter": "top",
    "setLevel": function () {
        var level = database.questions[game.questionCounter].clothes[game.levelCounter];

        var text = level.startingText;
        tts.readText(text, function () {
            game.setOptionSrc(0, level.options[0].src);
            game.setOptionSrc(1, level.options[1].src);
        });
    },
    "checkLevel": function (optionId) {
        console.log('[GameEngine][checkLevel]', optionId);
        var id = optionId[optionId.length-1];
        // it checks if the selected option is the right one for the current level

        // if not, show the "explanation"

        // if yes change the levelCounter and call the setLevel
        // if last level(now is bottom) go to next question.
        // TODO [future] show an explanation or something also with correct answers
    },
    "optionsDefault": [
        {dimensions: {x:1, y:1, z:1}, position: {x: -1, y: 1.3, z: -1}},
        {dimensions: {x:1, y:1, z:1}, position: {x: 1, y: 1.3, z: -1}}
    ],
    "setOptionSrc": function (id, src) {
        var optionEl = document.querySelector('#option' + id + 'gltf');
        console.log('[GameEngine][setOptionSrc]', id, src, optionEl);
        optionEl.setAttribute('src', src);

        // timeout needed to wait that the gltf are loaded
        setTimeout(function () {
            game.scaleAndMove(optionEl.getObject3D('mesh'), game.optionsDefault[id].dimensions, game.optionsDefault[id].position)
        }, 2000)
    },
    "scaleAndMove": function (object, dimensions, position) {
        var bbox = new THREE.Box3().setFromObject(object);
        var currentDimensions = {};
        currentDimensions.y = bbox.max.y - bbox.min.y;
        currentDimensions.z = bbox.max.z - bbox.min.z;
        currentDimensions.x = bbox.max.x - bbox.min.x;
        console.log('Bbox of:', object, bbox, currentDimensions);
        object.el.setAttribute('scale', {x: dimensions.x/currentDimensions.x, y: dimensions.y/currentDimensions.y, z: dimensions.z/currentDimensions.z})
        object.el.setAttribute('position', position);
    }
};