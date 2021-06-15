import fetch  from 'node-fetch';
const API_KEY = '285998dbf41059029f87bbf06e16ab91'; //dangerous

export const request = (payload) => {
  const url = 'https://api.themoviedb.org/3/discover'
  const finalUrl = `${url}/movie?api_key=${API_KEY}${payload.params.join('')}&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`

  return fetch(finalUrl).then(res => {
    let result = res.json();
    console.log('resu', result);
    return result
  });

  // return fetch(finalUrl).then(res => {
  //   let result = res.json()
  //   if (payload.count) {
  //     console.log('reus?', result)
  //     result.results = result.results.slice(0, payload.count)
  //   }
  //   return result
  // });
}

//example request
/*
https://api.themoviedb.org/3/discover/movie
?
api_key=285998dbf41059029f87bbf06e16ab91
&language=en-US
&sort_by=popularity.desc
&include_adult=false
&include_video=false
&page=1
&with_watch_monetization_types=flatrate
*/