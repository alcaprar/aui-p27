AFRAME.registerComponent('starting-button', {
    init: function () {
        this.timeout = null;

        // bind the function to this component
        this.el.addEventListener('mouseenter', function (evt) {
            this.timeout = setTimeout(function () {
                console.log('Starting button pressed.');
                game.startingButtonPressed();
                this.el.setAttribute('visible', false)
            }.bind(this), 3000)
        }.bind(this));

        this.el.addEventListener('mouseleave', function (evt) {
            clearTimeout(this.timeout)
        })
    }
});