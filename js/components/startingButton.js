AFRAME.registerComponent('starting-button', {
    init: function () {
        var object = this;
        object.timeout = null;

        // bind the function to this component
        object.el.addEventListener('mouseenter', function (evt) {
            if(object.el.getAttribute('visible') === true){
                object.timeout = setTimeout(function () {
                    console.log('Starting button pressed.');
                    game.startingButtonPressed();
                    object.el.setAttribute('visible', false)
                }, 1000)
            }
        });

        object.el.addEventListener('mouseleave', function (evt) {
            clearTimeout(object.timeout)
        })
    }
});