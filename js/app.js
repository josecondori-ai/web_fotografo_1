const images = document.getElementsByTagName('figure');
const preLoader = document.getElementById('pre-loader');
const container = document.getElementById('container');
const cursor = document.getElementById('cursor');
const menu = document.getElementById('menu');
const hoverSmallBlack = document.getElementsByClassName('small-black');
const hoverSmallWhite = document.getElementsByClassName('small-white');

let hoverSmallBlackFunc, hoverSmallWhiteFunc, customClickFunc, navHoverFunc;

(customClickFunc = () => {
    container.addEventListener('mousedown', () => {
        cursor.classList.add('active');
    });
    container.addEventListener('mouseup', () => {
        cursor.classList.remove('active');
    });
})();

(hoverSmallWhiteFunc = () => {
    Array.from(hoverSmallWhite).forEach(item => {
        item.addEventListener("mouseover", () => {
            cursor.classList.add('small');
            console.log(item);
        });

        item.addEventListener("mouseout", () => {
            cursor.classList.remove('small');
        });
    });
})();

(hoverSmallBlackFunc = () => {
    Array.from(hoverSmallBlack).forEach(item => {
        item.addEventListener("mouseover", () => {
            cursor.classList.add('small-black');
            console.log(item);
        });

        item.addEventListener("mouseout", () => {
            cursor.classList.remove('small-black');
        });
    });
})();

let counter = 0;
const preLoaderFunc = () => {
    if (counter < 1) {
        preLoader.classList.add('_1');
        container.classList.add('hide');
        console.log('1');
    } else if (counter === 1) {
        preLoader.classList.add('_2');
        console.log('2');
    } else if (counter === 2) {
        preLoader.classList.remove('_1', '_2');
        container.classList.add('reveal');
        console.log('3');
        counter = -1;
    }
    counter++;
    console.log(counter);
};

menu.addEventListener('click', preLoaderFunc);
preLoader.addEventListener('click', preLoaderFunc);
container.addEventListener('click', preLoaderFunc);

document.body.onkeyup = (e) => {
    if (e.keyCode === 32) {
        preLoaderFunc();
    }
    if (e.keyCode > 33) {
        cursor.classList.add('hidden');
    }
};

$(document).ready(() => {
    $('#container').parallax();
});

class MouseCursor {
    constructor() {
        this.container = document.querySelector('#container');
        const cursor = document.querySelector('.cursor');
        TweenLite.to(cursor, {
            autoAlpha: 0,
        });
    }

    moveMousePos(e) {
        const mousePosX = e.clientX;
        const mousePosY = e.clientY;
        const cursor = document.querySelector('.cursor');

        if (e.target.classList.contains('c-magnetic')) return;

        TweenLite.to(cursor, 0.5, {
            x: mousePosX,
            y: mousePosY,
            ease: Power4.easeOut,
        });
    }

    enterMouse() {
        const cursor = document.querySelector('.cursor');
        TweenLite.to(cursor, 1, {
            autoAlpha: 1,
            ease: Power4.easeIn,
        });
    }

    handleMousePos() {
        container.addEventListener('mouseenter', this.enterMouse);
        container.addEventListener('mousemove', this.moveMousePos, false);
    }

    render() {
        this.handleMousePos();
    }
}

class MagneticCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.pos = { x: 0, y: 0 };
    }

    moveCursor(e, link, force) {
        const rect = link.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        this.pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / force;
        this.pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / force;

        TweenMax.to(this.cursor, 0.3, {
            x: this.pos.x,
            y: this.pos.y,
        });
    }
}

const mouseCursor = new MouseCursor();
mouseCursor.render();
