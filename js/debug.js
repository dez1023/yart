let pOutput = ui.div(db)
pOutput.style = "background: Moccasin; border: 1px solid grey; border-radius: 5px; display: none; position: fixed; left: 50%; top: calc(100% - 10px); transform: translate(-50%, -100%); z-index: 100000; width: calc(100vw - 100px); height: 25vh; padding: 10px; font-family: Minecraftia, serif; font-size: 14px; overflow: scroll;"

let debugleft = ui.div(db)
debugleft.style = "position: relative; z-index: 100000; font-family: Minecraftia, serif; background: rgba(0,0,0,0.2); font-size: 14px; padding: 10px; display: inline-block; color: white; text-shadow: 2px 2px black;"

let printCount = 0
pOutput.innerHTML += "Console"

window.onerror = function(error, source, lnum, cnum, obj) {
  p("!!-----ERROR-----!!")
  p("Error : " + error)
  p("Url : " + source)
  p("Object : " + obj)
  p("Line number : " + lnum)
  p("Column number : " + cnum)
  p("!!---------------!!")
}

function p(a, b, c) {
  if (!a) {
    a = "null"
  }
  console.log(a, b, c)
  printCount++
  pOutput.style.display = "inline"
  pOutput.innerHTML += "<br>" + printCount + ": " + a
  if (b) {
    pOutput.innerHTML += ", " + b
  }
  if (c) {
    pOutput.innerHTML += ", " + c
  }
}

function updateDebug() {
  function a(t,v) {
    debugleft.innerHTML += "<br>"+t+": "+v+""
  }
  window.requestAnimationFrame(updateDebug)
  debugleft.innerHTML = "<b>---Debug---</b>"
  a("inGame",gs.inGame)
  a("paused",gs.paused)
  a("pointerLock",gs.pointerLock)
  a("Rendering: ",gs.rendering)
  a("FPS",gs.FPS)
}

updateDebug()