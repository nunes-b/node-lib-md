import chalk from "chalk";

function manejaErros(err) {
  console.log(chalk.red("Algo deu errado", err));
  if (err) {
    return "Link não encontrado!";
  } else {
    return "Ocorreu um erro";
  }
}

function extraiLinks(arrLinks) {
  return arrLinks.map((objLink) => Object.values(objLink).join());
}

async function checaStatus(listaURLs) {
  const arrStatus = await Promise.all(
    listaURLs.map(async (url) => {
      try {
        const response = await fetch(url, { method: "HEAD" });
        return response.status;
      } catch (err) {
        return manejaErros(err);
      }
    })
  );
  return arrStatus;
}

export default async function listaValidada(listaDeLinks) {
  const links = extraiLinks(listaDeLinks);
  const status = await checaStatus(links);
  return listaDeLinks.map((obj, index) => ({ ...obj, status: status[index] }));
}
