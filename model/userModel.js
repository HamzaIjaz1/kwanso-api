var LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");

function getLocal() {
  const data = JSON.parse(localStorage.getItem("abcdeee"));

  if (data) {
    return data;
  } else {
    return [];
  }
}

module.exports.signup_user_model = function (user) {

    return new Promise(function (resolve, reject) {
    let newUser = {...user};
    newUser.id = Math.random();

    let found=false;
   var users = [...getLocal()];

    //   localStorage.setItem('abcdeee',JSON.stringify(user))
    if (users.length > 0) {
      users.forEach((item) => {
        if (item.email === user.email) {
            found=true;
        } else {
          
        }
      });
    }
if (found){
    reject("User already Exists");
}else{
    users.push(newUser);
    localStorage.setItem("abcdeee", JSON.stringify(users));
    resolve({id:newUser.id,email:newUser.email});
}
    
  });
};

module.exports.signin_user_model = function (user) {
  console.log(user);

  return new Promise(function (resolve, reject) {
    
    var users = [...getLocal()];

    //   localStorage.setItem('abcdeee',JSON.stringify(user))
    let found = false;
    if (users.length > 0) {
      users.forEach((item) => {
        if (item.email === user.email) {
          found = true;
        } 
      });
    }

    if (found){
        resolve(user.email)
    }else{
        reject('User Not Found')
    }

  });
};

module.exports.get_user_model = function (user) {
  
    return new Promise(function (resolve, reject) {
      
      var users = [...getLocal()];
  
      //   localStorage.setItem('abcdeee',JSON.stringify(user))
      let found = false;
      let r;
      if (users.length > 0) {
          r = users.filter(item=>(item.email === user))
        // users.forEach((item) => {
        //   if (item.email === user.email) {
        //     found = true;
        //   } 
        // });
        console.log('rrrr ', r)
      }
      delete r[0].password;
      if (r.length>0){
          resolve(r[0])
      }else{
          reject('User Not Found')
      }
  
    });
  };
