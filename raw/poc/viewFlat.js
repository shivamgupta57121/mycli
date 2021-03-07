// file , folder
let fs = require("fs");
let path = require("path");

// let content = fs.readFileSync("input.js")
// console.log("content is "+content);
// viewFlat
// node.js
function isFileOrNot(dirpath){
    return fs.lstatSync(dirpath).isFile();
}
function listContent(dirpath){
    return fs.readdirSync(dirpath);
}
function viewFlat(dirpath, toPrint){
    // console.log(dirpath);
    let isFile = isFileOrNot(dirpath);
    if (isFile == true){
        console.log(toPrint + "*");
    } else {
        console.log(toPrint);
        let content = listContent(dirpath);
        // recursion
        // console.log(content);
        for(let i = 0; i < content.length; i++){
            // f10/f1/txt
            // let childPath = dirpath + "\\" + content[i];

            let childPath = path.join(dirpath,content[i]);
            viewFlat(childPath,toPrint + "\\" + content[i]);
        }
    }

}
// E:\Pepcoding\Wev Dev\2_File_System_6_03_2021\raw\poc\f10

// let input = process.argv.slice(2);
// // console.log(input);

// // let strArr = input[0].split("\\");
// // let toPrint = strArr.pop();

// let toPrint = path.basename(input[0]);
// viewFlat(input[0], toPrint);  

module.exports = viewFlat;


// fs ----> lstatSync , readdirSync, readFileSync  
// path ----> join , basename