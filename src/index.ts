import app from "./config/app";

function main() {
  app.listen(process.env.PORT || 3000, () => {
    console.log(
      `servidor ejecutándose en el puerto ${process.env.PORT || 3000}`
    );
  });
}

main();
