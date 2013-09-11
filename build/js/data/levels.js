LateRunner.LevelData = {
    levels:[
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
                { connectedDoors: [0], doorPosition: 0 },
                { connectedDoors: [1], doorPosition: 1 }
            ],
            doors:[
                { state: "closed" },
                { state: "closed" }
            ] 
        },
        {
            switches:[ 
                { connectedDoors: [1], doorPosition: 0 },
                { connectedDoors: [0], doorPosition: 0 }
            ],
            doors:[
                { state: "closed" },
                { state: "closed" }
            ]
        },
        {
            switches:[ 
                { connectedDoors: [0, 1], doorPosition: 0 },
                { connectedDoors: [1, 0], doorPosition: 1 }
            ],
            doors:[
                { state: "closed" },
                { state: "open" }
            ]
        }
    ]
}