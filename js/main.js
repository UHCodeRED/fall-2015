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

    $(window).resize(function(){
        // duplicate();
        equalizeHeight();
    });

    $(window).load(function() {
        textStretch(document.getElementsByClassName("fitwidth"));
        $(window).resize();
        $("body").css("opacity", "1");
    });

    // function duplicate() {
    //     $("[clone]").each(function(){
    //         var original = $("#" + $(this).attr("clone")).clone();
    //         var classes = $(this).attr('class').split(/s+/);
    //         //Copy any additional classes set in placeholder to clone
    //         for (i = 0; i < classes.length; i++) original.addClass(classes[i]);
    //         $(this).replaceWith(original);
    //     });
    // }

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
});
