function weeksSinceStart(startDate){
    var now = moment();
    var start = moment(startDate);

    if (!start.isValid()) {
        console.error('weeksSinceStart: invalid startDate ->', startDate);
    }

    var diff = moment.duration(now.diff(start));
    return Math.floor(diff.asWeeks() + 1); // Start counting from 1
}

/**
 * If all disciplines have ended for the week, display the next one
 */
function getRelevantWeek(programa, messageVariant){
    var startDate = programa.meta.Count_startDate,
        lastActiveDay = 1,
        keys = Object.keys(programa);

    for (let i = 0; i < keys.length; i++) {
        const element = keys[i];

        if(parseInt(element) > 0){
            lastActiveDay = parseInt(element);
        }
    }

    var weeks = weeksSinceStart(startDate);
    
    
    var currentDate = moment();
    var currentDay = currentDate.isoWeekday();

    if(lastActiveDay < currentDay){
        weeks++;
        if(messageVariant){
            return `Next week <span>${weeks}</span>`;
        }
    }
    
    if(messageVariant){
        return `Current week <span>${weeks}</span>`;
    }
    return weeks;
}

function daysInMonth(month){
    // moment("2012-02", "YYYY-MM").daysInMonth() // 29
    return moment(month).daysInMonth();
}

function datesInWeek(week, startDate){
    var currentDate = moment(startDate || undefined);
    var weekStart = currentDate.clone().startOf('isoWeek').add(week - 1, 'weeks');

    var days = [];

    for (var i = 0; i <= 6; i++) {
        days.push(weekStart.clone().add(i, 'days').format("MMMM Do,dddd"));
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

function rangeTranslate(n, x, y){
    var OldRange = (x[1] - x[0]);
    var NewRange = (y[1] - y[0]);
    return (((n - x[0]) * NewRange) / OldRange) + y[0];
}

const preferences = {
    group: 2
}; 
function saveSettings(){
    try {
        localStorage.setItem('settings', JSON.stringify(preferences));
    } catch (error) {
        console.error('Unable to save settings:', error);
    }
}
function getSettings(){
    try {
        var settings = localStorage.getItem('settings');
        if (settings) {
            Object.assign(preferences, JSON.parse(settings));
        }
    } catch (error) {
        console.error('Unable to load settings:', error);
    }
    updateSelectedGroup();
    loadWeek(preferences.group, relevantWeek);
    return preferences;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', getSettings);
} else {
    getSettings();
}