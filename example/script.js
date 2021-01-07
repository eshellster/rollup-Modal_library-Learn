ModalEdy.init({
    hasAnimation: true,
    onOpen: (event) => console.log('The modal window was opened', event),
    onClose: (event) => console.log('The modal window was closed', event),
});
