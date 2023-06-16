import Circ from "./circle";

export default class Omni extends Circ {
    constructor(x, y, radius, line, scolor) {
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.line = line;
        this.scolor = scolor;
        this.omniWidth = 44;
        this.omniHeight = 66;
        this.omniImage = new Image();
        this.omniImage.src = "../../ASSETS/img/omnitrix.png";
    }

    drawOmni(ctx) {
        ctx.save();
        this.drawCirc(ctx);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.line, (Math.PI / 180) * 360);
        ctx.restore();

        ctx.drawImage(
            this.omniImage,
            0 * this.omniWidth,
            0,
            this.omniWidth,
            this.omniHeight,
            this.x - this.radius / 1,
            this.y - this.radius / 0.9,
            this.omniWidth * 1.2,
            this.omniHeight * 1.2
        );
    }

    collide(benX, benY, benRadius) {
        let s = benRadius + this.radius;
        let x = benX - this.x;
        let y = benY - this.y;
        return s > Math.sqrt(x * x + y * y) ? true : false;
    }
}
