import chalk from "chalk";
import pegaArquivo from "./index.js";
import { trataErro } from "./index.js";

const caminho = process.argv;

async function processaTexto(caminho) {
  try {
    const resultado = await pegaArquivo(caminho[2]);
    console.log(chalk.yellow("Lista de Links: "), resultado);
  } catch (err) {
    await trataErro(err);
  }
}

processaTexto(caminho);
