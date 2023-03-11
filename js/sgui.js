let ui = {
        e: function(el, p) {
          let e = document.createElement(el);
          p.appendChild(e);
          return e;
        },
        div: function(p) {
          let e = ui.e("div", p)
          return e;
        },
        img: function(sc, p) {
          let e = ui.e("img", p)
          e.src = sc;
          return e;
        },
        a: function(t, p) {
          let e = ui.e("a", p);
          e.innerHTML = t;
          return e;
        },
        txt: function(t, p, s, sc) {
          let e = ui.a(t, p, s);
          e.classList.add("txt");
          e.style.fontSize = sc + "px"
          addToScreen(e, s);
          return e;
        },
        btn: function(t, p, s, f) {
          let e = ui.e("button", p);
          e.innerHTML = t;
          e.onclick = f;
          addToScreen(e, s);
          return e;
        },
        bbtn: function(t, p, s, f) {
          let e = ui.btn("", p, s, f);
          let txt = ui.txt(t, e, s);
          e.classList.add("bbtn");
          return e;
        },
        mbtn: function(t, p, s, f) {
          let e = ui.btn("", p, s, f);
          let txt = ui.txt(t, e, s);
          e.classList.add("mbtn");
          return e;
        },
        sbtn: function(t, p, s, f) {
          let e = ui.btn("", p, s, f);
          let txt = ui.txt(t, e, s);
          e.classList.add("sbtn");
          return e;
        },
        ssbtn: function(p, s, f, sc, y,side) {
          let e = ui.btn("", p, s, f);
          let im = ui.div(e);
          e.classList.add("ssbtn");
          im.style.background = "url(" + sc + ")";
          im.style.backgroundPosition = "0 "+ (y) +"px"
          im.style.backgroundRepeat = "no-repeat";
          im.style.backgroundSize = "cover";
          if (side == 1) {
            e.classList.add("left")
          }else{
            e.classList.add("right")
          }
          return e;
        },
        btns: function(p, s, ty, t, f, ty2, t2, f2) {
          let cont = ui.div(p)
          cont.classList.add("btns")

          let e = ui[ty](t, cont, s, f);
          e.classList.add("left");

          let e2 = ui[ty2](t2, cont, s, f2);
          e2.classList.add("right")
          return cont;
        },
        sli: function(t, p, s, v) {
          let cont = ui.div(p)
          let e = ui.e("input", cont);
          let txt = ui.txt(t, cont, s);
          addToScreen(e, s)
          cont.classList.add("scont")
          e.classList.add("sli");
          e.type = "range";
          e.min = v[0];
          e.max = v[1];
          e.value = v[2];
          return cont;
        },
      }

      let cs = 0
      let ls = 0
      let db = document.getElementById("ui")
      let sui = ui.div(db)
      sui.classList.add("sui")
      sui.id = "sui"

      function setSlider(sli, a, t, v) {
        sli.addEventListener("input", function() {
          gs[v] = sli.value;
          sli.parentNode.querySelector(".txt").innerHTML = a + sli.value + t;
        })
      }

      function updateScreens() {
        s.forEach(function(sc, i) {
          if (i == cs) {
            sc.forEach(function(e) {
              e.style.display = "block";
            })
          } else {
            sc.forEach(function(e) {
              e.style.display = "none";
            })
          }
        })
        if (cs == 0) {
          sui.style.height = "calc(50vh + 200px)"
        } else {
          sui.style.height = "calc(100vh + 50px)"
        }
      }

      function addToScreen(e, sn) {
        s[sn].push(e);
      }

      function setScreen(sn) {
        ls = cs
        if (sn!=null) {
          cs = sn;
          updateScreens();
        }else{
          cs = -1;
          updateScreens();
        }
      }

      function backScreen() {
        setScreen(ls)
      }

      function disable(e) {
        e.classList.add("dis");
        e.onclick = null;
      }

      function n() {}

      let s = [
        [], // title
        [], // multiplayer
        [], // options
        [], // gameOptions
        [], // controls
      ]