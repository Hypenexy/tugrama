// Ne gledaite purviq semestur za kak se opisva programata
// poneje sintaksisa e strogo promenen

var programa = {
    meta:{
        Count_startDate: "2026-02-09",
        Actual_startDate: "2025-02-09",
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
        "лу": "laboratory",
        "с": "sport"
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
        // lekcii
        "БД_л":{
            name: "База Данни",
            type: "л",
            room: 2112
        },
        "ОМТ_л":{
            name: "Оу Май Гад",
            type: "л",
            room: 2112
        },
        "КС_л":{
            name: "Килл селф",
            type: "л",
            room: 2112
        },
        "ИИКТ_л":{
            name: "Ииил",
            type: "л",
            room: 2112
        },
        "СС_л":{
            name: "Системни Системи",
            type: "л",
            room: 2112
        },

        // laboratorni
        "БД_лу":{
            name: "База Данни",
            type: "лу",
            room: 2205
        },
        "ОМТ_лу":{
            name: "Оу Май Гад",
            type: "лу",
            room: 2306
        },
        "КС_лу":{
            name: "Килл селф",
            type: "лу",
            room: 2310
        },
        "ИИКТ_лу":{
            name: "Ииил",
            type: "лу",
            room: 2315
        },
        "СС_лу":{
            name: "Системни Системи",
            type: "лу",
            room: 2408
        },
        // seminarni
        "СС_су":{
            name: "Систематични системни",
            type: "су",
            room: 2102
        },
        //sport
        "Спорт":{
            name: "Спорт",
            type: "с",
            room: "АУ"
        }
    },
    1:{
        "БД_лу": [
            { hours: "3-4", groups: 3 },
            { hours: "5-6", groups: 5 },
            { hours: "7-8", groups: 4 },
            { hours: "9-10", groups: 6 }
        ],
        "СС_су": [
            { hours: "5-6", groups: [3, 4] },
            { hours: "7-8", groups: [5, 6] }
        ],
        "Спорт": [
            { hours: "3-4", groups: [5, 6] }
        ]
    },
    2:{
        "СС_л": [
            { hours: "7-8" },
            { hours: "11-12", weeks: "5-7" }
        ],
        "ИИКТ_л": [
            { hours: "9-10" },
            { hours: "11-12", weeks: "8-10" }
        ],
        "БД_л": [
            { hours: "11-12", weeks: "11-13" }
        ],
        "БД_лу": [
            { hours: "3-4", groups: 1 },
            { hours: "5-6", groups: 2 }
        ],
        "ИИКТ_лу": [
            { hours: "3-4", groups: 2, weeks: "3-10" },
            { hours: "5-6", groups: 1, weeks: "3-10" }
        ],
        "Спорт": [
            { hours: "3-4", groups: [3, 4], weeks: "2-13" },
            { hours: "5-6", groups: [5, 6], weeks: "2-13" }
        ]
    },
    3:{
        "СС_су": [
            { hours: "2-3", groups: [1, 2], weeks: "3-10" }
        ],
        "ОМТ_л":[
            { hours: "4-6", weeks: "1-10" }
        ],
        "КС_л":[
            { hours: "4-6", weeks: "11-12" },
            { hours: "9-10" }
        ],
        "БД_л":[
            { hours: "7-8"}
        ],
        "БД_лу":[
            { hours: "11-12", groups: 1, weeks: [4, 8, 12] },
            { hours: "11-12", groups: 2, weeks: [5, 9, 13] }
        ]
    },
    4:{
        "ОМТ_лу":[
            { hours: "3-4", groups: 1},
            { hours: "5-6", groups: 2},
            { hours: "7-8", groups: 5},
            { hours: "9-10", groups: 6}
        ],
        "БД_лу":[
            { hours: "11-12", groups: 3, weeks: [4, 6, 10] },
            { hours: "11-12", groups: 4, weeks: [3, 7, 11] },
            { hours: "11-12", groups: 5, weeks: [2, 8, 12] },
            { hours: "11-12", groups: 6, weeks: [5, 9, 13] }
        ],
        "СС_лу":[
            { hours: "7-8", groups: 3, weeks: "3-10" },
            { hours: "9-10", groups: 4, weeks: "3-10" }
        ],
        "КС_лу":[
            { hours: "3-4", groups: 2},
            { hours: "5-6", groups: 1},
        ]
    },
    5:{

    },
    6:{

    },
    7:{
        
    }
}