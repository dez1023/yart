/* */

// title

let logo = ui.img("title/mclogo.png", sui);
addToScreen(logo, 0);
logo.classList.add("logo");

fetch(assets+'splashes.txt')
  .then(response => response.text())
  .then((data) => {
    let lines = data.split(/\r?\n|\r|\n/g);
    let rand = round(getRandomArbitrary(0,lines.length))
    if (rand == 222) {
      rand = 223
    }
    let splash = lines[rand];
    //let splash = lines[1]
    let len = splash.length
    len = 30-(len/2)
    //console.log(len)
    let spltxt = ui.txt(splash,sui,0,len);
    spltxt.classList.add("splash")
  })

ui.bbtn("Singleplayer", sui, 0, n);
ui.bbtn("Multiplayer", sui, 0, function() {
  setScreen(1)
})

let tsbtns = ui.btns(sui, 0, "sbtn", "Options...", function(){setScreen(2)}, "sbtn", "Quit Game", function(){window.close()});
tsbtns.style.marginTop = "50px"

// servers
ui.txt("Play Multiplayer", sui, 1, 16);
ui.txt("multiplayer deez nuts", sui, 1);
ui.bbtn("Done", sui, 1, function() {
  setScreen(0)
});

// options
let ot = ui.txt("Options", sui, 2, 16);
let st = ui.btns(sui, 2, "sli", "FOV: Normal", [30,110,70], "mbtn", "Online...", n);
st.style.paddingBottom = "40px"
setSlider(st.querySelector(".sli"),"FOV: ","","fov")
ui.btns(sui, 2, "mbtn", "Skin Customization...", n, "mbtn", "Music & Sounds...", n);
ui.btns(sui, 2, "mbtn", "Video Settings...", n, "mbtn", "Controls...", n);
ui.btns(sui, 2, "mbtn", "Language...", n, "mbtn", "Chat Settings...", n);
ui.btns(sui, 2, "mbtn", "Resource Packs...", n, "mbtn", "Accessibility Settings...", n);
let sdn = ui.bbtn("Done", sui, 2, function() {
  setScreen(0)
});
sdn.style.marginTop = "40px"
//let test = ui.sli("test", sui, 3)

updateScreens();