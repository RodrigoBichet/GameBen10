let keys = [];
let key;

let pressedKeys = {
    left: {
        pressed: false,
    },
    right: {
        pressed: false,
    },
    up: {
        pressed: false,
    },
    down: {
        pressed: false,
    },
};

if (pressedKeys.left === true) {
    moveLeft();
}

function keyPress(element) {
    element.addEventListener("keydown", (event) => {
        if (event.key === "d") {
            pressedKeys.right = true;
        }
        if (event.key === "a") {
            pressedKeys.left = true;
        }
        if (event.key === "w") {
            pressedKeys.up = true;
        }
        if (event.key === "s") {
            pressedKeys.down = true;
        }

        console.log(key);
    });
    element.addEventListener("keyup", (event) => {
        if (event.key === "d") {
            pressedKeys.right = false;
        }
        if (event.key === "a") {
            pressedKeys.left = false;
        }
        if (event.key === "w") {
            pressedKeys.up = false;
        }
        if (event.key === "s") {
            pressedKeys.down = false;
        }

        console.log(key);
    });
}

function keyDown(element) {
    window.addEventListener("keydown", addKey);
    window.addEventListener("keyup", removeKey);
}

function addKey(event) {
    !hasKey(event.key) && keys.push(event.key);
    console.log(event);
}

function removeKey(event) {
    console.log(keys);
    keys = keys.filter((key) => key !== event.key);
    console.log(keys);
}

const hasKey = (searchKey) => keys.find((key) => searchKey === key);

export { keyDown, hasKey, keyPress, key, pressedKeys };
