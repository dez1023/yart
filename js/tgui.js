let a = "https://dez1023.github.io/yart/"

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
    e.src = a + sc;
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
  sbtns: function(p, t, s, f, t2, s2, f2) {
    let cont = ui.div(p)
    cont.classList.add("btns")

    let e = ui.btn("", cont, s, f);
    let txt = ui.txt(t, e, s);
    e.classList.add("sbtn");

    let e2 = ui.btn("", cont, s2, f2);
    let txt2 = ui.txt(t2, e2, s2);
    e2.classList.add("sbtn2")
    return cont;
  },
  mbtns: function(p, t, s, f, t2, s2, f2) {
    let cont = ui.div(p)
    cont.classList.add("btns")

    let e = ui.btn("", cont, s, f);
    let txt = ui.txt(t, e, s);
    e.classList.add("mbtn");

    let e2 = ui.btn("", cont, s2, f2);
    let txt2 = ui.txt(t2, e2, s2);
    e2.classList.add("mbtn2")
    return cont;
  },
  slider: function(t, p, s, f) {
    let cont = ui.div(p)
    let e = ui.e("input",cont);
    let txt = ui.txt(t, cont, s);
    e.classList.add("slider");
    return e;
  },
}

let cs = 0
let db = document.getElementById("ui")
let sui = ui.div(db)
sui.classList.add("sui")
sui.id = "sui"

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
}

function addToScreen(e, sn) {
  s[sn].push(e);
}

function setScreen(sn) {
  cs = sn;
  updateScreens();
}

function disable(e) {
  e.classList.add("dis");
  e.onclick = null;
}

function n() { }

let s = [
  [], // title
  [], // worlds
  [], // multiplayer
  [], // options
]