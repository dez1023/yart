/* */

// title

let logo = ui.img("assets/gui/mclogo.png", sui);
addToScreen(logo, 0);
logo.classList.add("logo");

ui.bbtn("Singleplayer", sui, 0, function() {
  setScreen(1)
});
ui.bbtn("Multiplayer", sui, 0, function() {
  setScreen(2)
})

let tsbtns = ui.btns(sui, 0, "sbtn", "Options...", function(){setScreen(3)}, "sbtn", "Quit Game", n);
tsbtns.style.marginTop = "50px"

// worlds
ui.txt("Select World", sui, 1, 16);
ui.txt("worlds deez nuts", sui, 1);
ui.bbtn("Done", sui, 1, function() {
  setScreen(0)
});

// servers
ui.txt("Play Multiplayer", sui, 2, 16);
ui.txt("multiplayer deez nuts", sui, 2);
ui.bbtn("Done", sui, 2, function() {
  setScreen(0)
});

// options
let title = ui.txt("Options", sui, 3, 16);
let st = ui.btns(sui, 3, "sli", "FOV: Normal", n, "mbtn", "Online...", n);
st.style.paddingBottom = "40px"
ui.btns(sui, 3, "mbtn", "Skin Customization...", n, "mbtn", "Music & Sounds...", n);
ui.btns(sui, 3, "mbtn", "Video Settings...", n, "mbtn", "Controls...", n);
ui.btns(sui, 3, "mbtn", "Language...", n, "mbtn", "Chat Settings...", n);
ui.btns(sui, 3, "mbtn", "Resource Packs...", n, "mbtn", "Accessibility Settings...", n);
let sdn = ui.bbtn("Done", sui, 3, function() {
  setScreen(0)
});
sdn.style.marginTop = "40px"
//let test = ui.sli("test", sui, 3)

updateScreens();