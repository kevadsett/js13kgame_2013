var globalLevelData = {
    levels:[
        {
            switches:[
                { connectedDoors: [0], position: 0 }
            ],
            doors:[
                { position: "closed" }
            ]
        },
        {
            switches:[ 
                { connectedDoors: [0, 1], position: 0 },
                { connectedDoors: [0, 1], position: 1 }
            ],
            doors:[
                { position: "closed" },
                { position: "open"}
            ]
        },
        {
            switches:[
                { connectedDoors: [0, 1, 2], position: 0 },
                { connectedDoors: [1], position: 1 }
            ],
            doors:[
                { position: "closed" },
                { position: "open" },
                { position: "closed" }
            ]
        },
        {
            switches:[
                { connectedDoors: [1, 2], position: 0 },
                { connectedDoors: [1], position: 1 }
            ],
            doors:[
                { position: "open" },
                { position: "closed" },
                { position: "closed" }
            ]
        }
    ]
},
globalAnimData = {
    player: {
        run: {
            filename: "images/run.png",
            right: {
                frames: [
                    {x:222,y:0,w:111,h:150},
                    {x:212,y:150,w:101,h:150},
                    {x:162,y:450,w:71,h:150},
                    {x:264,y:610,w:41,h:160},
                    {x:213,y:600,w:51,h:160},
                    {x:81,y:590,w:81,h:160},
                    {x:0,y:440,w:91,h:150},
                    {x:101,y:300,w:101,h:140},
                    {x:0,y:150,w:111,h:150}
                ]
            },
            left: {
                frames: [
                    {x:0,y:0,w:111,h:150},
                    {x:111,y:150,w:101,h:150},
                    {x:91,y:440,w:71,h:150},
                    {x:264,y:450,w:41,h:160},
                    {x:162,y:600,w:51,h:160},
                    {x:0,y:590,w:81,h:160},
                    {x:202,y:300,w:91,h:150},
                    {x:0,y:300,w:101,h:140},
                    {x:111,y:0,w:111,h:150}
                ]
            }
        }
    }
};