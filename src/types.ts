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
    onOpen?: () => void;
    onClose?: () => void;
    beforeOpen?: () => boolean;
    beforeClose?: () => boolean;
};

export type ModalType = {
    open: () => void;
    close: () => void;
    closeBySelector: (selector: string) => void;
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
    onOpen?: () => void;
    onClose?: () => void;
    beforeOpen?: () => boolean;
    beforeClose?: () => boolean;
};
