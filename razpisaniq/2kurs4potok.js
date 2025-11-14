// ot 1 do 6 sa dnite ot ponedelnik to shestuk
// Dobavih i 7 v sluchai che nqkoi universiteti i specialnosti karat v sedmuk

// Posle sa predmeta

// formata za chasove
/*
1 - 7.30 - 8.15
2 - 8.30 - 9.15
3 - 9.30 - 10.15
4 - 10.30 - 11.15
5 - 11.30 - 12.15
6 - 12.30 - 13.15
7 - 13.45 - 14.30
8 - 14.45 - 15.30
9 - 15.45 - 16.30
10 - 16.45 - 17.30
11 - 17.45 - 18.30
12 - 18.45 - 19.30
*/


var programa = {
    meta:{
        Count_startDate: "2025-09-22",
        Actual_startDate: "2025-09-23",
        // timeRanges_count: 12, nema smisul prosto vij razmera na spisuka idiot
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
    1:{
        "ППЕ":[{
            type: "л", // типът час л за лекция, су - семинарно упражнение и лу - лабораторно упражнение
            room: 2112, // номер на стая в която се провежда "ученето"
            weeks: "2-11", // от коя до коя седмица, в случай че са две или една се пише array - [2, 5]
            hours: "2-4", // това са часовете горе от колко започва до колко свършва ВКЛЮЧИТЕЛНО
            groups: "all" // кои групи карат часа, "all" или array
        }],
        "ПНПЕ":[{
            type: "л",
            room: 2112,
            weeks: "2-11",
            hours: "5-7",
            groups: "all"
        }],
        "САА":[{
            type: "л",
            room: 2112,
            weeks: "2-11",
            hours: "8-10",
            groups: "all"
        }]
    },
    2:{
        "Математика III": [
            { type: "л", room: 4422, weeks: "2-11", hours: "4-6", groups: "all" },
            { type: "су", room: 4422, weeks: "10-12", hours: "11-12", groups: [1,2] },
            { type: "су", room: 4422, weeks: "10-12", hours: "9-10",  groups: [3,4] }
        ],
        "МС": [
            { type: "л", room: 4422, weeks: "12-13", hours: "4-6", groups: "all" },
            { type: "л", room: 4422, weeks: "all",   hours: "7-8", groups: "all" }
        ],
        "ПНПЕ": [
            { type: "су", room: 4422, weeks: "2-9", hours: "11-12", groups: [1,2] },
            { type: "су", room: 4422, weeks: "2-9", hours: "9-10",  groups: [3,4] }
        ]
    },
    3:{
        "САА":[{
            type: "лу",
            room: 2202,
            weeks: "all",
            hours: "3-4",
            groups: 1,
        },{
            type: "лу",
            room: 2202,
            weeks: "all",
            hours: "7-8",
            groups: 3,
        },{
            type: "лу",
            room: 2202,
            weeks: "all",
            hours: "9-10",
            groups: 2,
        },
        {
            type: "лу",
            room: 2202,
            weeks: "all",
            hours: "5-6",
            groups: 4,
        }],
        "ПНПЕ":[{

        },{

        },{

        }]
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