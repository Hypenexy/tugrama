function weeksSinceStart(startDate){
    var now = moment();
    var start = moment(startDate);

    if (!start.isValid()) {
        console.error('weeksSinceStart: invalid startDate ->', startDate);
    }

    var diff = moment.duration(now.diff(start));
    return Math.floor(diff.asWeeks());
}

function daysInMonth(month){
    // moment("2012-02", "YYYY-MM").daysInMonth() // 29
    return moment(month).daysInMonth();
}

function datesInWeek(week){
    var currentDate = moment();

    var weekStart = currentDate.clone().startOf('isoWeek');
    var weekEnd = currentDate.clone().endOf('isoWeek');

    var days = [];

    for (var i = 0; i <= 6; i++) {
        days.push(moment(weekStart).add(i, 'days').format("MMMM Do,dddd"));
    }
    
    return days;
}

function NumberToDayLocale(N){
    var dayName = locales.monday;
    if(N == 2){
        dayName = locales.tuesday;
    }
    if(N == 3){
        dayName = locales.wednesday;
    }
    if(N == 4){
        dayName = locales.thursday;
    }
    if(N == 5){
        dayName = locales.friday;
    }
    if(N == 6){
        dayName = locales.saturday;
    }
    if(N == 7){
        dayName = locales.sunday;
    }
    return dayName;
}

function getBoundingClientRect(element) {
    let test_element = element.cloneNode(true);
    test_element.style.visibility = "hidden";
    test_element.style.position = "absolute";
    document.body.appendChild(test_element);
    var sizes = test_element.getBoundingClientRect();
    test_element.remove();
    return sizes;
}
