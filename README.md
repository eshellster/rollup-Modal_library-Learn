<p align="center">
  ![modal](https://user-images.githubusercontent.com/5045011/110337213-004e8780-8069-11eb-9322-0fff331110f3.png)
</p>

<h1 align="center">modal-edy.js</h1>

<h4 align="center">The lightweight library for modal windows</h4>

<p align="center">
  <a href="https://www.npmjs.com/package/modal-edy" target="_blank" rel="noopener">
    <img src="https://img.shields.io/npm/v/keukenhof?style=for-the-badge" alt="npm version" />
  </a>
  <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&color=green" alt="License">
  </a>
  <a href="https://bundlephobia.com/result?p=keukenhof">
    <img src="https://img.shields.io/bundlephobia/minzip/keukenhof?style=for-the-badge&color=orange&label=gzip" alt="gzip size">
  </a>
</p>

## Table of Contents

-   [Demo](#demo)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Docs](#docs)
-   [API](#api)
-   [Contribute](#contribute)
-   [Licensing](#licensing)

## Demo

[![modal-edy.js visualized](https://user-images.githubusercontent.com/14329906/89715344-25392a00-d9b6-11ea-8751-0b570e0368c5.gif)](https://modal-edy.netlify.app/#example)

## Installation

### Package Manager

[modal-edy.js](https://www.npmjs.com/package/modal-edy) page on npm

```bash
# With npm
npm i modal-edy
![modal](https://user-images.githubusercontent.com/5045011/110337040-d1381600-8068-11eb-95d1-17525caa2ba1.png)

# With Yarn
yarn add modal-edy
```

### CDN

```html
<script src="https://unpkg.com/modal-edy"></script>
```

## Usage

Part of the preparation of the library work is hidden, you just need to create a layout. There are no restrictions on the layout of your modal window, you just need to add `data-modalEdy-open` to the value of which you need to specify the selector of the window that should open on click and `data-modalEdy-close` for the element that should close the currently active modal

```html
<!DOCTYPE html>
<title>modal-edy.js modal example</title>

<style>
    #modal {
        display: none;
    }

    #modal.isOpen {
        display: block;
    }
</style>

<button data-modalEdy-open="#modal">Open modal</button>

<!-- Main modal wrapper with required id -->
<div id="modal" role="dialog" aria-hidden="true" aria-labelledby="title" aria-describedby="desc">
    <!-- Element for handling a click outside the modal window -->
    <div class="overlay" tabindex="-1" data-keukenhof-close></div>

    <header>
        <!-- Button to close the modal window -->
        <button class="close" aria-label="Close modal" data-modalEdy-close>Close</button>
    </header>

    <!-- Body used to improve a11y by describing the purpose of the modal -->
    <main>
        <h2 id="title">modal-edy.js modal</h2>
        <p id="desc">Lightweight and easy to use the library for modals</p>
    </main>
</div>

<script src="https://unpkg.com/modal-edy"></script>

<script>
    ModalEdy.init();
</script>
```

### Module bundlers

An alternative connection option is to use import `modalEdy.js`

```js
import {ModalEdy} from 'modal-edy';

// Initializing modal windows based on markup
ModalEdy.init({
    // options
});

// Configure and open modal by selector
ModalEdy.open('#modal', {
    // options
});

// Close active modal window
ModalEdy.close();
```

## Docs

The documentation can also be found on the [modal-edy.js website](https://keukenhof.netlify.app/#options)

| Options          | Type     | Description                                                                                                                                                                                                           |
| ---------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openAttribute`  | String   | The attribute containing the selector of the modal window that should be opened by clicking on the element                                                                                                            |
| `closeAttribute` | String   | The attribute marking elements inside the modal window, clicking on which will close this modal window                                                                                                                |
| `openClass`      | String   | The class name added for the open modal window                                                                                                                                                                        |
| `openingClass`   | String   | The class name added for the modal window that is in the process of opening (required for modals using CSS animations)                                                                                                |
| `closingClass`   | String   | The class name added for the modal window that is in the process of closing (required for modals using CSS animations)                                                                                                |
| `hasAnimation`   | Boolean  | Indicates the need to wait for the completion of the CSS animation of opening/closing the modal window                                                                                                                |
| `isAssignFocus`  | Boolean  | Indicates the need to focus on an interactive element inside the modal after opening                                                                                                                                  |
| `isFocusInside`  | Boolean  | Indicates the need to restrict focusable interactive elements using the keyboard inside the active modal                                                                                                              |
| `scrollBehavior` | Object   | Specify the need to block the scroll after opening a modal window. The scroll is blocked with `overflow: hidden;` if after closing the modal the overflow value should be defined just specify this as `defaultValue` |
| `onOpen`         | Function | Defines a function that will be called when the modal is open (if `hasAnimation: true;` is called after the animation has finished)                                                                                   |
| `onClose`        | Function | Defines a function that will be called when the modal is close (if `hasAnimation: true;` is called after the animation has finished)                                                                                  |
| `beforeOpen`     | Function | Defines a function to be called before the modal opens. If the function returns `false` the modal won't open                                                                                                          |
| `beforeClose`    | Function | Defines a function to be called before the modal closes. If the function returns `false` the modal won't close                                                                                                        |

## API

### init()

Initializes all modals based on markup. Accepts one optional parameter for configuration

```js
ModalEdy.init({
    selector: '#modal-1',
    openAttribute: 'data-modal-open',
    closeAttribute: 'data-modal-close',
    openClass: 'is-open',
    openingClass: 'is-opening',
    closingClass: 'is-closing',
    hasAnimation: true,
    isAssignFocus: false,
    isFocusInside: false,
    scrollBehavior: {
        isDisabled: true,
    },
    onOpen: () => console.log('The modal window is open'),
    onClose: () => console.log('The modal window is close'),
});
```

### open()

Opens a modal window with the given selector. The `open()` method has a second optional parameter for configuration

```js
// With config
ModalEdy.open('#modal', {
    openAttribute: 'data-modal-open',
    closeAttribute: 'data-modal-close',
    openClass: 'is-open',
    openingClass: 'is-opening',
    closingClass: 'is-closing',
    hasAnimation: true,
});

// Without config
ModalEdy.open('#modal');
```

### close()

Closes the modal with the given selector. If no parameters are passed to the `close()` method, the currently open window will be closed

```js
// With selector
ModalEdy.close('#modal');

// Without selector
ModalEdy.close();
```

## Contribute

1. Clone the repository `git@github.com:Alexandrshy/keukenhof.git`
2. Go to the project directory `cd keukenhof`
3. Install dependencies `yarn`
4. Run dev build with auto rebuild after any changes `yarn build:dev`
5. Complete your improvements, commit changes and submit your pull request for review code

## Licensing

[MIT license](http://opensource.org/licenses/MIT)
