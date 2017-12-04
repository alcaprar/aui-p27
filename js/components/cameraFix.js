AFRAME.registerComponent('camera-fix', {
    schema: {
    },
    init: function () {
        if(AFRAME.utils.device.isMobile()) {
            this.onEnterVR = AFRAME.utils.bind(this.onEnterVR, this);
            this.el.sceneEl.addEventListener('enter-vr', this.onEnterVR);
        }
    },
    //fix camera height that sums 1.6 every time we enter in VR mode
    onEnterVR: function () {
        var oldPosition = this.el.getAttribute('position');
        oldPosition['y'] = 0;
        this.el.setAttribute("position", oldPosition);
    }
});