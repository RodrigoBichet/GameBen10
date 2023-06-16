import { hasKey, keyDown, keyPress, pressedKeys } from "../keyboard";
import { loadImage } from "../loaderAssets";
import Circ from "./circle";

export default class Ben extends Circ {
    constructor(
        x,
        y,
        radius,
        line,
        frames,
        scolor = null,
        speed = 3,
        sprite = "ben"
    ) {
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.line = line;
        this.scolor = scolor;
        this.speed = speed;
        this.stop = true;
        this.benWidth = 44;
        this.benHeight = 66;
        this.spriteAtual = 1;
        this.totalSprites = 3;
        this.spriteSpeed = 0.5;
        this.sprite = sprite;
        this.benImage = new Image();
        this.loadsprites().then(() => (this.benImage = this.benSprite["down"]));
        this.animeSprite(frames);
        this.invulneravel = false;
    }

    animeSprite(frames) {
        setInterval(() => {
            if (this.stop == false)
                this.spriteAtual =
                    this.spriteAtual < this.totalSprites - 1
                        ? this.spriteAtual + 1
                        : 0;
        }, 1000 / ((frames * this.spriteSpeed) / 10));
    }

    async loadsprites() {
        if (this.sprite == "ben") {
            this.benSprite = {
                up: await loadImage("../../ASSETS/img/sprites/ben_up.png"),
                right: await loadImage("../../ASSETS/img/sprites/ben_right.png"),
                left: await loadImage("../../ASSETS/img/sprites/ben_left.png"),
                down: await loadImage("../../ASSETS/img/sprites/ben_down.png"),
            };
        }
        if (this.sprite == "kevin") {
            this.benSprite = {
                up: await loadImage("../../ASSETS/img/sprites/kevin_up.png"),
                right: await loadImage("../../ASSETS/img/sprites/kevin_right.png"),
                left: await loadImage("../../ASSETS/img/sprites/kevin_left.png"),
                down: await loadImage("../../ASSETS/img/sprites/kevin_down.png"),
            };
        }

        if (this.sprite == "gwen") {
            this.benSprite = {
                up: await loadImage("../../ASSETS/img/sprites/gwen_up.png"),
                right: await loadImage("../../ASSETS/img/sprites/gwen_right.png"),
                left: await loadImage("../../ASSETS/img/sprites/gwen_left.png"),
                down: await loadImage("../../ASSETS/img/sprites/gwen_down.png"),
            };
        }

        if (this.sprite == "chama") {
            this.benSprite = {
                up: await loadImage("../../ASSETS/img/sprites/chama_up.png"),
                right: await loadImage("../../ASSETS/img/sprites/chama_right.png"),
                left: await loadImage("../../ASSETS/img/sprites/chama_left.png"),
                down: await loadImage("../../ASSETS/img/sprites/chama_down.png"),
            };
        }

        if (this.sprite == "quatrobracos") {
            this.benSprite = {
                up: await loadImage("../../ASSETS/img//sprites/quatrobracos_up.png"),
                right: await loadImage(
                    "../../ASSETS/img//sprites/quatrobracos_right.png"
                ),
                left: await loadImage(
                    "../../ASSETS/img//sprites/quatrobracos_left.png"
                ),
                down: await loadImage(
                    "../../ASSETS/img//sprites/quatrobracos_down.png"
                ),
            };
        }

        if (this.sprite == "xlr8") {
            this.benSprite = {
                up: await loadImage("../../ASSETS/img/sprites/xlr8_up.png"),
                right: await loadImage("../../ASSETS/img/sprites/xlr8_right.png"),
                left: await loadImage("../../ASSETS/img/sprites/xlr8_left.png"),
                down: await loadImage("../../ASSETS/img/sprites/xlr8_down.png"),
            };
        }

        if (this.sprite == "diamante") {
            this.benSprite = {
                up: await loadImage("../../ASSETS/img/sprites/diamante_up.png"),
                right: await loadImage("../../ASSETS/img/sprites/diamante_right.png"),
                left: await loadImage("../../ASSETS/img/sprites/diamante_left.png"),
                down: await loadImage("../../ASSETS/img/sprites/diamante_down.png"),
            };
        }

        if (this.sprite == "fantasmatico") {
            this.benSprite = {
                up: await loadImage("../../ASSETS/img/sprites/fantasmatico_up.png"),
                right: await loadImage(
                    "../../ASSETS/img/sprites/fantasmatico_right.png"
                ),
                left: await loadImage(
                    "../../ASSETS/img/sprites/fantasmatico_left.png"
                ),
                down: await loadImage(
                    "../../ASSETS/img/sprites/fantasmatico_down.png"
                ),
            };
        } else if (this.sprite == null) {
            this.benSprite = {
                up: await loadImage("../../ASSETS/img/sprites/ben_up.png"),
                right: await loadImage("../../ASSETS/img/sprites/ben_right.png"),
                left: await loadImage("../../ASSETS/img/sprites/ben_left.png"),
                down: await loadImage("../../ASSETS/img/sprites/ben_down.png"),
            };
        }
    }

    drawBen(ctx, canvas, pressedKeys) {
        ctx.save();
        this.drawCirc(ctx);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.line, (Math.PI / 180) * 360);
        ctx.restore();

        this.invulneravel ? (ctx.globalAlpha = 0.4) : (ctx.globalAlpha = 1);

        ctx.drawImage(
            this.benImage,
            this.spriteAtual * this.benWidth,
            0,
            this.benWidth,
            this.benHeight,
            this.x - this.radius / 1,
            this.y - this.radius / 0.7,
            this.benWidth * 1.2,
            this.benHeight * 1.2
        );

        ctx.globalAlpha = 1;
    }

    move(limits) {
        if (
            pressedKeys.right === true &&
            this.x <= limits.width - this.radius
        ) {
            this.x += this.speed;
            this.benImage = this.benSprite["right"];
            this.stop = false;
        } else if (pressedKeys.left === true && this.x >= this.radius) {
            this.x -= this.speed;
            this.benImage = this.benSprite["left"];
            this.stop = false;
        } else if (pressedKeys.up === true && this.y >= this.radius) {
            this.y -= this.speed;
            this.benImage = this.benSprite["up"];
            this.stop = false;
        } else if (
            pressedKeys.down === true &&
            this.y <= limits.height - this.radius
        ) {
            this.y += this.speed;
            this.benImage = this.benSprite["down"];
            this.stop = false;
        } else {
            this.spriteAtual = 1;
            this.stop = true;
        }
    }
}
