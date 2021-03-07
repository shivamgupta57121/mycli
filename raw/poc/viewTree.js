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
function viewTree(dirpath, indent){
    // console.log(dirpath);
    let isFile = isFileOrNot(dirpath);
    if (isFile == true){

        // let strArr = dirpath.split("\\");
        // let toPrint = strArr.pop(); 
        // console.log(indent + toPrint + "*");

        console.log(indent + path.basename(dirpath) + "*");

    } else {
        
        // let strArr = dirpath.split("\\");
        // let toPrint = strArr.pop(); 
        // console.log(indent + toPrint);

        console.log(indent + path.basename(dirpath) );

        let content = listContent(dirpath);
        // recursion
        // console.log(content);
        for(let i = 0; i < content.length; i++){
            // f10/f1/txt
            // let childPath = dirpath + "\\" + content[i];

            let childPath = path.join(dirpath,content[i]);
            viewTree(childPath,indent + "\t" );
        }
    }

}
// E:\Pepcoding\Wev Dev\2_File_System_6_03_2021\raw\poc\f10

// let input = process.argv.slice(2);
// viewTree(input[0], "");        

module.exports = viewTree;