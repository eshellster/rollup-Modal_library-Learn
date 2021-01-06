import {ATTRIBUTES, CLASS_NAMES, KEY, SCROLL_STATE} from './consts';
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
        scrollBehavior: {
            isDisabled: boolean;
            container: string;
            defaultValue: string;
        };
        hasAnimation: boolean;
        onOpen: (event?: Event) => void;
        onClose: (event?: Event) => void;
        beforeOpen: (event?: Event) => boolean;
        beforeClose: (event?: Event) => boolean;
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
            scrollBehavior = {},
            hasAnimation = false,
            onOpen = () => {},
            onClose = () => {},
            beforeOpen = () => true,
            beforeClose = () => true,
        }: ConstructorType) {
            this.$modal = document.querySelector(selector);
            this.openAttribute = openAttribute;
            this.closeAttribute = closeAttribute;
            this.openClass = openClass;
            this.registerNodes(triggers);
            this.onClick = this.onClick.bind(this);
            this.onKeyup = this.onKeyup.bind(this);
            this.scrollBehavior = {
                isDisabled: true,
                container: 'body',
                defaultValue: '',
                ...scrollBehavior,
            };
            this.hasAnimation = hasAnimation;
            this.onOpen = onOpen;
            this.onClose = onClose;
            this.beforeOpen = beforeOpen;
            this.beforeClose = beforeClose;
        }

        /**
         * * Add handlers for clicking on elements to open related modal windows
         *
         * @param {Array} nodeList - List of elements for opening modal windows
         */
        registerNodes(nodeList: HTMLElement[]) {
            nodeList
                .filter(Boolean) // null이나 undefind 제거 - 배열에서 null이나 undefind는 프로세서 흐름에 위험한 불순물이다.
                // .filter((element)=>Boolean(element))  <-- 위와 정확히 동일
                .forEach((element) =>
                    element.addEventListener('click', (event) => this.open(event)),
                );
        }
        /**
         *Open modal window
         *
         * @param {Event} event - Event data
         */
        open(event?: Event) {
            const isContinue = this.beforeOpen(event);
            if (!isContinue) return;
            this.$modal?.classList.add(this.openClass);
            this.changeScrollBehavior(SCROLL_STATE.DISABLE);
            this.addEventListeners();
            this.preparationOpeningModal(event);
        }

        /**
         * Preparing a modal window for opening
         *
         *  @param {Event} event - Event data
         */
        preparationOpeningModal(event?: Event) {
            if (this.hasAnimation) {
                this.$modal?.classList.add(CLASS_NAMES.IS_OPENING);
                const handler = () => {
                    this.$modal?.classList.remove(CLASS_NAMES.IS_OPENING);
                    this.onOpen(event);
                    this.$modal?.removeEventListener('animationend', handler);
                };
                this.$modal?.addEventListener('animationend', handler);
            } else {
                this.onOpen(event);
            }
        }

        /**
         * Close modal window
         *
         * @param {Object} event - Modal close
         */
        close(event?: Event) {
            const isContinue = this.beforeClose(event);
            if (!isContinue) return;
            this.changeScrollBehavior(SCROLL_STATE.ENABLE);
            this.removeEventListeners();
            this.preparationClosingModal(event);
        }

        /**
         * Preparing a modal window for closing
         *
         *  @param {Object} event - Modal close
         */
        preparationClosingModal(event?: Event) {
            if (this.hasAnimation) {
                this.$modal?.classList.add(CLASS_NAMES.IS_CLOSING);
                const handler = () => {
                    this.$modal?.classList.remove(CLASS_NAMES.IS_CLOSING);
                    this.$modal?.classList.remove(this.openClass);
                    this.onClose(event);
                    this.$modal?.removeEventListener('animationend', handler);
                };
                this.$modal?.addEventListener('animationend', handler);
            } else {
                this.$modal?.classList.remove(this.openClass);
                this.onClose(event);
            }
        }

        /**
         * Click handler
         *
         * @param {Object} event - Event data
         */
        onClick(event: Event) {
            if ((event.target as Element).closest(`[${this.closeAttribute}]`)) this.close(event);
            if (!(event.target as Element).closest('.modal__wrapper')) this.close(event);
        }

        /**
         *
         * @param {KeyboardEvent} event - KeyboardEvent
         */
        onKeyup(event: KeyboardEvent) {
            if (event.key === KEY.ESCAPE || event.key === KEY.ESC) this.close(event);
        }

        /**
         * Add event listeners for an open modal
         */
        addEventListeners() {
            this.$modal?.addEventListener('touchstart', this.onClick);
            this.$modal?.addEventListener('click', this.onClick);
            document.addEventListener('keyup', this.onKeyup);
        }

        /**
         * Remove event listener for an open modal
         */
        removeEventListeners() {
            this.$modal?.removeEventListener('touchstart', this.onClick);
            this.$modal?.removeEventListener('click', this.onClick);
            document.removeEventListener('keyup', this.onKeyup);
        }

        /**
         * Close modal window by selector
         *
         * @param {string} selector - Modal window selector to close
         */
        closeBySelector(selector: string) {
            const element = document.querySelector<HTMLElement>(selector);
            if (!element) return;
            this.$modal = element;
            this.close();
        }

        /**
         * Change scroll behavior
         *
         * @param {string} value - Scroll state value
         */
        changeScrollBehavior(value: 'disable' | 'enable') {
            if (!this.scrollBehavior.isDisabled) return;
            const element = document.querySelector<HTMLElement>(this.scrollBehavior.container);
            if (!element) return;
            if (value === SCROLL_STATE.ENABLE)
                element.style.overflow = this.scrollBehavior.defaultValue;
            else if (value === SCROLL_STATE.DISABLE) element.style.overflow = 'hidden';
        }
    }

    let modal: ModalType; // 인스턴스를 여러개 생서하기 위한 방법

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
    /**
     * Open modal window by selector
     *
     * @param {string} selector - Modal window selector
     * @param {ConfigType} config - Modal window configuration
     */
    const open = (selector: string, config?: ConfigType) => {
        const options = config || {};
        modal = new Modal({...options, selector});
        modal.open();
    };

    /**
     * Close modal
     *
     * @param {string} selector - Modal window selector
     */
    const close = (selector?: string) => {
        if (!modal) return;
        selector ? modal.closeBySelector(selector) : modal.close();
    };

    return {init, open, close};
})();

window.ModalEdy = ModalEdy;
