let url = "https://striveschool-api.herokuapp.com/api/product/";

let  AuthorizationKey=  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJmNzJmNjQwYWU2YTAwMTU0ZmJiNDEiLCJpYXQiOjE2NjQyOTE4NDEsImV4cCI6MTY2NTUwMTQ0MX0.aI2_6hlSj12cSw9qKQPRcegv_SnL4L_e86JQQKGw0cA"
  

 window.onload= function(){
    document.getElementById("createForm").addEventListener("submit", (e)=>{
        e.preventDefault();
        inputForm();
    })
 }


//lettura input.value form

function inputForm(){
    let nameInput = document.getElementById("name").value;
    console.log(nameInput );

    let descriptionInput= document.getElementById("description").value;
    console.log(descriptionInput);

    let brandInput = document.getElementById("brand").value;
    console.log(brandInput);

    let imgInput = document.getElementById("img").value;
    console.log(imgInput);

    let priceInput = document.getElementById("price").value;
    console.log(priceInput);

    let product= {
        name: nameInput,
        description: descriptionInput,
        brand : brandInput,
        imageUrl : imgInput,
        price : priceInput,
    }

    
    console.log("ciao");
    createProdotto(product)
   
}

//function crea prodotti
async function createProdotto(p) {
  

    let response = await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":AuthorizationKey
            },
            body: JSON.stringify(p)
    })
    let res = await response.json()
    console.log("res", res);
    console.log("ciao",response);
   
   createCard2(res)
}  



var product = []
async function getProduct() {
    await fetch("https://striveschool-api.herokuapp.com/api/product/", {
        headers:{
            "Authorization":  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJmNzJmNjQwYWU2YTAwMTU0ZmJiNDEiLCJpYXQiOjE2NjQyOTE4NDEsImV4cCI6MTY2NTUwMTQ0MX0.aI2_6hlSj12cSw9qKQPRcegv_SnL4L_e86JQQKGw0cA"
        }
    }).then(res => {
        return res.json()
    }).then(res => {
        product = res
     creaTable()
        
      
    })
    }

 getProduct()

//Function per la creaazione della  table
let counter = 0;
async function creaTable(){
    let url = "https://striveschool-api.herokuapp.com/api/product/";
     let table= document.getElementsByTagName("table")[0]
     let tBody = document.createElement("tbody")
     for(i=0;i< product.length;i++){
      
    let tr = document.createElement("tr")

    let tdId = document.createElement("td")
    tdId.innerText = product[i]._id

    let tdName = document.createElement("td")
    let tdNInput = document.createElement("input")
    tdNInput.value = product[i].name
    tdNInput.setAttribute("disabled","")
   tdNInput.classList.add("editable")
    tdName.appendChild(tdNInput)

    let tdDesc = document.createElement("td")
    let tdDInput =document.createElement("input")
    tdDInput.setAttribute("disabled","")
    tdDInput.classList.add("editable")
    tdDesc.value = product[i].description
    tdDesc.appendChild(tdNInput)

    let tdBrand = document.createElement("td")
    let tdBInput =document.createElement("input")
    tdBInput.setAttribute("disabled","")
    tdBInput.classList.add("editable")
    tdBInput.setAttribute("disabled","")
    tdBInput.innerText = product[i].brand
    tdBrand.appendChild(tdBInput)

    let tdPrice = document.createElement("td")
    let tdPInput =document.createElement("input")
    tdPInput.setAttribute("disabled","")
    tdPInput.classList.add("editable")
    tdPInput.value = product[i].price
    tdPrice.appendChild(tdPInput)

    //CREAZIONE DEI BUTTON
    let deleteBtn = document.createElement("button")
    let updateBtn = document.createElement("button")

     let btnVal= url + product[i]._id;
       //CREO IL BUTTON E L'ENEVTLISTENER DELETE PRODUCT
       deleteBtn.setAttribute("type", "button")
       deleteBtn.classList.add("btn-danger")
       deleteBtn.classList.add("editable")
       deleteBtn.innerText = "Delete "
       deleteBtn.addEventListener("click", async () => {
       
         
         deleteProduct(btnVal)

        
       })
   
    //CREO IL BUTTON UPDATE E L'ENEVTLISTENER DELETE PRODUCT
   
    updateBtn.setAttribute("type", "button")
    updateBtn.classList.add("btn")
    updateBtn.classList.add("btn-primary")
    updateBtn.innerText = "Edit  "
    updateBtn.addEventListener("click",  (e) => {
       
    
        if (counter == 0) {
            let trpar = e.target.parentNode
            let inputsForm = trpar.getElementsByClassName("editable")
            Array.from(inputsForm).forEach((el)=> {
                editBt(el)
            })
            updateBtn.innerText = "Update"
            counter = 1
        } else {
            let trpar = e.target.parentNode
            let inputsForm = trpar.getElementsByClassName("editable")
            Array.from(inputsForm).forEach((el)=> {
                let text = "Sei sicuro di voler modificare il prodotto in: " + el.value ;
                if(confirm(text) == true) {
                    let newProduct = {
                        name: tdNInput.value,
                        description: tdDInput.value,
                        price: tdPInput.value,
                        brand: tdBInput.value
                    }
                    
                    let options = {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization":  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJmNzJmNjQwYWU2YTAwMTU0ZmJiNDEiLCJpYXQiOjE2NjQyOTE4NDEsImV4cCI6MTY2NTUwMTQ0MX0.aI2_6hlSj12cSw9qKQPRcegv_SnL4L_e86JQQKGw0cA"
                        },
                        body: JSON.stringify(newProduct)
                    }
                    let response = fetch(btnVal, options)
                    console.log(response);
                   disable(el)
                }
            })
            updateBtn.innerText = "Edit"
            counter = 0
        }

       
      })
    
    table.appendChild(tBody)
    tBody.appendChild(tr)
    tr.appendChild(tdId)
    tr.appendChild(tdName)
    tr.appendChild(tdDesc)
    tr.appendChild(tdBrand)
    tr.appendChild(tdPrice)
    tr.appendChild(deleteBtn)
    tr.appendChild(updateBtn)
    
    
}
}

