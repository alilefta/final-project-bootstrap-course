// import "../node_modules/jquery/dist/jquery.slim.min.js";
// import "../node_modules/popper.js/dist/umd/popper.min.js";
// import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
$("document").ready(function () {
	$(".our--work .card").hover(
		function () {
			$(this.querySelector(".card-img-top")).addClass("hover"); // $(this).addClass("hover");

			$(this.querySelector(".hovered--text")).addClass("show");
		},
		function () {
			$(this.querySelector(".card-img-top")).removeClass("hover");
			$(this.querySelector(".hovered--text")).removeClass("show");
		}
	);
});
