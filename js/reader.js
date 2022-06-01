let landmark = [];
const content = document.getElementById('content');
const openModal = (e) => {

    const modalTitle = document.getElementById("exampleModalLongTitle");
    const index = e.target.getAttribute("item-index");
    const name = e.target.getAttribute("item-name");
    /* console.log(e.target.getAttribute("item-data"));*/
    const data = landmark[name][index];
    const modalFromJSON = document.getElementById("modalFromJSON");


    modalTitle.innerHTML = data.Name;

    modalFromJSON.innerHTML = `<img src="${data.Image}" class="img-responsive" width="100%">
    <br>
    <p>${data.Description}</p>
    <iframe src="${data.Location}"
        width="400" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`

    $('#treskavica').modal('toggle')


};

const generateListItem = (data, index, fileName) => {
    return ` <div class="col-sm-3">
    <div class="container-fluid">
        <img src="${data.Image}" class="landmark-img" width="100%">
    </div>
    <h3>${data.Name}</h3>
    <p>${data.Description.substring(0,100)}</p>
    <button type="button" class="btn btn-primary openModalButton" item-index='${index}' item-name='${fileName}'>
        More...
    </button>
    <hr>
</div>`;
}


const loadList = (fileName, divID) => {
    const content = document.getElementById(divID);
    let parsedHTML = [];
    landmark[fileName].forEach((obj, index) => {

        parsedHTML.push(generateListItem(obj, index, fileName))

    });
    content.innerHTML = parsedHTML.join("");
    const button = document.getElementsByClassName('openModalButton');
    for (let i = 0; i < button.length; i++) {
        button[i].addEventListener("click", openModal);
    }

};




(async() => {
    await fetch(`./dzejev_sin/landmarks.json`)
        .then(response => {
            return response.json();
        })
        .then(jsondata => landmark = jsondata);

    loadList('Mountains', '1a')
})()