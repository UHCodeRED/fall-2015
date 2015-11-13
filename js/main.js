jQuery(function($) {
    $(document).ready(function() {
        $('.navbar-inverse').stickUp();
        particleground(document.getElementById("home"), {
            directionX: 'left',
            directionY: 'down',
            proximity: 100,
            dotColor: "#eee",
            lineColor: "#999",
            particleRadius: 4,
            density: 20000,
            parallaxMultiplier: 20,
            maxSpeedX: 0,
            maxSpeedY: 0
        });
    });

    $(".nav li a").click(function(e) {
        var id = $(this).attr('href');
        if ($(id).length === 0) return;
        e.preventDefault();p
        $('body, html').animate({
            scrollTop: (id == "#home") ? 0 : ($(id).offset().top - 60)
        });
        collapsemenu();
    });

    $(window).resize(function(){
        equalizeHeight();
        $("#planet").height($("#planet").width());
        var height = "innerHeight" in window 
               ? window.innerHeight
               : document.documentElement.offsetHeight; 
        $(".planet_wrapper").css("bottom", -((height/2) + ($(".planet_wrapper").height()/2)))
    });

    $(window).load(function() { 
        $(".fitwidth").textStretch();
        $(window).resize();
        $("body").css("opacity", "1");
    });

    function equalizeHeight(){
        $("[children-same-height]").each(function(){
            var parentRow = $(this),
                childrenCols = $(this).children();
            childrenCols.css("min-height", '');
            var childHeights = childrenCols.map(function(){
                return $(this).outerHeight();
            });
            var tallestChild = Math.max.apply(Math, childHeights);
            childrenCols.css('min-height', tallestChild);
        });
    }

    function toggleModal(){
        return ($(".applyModal").hasClass("fadeIn")) ? 
            $(".applyModal").removeClass("fadeIn") : 
            $(".applyModal").addClass("fadeIn");
    }

    $("#apply").click(function(){
        toggleModal();
    });

    $("#close").click(function(){
        toggleModal();
    });
});
