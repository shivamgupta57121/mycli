// file , folder 

// fs ----> lstatSync , readdirSync, readFileSync  
// path ----> join , basename

let fs = require("fs");
let path = require("path");

// let content = fs.readFileSync("f1.txt");
// console.log("Content is ", content);

function isFileorNOt(dirpath) {
    return fs.lstatSync(dirpath).isFile();
}
function listContent(dirpath) {
    return fs.readdirSync(dirpath);
}

// viewTree
function viewTree(dirpath, indent) {
    // console.log(dirpath);
    let isFile = isFileorNOt(dirpath);
    if (isFile == true) {
        // let strArr = dirpath.split("\\");
        // let toPrint = strArr.pop();
        // console.log(indent, toPrint, "*");

        console.log(indent, path.basename(dirpath), "*");
    } else {
        // let strArr = dirpath.split("\\");
        // let toPrint = strArr.pop();
        // console.log(indent, toPrint);
        console.log(indent, path.basename(dirpath));
        let content = listContent(dirpath);
        // recursion
        // console.log(content);
        for (let i = 0; i < content.length; i++) {
            // let childPath = dirpath + "\\" + content[i];
            let childPath = path.join(dirpath, content[i]);
            viewTree(childPath, indent + "\t");
        }
    }

}

// viewFlat 
function viewFlat(dirpath, toPrint) {
    // console.log(dirpath);
    let isFile = isFileorNOt(dirpath);
    if (isFile == true) {
        console.log(toPrint, "*");
    } else {
        console.log(toPrint);
        let content = listContent(dirpath);
        // recursion
        // console.log(content);
        for (let i = 0; i < content.length; i++) {

            // let childPath = dirpath + "\\" + content[i];
            let childPath = path.join(dirpath, content[i]);
            viewFlat(childPath, toPrint + "\\" + content[i]);
        
        }
    }

}


let input = process.argv.slice(2);
// let strArr = input[0].split("\\");
// let toPrint = strArr.pop();
let toPrint = path.basename(input[0]);
console.log("Flat View --------- ");
viewFlat(input[0],toPrint);
console.log("Tree View ---------");
viewTree(input[0], "");

// node view.js "E:\Pepcoding\Wev Dev\2_File_System_6_03_2021\raw\poc\f10"