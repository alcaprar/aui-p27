AFRAME.registerComponent('option-listener', {
    init: function () {
        var object = this;
        
        object.el.addEventListener('mouseenter', function (evt) {
            if(object.el.getAttribute('visible') === true){
                // change the if to check on the src attribute
                // start the timeout only if the src is set
                object.timeout = setTimeout(function () {
                    console.log('[OptionListener][timeout]');
                    game.checkLevel(object.el.getAttribute('id'));
                }, 1000)
            }
        });

        object.el.addEventListener('mouseleave', function (evt) {
            clearTimeout(object.timeout)
        });
        // it calls checkLevel of gameEngine passing the "id" of the option
    }
});