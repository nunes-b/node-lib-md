import fs from "fs";
import chalk from "chalk";
import pegaArquivo from "./index.js";
import { trataErro } from "./index.js";

const caminho = process.argv[2];

function imprimeLista(resultado, identificador = "") {
  console.log(
    chalk.yellow("Lista de links:"),
    chalk.black.bgGreen(identificador),
    resultado
  );
}

async function processaTexto(caminho) {
  try {
    //valida se é arquivo
    if (fs.lstatSync(caminho).isFile()) {
      const resultado = await pegaArquivo(caminho);
      imprimeLista(resultado);
      //valida se é um diretorio e retorna a leitura do que há dentro
    } else if (fs.lstatSync(caminho).isDirectory()) {
      const arquivos = await fs.promises.readdir(caminho);
      arquivos.forEach(async (nomeDosArquivos) => {
        const lista = await pegaArquivo(`${caminho}/${nomeDosArquivos}`);
        imprimeLista(lista, nomeDosArquivos);
      });
      console.log(arquivos);
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(chalk.red.bold("Arquivo ou diretorio não existe."));
      await trataErro(err.code);
    }
  }
}

processaTexto(caminho);
