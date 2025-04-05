const bcrypt = require("bcryptjs");

const password = "prueba"; // Cambia esto por la contraseña que quieras hashear

bcrypt.hash(password, 10, function (err, hash) {
  if (err) {
    console.error("Error al encriptar:", err);
    return;
  }
  console.log("Contraseña original:", password);
  console.log("Hash generado:", hash);
});
