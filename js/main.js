particlesJS('particles', {
    particles: {
        color: '#fff',
        color_random: false,
        shape: 'circle', // "circle", "edge" or "triangle"
        opacity: {
            opacity: 1,
            anim: {
                enable: true,
                speed: 1.5,
                opacity_min: 0.25,
                sync: false
            }
        },
        size: 2.5,
        size_random: true,
        nb: $(window).width() / 30,
        line_linked: {
            enable_auto: true,
            distance: 50,
            color: '#aaa',
            opacity: 1,
            width: 2,
            condensed_mode: {
                enable: false,
                rotateX: 600,
                rotateY: 600
            }
        },
        anim: {
            enable: true,
            speed: 1
        }
    },
    interactivity: {
        enable: true,
        mouse: {
            distance: 250
        },
        detect_on: 'canvas', // "canvas" or "window"
        mode: 'grab', // "grab" of false
        line_linked: {
            opacity: .5
        },
        events: {
            onclick: {
                enable: false,
                mode: 'push', // "push" or "remove"
                nb: 4
            },
            onresize: {
                enable: true,
                mode: 'out', // "out" or "bounce"
                density_auto: false,
                density_area: 800
            }
        }
    },
    /* Retina Display Support */
    retina_detect: true
});

jQuery(function($) {
	$(document).ready( function() {
		$('.navbar-inverse').stickUp();
	});

	$(".nav li a").click(function(e){
		var id = $(this).attr('href');
	    if ($(id).length === 0) return;
	    e.preventDefault();    
	    $('body, html').animate({scrollTop: (id == "#home") ? 0 : ($(id).offset().top - 60)});
	    collapsemenu();
	});

    $(window).load(function() {
        $(".fitwidth").textStretch();
    });
});