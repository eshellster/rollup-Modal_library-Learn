export type ConfigType = {
    selector?: string;
    triggers?: HTMLElement[];
    openAttribute?: string;
    closeAttribute?: string;
    openClass: string;
    scrollBehavior?: {
        isDisabled?: boolean;
        container?: string;
        defaultValue?: string;
    };
    hasAnimation?: boolean;
};

export type ModalType = {
    open: (event?: Event) => void;
    close: (event?: Event) => void;
    closeBySelector: (selector: string) => void;
    preparationOpeningModal: () => void;
    preparationClosingModal: () => void;
};

export type ModalEdyType = {
    init: (config?: ConfigType) => void;
    open: (selector: string, config?: ConfigType) => void;
    close: (selector?: string) => void;
};

export type ConstructorType = {
    selector?: string;
    triggers?: HTMLElement[];
    openAttribute?: string;
    closeAttribute?: string;
    openClass?: string;
    scrollBehavior?: {
        isDisabled?: boolean;
        container?: string;
        defaultValue?: string;
    };
    hasAnimation?: boolean;
};
