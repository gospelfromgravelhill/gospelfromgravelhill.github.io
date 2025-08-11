// A $( document ).ready() block.
$( document ).ready(function() {

	// DropCap.js
	var dropcaps = document.querySelectorAll(".dropcap");
	window.Dropcap.layout(dropcaps, 2);

// Create the mobile toggle without a text label
var nav = responsiveNav(".nav-collapse", { label: "" });

// Replace the auto-created toggle's content with the Bootstrap "list" icon
var toggle = document.querySelector(".nav-toggle");
if (toggle) {
  toggle.setAttribute("aria-label", "Open navigation");
  toggle.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true" focusable="false">' +
      '<path fill-rule="evenodd" d="M2.5 12.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm0-4a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm0-4a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11z"/>' +
    "</svg>";
}

	// Round Reading Time
    $(".time").text(function (index, value) {
      return Math.round(parseFloat(value));
    });

});


