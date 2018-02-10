eventsUtils.addEventListener('starting-button-focused', function() {
    // remove the button
    utils.removeEntity('starting-button');

    // show the assistant and the table
    utils.showEntity('assistant');
    utils.showEntity('table');

    // add the first question
    eventsUtils.trigger('add-question')
});

/**
 * Called when a question has to be shown.
 */
eventsUtils.addEventListener('add-question', function () {
    var question = db.questions[db.counter];

    var options1 = {
        id: 'option1',
        src: question.option1.entity.src,
        scale: question.option1.entity.scale,
        position: '-0.5 1.2 -2'
    };
    var entity1Type = (question.option1.entity.type==='gltf') ? 'a-gltf-model' : 'a-image';
    var options2 = {
        id: 'option2',
        src: question.option2.entity.src,
        scale: question.option2.entity.scale,
        position: '0.5 1.2 -2'
    };
    var entity2Type = (question.option2.entity.type==='gltf') ? 'a-gltf-model' : 'a-image';

    utils.addEntity(entity1Type, options1);
    utils.addEntity(entity2Type, options2);
});

eventsUtils.addEventListener('question-answered', function () {
    // increment the counter and check if they are finished
    db.counter++;

    if(db.counter === db.questions.length){
        // questions finished
    }else{
        // remove entities of previous question


        // add the question
        eventsUtils.trigger('add-question')
    }
});

