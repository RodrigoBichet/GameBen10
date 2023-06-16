import { keyPress, key, pressedKeys } from "./keyboard";
import { numeroRandom } from "./number";
import Ben from "./characters/ben";
import Omni from "./characters/omni";
import Crystal from "./characters/crystal";
import Drone from "./characters/drone";

let ctx;
export let canvas;
let omnitrix = 0;
let gameState;
const frames = 60;
const droneQuant = 10;
const drones = [];
const cristais = [];
const timecrystal = 60 * 5;
const mensagemvida = 50;

let vidas = 2;
let tInvulneravel = 550;
let protecao = 450;
let tempoMensagem;
let omniSound;
let crystalSound;
let theme;
let deathSound;

let ben; // = new Ben(300, 200, 25, 5, 120, 1, 4.5);
let omni = new Omni(300, 400, 17, 5);
let crystal = new Crystal(511, 100, 1, 5);
let drone = new Drone(0, 0, 5, 5, 0, 200);

function contaOmnitrix() {
    ctx.fillStyle = "#FFF";
    ctx.font = "15px Pixel";
    ctx.fillText("Omnitrix:" + omnitrix, canvas.width - 170, 20);
}

function contaVida() {
    ctx.fillStyle = "#FFF";
    ctx.font = "15px Pixel";
    ctx.fillText("Vidas:" + vidas, canvas.width - 170, 40);
}

function perdeu() {
    ctx.fillStyle = "#FFF";
    ctx.font = "30px Pixel";
    ctx.fillText("Você Perdeu" + "!", canvas.width - 460, 200);
}

function maisvida() {
    ctx.fillStyle = "#FFF";
    ctx.font = "40px Pixel";
    ctx.fillText("+1 VIDA", canvas.width - 438, 140);
}

const init = async () => {
    console.log("Initialize Canvas");
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    //escolher sprite
    console.log(new URLSearchParams(window.location.search));
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page_type = urlParams.get("personagem");
    console.log(page_type);
    ben = new Ben(300, 200, 25, 5, 120, 1, 4.5, page_type);

    keyPress(canvas);
    for (let i = 0; i < droneQuant; i++) {
        drones.push(
            new Drone(
                numeroRandom(canvas.width - drone.radius, drone.radius),
                numeroRandom(canvas.height / 2, drone.radius),
                drone.radius,
                1,
                1,
                5
            )
        );
    }

    theme = new Audio();
    theme.src = "../sound/classic_theme.mp3";
    theme.volume = 0.07;
    theme.loop = true;
    omniSound = new Audio();
    omniSound.src = "../sound/omni.mp3";
    omniSound.volume = 0.99;
    crystalSound = new Audio();
    crystalSound.src = "../sound/crystal.mp3";
    crystalSound.volume = 0.04;
    deathSound = new Audio();
    deathSound.src = "../sound/death.mp3";
    deathSound.volume = 0.1;
    gameState = true;
    loop();
};

const loop = () => {
    if (gameState) {
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ben.move;

            if (protecao != 0) {
                if (protecao % 50 > 25) {
                    ben.invulneravel = false;
                } else {
                    ben.invulneravel = true;
                }
            } else {
                ben.invulneravel = false;
            }

            ben.drawBen(ctx, canvas, pressedKeys);
            omni.drawOmni(ctx);

            cristais.forEach((crystal) => {
                crystal.lifetime % 40 < 20
                    ? (ctx.globalAlpha = 1)
                    : (ctx.globalAlpha = 0.4);
                crystal.drawCrystal(ctx);
                ctx.globalAlpha = 1;
            });
            drones.forEach((drone) => drone.drawDrone(ctx));
            ben.move({
                width: canvas.width,
                height: canvas.height,
            });

            //mensagem de vida
            if (tempoMensagem > 0) {
                maisvida();
                tempoMensagem--;
            }

            theme.currentTime == 0 && theme.play();

            contaOmnitrix();
            contaVida();
            atualiza();
            requestAnimationFrame(loop);
        }, 1000 / frames);
    }
};

//colisão
const atualiza = () => {
    if (omni.collide(ben.x, ben.y, ben.radius)) {
        omni.x = numeroRandom(canvas.width - omni.radius - 24, omni.radius);
        omni.y = numeroRandom(canvas.height - omni.radius - 20, omni.radius);
        omnitrix++;
        omniSound.play();

        //cristais de vida a cada 10 omnitrix
        if (omnitrix % 5 == 0 && omnitrix != 0 && cristais.length < 1) {
            cristais.push(
                new Crystal(
                    numeroRandom(
                        canvas.width - crystal.radius - 15,
                        crystal.radius
                    ),
                    numeroRandom(
                        canvas.height - crystal.radius - 27,
                        crystal.radius
                    ),

                    1,
                    1,
                    1,
                    timecrystal
                )
            );
        }
    }

    //cristais de vida somem após 5seg
    cristais.forEach((crystal) => {
        if (crystal.collide(ben.x, ben.y, ben.radius) || crystal.lifetime < 0) {
            cristais.shift();
            if (crystal.lifetime > 0) {
                crystalSound.play();
                tempoMensagem = mensagemvida;
                vidas++;
            }
        } else {
            console.log(crystal.lifetime);
            crystal.lifetime--;
        }
    });

    //tempo de proteção contra dano
    drones.forEach((drone) => {
        drone.move();
        if (protecao == 0) {
            if (drone.collide(ben.x, ben.y, ben.radius)) {
                deathSound.play();

                if (vidas > 0) {
                    vidas--;
                    protecao = tInvulneravel;
                } else {
                    perdeu();
                    gameState = false;

                    //botão para recomeçar
                    const newDiv = document.createElement("div");
                    newDiv.innerHTML = ` <a class="linkplay" onClick="window.location.reload()"
                    ><button title="Jogar novamente!" type="button" class="btn4">
                        <p class="upper">jogar novamente</p>
                    </button></a
                >`;

                    document.body.insertBefore(newDiv, canvas.canvasstyle);
                }
            }
        } else {
            protecao--;
        }
    });
};

export { init };
