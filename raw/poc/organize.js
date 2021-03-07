// Steps to follow
// 1. Create organized_files folder and and sub folders.
// 2. Traverse and print folder name(dest folder) with file path.
// ---- Traverse for directory.
// ---- Find folder name for file ( find extension of file and check from given array).
// 3. Create dest folder path, then create dest file path and copy.


// fs ---- existsSync(), mkdirSync(), copyFileSync()
// path ---- extname()

let fs = require("fs");
let path = require("path");

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function dirCreator(dirpath) {
    if (fs.existsSync(dirpath) == false) {
        fs.mkdirSync(dirpath);
    }
}
function getDirectoryName(dirpath) {
    // let strArr = dirpath.split(".");
    // let ext = strArr.pop();
    let extWithDot = path.extname(dirpath);
    let ext = extWithDot.substring(1);
    for (let key in types) {
        // types[type].includes(ext);
        for (let i = 0; i < types[key].length; i++) {
            if (types[key][i] == ext) {
                return key;
            }
        }
    }
    return "others";
}
function isFileorNOt(dirpath) {
    return fs.lstatSync(dirpath).isFile();
}
function listContent(dirpath) {
    return fs.readdirSync(dirpath);
}
function copyFiletoFolder(dirpath, destFolder) {
    let orgFileName = path.basename(dirpath);
    let destFilePath = path.join(destFolder, orgFileName);

    fs.copyFileSync(dirpath, destFilePath);
}
function OrganizeDir(dirpath,orgFilePath) {
    // console.log(dirpath);
    let isFile = isFileorNOt(dirpath);
    if (isFile == true) {
        // identify -> dest directory 
        let folderName = getDirectoryName(dirpath);
        // console.log(dirpath, "->", folderName);
        // copy 
        let destFolder = path.join(orgFilePath, folderName);
        copyFiletoFolder(dirpath, destFolder);

    } else {
        let content = listContent(dirpath);
        for (let i = 0; i < content.length; i++) {
            let childPath = path.join(dirpath, content[i]);
            OrganizeDir(childPath,orgFilePath,);
        }
    }
}
function OrganizeFn(dirpath) {
    let orgFilePath = path.join(dirpath, "organized_files")
    dirCreator(orgFilePath);
    for (let key in types) {
        let innerdirPath = path.join(orgFilePath, key);
        dirCreator(innerdirPath)
    }
    // others folder
    let otherPath = path.join(orgFilePath, "others");
    dirCreator(otherPath);

    OrganizeDir(dirpath,orgFilePath,);
}

let input = process.argv.slice(2);
dirpath = input[0];

OrganizeFn(dirpath);