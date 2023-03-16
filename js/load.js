const scripts = [
  "three", 
  "gltfloader", 
  "render", 
  "math", 
  "gameSettings", 
  "debug",
  "panorama", 
  "noise",
  "genWorld",
  "game", 
  "democtrls", 
  "GUItitle", 
  "GUIworlds",
  "GUIsettings",
  "GUIgameSettings",
  "GUIcontrols",
  "customBtns",
]

let loadbg = ui.div(db)
let loadLogo = ui.img(assets+"title/mojang.png",loadbg)
let loadBar = ui.div(loadbg)
loadbg.style = "position: fixed; background: #f0323e; width: 100%; height: 100%; left: 0; top: 0; z-index: 10000;"
loadLogo.style = "position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); width: calc(100% - 50%); height: auto;"
loadBar.style = "position: fixed; left: 50%; top: 80%; transform: translate(-50%, -80%); width: calc(100% - 50%); height: 5px; border: 3px solid white; background: linear-gradient(90deg, white 50%, transparent 50%); background-size: 200% auto; background-position: 100% 0%; transition: 1s background-position"

if (window.location.href == "https://c3b4a72c-81fb-43cb-bb2d-d5eb5878ec7c.id.repl.co/") {
window.location = "https://yart.rfs2iscool.repl.co/debug";
}else{
  if (window.location != "https://yart.rfs2iscool.repl.co/debug") {
    loadScript(0);
    console.log("Loading " + scripts.length + " scripts")
  }
}

function loadScript(i) {
  var head = document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  script.src = address + "js/" + scripts[i] + ".js";
  head.appendChild(script);
  head.removeChild(script);
  var done = false;
  script.onload = script.onreadystatechange = function() {
    if (!done && (!this.readyState ||
      this.readyState == "loaded" ||
      this.readyState == "complete")) {
      done = true;
      script.onload = script.onreadystatechange = null;
      if (i++ < scripts.length) {
        loadBar.style.backgroundPosition = (100-(i/scripts.length)*100) +"% 0%"
        loadScript(i++)
      }
      if (i++ == scripts.length) {
        console.log("Done loading")
        setTimeout(function(){
          loadbg.style.animationName = "hideLoad";
          loadbg.style.animationDuration = "1s";
          loadbg.style.animationDirection = "normal"
          setTimeout(function(){
            db.removeChild(loadbg)
          },1000)
        },3000)
      }
    }
  };
}