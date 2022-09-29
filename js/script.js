
var products = []
async function getProduct() {
    await fetch("https://striveschool-api.herokuapp.com/api/product/", {
        headers:{
            "Authorization":  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJmNzJmNjQwYWU2YTAwMTU0ZmJiNDEiLCJpYXQiOjE2NjQyOTE4NDEsImV4cCI6MTY2NTUwMTQ0MX0.aI2_6hlSj12cSw9qKQPRcegv_SnL4L_e86JQQKGw0cA"
        }
    }).then(res => {
        return res.json()
    }).then(res => {
        prodotti = res
        creaCards(res)
    })
    }
    getProduct() 

function creaCards(products){
    let containerCards = document.getElementById("containerCards")
    for (let i = 0; i < products.length; i++) {
        let card = document.createElement("div")
        card.classList.add("card")
        card.setAttribute("style", "width: 18rem;", "borde: 1px solid" )
        
        let body = document.createElement("div")
        body.classList.add("card-body")

        let img = document.createElement("img")
       img.classList.add("card-img-top")
        img.setAttribute("src", products[i].imageUrl)

        let title = document.createElement("h4")
        title.classList.add("card-title")
        title.innerText = products[i].name

        let brand = document.createElement("h5")
        brand.classList.add("card-subtitle")
        brand.classList.add("mb-2")
        brand.classList.add("text-muted")
        brand.innerText = products[i].brand

        let description = document.createElement("h6")
        description.classList.add("card-text")
        description.innerText = products[i].description

        let price = document.createElement("h6")
        price.classList.add("text-center")
        price.setAttribute("style", " font-size: large","font-weight: bolder" )
        price.innerText = products[i].price + "euro"

        
     
     //CREO IL BUTTON E L'ENEVTLISTENER DELETE PRODUCT
     let Btn = document.createElement("button")
     Btn.setAttribute("type", "button")
     Btn.classList.add("btn-danger")
    Btn.innerText = "show product info "
     Btn.addEventListener("click", async () => {
     
       
        var opened = window.open("");
        opened.document.write("<body><div class='flud' '><div class='row' ><div  id='demo'>","id del prodotto: "+products[i]._id,"</div></div><div  id='demo'>","Url dell'immagine del prodotto: "+products[i].imageUrl,"</div><div  id='demo'>","Nome prodotto: "+products[i].name,"</div><div  id='demo'>","Descrizione del prodotto: "+products[i].description,"</div><div  id='demo'>","Brand del prodotto: "+products[i].brand,"</div><div  id='demo'>","prezzo del: "+products[i].price,"</div></div></body>")
       

      
     })

        body.appendChild(img)
        body.appendChild(title)
        body.appendChild(brand)
        body.appendChild(description)
        body.appendChild(price)
        body.appendChild(Btn)
        card.appendChild(body)
        containerCards.appendChild(card)
    }
}