function editBt(el) {
    el.removeAttribute("disabled");
}

function disable(el) {
    el.setAttribute("disabled","");
}



//DELETE PRODOTTO

async function deleteProduct(p){
    apriCaricamento
    let text = "sei sicuro di voler eliminare il prodotto?"
    
    if(confirm(text)==true){
        let response = await fetch(p, {
            method: "DELETE",
            headers: {
                "Authorization":  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJmNzJmNjQwYWU2YTAwMTU0ZmJiNDEiLCJpYXQiOjE2NjQyOTE4NDEsImV4cCI6MTY2NTUwMTQ0MX0.aI2_6hlSj12cSw9qKQPRcegv_SnL4L_e86JQQKGw0cA"
            }
        })
        
        window.location.reload()
      
        if(response.status == 200) return true
       
        return false
    }
    
}



//creazione card del prodotto inserito

function createCard2(p){
    let containerCards = document.getElementById("card")
        let card = document.createElement("div")
        card.classList.add("card")
        card.setAttribute("style", "width: 18rem;", "borde: 1px solid" )
        
        let cardBody = document.createElement("div")
        cardBody.classList.add("card-body")

        let cardImg = document.createElement("img")
        cardImg.classList.add("card-img-top")
        cardImg.setAttribute("src", p.imageUrl)

        let cardTitle = document.createElement("h4")
        cardTitle.classList.add("card-title")
        cardTitle.innerText = p.name

        let cardBrand = document.createElement("h5")
        cardBrand.classList.add("card-subtitle")
        cardBrand.classList.add("mb-2")
        cardBrand.classList.add("text-muted")
        cardBrand.innerText = p.brand

        let cardDescription = document.createElement("h6")
        cardDescription.classList.add("card-text")
        cardDescription.innerText = p.description

        let cardPrice = document.createElement("h6")
        cardPrice.classList.add("text-center")
        cardPrice.setAttribute("style", " font-size: large","font-weight: bolder" )
        cardPrice.innerText = p.price + "euro"

        cardBody.appendChild(cardImg)
        cardBody.appendChild(cardTitle)
        cardBody.appendChild(cardBrand)
        cardBody.appendChild(cardDescription)
        cardBody.appendChild(cardPrice)
        card.appendChild(cardBody)
        containerCards.appendChild(card)
    }


//CARICAMENTO
function apriCaricamento() {
    // document.getElementById("prodotti").innerHTML = "Caricamento..."
    document.getElementById("caricamento").classList.remove("hidden")
}

function chiudiCaricamento() {
    // document.getElementById("prodotti").innerHTML = ""
    document.getElementById("caricamento").classList.add("hidden")
    
}