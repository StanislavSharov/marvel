// const postData = async (url,data) =>{
//     let res = await fetch(url,{
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: data
//     });

//     return await res.json();

// }

// async function getResources(url) {
//     let res = await fetch(url);

//     if(!res.ok){
//         throw new Error(Could'n fetch ${url}, status ${res.status});

//     }

//     return await res.json();
// }

// export {postData}
// export {getResources}

class MarvelServices {
  _apiBase = "https://marvel-server-zeta.vercel.app/";

  _apiKey = "apikey=d4eecb0c66dedbfae4eab45d312fc1df";
  
  _baseOffset = 0;

  
  getResources = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could'n fetch ${url}, status ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async (offset= this._baseOffset) => {
    const res = await this.getResources(
  `https://marvel-server-zeta.vercel.app/characters?limit=9&offset=${offset}&apikey=d4eecb0c66dedbfae4eab45d312fc1df`
);
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResources(`
      https://marvel-server-zeta.vercel.app/characters/${id}?apikey=d4eecb0c66dedbfae4eab45d312fc1df`);
    return this._transformCharacter(res.data.results[0]);
  };

getFirstNineCharacter = async () => {
  const res = await this.getAllCharacters();
  return res.slice(0, 9); 
};


    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelServices;
