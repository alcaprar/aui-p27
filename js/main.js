/**
 * It shows the 360 image of the place and add the clothes in the environment.
 */
eventsUtils.addEventListener('fly-out-button-focused', function () {
    // hide the room
    utils.hideEntity('room');

    // hide the fly out button
    utils.hideEntity('fly-out-button');

    // change the src of entity and show it
    document.getElementById('place-image').setAttribute('src', db.trips[db.counter].entity.src);
    utils.showEntity('place-viewer');

    // add the clothes randomly in the environment
    var trip = db.trips[db.counter];
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
        utils.playSound('wrong-answer')
    }

    // check if the game has ended
    var ended = true;
    for(var i = 0; i < trip.clothes.length; i++){
        if(trip.clothes[i].isCorrect && typeof trip.clothes[i].selected !== 'undefined' && trip.clothes[i].selected === true){
            alert('Finished!!')
        }
    }
});