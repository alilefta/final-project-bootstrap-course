import "../node_modules/jquery/dist/jquery.slim.min.js";
import "../node_modules/popper.js/dist/umd/popper.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
$("document").ready(function () {
	$(".our--work .card").hover(
		function (e) {
			$(this.querySelector(".card-img-top")).addClass("hover"); // $(this).addClass("hover");

			$(this.querySelector(".hovered--text")).addClass("show");
		},
		function () {
			$(this.querySelector(".card-img-top")).removeClass("hover");
			$(this.querySelector(".hovered--text")).removeClass("show");
		}
	);
}); // document.addEventListener("DOMContentLoaded", function () {
// 	document
// 		.querySelector(".our--work .card")
// 		.addEventListener("mouseenter", function (e) {
// 			console.log(e.target);
// 			e.target.querySelector(".card-img-top").classList.add("hover");
// 		});
// });

//# sourceMappingURL=app.js.map
