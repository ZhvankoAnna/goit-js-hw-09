!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),d=null;t.addEventListener("click",(function(a){t.setAttribute("disabled","disabled"),e.removeAttribute("disabled"),d=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),e.addEventListener("click",(function(a){e.setAttribute("disabled","disabled"),t.removeAttribute("disabled"),clearInterval(d)}))}();
//# sourceMappingURL=01-color-switcher.fbaff718.js.map