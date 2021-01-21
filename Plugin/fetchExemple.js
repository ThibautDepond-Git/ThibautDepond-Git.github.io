const heyBtn = document.getElementById("hey");
const heyWithAsyncAwaitBtn = document.getElementById("heyWithAsyncAwait");


export function envoyerRequete(location) {
  return new Promise((resolve, reject) => {
    console.log(`making request to ${location}`)
    if (location === "Google") {
      resolve("Google dit hello !")
    } else {
      reject({ message: "On ne peut parler qu'à Google" })
    }
  });
}

export function traiterReponse(response) {
  return new Promise((resolve, reject) => {
    console.log("Traitement de la réponse")
    resolve(`Réponse traitée... ${response}`)
  });
}

export const hey = () => {
  envoyerRequete('https://perdu.com')
    .then((res) => traiterReponse(res))
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

export const heyWithAsyncAwait = async () => {
  const response = await envoyerRequete('Google')
  const responseT = await traiterReponse(response)
  console.log(responseT)
}

heyBtn.addEventListener("click", hey);
heyWithAsyncAwaitBtn.addEventListener("click", heyWithAsyncAwait);

(function main() {
  console.log('-- hello --');
})();

