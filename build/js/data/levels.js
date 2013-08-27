LateRunner.LevelData = {
    levels:[
        {
            switches:[ 
                { connectedDoors: [0, 1], doorPosition: 0 },
                { connectedDoors: [0, 1], doorPosition: 1 }
            ],
            doors:[
                { state: "closed" },
                { state: "open"}
            ]
        },
            {
            switches:[
                { connectedDoors: [0], doorPosition: 0 }
            ],
            doors:[
                { state: "closed" }
            ]       
        },
        {
            switches:[
                { connectedDoors: [0, 1, 2], doorPosition: 0 },
                { connectedDoors: [1], doorPosition: 1 }
            ],
            doors:[
                { state: "closed" },
                { state: "open" },
                { state: "closed" }
            ]
        },
        {
            switches:[
                { connectedDoors: [1, 2], doorPosition: 0 },
                { connectedDoors: [1], doorPosition: 1 }
            ],
            doors:[
                { state: "open" },
                { state: "closed" },
                { state: "closed" }
            ]
        }
    ]
}