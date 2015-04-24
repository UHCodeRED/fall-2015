jQuery(function($) {
    $(document).ready(function() {
        $('.navbar-inverse').stickUp();
        particleground(document.getElementById("home"), {
            directionX: 'left',
            directionY: 'down',
            proximity: 100,
            dotColor: "#aaa",
            lineColor: "#999",
            particleRadius: 4,
            density: 25000,
            parallaxMultiplier: 20,
            maxSpeedX: 1,
            maxSpeedY: 1
        });
    });

    $(".nav li a").click(function(e) {
        var id = $(this).attr('href');
        if ($(id).length === 0) return;
        e.preventDefault();
        $('body, html').animate({
            scrollTop: (id == "#home") ? 0 : ($(id).offset().top - 60)
        });
        collapsemenu();
    });

    $(window).load(function() {
        textStretch(document.getElementsByClassName("fitwidth"));
        $("body").css("opacity", "1");
    });
});
