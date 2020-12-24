import {ConfigType} from './types';

export const ModalEdy = (() => {
    const init = (config: ConfigType) => {
        const options = {openAttribute: '', ...config};
        const nodeList = document.querySelectorAll<HTMLElement>(`[${options.openAttribute}]`);
    };
    return {init};
})();

window.ModalEdy = ModalEdy;
