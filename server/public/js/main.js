/**
 * It shows the 360 image of the place and add the clothes in the environment.
 */
eventsUtils.addEventListener('fly-out-button-focused', function () {
    // hide the room
    utils.hideEntity('room');

    // hide the fly out button
    utils.hideEntity('fly-out-button');

    eventsUtils.trigger('set-up-next-trip')
});

eventsUtils.addEventListener('set-up-next-trip', function () {
    // remove all the entities inside the clothes wrapper
    for(var j = 1; j < 7; j++){
        utils.removeEntity('option'+j+'-src');
    }

    var trip = db.trips[db.counter];

    // change the src of entity and show it
    document.getElementById('place-image').setAttribute('src', trip.place.src);
    utils.showEntity('place-viewer');

    utils.panda.speak(trip.exerciseText);

    // add the clothes randomly in the environment
    for(var i = 0; i < trip.clothes.length; i++){
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
        var clothesElementAttributes = {
            id: 'option'+(i+1)+'-src',
            src: trip.clothes[i].entity.src,
            scale: (trip.clothes[i].entity.scale) ? trip.clothes[i].entity.scale : ''
        };
        var elementType = (trip.clothes[i].entity.type === 'img') ? 'a-image' : 'a-gltf-model';
        utils.addEntityIntoEntity(elementId, elementType, clothesElementAttributes)
    }
});

eventsUtils.addEventListener('option-focused', function (evt) {
    var elementId = evt.detail.objectId;
    var optionId = elementId.replace('option', '');

    // recover the trip detail
    var trip = db.trips[db.counter];

    if(trip.clothes[optionId-1].isCorrect){
        // set as selected
        trip.clothes[optionId-1].selected = true;

        // if correct play the sound and remove the entity
        utils.playSound('correct-answer');

        utils.removeEntity(elementId+'-src');
    }else{
        utils.playSound('wrong-answer');

        // panda reads the hint
        if(trip.clothes[optionId-1].hint){
            utils.panda.speak(trip.clothes[optionId-1].hint)
        }
    }

    // check if the game has ended
    var ended = true;
    for(var i = 0; i < trip.clothes.length; i++){
        if(trip.clothes[i].isCorrect && (typeof trip.clothes[i].selected === 'undefined' || trip.clothes[i].selected === false)){
            ended = false;
        }
    }
    if(ended){
        eventsUtils.trigger('trip-finished')
    }
});

eventsUtils.addEventListener('trip-finished', function () {
    // check if the trips have finished
    db.counter++;
    if(db.counter === db.trips.length){
        // trips have finished
        utils.panda.speak('Ben fatto. Per oggi abbiamo finito con i viaggi.');

        //remove the remaining clothes
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
    }
});