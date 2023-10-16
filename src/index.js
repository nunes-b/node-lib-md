import fs from "fs";
import chalk from "chalk";

export async function trataErro(err) {
  throw new Error(chalk.red(err));
}

function extraiLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map((captura) => ({ [captura[1]]: captura[2] }));
  return resultados.length !== 0
    ? resultados
    : chalk.red("Não há links nesse arquivo.");
}

async function pegaArquivo(caminhoDoArquivo) {
  const encoding = "utf-8";

  try {
    const text = await fs.promises.readFile(caminhoDoArquivo, encoding);
    return extraiLinks(text);
  } catch (err) {
    await trataErro(err);
  } finally {
    console.log(chalk.yellow("operação concluída"));
  }
}

export default pegaArquivo;
