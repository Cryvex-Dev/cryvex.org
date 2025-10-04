const konami = [38,38,40,40,37,39,37,39,66,65];
let input = [];
window.addEventListener('keydown', e => {
  input.push(e.keyCode);
  if (input.toString().includes(konami.toString())) {
    alert("🐣 You found the Cryvex Easter Egg!");
    input = [];
  }
});
