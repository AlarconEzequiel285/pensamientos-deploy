const bcrypt = require("bcryptjs");

const password = "prueba"; 

bcrypt.hash(password, 10, function (err, hash) {
  if (err) {
    console.error("Error al encriptar:", err);
    return;
  }
  console.log("Contraseña original:", password);
  console.log("Hash generado:", hash);
});
