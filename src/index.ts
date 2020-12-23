import {ConfigType, ModalEdyType, ModalType} from './types';

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
         * @param {ConfigType} param - config
         */
        constructor({
            selector = '',
            triggers = [],
            openAttribute = ATTRIBUTES.OPEN,
            closeAttribute = ATTRIBUTES.CLOSE,
            openClass = 'isOpen',
        }: ConfigType) {
            this.$modal = document.querySelector(selector);
            this.openAttribute = openAttribute;
            this.closeAttribute = closeAttribute;
            this.openClass = openClass;

            this.registerNodes(triggers);
            this.onClick = this.onClick.bind(this);
        }
        /**
         * Add handlers for clicking on elements to open related modal windows
         *
         * @param {Array} nodeList  - list of elements for opening modal windows
         */
        registerNodes(nodeList: HTMLElement[]) {
            nodeList
                .filter(Boolean)
                .forEach((element) => element.addEventListener('click', () => this.open()));
        }
        /**
         * Open moda window
         */
        open() {
            this.$modal?.classList.add(this.openClass);
            this.addEventListeners();
        }
        /**
         * Close modal window
         */
        close() {
            this.$modal?.classList.remove(this.openClass);
            this.removeEventListeners();
        }

        /**
         * Click handler
         *
         * @param {object} event - Event data
         */
        onClick(event: Event) {
            if ((event.target as Element).closest(`[${this.closeAttribute}]`)) this.close();
        }
        /**
         * Add event listeners for an open modal
         */
        addEventListeners() {
            this.$modal?.addEventListener('touchstart', this.onClick);
            this.$modal?.addEventListener('click', this.onClick);
        }

        /**
         * Remove event listener for an open modal
         */
        removeEventListeners() {
            this.$modal?.removeEventListener('touchstart', this.onClick);
            this.$modal?.removeEventListener('click', this.onClick);
        }
    }

    const ATTRIBUTES = {
        OPEN: 'data-ModalEdy-open',
        CLOSE: 'data-ModalEdy-close',
    };

    let modal: ModalType;

    const createRegisterMap = (nodeList: HTMLElement[], attribute: string) => {
        // Accumulating an object where the key is the modal window selector, and the value is the element that will open the corresponding modal window
        return nodeList.reduce((acc: {[key: string]: HTMLElement[]}, element: HTMLElement): {
            [key: string]: HTMLElement[];
        } => {
            // Get the value from the attribute
            const attributeValue = element.getAttribute(attribute);
            // If there is no value, just skip the item
            if (!attributeValue) return acc;
            // If the element is encountered for the first time, add it to the accumulator and write an empty array
            if (!acc[attributeValue]) acc[attributeValue] = [];
            acc[attributeValue].push(element);
            return acc;
        }, {});
    };

    /**
     * Initialize modal windows according to markup
     *
     * @param {ConfigType} config - modal window configur
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
