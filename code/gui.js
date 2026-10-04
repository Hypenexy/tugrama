const app = document.createElement("div");
app.classList = "app";
document.body.appendChild(app);

function select(attachedElement, options){
    const element = document.createElement("div")
    element.classList = "select";

    var getPosition = attachedElement.getBoundingClientRect();

    element.style.left = getPosition.left + "px";
    element.style.top = getPosition.bottom + "px";
    element.style.width = getPosition.width + "px";

    for (let i = 0; i < options.length; i++) {
        const subElement = document.createElement("span");
        const option = options[i];
        var Value = option[0],
            Action = option[1],
            Placeholder = option[2];
        subElement.textContent = Placeholder;
        element.appendChild(subElement);
    }

    function onOutsideClick(e) {
        if (!element.contains(e.target) && !attachedElement.contains(e.target)) {
            closeSelect();
        }
    }

    function openSelect() {
        if (element.classList.contains("active")) return; // Prevent duplicate appends

        (document.getElementById("app") || document.body).appendChild(element);
        
        element.classList.remove("closing");
        element.classList.add("active");

        // Listen for clicks outside
        setTimeout(() => {
            document.addEventListener("click", onOutsideClick);
        }, 0);
    }

    function closeSelect() {
        if (!element.classList.contains("active") || element.classList.contains("closing")) return;

        document.removeEventListener("click", onOutsideClick);
        element.classList.add("closing");

        element.addEventListener("animationend", () => {
            element.remove();
            element.classList.remove("active", "closing");
        }, { once: true });
    }

    attachedElement.addEventListener("click", (e) => {
        e.stopPropagation();
        if (element.classList.contains("active")) {
            closeSelect();
        } else {
            openSelect();
        }
    });


    attachedElement.addEventListener("click", openSelect);
}

const header = document.createElement("div");
header.classList = "header";
app.appendChild(header);

const weekSelector = document.createElement("div");
weekSelector.classList = "filter";
weekSelector.innerHTML = getRelevantWeek(programa, true)
header.appendChild(weekSelector);

const groupSelector = document.createElement("div");
groupSelector.classList = "filter";
groupSelector.innerHTML = "Group <span>41b</span>"

header.appendChild(groupSelector);

var options = [];
options.push([0, ()=>{}, "All"]);
for (let i = 0; i < programa.groups.length; i++) {
    const element = programa.groups[i];
    options.push([i+1, ()=>{}, element]);
}

select(groupSelector, options);


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
function loadWeek(group){
    daysContainer.innerHTML = "";

    var weekStart = moment().clone().startOf('isoWeek');

    var weekNumber = getRelevantWeek(programa);
    var weekDates = datesInWeek(weekNumber, programa.meta.Count_startDate);
    
    var timeElement = times();
    daysContainer.appendChild(timeElement);

    for (let i = 0; i < weekDuration; i++) {
        var dayElement = loadDay(weekDates[i], i, weekNumber, group);
        daysContainer.appendChild(dayElement);
    }

    const gridElement = document.createElement("div");
    gridElement.classList = "grid";
    daysContainer.appendChild(gridElement);
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

    const currentTime = document.createElement("div");
    currentTime.classList = "currentTime";
    

    var currentTimeDisplay = document.createElement("div");
    currentTimeDisplay.classList = "currentTimeDisplay";
    currentTime.appendChild(currentTimeDisplay);

    var currentTimeLine = document.createElement("div");
    currentTimeLine.classList = "currentTimeLine";
    currentTime.appendChild(currentTimeLine);

    var startMinutes = programa.meta.times[0].split(".");
    startMinutes = startMinutes[0]*60 + startMinutes[1]*1;
    var endMinutes = programa.meta.times[programa.meta.times.length - 1].split(".");
    endMinutes = endMinutes[0]*60 + endMinutes[1]*1;
    
    function updateCurrentTime(){
        var date = new Date;
        var minutes = date.getMinutes();
        var hour = date.getHours();
        
        currentTime.style.setProperty("--time", `${hour*60 + minutes}`);
        currentTimeDisplay.textContent = `${hour}:${minutes < 10 ? '0' + minutes : minutes}`;

        var minutesNow = hour*60 + minutes;

        var positionPercent = rangeTranslate(minutesNow, [startMinutes, endMinutes], [0, 100]);
        timeElement.style.setProperty("--currentTimePosition", `${positionPercent}%`);
    }

    updateCurrentTime();
    setInterval(updateCurrentTime, 60000);

    classesElement.appendChild(currentTime);

    return timeElement;
}

function loadDay(fulldate, NumberOfDay, weekNumber, group){
    NumberOfDay += 1;
    const dayElement = document.createElement("div");
    dayElement.classList = "day";

    var dateAndDayOfTheWeek = fulldate.split(" ")[1];
    var date = dateAndDayOfTheWeek.split(",")[0];
    var dayOfTheWeek = dateAndDayOfTheWeek.split(",")[1];

    var dateNow = new Date;
    if(dateNow.getDate() == date.replace(/\D/g, "")){
        dayElement.classList.add("active");
    }

    var dayDisplay = loadDayDisplay(date, NumberOfDay);
    dayElement.appendChild(dayDisplay);

    const classesElement = document.createElement("div");
    classesElement.classList = "classes";
    dayElement.appendChild(classesElement);
    
    if(programa[NumberOfDay]){
        var classes = Object.keys(programa[NumberOfDay]);
    
        for (let i = 0; i < classes.length; i++) {
            const course = classes[i];
            for (let i = 0; i < programa[NumberOfDay][course].length; i++) {
                const courseData = programa[NumberOfDay][course][i];
        
                const courseElement = createCourseElement(course, courseData, weekNumber, group);
                if(typeof courseElement === "object"){
                    classesElement.appendChild(courseElement);
                }
            }
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

function createCourseElement(course, data, weekNumber, group){
    const element = document.createElement("div");
    element.classList = "class";

    if(data.groups != "all"){
        if(typeof data.groups == "object"){
            if(!data.groups.includes(group)){
                return;
            }
        }
        if(typeof data.groups == "number"){
            if(group != data.groups){
                return;
            }
        }
    }
    // if(data)

    // if(data.weeks == "all"){} else
    if(data.weeks){
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
    }

    var hour = data.hours.split("-");
    element.style.setProperty("--size", `${hour[0]} / 1 / ${hour[1]*1 + 1} / 2`);
    

    var title = document.createElement("p");
    title.classList = "title";
    title.textContent = programa.classes[course].name;
    element.appendChild(title);

    var subtitle = document.createElement("p");
    subtitle.classList = "subtitle";

    var type = locales[programa.types[programa.classes[course].type]];

    subtitle.textContent = `${type} ${programa.classes[course].room}`;

    element.appendChild(subtitle);

    element.addEventListener("click", () => {
        openCourse(course)
    });

    return element;
}

function createXBtn(){
    const element = document.createElement('span');
    element.innerText = "close";
    element.classList = "material-symbols-outlined x"
    return element;
}

function openCourse(course){
    const element = document.createElement("div");
    element.classList = "CourseSideView";

    function closeCourse(){
        element.classList.add("closing");
        element.addEventListener("animationend", () => {
            element.remove();
        });
    }

    const xBtn = createXBtn();
    xBtn.addEventListener("click", closeCourse);
    element.appendChild(xBtn);

    const room = programa.classes[course].room;
    
    console.log(room)
    // element.innerText = room;

    calendarElement.appendChild(element);
}

loadWeek(1)