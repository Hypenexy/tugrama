function clampMenuToViewport(element){
    const bounds = element.getBoundingClientRect();
    const left = Math.max(0, Math.min(bounds.left, window.innerWidth - bounds.width));
    const top = Math.max(0, Math.min(bounds.top, window.innerHeight - bounds.height));
    return {
        left: left + window.scrollX,
        top: top + window.scrollY
    };
}

function levenshteinDistance(first, second){
    if(first.length > second.length){
        [first, second] = [second, first];
    }

    let previousRow = Array.from({length: first.length + 1}, (_, index) => index);
    for(let row = 1; row <= second.length; row++){
        const currentRow = [row];
        for(let column = 1; column <= first.length; column++){
            currentRow[column] = Math.min(
                currentRow[column - 1] + 1,
                previousRow[column] + 1,
                previousRow[column - 1] + (first[column - 1] === second[row - 1] ? 0 : 1)
            );
        }
        previousRow = currentRow;
    }
    return previousRow[first.length];
}

/**
 * Creates a contextMenu to attach to specific element
 * @param {*} type not used 
 * @returns An object with functions and properties.
 */
function contextMenu(type){
    const contextMenu = {};
    const menuRoot = document.querySelector(".app") || document.body;
    contextMenu.node = document.createElement("div");
    contextMenu.node.classList.add("contextMenu", "hide");
    contextMenu.type = type;
    contextMenu.submenus = [];
    contextMenu.selectedConditions = [];
    contextMenu.escapeHandler = (event) => {
        if(event.key == "Escape" && !contextMenu.node.classList.contains("hide")){
            contextMenu.removeElement();
        }
    };

    const dragElement = document.createElement("div");
    dragElement.classList.add("drag");
    contextMenu.node.appendChild(dragElement);
    dragElement.addEventListener("click", function(e){
        e.stopPropagation();
    });
    // draggableElement(contextMenu.node, dragElement);

    function hideSubmenu(submenu){
        submenu.classList.remove("visible");
    }

    /**
     * Add elements to the context menu.
     * @param {String} type Type of element, either Text, Line, Button, Input, Extra
     * @param {String} text Display text of the element
     * @param {JSON} options Option of element, either {disabled: Boolean, action: Function, actionEvent: Boolean, icon: String, input: Function, selected: Boolean, selectedReason: Function}
     */
    contextMenu.add = (type, text, options) => {
        const element = document.createElement("div");
        if(options){
            if(typeof options.action == "function" && options.disabled != true){
                element.addEventListener("click", ()=>{
                    options.action();
                    if(options.disableAutoClosing == true){
                        return;
                    }
                    contextMenu.removeElement();
                });
            }
            if(options.disabled == true){
                element.classList.add("disabled");
            }
            if(options.icon){
                text = '<i>'+options.icon+'</i>' + text;
                element.classList.add("i");
            }
            if(options.selected == true){
                element.classList.add("selected");
            }
            if(typeof options.selectedReason == "function"){
                contextMenu.selectedConditions.push(() => {
                    if(options.selectedReason()){
                        element.classList.add("selected");
                    }
                    else{
                        element.classList.remove("selected");
                    }
                });
            }
            if(options.tooltip){
                element.title = options.tooltip;
            }
        }
        switch (type) {
            case "text":
                element.classList.add("text");
                break;
            case "button":
                element.classList.add("btn");
                break;
            case "line":
                element.classList.add("hr");
                if(typeof text == "string"){
                    element.innerHTML = `<span>${text}</span>`;
                }
                break;
            case "extra":
                element.classList.add("extra", "btn");
                text += '<i>chevron_right</i>';
                element.classList.add("i");
                break;
            default:
                break;
            }
        if(typeof text == "string" && type != "line"){
            element.innerHTML = text;
        }
        if(options && typeof options.submenu == "object"){
            options.submenu.appendChild(element);
        }
        else{
            contextMenu.node.appendChild(element);
        }
        if(type == "extra"){
            const subMenu = document.createElement("div");
            subMenu.classList.add("contextMenu", "submenu");
            function showSubmenu(){
                var getPosition = element.getBoundingClientRect();
                subMenu.style.left = getPosition.right + "px";
                subMenu.style.top = getPosition.top + "px";
                subMenu.classList.add("visible");
            }
            function mouseOut(event){ // I need to figure a way for when user TABs after the last child element.
                if(event.type == "focusout" && event.relatedTarget != element.previousElementSibling){
                    event.preventDefault();
                    subMenu.children[0].focus();
                    return;
                }
                if(event.toElement != subMenu && event.toElement != element){
                    hideSubmenu(subMenu);
                }
            }
            element.addEventListener("mouseenter", showSubmenu);
            element.addEventListener("focusin", showSubmenu);
            element.addEventListener("focusout", mouseOut);
            element.addEventListener("mouseleave", mouseOut);
            subMenu.addEventListener("mouseleave", mouseOut);
            menuRoot.appendChild(subMenu);
            contextMenu.submenus.push(subMenu);
            return subMenu;
        }
        if(type == "input"){
            element.innerHTML = "";
            const input = document.createElement("input");
            element.appendChild(input);
            input.value = text;
            input.addEventListener("click", function(e){
                e.stopPropagation();
            });
            if(options){
                if(options.action && typeof options.action == "function"){
                    input.addEventListener("change", options.action);
                }
                if(options.input && typeof options.input == "function"){
                    input.addEventListener("input", options.input);
                }
            }
        }
        return element;
    }

    /**
     * Attach to specific element to contain context menu.
     * @param {HTMLElement} element An html element that
     * if context clicked will spawn the menu
     */
    contextMenu.attach = (element, toElement, leftClick) => {
        if(toElement){
            element.addEventListener("contextmenu", (event) => {contextMenu.append(event, toElement)});
            if(leftClick){
                element.addEventListener("click", (event) => {contextMenu.append(event, toElement)});
            }
        }
        else{
            if(element){
                element.addEventListener("contextmenu", contextMenu.append);
            }
        }
        document.addEventListener("click", contextMenu.remove);
    }

    /**
     * Display the created context menu.
     * @param {Object} Event If event info is specificed:
     * @param {HTMLElement} toElement If an element is specified:
     * the context menu will position (appear) under it.
     * It is REQUIRED that at least one of the arguments is present.
     */
    contextMenu.append = (event, toElement) => {
        if(typeof contextMenu.preventRun == "function"){
            if(contextMenu.preventRun(event) == true)
                return;
        }
        for (let i = 0; i < contextMenu.selectedConditions.length; i++) {
            const element = contextMenu.selectedConditions[i];
            element();   
        }

        const allContextMenus = menuRoot.querySelectorAll(".contextMenu");
        if(allContextMenus.length > 0){
            allContextMenus[0].remove();
        }
        if(event){
            event.stopPropagation();
            event.preventDefault();
        }
        if(contextMenu.node.classList.contains("hide")){
            contextMenu.node.classList.remove("hide");
        }
        
        if(toElement){
            const bounds = toElement.getBoundingClientRect();
            contextMenu.node.style.top = bounds.bottom + "px";
            contextMenu.node.style.left = bounds.left + "px";
        }
        else{
            // compute width here
            contextMenu.node.style.top = event.clientY + "px"; // test event.clientY with buttons and mobile browsers
            contextMenu.node.style.left = event.clientX + "px";// done, the upper isn't.
        }

        menuRoot.appendChild(contextMenu.node);

        const normalOffset = clampMenuToViewport(contextMenu.node);
        contextMenu.node.style.left = normalOffset.left + "px";
        contextMenu.node.style.top = normalOffset.top + "px";
        document.addEventListener("keydown", contextMenu.escapeHandler);

        // contextMenu.node.children[0].focus(); Doesn't focus
        for (let i = 0; i < contextMenu.submenus.length; i++) {
            const element = contextMenu.submenus[i];
            menuRoot.appendChild(element);
        }
    }

    function isInside(x1, x2, n){
        if(x1 < n && x2 > n){
            return true;
        }
    }

    contextMenu.remove = (event) => {
        if(!contextMenu.node.classList.contains("hide")){

            
            var boundingRect = contextMenu.node.getBoundingClientRect();
            if(
                isInside(boundingRect.left, boundingRect.right, event.clientX) &&
                isInside(boundingRect.top, boundingRect.bottom, event.clientY)
            ){
                return;
            }
            
            if(contextMenu.submenus.includes(event.target)){
                return;
            }

            contextMenu.removeElement();
        }
    }
    contextMenu.removeElement = () => {
        document.removeEventListener("keydown", contextMenu.escapeHandler);

        for (let i = 0; i < contextMenu.submenus.length; i++) {
            const element = contextMenu.submenus[i];
            if(element.classList.contains("visible")){
                hideSubmenu(element);
            }
        }
        function remove(){
            contextMenu.node.remove()
            contextMenu.node.removeEventListener("animationend", remove);
        }
        contextMenu.node.addEventListener("animationend", remove);
        contextMenu.node.classList.add("hide");
        // setTimeout(() => {
        //     contextMenu.node.remove();
        // }, animationDuration * 1000);
    }

    return contextMenu;
}

