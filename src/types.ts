export type ConfigType = {
    selector?: string;
    triggers?: HTMLElement[];
    openAttribute?: string;
    closeAttribute?: string;
};

export type ModalType = {
    open: () => void;
    close: () => void;
};

export type ModalEdyType = {
    init: (config?: ConfigType) => void;
};

export type ConstructorType = {
    selector?: string;
    triggers?: HTMLElement[];
    openAttribute?: string;
    closeAttribute?: string;
    openClass: string;
};
