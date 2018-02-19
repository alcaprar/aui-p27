/**
 * It shows the 360 image of the place and add the items in the environment.
 */
eventsUtils.addEventListener('fly-out-button-focused', function () {
    // hide the room
    utils.hideEntity('room');

    // hide the fly out button
    utils.hideEntity('fly-out-button');

    eventsUtils.trigger('set-up-next-question')
});

eventsUtils.addEventListener('set-up-next-question', function () {
    // remove all the entities inside the items wrapper
    for(var j = 1; j < 7; j++){
        utils.removeEntity('option'+j+'-src');
    }

    var question = db.questions[db.counter];

    // change the src of entity and show it
    document.getElementById('place-image').setAttribute('src', question.place.src);
    utils.showEntity('place-viewer');

    utils.panda.speak(question.exerciseText);

    // add the items randomly in the environment
    for(var i = 0; i < question.items.length; i++){
        if(question.items[i].entity !== ''){
            var random = utils.getRandom(0.8, 1.1);

            var elementId = 'option' + (i+1);
            var element = document.getElementById(elementId);

            // randomly change the position a bit
            var elementPosition = element.getAttribute('position');
            for(var key in elementPosition){
                elementPosition[key] = elementPosition[key] * random;
            }
            console.log(elementPosition, '' + random);
            element.setAttribute('position', elementPosition);

            // add the option inside the element
            var itemsElementAttributes = {
                id: 'option'+(i+1)+'-src',
                src: question.items[i].entity.src,
                scale: (question.items[i].entity.scale) ? question.items[i].entity.scale : ''
            };
            var elementType = (question.items[i].entity.type === 'img') ? 'a-image' : 'a-gltf-model';
            utils.addEntityIntoEntity(elementId, elementType, itemsElementAttributes)
        }
    }
});

eventsUtils.addEventListener('option-focused', function (evt) {
    var elementId = evt.detail.objectId;
    var optionId = elementId.replace('option', '');

    // recover the question detail
    var question = db.questions[db.counter];

    if(question.items[optionId-1].isCorrect){
        // set as selected
        question.items[optionId-1].selected = true;

        // if correct play the sound and remove the entity
        utils.playSound('correct-answer');

        utils.removeEntity(elementId+'-src');
    }else{
        utils.playSound('wrong-answer');

        if(typeof question.items[optionId-1].wrongAnswersCounter === 'undefined'){
            question.items[optionId-1].wrongAnswersCounter = 0;
        }
        question.items[optionId-1].wrongAnswersCounter++;

        // panda reads the hint
        if(question.items[optionId-1].hint){
            utils.panda.speak(question.items[optionId-1].hint)
        }
    }

    // check if the game has ended
    var ended = true;
    for(var i = 0; i < question.items.length; i++){
        if(question.items[i].isCorrect && (typeof question.items[i].selected === 'undefined' || question.items[i].selected === false)){
            ended = false;
        }
    }
    if(ended){
        eventsUtils.trigger('question-finished')
    }
});

eventsUtils.addEventListener('question-finished', function () {
    // check if the questions have finished
    db.counter++;
    if(db.counter === db.questions.length){
        utils.playSound('clapping');
        $.ajax('/manage/session/results', {
            method: 'POST',
            data: db,
            success: function (res) {
                console.log('Session stored', res)
            }
        });

        // questions have finished
        utils.panda.speak('Ben fatto. Per oggi abbiamo finito con i viaggi.');

        //remove the remaining items
        for(var j = 1; j <= 7; j++){
            utils.removeEntity('option'+j+'-src');
        }

        // show again the room with a summary
        utils.showEntity('room');
        utils.hideEntity('place-viewer')
    }else{
        utils.playSound('clapping');
        utils.panda.speak('Ben fatto. Hai scelto tutto quello che serve. Inquadra di nuovo l\'aereo per viaggiare al prossimo posto.', function () {
            utils.showEntity('fly-out-button')
        });
        console.log('Finished', db);
    }
});