/* Select.js */
/**
 * Creates a <div class="select"> (custom select element), with search functionality
 * @param {Array} options 2D array of options [[Value, Name], [Value, Name]]
 * @param {Function} action Function with the selected value as a parameter
 * @returns The <div class="select"> element
 */
function createSelect(options, action){
    const select = document.createElement("div");
    select.classList.add("select");

    // Options
    if(options.length > 0){
        select.innerHTML = `${options[0][1]}<i>arrow_drop_down</i>`;
    }

    select.addOption = (value, name) => {
        options.push(value, name);
    }


    // Dropped down menu
    const selectMenu = contextMenu();
    selectMenu.node.classList.add("selectMenu");

    const search = document.createElement("input");
    search.placeholder = "search_the_list";

    // Rendering to DOM, very optimized!
    function renderList(visible, lastVisible){
        if(visible == "all"){
            var hidden = selectMenu.node.querySelectorAll(".hide");
            for (let i = 0; i < hidden.length; i++) {
                hidden[i].classList.remove("hide");
            }
            return;
        }
        for (let i = 0; i < visible.length; i++) {
            var index = options.indexOf(visible[i]);
            selectMenu.node.children[index+2].classList.remove("hide");
        }
        if(lastVisible){
            const filteredArray = lastVisible.filter(value => !visible.includes(value));
            for (let i = 0; i < filteredArray.length; i++) {
                var index = options.indexOf(filteredArray[i]);
                if(index == -1)
                    continue;

                selectMenu.node.children[index+2].classList.add("hide");
            }
        }
        else{
            for (let i = 0; i < options.length; i++) {
                selectMenu.node.children[i+2].classList.add("hide");
            }
        }
    }

    // Searching algorithm
    const MIN_DISTANCE = 10;
    var lastFilteredOptions;
    search.addEventListener("input", () => {
        const searchText = search.value.toLowerCase();
        if(searchText.length == 0){
            lastFilteredOptions = "";
            renderList("all");
            return;
        }

        var scores = [];
        const filteredOptions = options.filter((option) => {
            // var score = 0,
            //     words = option[1].toLowerCase().split(/[\s.,<>;:'"{}\[\]]+/),
            //     searchTextWords = searchText.split(/[\s.,<>;:'"{}\[\]]+/);
            // for (let i = 0; i < words.length; i++) {
            //     for (let j = 0; j < searchTextWords.length; j++) {
            //     }
            // }

            // scores.push([score, options.indexOf(option)]);

            // console.log(score)
            // return score <= MIN_DISTANCE;
            const distance = levenshteinDistance(option[1].toLowerCase(), searchText);
            return distance <= MIN_DISTANCE;
        });

        // scores.sort((a, b) => a[0] - b[0]);
        // filteredOptions.sort((a, b) => scores[options.indexOf(a)][0] - scores[options.indexOf(b)][0]);
        // console.log(filteredOptions);

        // for (let i = 0; i < scores.length - 1; i++) {
        //     [filteredOptions[scores[i][1]], filteredOptions[scores[i+1][1]]] = [filteredOptions[scores[i+1][1]], filteredOptions[scores[i][1]]];
        // }

        // console.log(filteredOptions);

        if(lastFilteredOptions === filteredOptions){
            return;
        }

        renderList(filteredOptions, lastFilteredOptions);
        lastFilteredOptions = filteredOptions;
    });
    selectMenu.node.appendChild(search);

    for (let i = 0; i < options.length; i++) {
        selectMenu.add("button", options[i][1], {action: () => {action(options[i][0])}});
    }

    selectMenu.attach(select, select, true);

    return select;
}