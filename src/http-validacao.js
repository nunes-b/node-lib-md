function extraiLinks(arrLinks) {
  return arrLinks.map((objLink) => Object.values(objLink).join());
}

async function checaStatus(listaURLs) {
  const arrStatus = await Promise.all(
    listaURLs.map(async (url) => {
      const response = await fetch(url);
      return response.status;
    })
  );
  return arrStatus;
}

export default async function listaValidada(listaDeLinks) {
  const links = extraiLinks(listaDeLinks);
  const status = await checaStatus(links);
  return status;
}
