// Vijte purviq semestur za detaili na kak se opisva programata

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
        }
    },
    1:{
        "БД_лу": [
            { hours: "3-4", groups: 3 },
            { hours: "7-8", groups: 4 },
            { hours: "5-6", groups: 5 },
        ],
        "СС_су": [
            { hours: "5-6", groups: [3, 4] },
            { hours: "7-8", groups: [5, 6] }
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
    },
    3:{
        
    },
    4:{

    },
    5:{

    },
    6:{

    },
    7:{
        
    }
}