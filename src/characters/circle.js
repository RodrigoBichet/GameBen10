export default class Circ {
    constructor(x, y, radius, line, scolor) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.line = line;
        this.scolor = scolor;
    }

    drawCirc(ctx) {
        ctx.save();
        ctx.line = this.line;
        ctx.strokeStyle = this.scolor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
        ctx.restore();
    }
}
