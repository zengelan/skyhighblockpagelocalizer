// skyhighblockpagelocalizer


function helloWorld() {
  console.info("Hello World");
}

function localize(inObj) {
  console.debug("starting localize");
  console.debug(inObj);
  console.debug("done with localize");
}
  
// attach the event handler
window.onload = (event) => {
  console.debug('page is fully loaded');
  localize();
};
