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
            { type: "лу", room: 2205, weeks: "all", hours: "6-7", groups: 1 },
            { type: "лу", room: 2205, weeks: "all", hours: "7-8", groups: 2 }
        ],
        "АСЛС_лу":[
            { type: "лу", room: 2318, weeks: "5, 7", hours: "9-10", groups: 1 },
            { type: "лу", room: 2318, weeks: "6, 8", hours: "9-10", groups: 2 }
        ],
        "ОКГ_лу":[
            { type: "лу", room: 1101, weeks: "all", hours: "11-12", groups: [1, 2] }
        ],
        "ПП_лу":[
            { type: "лу", room: 2205, weeks: "all", hours: "4-5", groups: 3 },
            { type: "лу", room: 2205, weeks: "all", hours: "6-7", groups: 4 }
        ],
        "КП_лу":[
            { type: "лу", room: 2310, weeks: "8, 10", hours: "6-7", groups: 3 },
            { type: "лу", room: 2310, weeks: "9, 11", hours: "4-5", groups: 4 }
        ]
    },
    2:{
        "ОС_лу":[
            { type: "лу", room: 2205, weeks: "all", hours: "4-5", groups: 3 },
            { type: "лу", room: 2205, weeks: "all", hours: "9-10", groups: 5 },
            { type: "лу", room: 2205, weeks: "all", hours: "6-7", groups: 6 }
        ],
        "АСЛС_лу":[
            { type: "лу", room: 2318, weeks: "all", hours: "6", groups: 3 },
            { type: "лу", room: 2318, weeks: "all", hours: "7-8", groups: 4 }
        ],
        "ОКГ_лу":[
            { type: "лу", room: 1101, weeks: [4, 6, 8], hours: "8-9", groups: 3 },
            { type: "лу", room: 1101, weeks: "all", hours: "7", groups: 3 },
            { type: "лу", room: 1101, weeks: [4, 6, 8], hours: "4-5", groups: 4 },
            { type: "лу", room: 1101, weeks: "all", hours: "6", groups: 4 },
            { type: "лу", room: 1101, weeks: "5, 7", hours: "5-6", groups: 5 },
            { type: "лу", room: 1101, weeks: "5, 7", hours: "11-12", groups: 5 },
            { type: "лу", room: 1101, weeks: "5, 7", hours: "4-5", groups: 6 }
        ],
        "КП_лу":[
            { type: "лу", room: 2310, weeks: [9, 10, 11], hours: "4-5", groups: 5 },
            { type: "лу", room: 2310, weeks: "all", hours: "7-8", groups: 5 },
            { type: "лу", room: 2310, weeks: "all", hours: "8-9", groups: 6 },
            { type: "лу", room: 2310, weeks: [9, 10, 11], hours: "10-11", groups: 6 }
        ]
    },
    3:{
        "ОС_лу":[
            { type: "лу", room: 2205, weeks: "1, 3", hours: "4-5", groups: 2 },
            { type: "лу", room: 2205, weeks: "all", hours: "8", groups: 3 }
        ],
        "ПП_лу":[
            { type: "лу", room: 2205, weeks: "2, 4", hours: "4-5", groups: 3 },
            { type: "лу", room: 2205, weeks: "all", hours: "7", groups: 3 }
        ],
        "АСЛС_лу":[
            { type: "лу", room: 2318, weeks: "all", hours: "6", groups: 3 }
        ],
        "ОКГ_лу":[
            { type: "лу", room: 1101, weeks: "11, 12", hours: "4-5", groups: 4 }
        ],
        "ПП_л":[
            { type: "л", room: 2112, weeks: "all", hours: "4-5", groups: "all" }
        ],
        "ОС_л":[
            { type: "л", room: 2112, weeks: "all", hours: "7-8", groups: "all" }
        ],
        "АСЛС_л":[
            { type: "л", room: 2112, weeks: "all", hours: "9-10", groups: "all" }
        ]
    },
    4:{
        "АСЛС_лу":[
            { type: "лу", room: 2112, weeks: "1, 2", hours: "4-5", groups: [1, 2, 3] }
        ],
        "ЦСТ_лу":[
            { type: "лу", room: 2112, weeks: "5, 6", hours: "4-5", groups: [1, 2, 3] }
        ],
        "КП_лу":[
            { type: "лу", room: 2112, weeks: "7, 8", hours: "4-5", groups: [4, 5, 6] }
        ],
        "ПП_л":[
            { type: "л", room: 2112, weeks: "all", hours: "6-7", groups: "all" }
        ],
        "ОС_л":[
            { type: "л", room: 2112, weeks: "all", hours: "7-8", groups: "all" }
        ],
        "АСЛС_л":[
            { type: "л", room: 2112, weeks: "all", hours: "9-10", groups: "all" }
        ]
    },
    5:{
        "ПП_лу":[
            { type: "лу", room: 2205, weeks: "all", hours: "7-8", groups: 1 },
            { type: "лу", room: 2205, weeks: "all", hours: "6", groups: 2 },
            { type: "лу", room: 2205, weeks: "all", hours: "4-5", groups: 5 },
            { type: "лу", room: 2205, weeks: "all", hours: "9-10", groups: [5, 6] }
        ],
        "КП_лу":[
            { type: "лу", room: 2310, weeks: "9, 10", hours: "4-5", groups: 1 },
            { type: "лу", room: 2310, weeks: "all", hours: "7-8", groups: 2 },
            { type: "лу", room: 2310, weeks: "9, 10", hours: "9-10", groups: 2 }
        ],
        "ОКГ_лу":[
            { type: "лу", room: 1101, weeks: "all", hours: "9", groups: 1 },
            { type: "лу", room: 1101, weeks: "all", hours: "4-5", groups: 2 },
            { type: "лу", room: 1101, weeks: "all", hours: "8", groups: 5 },
            { type: "лу", room: 1101, weeks: "all", hours: "7-8", groups: 6 }
        ],
        "АСЛС_лу":[
            { type: "лу", room: 2318, weeks: "all", hours: "6-7", groups: 5 },
            { type: "лу", room: 2318, weeks: "all", hours: "6-7", groups: 6 },
            { type: "лу", room: 2318, weeks: "all", hours: "8-9", groups: 6 }
        ]
    }
};