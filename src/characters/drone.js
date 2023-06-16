import { numeroRandom } from "../number";
import { canvas } from "../init";
import Circ from "./circle";

export default class Drone extends Circ {
    constructor(x, y, radius, line, scolor, speed = 3) {
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.line = line;
        this.scolor = scolor;
        this.speed = speed;
        this.droneWidth = 30;
        this.droneHeight = 33;
        this.droneImage = new Image();
        this.droneImage.src = "../../ASSETS/img/drone.png";
    }

    drawDrone(ctx) {
        ctx.save();
        this.drawCirc(ctx);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.line, (Math.PI / 180) * 360);
        ctx.restore();

        ctx.drawImage(
            this.droneImage,
            0 * this.droneWidth,
            0,
            this.droneWidth,
            this.droneHeight,
            this.x - this.radius / 0.3,
            this.y - this.radius / 0.2,
            this.droneWidth * 1.2,
            this.droneHeight * 1.2
        );
    }

    move() {
        if (this.y <= canvas.height) {
            this.y = this.y + this.speed;
        } else {
            this.y = 0;
            this.x = numeroRandom(canvas.width - this.radius, this.radius);
        }
    }

    collide(benX, benY, benRadius) {
        let s = benRadius + this.radius;
        let x = benX - this.x;
        let y = benY - this.y;
        return s > Math.sqrt(x * x + y * y) ? true : false;
    }
}
