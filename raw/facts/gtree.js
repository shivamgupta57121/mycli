let root = {
    name: "d10",
    children: [{
            name: "d20",
            children: [{
                    name: "d50",
                    children: []
                },
                {
                    name: "d60",
                    children: []
                }
            ]
        },
        {
            name: "d30",
            children: [{
                name: "d70",
                children: []
            }]
        },
        {
            name: "d40",
            children: []
        }
    ]
}

// recursion 
// expectation = my work + faith
// base case not required since for loop will not run for leaf node 

function displayGtree(node){
    // d10 -> d20,d30,d40
    let menMyChild = "" + node.name + " -> ";
    for(let i = 0; i < node.children.length ; i++){
        let child = node.children[i];
        menMyChild += child.name + ",";
    }
    console.log(menMyChild);
    for(let i = 0; i < node.children.length ; i++){
        let child = node.children[i];
        displayGtree(child);
    }

}
// d10
displayGtree(root);


