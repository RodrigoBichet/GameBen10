import Circ from "./circle";

export default class Crystal extends Circ {
    constructor(x, y, radius, line, scolor, lifetime) {
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.line = line;
        this.scolor = scolor;
        this.crystalWidth = 22;
        this.crystalHeight = 33;
        this.crystalImage = new Image();
        this.crystalImage.src = "/ASSETS/img/crystal.png";
        this.lifetime = lifetime;
    }

    drawCrystal(ctx) {
        ctx.save();
        this.drawCirc(ctx);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.line, (Math.PI / 180) * 360);
        ctx.restore();

        ctx.drawImage(
            this.crystalImage,
            0 * this.crystalWidth,
            0,
            this.crystalWidth,
            this.crystalHeight,
            this.x - this.radius / 1.0,
            this.y - this.radius / 0.9,
            this.crystalWidth * 1.2,
            this.crystalHeight * 1.2
        );
    }

    collide(benX, benY, benRadius) {
        let s = benRadius + this.radius;
        let x = benX - this.x;
        let y = benY - this.y;
        return s > Math.sqrt(x * x + y * y) ? true : false;
    }
}
