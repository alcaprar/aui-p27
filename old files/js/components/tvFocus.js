AFRAME.registerComponent('go-to-place-listener', {
    init: function () {
        var object = this;

        object.el.addEventListener('mouseenter', function (evt) {
            if(object.el.getAttribute('visible') === true){
                // change the if to check on the src attribute
                // start the timeout only if the src is set
                object.timeout = setTimeout(function () {
                    console.log('Travelling to new place...');
                    game.showPlace();
                }, 1000)
            }
        });

        object.el.addEventListener('mouseleave', function (evt) {
            clearTimeout(object.timeout)
        });
        
        // TODO
        // should be triggered when the child focus the tv
        // it should show the 360 image of the place
        // add a timer that moves the child back to the room after some seconds
        
        // it calls the startQuestion function of the gameEngine
        // a flag is needed in order to call that function only the first time that the place is shown
        
        // TODO [future] add a button in the 360 image to go back to the room without a timer
    }
});