import {ATTRIBUTES} from './consts';
import {ConfigType, ModalType, ModalEdyType, ConstructorType} from './types';

export const ModalEdy = ((): ModalEdyType => {
    /**
     * Modal window
     */
    class Modal {
        $modal: HTMLElement | null;
        openAttribute: string;
        closeAttribute: string;
        openClass: string;

        /**
         * Modal constructor
         *
         * @param {ConstructorType} param - Config
         */
        constructor({
            selector = '',
            triggers = [],
            openAttribute = ATTRIBUTES.OPEN,
            closeAttribute = ATTRIBUTES.CLOSE,
            openClass = 'isOpen',
        }: ConstructorType) {
            this.$modal = document.querySelector(selector);
            this.openAttribute = openAttribute;
            this.closeAttribute = closeAttribute;
            this.openClass = openClass;
            this.registerNodes(triggers);
        }

        /**
         * * Add handlers for clicking on elements to open related modal windows
         *
         * @param {Array} nodeList - List of elements for opening modal windows
         */
        registerNodes(nodeList: HTMLElement[]) {
            nodeList
                .filter(Boolean)
                .forEach((element) =>
                    element.addEventListener('click', (event) => this.open(event)),
                );
        }
        /**
         *
         * @param {Event} event - Event data
         */
        open(event?: Event) {
            this.$modal?.classList.add(this.openClass);
        }

        /**
         *
         * @param {Event} event - Modal close
         */
        close(event?: Event) {}
    }

    let modal: ModalType;

    /**
     * Create a map for registering modal windows
     *
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
     *
     * @param {ConfigType} config - madal window configur
     */

    const init = (config?: ConfigType) => {
        const options = {openAttribute: ATTRIBUTES.OPEN, ...config};
        const nodeList = document.querySelectorAll<HTMLElement>(`[${options.openAttribute}]`);
        const registeredMap = createRegisterMap(Array.from(nodeList), options.openAttribute);

        for (const selector in registeredMap) {
            const value = registeredMap[selector];
            options.selector = selector;
            options.triggers = [...value];
            modal = new Modal(options);
        }
    };
    return {init};
})();

window.ModalEdy = ModalEdy;
