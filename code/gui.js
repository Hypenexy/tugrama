const app = document.createElement("div");
app.classList = "app";
document.body.appendChild(app);

const calendarElement = document.createElement("div");
calendarElement.classList = "calendar";
app.appendChild(calendarElement);

const daysContainer = document.createElement("div");
daysContainer.classList = "days";
calendarElement.appendChild(daysContainer);

function loadMonth(){
    daysContainer = 3;
}

const weekDuration = 7;
function loadWeek(){
    daysContainer.innerHTML = "";

    var weekStart = moment().clone().startOf('isoWeek');
    var weekDates = datesInWeek();

    var weekNumber = weeksSinceStart(programa.meta.Count_startDate)
    
    var timeElement = times();
    daysContainer.appendChild(timeElement);

    for (let i = 0; i < weekDuration; i++) {
        var dayElement = loadDay(weekDates[i], i, weekNumber);
        daysContainer.appendChild(dayElement);
    }


}

function times(){
    const timeElement = document.createElement("div");
    timeElement.classList = "day times";
    
    const headerSpace = document.createElement("div");
    headerSpace.classList = "display";
    timeElement.appendChild(headerSpace);
    
    const classesElement = document.createElement("div");
    classesElement.classList = "classes";
    timeElement.appendChild(classesElement);

    for (let i = 0; i < programa.meta.times.length; i++) {
        const time = programa.meta.times[i];
        
        const element = document.createElement("div");
        element.textContent = time;
        classesElement.appendChild(element);
    }

    return timeElement;
}

function loadDay(fulldate, NumberOfDay, weekNumber){
    NumberOfDay += 1;
    const dayElement = document.createElement("div");
    dayElement.classList = "day";

    var dateAndDayOfTheWeek = fulldate.split(" ")[1];
    var date = dateAndDayOfTheWeek.split(",")[0];
    var dayOfTheWeek = dateAndDayOfTheWeek.split(",")[1];

    var dayDisplay = loadDayDisplay(date, NumberOfDay);
    dayElement.appendChild(dayDisplay);

    const classesElement = document.createElement("div");
    classesElement.classList = "classes";
    dayElement.appendChild(classesElement);
    
    var classes = Object.keys(programa[NumberOfDay]);

    for (let i = 0; i < classes.length; i++) {
        const course = classes[i];
        const courseElement = createCourseElement(course, programa[NumberOfDay][course], weekNumber);
        if(typeof courseElement === "object"){
            classesElement.appendChild(courseElement);
        }
    }

    return dayElement;
}

function loadDayDisplay(date, NumberOfDay){
    const element = document.createElement("div");
    element.classList = "display";
    
    const firstCharacter = document.createElement("span");
    firstCharacter.classList = "firstCharacter";
    firstCharacter.textContent = NumberToDayLocale(NumberOfDay)[0];
    element.appendChild(firstCharacter);

    const nameOfDay = document.createElement("span");
    nameOfDay.classList = "nameOfDay";
    nameOfDay.textContent = NumberToDayLocale(NumberOfDay).substring(1);
    element.appendChild(nameOfDay);

    var nameOfDaySize = getBoundingClientRect(nameOfDay);
    nameOfDay.style.setProperty("--width", nameOfDaySize.width + "px");




    const numberInMonth = document.createElement("span");
    numberInMonth.classList = "date";
    numberInMonth.textContent = date.replace(/\D/g, "");
    element.appendChild(numberInMonth);

    numberInMonth.style.setProperty("--width", nameOfDaySize.width + "px");
    numberInMonth.style.setProperty("--height", nameOfDaySize.height+8 + "px");


    return element;
}

function createCourseElement(course, data, weekNumber){
    const element = document.createElement("div");
    element.classList = "class";

    console.log(weekNumber)
    // if(data.weeks == "all"){} else
    if(data.weeks.includes("-")){
        var weeks = data.weeks.split("-");
        if( // Proverqvame dali imame toq predmet taq sedmica (weekNumber)
            weekNumber >= weeks[0] &&
            weekNumber <= weeks[1]
        ){}
        else{
            return;
        }
    }
    else if(typeof data.weeks === "object"){

    }

    var hour = data.hours.split("-");
    element.style.setProperty("--size", `${hour[0]} / 1 / ${hour[1]*1 + 1} / 2`);
    

    var title = document.createElement("p");
    title.classList = "title";
    title.textContent = course;
    element.appendChild(title);


    return element;
}

loadWeek()