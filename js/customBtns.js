function sliVals(sli) {
  return sli.parentNode.querySelector(".txt")
}

st.querySelector(".sli").addEventListener("input", function() {
  let sli = st.querySelector(".sli");
  let tx = sliVals(sli)
  if (sli.value == 70) {
    tx.innerHTML = "FOV: Normal"
  }else{
    if (sli.value == 110) {
      tx.innerHTML = "FOV: Quake Pro"
    }
  }
})