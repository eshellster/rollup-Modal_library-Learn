export type ConfigType = {
    selector?: string;
    triggers?: HTMLElement[];
    openAttribute?: string;
    closeAttribute?: string;
    openClass?: string;
};

export type ModalEdyType = {
    init: (config?: ConfigType) => void;
};

export type ModalType = {
    registerNodes: (nodeList: HTMLElement[]) => void;
    open: (event?: Event) => void;
    close: (event?: Event) => void;
    onClick: (event: Event) => void;
    addEventListeners: () => void;
    removeEventListeners: () => void;
};
