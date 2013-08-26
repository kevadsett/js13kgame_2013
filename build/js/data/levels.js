LateRunner.LevelData = {
    levels:[
        {
            switches:[
                { connectedDoors: [0], position: 0 }
            ],
            doors:[
                { state: "closed" }
            ]       
        },
        {
            switches:[ 
                { connectedDoors: [0, 1], position: 0 },
                { connectedDoors: [0, 1], position: 1 }
            ],
            doors:[
                { state: "closed" },
                { state: "open"}
            ]
        },
        {
            switches:[
                { connectedDoors: [0, 1, 2], position: 0 },
                { connectedDoors: [1], position: 1 }
            ],
            doors:[
                { state: "closed" },
                { state: "open" },
                { state: "closed" }
            ]
        },
        {
            switches:[
                { connectedDoors: [1, 2], position: 0 },
                { connectedDoors: [1], position: 1 }
            ],
            doors:[
                { state: "open" },
                { state: "closed" },
                { state: "closed" }
            ]
        }
    ]
}