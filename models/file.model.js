const sql = require("./db");

const File = function(file) {
    this.nameFile = file.nameFile;
    this.userName = file.userName;
    this.type = file.type;
    this.createdAt = file.createdAt;
    this.updatedAt = file.updatedAt || null;
    this.path = file.path;
    this.pathThumbnail = file.pathThumbnail;
};

File.getAll = result => {
    sql.query("SELECT * FROM File", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

File.getSingle = (nameFile, result) => {
    sql.query("SELECT * FROM File WHERE nameFile=?", nameFile, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

File.create = (file, userName, result) => {
    console.log("path: ", file.path);
    /*
    this.nameFile = file.nameFile;
    this.userName = file.userName;
    this.type = file.type;
    this.createdAt = file.createdAt;
    this.updatedAt = file.updatedAt || null;
    this.path = file.path;
    this.pathThumbnail = file.pathThumbnail;
    */

    const filn = {
        nameFile: file.originalname,
        userName: userName,
        type: file.originalname.split('.').pop(),
        path: file.destination + "/" + file.originalname,
        pathThumbnail: file.path
    }

    console.log(filn);
    sql.query("INSERT INTO File SET ?", filn,
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, res);

        }
    );
};


module.exports = File;