/* */

      // title

      let logo = ui.img(assets + "title/mclogo.png", sui);
      addToScreen(logo, 0);
      logo.classList.add("logo");

      fetch(assets + 'splashes.txt')
        .then(response => response.text())
        .then((data) => {
          let lines = data.split(/\r?\n|\r|\n/g);
          let rand = round(random(0, lines.length))
          if (rand == 222) {
            rand = 223
          }
          let splash = lines[rand];
          //let splash = lines[1]
          let len = splash.length
          len = 30 - (len / 1.5)
          //console.log(len)
          let spltxt = ui.txt(splash, sui, 0, len);
          spltxt.classList.add("splash")
        })

      ui.bbtn("Singleplayer", sui, 0, function(){setScreen(1)});
      disable(ui.bbtn("Multiplayer", sui, 0, n))
disable(ui.bbtn("Minecraft Realms", sui, 0, n))

      let tsbtns = ui.btns(sui, 0, "sbtn", "Options...", function() {setScreen(2)}, "sbtn", "Quit Game", function() {window.close()});
      tsbtns.style.marginTop = "50px"
      ui.ssbtn(sui,0,n,assets+"gui/ssicons.png",0,1);
      ui.ssbtn(sui,0,n,assets+"gui/ssicons.png",-40,2);