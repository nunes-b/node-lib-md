import fs from "fs";
import chalk from "chalk";

function trataErro(err) {
  throw new Error(chalk.red(err));
}

async function pegaArquivo(caminhoDoArquivo) {
  const encoding = "utf-8";

  try {
    const text = await fs.promises.readFile(caminhoDoArquivo, encoding);
    console.log(chalk.bgBlackBright(text));
  } catch (err) {
    trataErro(err);
  } finally {
    console.log(chalk.yellow("operação concluída"));
  }
}

pegaArquivo("./arquivos/texto.md");

pegaArquivo("./arquivos/");

// Promisses com then()
// function pegaArquivo(caminhoDoArquivo) {
//   const encoding = "utf-8";
//   fs.promises
//     .readFile(caminhoDoArquivo, encoding)
//     .then((text) => {
//       console.log(chalk.greenBright.bold(text));
//     })
//     .catch((err) => {
//       trataErro(err);
//     });
// }
