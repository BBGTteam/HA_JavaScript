var fs = require('fs');

jsonReader("./data/db.json", (err, customer) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }
    // increase customer order count by 1
    console.log(customer.users[0].temp);
    customer.users[0].temp += 1;
    console.log(customer.users[0].temp);
    fs.writeFile("./customer.json", JSON.stringify(customer), err => {
      if (err) console.log("Error writing file:", err);
    });
  });
  
  function jsonReader(filePath, cb) {
      fs.readFile(filePath, (err, fileData) => {
        if (err) {
          return cb && cb(err);
        }
        try {
          const object = JSON.parse(fileData);
          console.log(object);
          return cb && cb(null, object);
        } catch (err) {
          return cb && cb(err);
        }
      });
    }