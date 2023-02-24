

/* */

// title

let logo = ui.img("assets/gui/mclogo.png", sui);
addToScreen(logo, 0);
logo.classList.add("logo");

ui.bbtn("Singleplayer", sui, 0, function() { setScreen(1) });
disable(ui.bbtn("Multiplayer", sui, 0, function() { setScreen(2) }));
let tsbtns = ui.sbtns(sui, "Options...", 0, function() { setScreen(3) }, "Quit Game", 0, function() { window.close() });
tsbtns.style.marginTop = "50px"

// worlds
ui.txt("Select World", sui, 1, 16);
ui.txt("worlds deez nuts", sui, 1);
ui.bbtn("Done", sui, 1, function() { setScreen(0) });

// servers
ui.txt("Play Multiplayer", sui, 2, 16);
ui.txt("multiplayer deez nuts", sui, 2);
ui.bbtn("Done", sui, 2, function() { setScreen(0) });

// options
let title = ui.txt("Options", sui, 3, 16);
let st = ui.mbtns(sui, "FOV: Normal", 3, n, "Online...", 3, n)
st.style.paddingBottom = "40px"
ui.mbtns(sui, "Skin Customization...", 3, n, "Music & Sounds...", 3, n)
ui.mbtns(sui, "Video Settings...", 3, n, "Controls...", 3, n)
ui.mbtns(sui, "Language...", 3, n, "Chat Settings...", 3, n)
ui.mbtns(sui, "Resource Packs...", 3, n, "Accessibility Settings...", 3, n)
let sdn = ui.bbtn("Done", sui, 3, function() { setScreen(0) });
sdn.style.marginTop = "40px"

updateScreens();