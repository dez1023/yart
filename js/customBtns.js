function sliVals(sli) {
  return sli.parentNode.querySelector(".txt")
}

uiFOVsli.querySelector(".sli").addEventListener("input", function() {
  let sli = uiFOVsli.querySelector(".sli");
  let tx = sliVals(sli)
  if (sli.value == 70) {
    tx.innerHTML = "FOV: Normal"
  }else{
    if (sli.value == 110) {
      tx.innerHTML = "FOV: Quake Pro"
    }
  }
})