eventsUtils.addEventListener('starting-button-focused', function() {
    // remove the button
    utils.removeEntity('starting-button');

    // show the assistant and the table
    utils.showEntity('assistant');
    // utils.showEntity('table');

    // show the first trip
    eventsUtils.trigger('show-trip')
});

/**
 * It shows the next trip.
 */
eventsUtils.addEventListener('show-trip', function () {
    var trip = db.trips[db.counter];

    // show the plane
    utils.showEntity('fly-out-button');

    // update text of the trip
    document.getElementById('trip-name-text').setAttribute('value', trip.place);
    document.getElementById('exercise-name-text').setAttribute('value', trip.exerciseText);
    utils.showEntity('trip-name-text');
    utils.showEntity('exercise-name-text')
});

/**
 * It shows the 360 image of the place
 */
eventsUtils.addEventListener('fly-out-button-focused', function () {
    // hide the room
    utils.hideEntity('room');

    // change the src of entity and show it
    document.getElementById('place-image').setAttribute('src', db.trips[db.counter].entity.src);
    utils.showEntity('place-viewer')
});

eventsUtils.addEventListener('fly-back-button-focused', function () {
    // if first time, add the question
    var trip = db.trips[db.counter];
    if(!trip.isShown){
        var question = trip.questions[0];

        var option1 = {
            id: 'option1',
            src: question.option1.entity.src,
            position: '-1 1.8 -2.97',
            'focus-emitter': ''
        };

        var option2 = {
            id: 'option2',
            src: question.option2.entity.src,
            position: '1 1.8 -2.97',
            'focus-emitter': ''
        };

        utils.addEntityIntoEntity('projector-screen', 'a-image', option1);
        utils.addEntityIntoEntity('projector-screen', 'a-image', option2);

        trip.isShown = true
    }

    // show the room
    utils.showEntity('room');

    // hide the place
    utils.hideEntity('place-viewer')
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