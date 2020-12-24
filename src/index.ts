import {ConfigType} from './types';

export const ModalEdy = (() => {
    /**
     * Create a map for registering modal windows
     * @param {Array} nodeList - list of items
     * @param {string} attribute - selector for opening
     * @returns {Object} - nodes map
     */
    const createRegisterMap = (nodeList: HTMLElement[], attribute: string) => {
        return nodeList.reduce((acc: {[key: string]: HTMLElement[]}, element: HTMLElement): {
            [key: string]: HTMLElement[];
        } => {
            const attributeValue = element.getAttribute(attribute);
            if (!attributeValue) return acc;
            if (!acc[attributeValue]) acc[attributeValue] = [];
            acc[attributeValue].push(element);
            return acc;
        }, {});
    };
    /**
     * Initialize modal windows according to markup
     * @param {ConfigType} config - madal window configur
     */

    const init = (config: ConfigType) => {
        const options = {openAttribute: '', ...config};
        const nodeList = document.querySelectorAll<HTMLElement>(`[${options.openAttribute}]`);
        const registeredMap = createRegisterMap(Array.from(nodeList), options.openAttribute);

        for (const selector in registeredMap) {
            const value = registeredMap[selector];
            options.selector = selector;
            options.triggers = [...value];
        }
    };
    return {init};
})();

window.ModalEdy = ModalEdy;
