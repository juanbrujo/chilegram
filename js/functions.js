/* Author: Jorge Epuñan | hola@andalaosa.cl */

$(function(){
	
	//loading all sound files when document is ready
	var hover = new buzz.sound( "PATH-TO/audio/hover", {
        formats: ["mp3"]
    });
	var abre = new buzz.sound( "PATH-TO/audio/abre", {
        formats: ["mp3"]
    });
	var ok = new buzz.sound( "PATH-TO/audio/ok", {
        formats: ["mp3"]
    });
    jQuery('#instafeed a img').live('mouseenter', function(){
        hover.play();
    });
	jQuery('#main').mouseenter(function(){
        abre.play();
    });
	
	function revolver(){
		var play = 0;
		$("#instafeed a").shuffleElements().each(function (i) {
		    $(this).attr("style", "-webkit-animation-delay:" + i * 200 + "ms;"
		            + "-moz-animation-delay:" + i * 200 + "ms;"
		            + "-o-animation-delay:" + i * 200 + "ms;"
		            + "animation-delay:" + i * 200 + "ms;");
		    play++;
		    if (play == $("#instafeed a").size()) {
		        $("#instafeed").addClass("play")
		    }
		});
	}
	
	var feed = new Instafeed({
	    get: 'tagged',
	    tagName: 'chile',
	    clientId: 'YOUR-INSTAGRAM-ID',
		limit: 50,
		before: function(){
			$('aside').addClass('loading');
			$('h1').removeClass('on');
		},
		success: function(){
			$('#instafeed').removeClass('play').empty();
		},
		complete: function(){
			$('#instafeed a').each(function(){
				$url = $(this).attr('href');
				$(this).attr('target','_blank').append('<span class="lsf">link</span>')
			});
			revolver();
			$('h1').text('#chile').addClass('on');
			$('aside').removeClass('loading');
			$('#main').addClass('escondido');
		}
	});
	feed.run();
	var intGram = setInterval(function(){feed.run();},30000);
	
	$('#main select').change(function(){
		$ciudad = $(this).val();
		$ciudadLimpia = $(this).val().replace(/ /g,'').replace(/[ÀÁÂÃÄÅÆàáâãäåæ]/gi,'a').replace(/[ÈÉÊËèéêë]/gi,'e').replace(/[ÌÍÎÏìíîï]/gi,'i').replace(/[ÒÓÔÕÖòóôõö]/gi,'o').replace(/[ÙÚÛÜùúûü]/gi,'u').replace(/[Ññ]/gi,'n').toLowerCase();
		clearInterval(intGram);
		
		var feed = new Instafeed({
		    get: 'tagged',
		    tagName: $ciudadLimpia,
		    clientId: 'YOUR-INSTAGRAM-ID',
			limit: 50,
			before: function(){
				$('aside').addClass('loading');
				$('h1').removeClass('on');
			},
			success: function(){
				$('#instafeed').removeClass('play').empty();
				ok.play();
			},
			complete: function(){
				$('#instafeed a').each(function(){
					$url = $(this).attr('href');
					$(this).attr('target','_blank').append('<span class="lsf">link</span>')
				});
				revolver();
				$('h1').text('#'+$ciudadLimpia).addClass('on');
				$('aside').removeClass('loading');
				$('#main').addClass('escondido');
			}
		});
		feed.run();
		intGram = setInterval(function(){feed.run();},30000);

	});
	
});

jQuery.fn.shuffleElements = function () {
    var o = $(this);
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};