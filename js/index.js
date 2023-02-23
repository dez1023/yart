

/* */

// title

let logo = ui.img("assets/gui/mclogo.png", sui);
addToScreen(logo, 0);
logo.classList.add("logo");

ui.bbtn("Singleplayer", sui, 0, function() { setScreen(1) });
disable(ui.bbtn("Multiplayer", sui, 0, function() { setScreen(2) }));
let tsbtns = ui.btns(sui, "Options", 0, function() { setScreen(3) }, "Quit Game", 0, function() { window.close() });
tsbtns.style.marginTop = "50px"

// worlds
ui.txt("Select World", sui, 1, 16);
ui.txt("worlds deez nuts", sui, 1);
ui.bbtn("Back", sui, 1, function() { setScreen(0) });

// servers
ui.txt("Play Multiplayer", sui, 2, 16);
ui.txt("multiplayer deez nuts", sui, 2);
ui.bbtn("Back", sui, 2, function() { setScreen(0) });

// options
ui.txt("Options", sui, 3, 16);
ui.btns(sui, "FOV: Normal", 3, n, "Online...", 3, n)
ui.bbtn("Back", sui, 3, function() { setScreen(0) });

updateScreens();
