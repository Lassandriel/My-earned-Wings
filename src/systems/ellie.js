export const createEllieSystem = () => ({
    showIntro(store) {
        store.showEllieIntro = true;
    },

    close(store) {
        store.showEllieIntro = false;
    }
});
