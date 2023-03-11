let ot = ui.txt("Options", sui, 2, 16);
let st = ui.btns(sui, 2, "sli", "FOV: Normal", [30, 110, 70], "mbtn", "Online...", n);
ot.style.paddingBottom = "40px"
st.style.paddingBottom = "40px"
setSlider(st.querySelector(".sli"), "FOV: ", "", "fov")
ui.btns(sui, 2, "mbtn", "Skin Customization...", n, "mbtn", "Music & Sounds...", n);
ui.btns(sui, 2, "mbtn", "Video Settings...", n, "mbtn", "Controls...", function(){setScreen(4)});
ui.btns(sui, 2, "mbtn", "Language...", n, "mbtn", "Chat Settings...", n);
ui.btns(sui, 2, "mbtn", "Resource Packs...", n, "mbtn", "Accessibility Settings...", n);
let sdn = ui.bbtn("Done", sui, 2, function() {
  if (gs.inGame) {
    setScreen(3)
  }else{
    setScreen(0)
  }
});
sdn.style.marginTop = "40px"
updateScreens();
