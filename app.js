const search = document.getElementById("search");
const searchbtn = document.getElementById("searchBtn");
const searchbtn2 = document.querySelectorAll(".btn-info");
searchbtn2.forEach((element) => {
  element.addEventListener("click", getLyrcis);
});
const songContainer = document.getElementById("song-container");
searchbtn.addEventListener("click", searchSong);

function searchSong() {
  songContainer.innerHTML = "";
  const div = document.createElement("div");
  div.className = "spinner-border text-light";
  div.setAttribute("role", "status");
  div.innerHTML = `<span class="visually-hidden">Loading...</span>`;
  songContainer.appendChild(div);
  const value = search.value;
  const url = ` https://api.lyrics.ovh/suggest/${value}`;
  console.log(`searching and loading data for ${value}`);

  fetch(url)
    .then((rsp) => rsp.json())
    .then((json) => display(json.data));
}
function display(song) {
  songContainer.innerHTML = "";
  song.forEach((element) => {
    const div = document.createElement("div");
    div.className = "single-result row align-items-center my-3 p-3";
    div.innerHTML = `
        <div class="col-md-9">
          <h3 class="lyrics-name">${element.title}</h3>
          <p class="author lead">Album by <span>${element.artist.name}</span></p>
          <audio controls src="${element.preview}">can't show preview</audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
          <button class="btn btn-info">Get Lyrics</button>
        </div>
      `;
    const btns = document.querySelectorAll(".btn-info");
    btns.forEach((elem) => {
      elem.addEventListener("click", getLyrcis);
    });
    songContainer.appendChild(div);
  });
}

function getLyrcis() {
  songContainer.innerHTML = "";
  const div = document.createElement("div");
  div.className =
    "single-result row align-items-center justify-content-center my-3 p-3";
  div.innerText = "No Lyrics Found";
  songContainer.appendChild(div);
}
//add spinner before the api loads data on ui
