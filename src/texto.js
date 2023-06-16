var btn = document.querySelector("#mostratexto1");
var textotutorial = document.querySelector(".textotutorial");

btn.addEventListener("click", function () {
    if (textotutorial.style.display === "block") {
        textotutorial.style.display = "none";
    } else {
        textotutorial.style.display = "block";
    }
});
