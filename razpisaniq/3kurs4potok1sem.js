// 3 курс, 4 поток, 5 семестър
// Коригиран формат според реалния разпис за 41–43 групи, без спорт и само от понеделник до петък.

var programa = {
    meta:{
        Count_startDate: "2026-09-21",
        Actual_startDate: "2026-09-23",
        times: [
            "7.30",
            "8.30",
            "9.30",
            "10.30",
            "11.30",
            "12.30",
            "13.45",
            "14.45",
            "15.45",
            "16.45",
            "17.45",
            "18.45"
        ]
    },
    types:{
        "л": "lecture",
        "су": "seminar",
        "лу": "laboratory"
    },
    groups:[
        "41а",
        "41б",
        "42а",
        "42б",
        "43а",
        "43б"
    ],
    classes:{
        "ПП_л":{
            name: "Паралелно Програмиране",
            type: "л",
            room: 2112
        },
        "ОС_л":{
            name: "Операционни Системи",
            type: "л",
            room: 2112
        },
        "АСЛС_л":{
            name: "АСЛС",
            type: "л",
            room: 2112
        },
        "ОКГ_л":{
            name: "Обща Компютърна Графика",
            type: "л",
            room: 2112
        },
        "ЦСТ_л":{
            name: "Цифрови Системи и Техника",
            type: "л",
            room: 2112
        },
        "КП_л":{
            name: "Курсов Проект",
            type: "л",
            room: 2112
        },
        "ПП_лу":{
            name: "Паралелно Програмиране",
            type: "лу",
            room: 2205
        },
        "ОС_лу":{
            name: "Операционни Системи",
            type: "лу",
            room: 2205
        },
        "АСЛС_лу":{
            name: "АСЛС",
            type: "лу",
            room: 2318
        },
        "ОКГ_лу":{
            name: "Обща Компютърна Графика",
            type: "лу",
            room: 1101
        },
        "ЦСТ_лу":{
            name: "Цифрови Системи и Техника",
            type: "лу",
            room: 2310
        },
        "КП_лу":{
            name: "Курсов Проект",
            type: "лу",
            room: 2310
        }
    },
    1:{
        "ОС_лу":[
            { weeks: "all", hours: "7-8", groups: 1 },
            { weeks: "all", hours: "9-10", groups: 2 }
        ],
        "АСЛС_лу":[
            { weeks: "all", hours: "9-10", groups: 1 },
            { weeks: "all", hours: "7-8", groups: 2 }
        ],
        "ОКГ_лу":[
            { weeks: [5, 7], hours: "11-12", groups: 1 },
            { weeks: [6, 8], hours: "11-12", groups: 2 }
        ],
        "ПП_лу":[
            { weeks: "all", hours: "3-4", groups: 3 },
            { weeks: "all", hours: "5-6", groups: 4 }
        ],
        "КП_лу":[
            { weeks: [8, 10], hours: "7-8", groups: 3 },
            { weeks: [9, 11], hours: "7-8", groups: 4 }
        ],
        "ЦСТ_лу":[
            { weeks: "all", hours: "5-6", groups: 3 },
            { weeks: "all", hours: "3-4", groups: 4 }
        ]
    },
    2:{
        "ОС_лу":[
            { weeks: "all", hours: "3-4", groups: 3 },
            { weeks: "all", hours: "9-10", groups: 4 },
            { weeks: "all", hours: "7-8", groups: 5 },
            { weeks: "all", hours: "5-6", groups: 6 }
        ],
        "АСЛС_лу":[
            { weeks: "all", hours: "5-6", groups: 3 },
            { weeks: "all", hours: "7-8", groups: 4 }
        ],
        "ОКГ_лу":[
            { weeks: [4, 6, 8], hours: "9-10", groups: 3 },
            { weeks: "all", hours: "7-8", groups: 3 },

            { weeks: [4, 6, 8], hours: "3-4", groups: 4 },
            { weeks: "all", hours: "5-6", groups: 4 },

            { weeks: [5, 7], hours: "9-10", groups: 5 },
            
            { weeks: [5, 7], hours: "3-4", groups: 6 }
        ],
        "ЦСТ_лу":[
            {weeks: "all", hours: "5-6", groups: 5},
            {weeks: "all", hours: "7-8", groups: 6}
        ],
        "КП_лу":[
            { weeks: [9, 10, 11], hours: "3-4", groups: 5 },
            { weeks: [9, 10, 11], hours: "9-10", groups: 6 }
        ]
    },
    3:{
        "ОКГ_л":[
            { weeks: [11, 12], hours: "3-4", groups: "all"}
        ],
        "ПП_л":[
            { weeks: "all", hours: "7-8", groups: "all" },
            { weeks: [2, 4], hours: "3-4", groups: "all" }
        ],
        "ОС_л":[
            { weeks: "all", hours: "9-10", groups: "all" },
            { weeks: [1, 3], hours: "3-4", groups: "all" }
        ],
        "АСЛС_л":[
            { weeks: "all", hours: "5-6", groups: "all" }
        ]
    },
    4:{
        "АСЛС_л":[
            { weeks: [1, 2], hours: "3-4", groups: "all"}
        ],
        "КП_л":[
            { weeks: "all", hours: "9-10", groups: "all" },
            { weeks: [7, 8], hours: "3-4", groups: "all" }
        ],
        "ЦСТ_л":[
            { weeks: "all", hours: "7-8", groups: "all" },
            { weeks: [5, 6], hours: "3-4", groups: "all" }
        ],
        "ОКГ_л":[
            { weeks: "all", hours: "5-6", groups: "all" }
        ]
    },
    5:{
        "КП_лу":[
            {weeks: [9, 10], hours: "3-4", groups: 1},
            {weeks: [9, 10], hours: "9-10", groups: 2},
        ],
        "ПП_лу":[
            { weeks: "all", hours: "7-8", groups: 1 },
            { weeks: "all", hours: "5-6", groups: 2 },
            { weeks: "all", hours: "3-4", groups: 6 },
            { weeks: "all", hours: "9-10", groups: 5 }
        ],
        "ЦСТ_лу":[
            { weeks: "all", hours: "5-6", groups: 1 },
            { weeks: "all", hours: "7-8", groups: 2 }
        ],
        "ОКГ_лу":[
            { weeks: "all", hours: "9-10", groups: 1 },
            { weeks: "all", hours: "3-4", groups: 2 },
            { weeks: "all", hours: "7-8", groups: 6 },
            { weeks: "all", hours: "5-6", groups: 5 }
        ],
        "АСЛС_лу":[
            { weeks: "all", hours: "5-6", groups: 6 },
            { weeks: "all", hours: "7-8", groups: 5 }
        ]
    }
};