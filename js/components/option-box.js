AFRAME.registerComponent('option-box', {
    schema: {
        src: {type: 'string'}
    },

    init: function () {
        var el = this.el;  // Reference to the component's entity.
    },

    update: function() {

    },

    tick: function () {},
    remove: function () {},
    pause: function () {},
    play: function () {}
});

AFRAME.registerPrimitive('a-option-box', {
    defaultComponents: {
        'option-box': {}
    },
    mappings: {

    }
});
