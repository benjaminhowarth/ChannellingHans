var timer;

function play() {

    clearInterval(timer);

    timer = setInterval(function() {
        // Iterate through avilable years, since years may have interval, for example, 1900, 1910, 1920, 1950, 1951, 1952...
        // setInterval return an interval ID which can be passed to clearInterval                    
        // before update, set slider value first. !!!!!
        // otherwise, the slider will go ahead and the slider onclick event makes no sense.!!! important!!!
        var slider = d3.select("#year_slider")
//        display_year = +slider.property("value") + 1;
        if (!year_list.includes("" + display_year)) {
            if (display_year <= max_year) {
                var years_more_than_this = year_list.filter(function(year) {
                    return display_year < +year;
                })
				if (years_more_than_this.length != 0){
					display_year = years_more_than_this[0];
				}else{display_year = min_year};
				
				} 
        }

		d3.select("#year_slider2").property("value", display_year);
		generateVis();
//        slider.property("value", display_year);
		
//		current_value = d3.select("slider_div").property("value") -1;
//        generateVis();
		
    }, 4000);
}

function pause() {
    clearInterval(timer);
}

function play_btn() {
    var play_btn = d3.select('#play_btn')
    if (play_btn.attr('value') == 'Start') {

        play_btn.attr('value', 'Pause')
        play_status = true
        play()

    } else {

        play_btn.attr('value', 'Start')
        play_status = false
        pause()
    }
    // console.log(play_status)
}

