import fs from "fs";
import chalk from "chalk";

function trataErro(err) {
  throw new Error(chalk.red(err));
}

function extraiLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map((captura) => ({ [captura[1]]: captura[2] }));
  return resultados;
}

async function pegaArquivo(caminhoDoArquivo) {
  const encoding = "utf-8";

  try {
    const text = await fs.promises.readFile(caminhoDoArquivo, encoding);
    console.log(extraiLinks(text));
  } catch (err) {
    trataErro(err);
  } finally {
    console.log(chalk.yellow("operação concluída"));
  }
}

pegaArquivo("./arquivos/texto.md");
