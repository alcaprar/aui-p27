AFRAME.registerComponent('focus-emitter', {
    schema: {
        timeout: {type: 'number', default: 1000}
    },
    init: function () {
        var object = this;
        var objectId = object.el.id;

        object.el.addEventListener('mouseenter', function (evt) {
            if(object.el.getAttribute('visible') === true){
                // change the if to check on the src attribute
                // start the timeout only if the src is set
                object.timeout = setTimeout(function () {
                    eventsUtils.trigger(objectId + '-focused', {
                        action: 'focused',
                        objectId: objectId
                    })
                }, object.data.timeout)
            }
        });

        object.el.addEventListener('mouseleave', function (evt) {
            clearTimeout(object.timeout)
        });
    }
});