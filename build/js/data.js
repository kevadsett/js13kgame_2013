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
};

var globalAnimData = {
    player: {
        run: {
            filename: "images/run.png",
            frames: [
                {x:0,y:0,w:111,h:150},
                {x:111,y:0,w:101,h:150},
                {x:212,y:0,w:71,h:150},
                {x:283,y:0,w:41,h:160},
                {x:324,y:0,w:51,h:160},
                {x:375,y:0,w:81,h:160},
                {x:0,y:160,w:91,h:150},
                {x:91,y:160,w:101,h:140},
                {x:192,y:160,w:111,h:150},
            ]
        }
    }
}