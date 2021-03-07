// file , folder 

// fs ---- lstatSync , readdirSync, readFileSync  
// path ---- join , basename

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

function view(dirname, mode) {

    if (mode == "tree") {
        viewTree(dirname, "");
    } else if (mode == "flat") {
        let toPrint = path.basename(dirname);
        viewFlat(dirname,toPrint);
    } else {
        console.log("Wrong mode");
    }
}

module.exports = {
    viewfn: view
}