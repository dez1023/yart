let guict = ui.txt("Controls", sui, 4, 16);
guict.style.paddingBottom = "40px"
let guicst = ui.btns(sui, 4, "sli", "Sensitivity: 100%", [0, 200, 100], "mbtn", "deez nuts", n);
setSlider(guicst.querySelector(".sli"), "Sensitivity: ", "%", "sens")

let guiCdn = ui.bbtn("Done", sui, 4, function() {
  setScreen(2)
});
guiCdn.style.marginTop = "40px"
updateScreens();