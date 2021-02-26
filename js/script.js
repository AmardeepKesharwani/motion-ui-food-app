let activeCard;
let orderData = [];
let $ = document.querySelector.bind(document);
let modal = $("#modal1");
let modal2 = $("#modal2");
let quantity = $("#value");
let price = $("#price")
let title = $("#title");

let text = (el, txt) => {
    if (txt === void 0) {
        return el.innerText;
    }
    el.innerText = txt;
}

const continueFun = () => {
    $(".sec1").style.opacity = 0;
    setTimeout(() => $(".sec1").style.display = "none", 500)
    $("#m").play()
}

const setData = () => {
    text(price, text(activeCard.querySelector(".card__price")))
    text(title, text(activeCard.querySelector(".card__title")))
    quantity.value = 1;
    $("#img").src = activeCard.querySelector(".card__data img").src;
};

Array.from(document.getElementsByClassName("card")).forEach(card => {
    const closeCard = (e) => {
        card.querySelector("span").addEventListener("click", e => {
            e.stopPropagation();
            closeModal()
            card.style.transform = `translate(0,0)`;
            card.classList.remove("active");
            $("body").classList.remove("block");
            card.addEventListener("click", openCard);
        })
    }
    const openCard = () => {
        reac = card.getBoundingClientRect();
        card.style.transform = `translate(-${reac.left}px,-${reac.top}px)`;
        card.classList.add("active");
        $("body").classList.add("block");
        card.removeEventListener('click', openCard);
        closeCard()
        activeCard = card;
        setData()
    }
    card.addEventListener("click", openCard);
})


const closeModal2 = () => modal2.classList.remove("active");

const openModal2 = () => {
    $("#order_list").innerHTML = "";
    modal2.classList.add("active");
    if (orderData.length) {
        orderData.map(order => {
            let list = document.createElement("div");
            list.innerHTML = `
     <div class="modal__card" >
      <div class="modal__img" >
        <img src="${order.img}"  alt="">
      </div>
      <div class="modal__data" >
       <h4>${order.title}</h4>
       <h2>${order.price}</h2>
       <p>quantity : ${order.qrt}</p>
      </div>
     </div>
     `;
            $("#order_list").prepend(list)
        })
    }
    else {
        $("#order_list").innerHTML = "<h2>No Order!</h2> <p>Card is empty</p>";
    }
}

const closeModal = () => {
    if (modal.classList.contains("active")) {
        modal.classList.remove("active")
    }
}
const backToMenu = () => {
    closeModal();
    setTimeout(() => activeCard.querySelector(".close").click(), 500);
}
const backToMenus = () => {
    backToMenu()
    $(".modal__container").style.display = "block";
    activeCard.querySelector(".close").style.display = "block";

    $(".modal__success").classList.remove("show");
}
const completeOrder = () => {
    activeCard.querySelector(".close").style.display = "none";
    $(".modal__container").style.display = "none";
    $(".modal__success").classList.add("show");
    text(activeCard.querySelector(".order__tag"), "Order");

    let order = {
        price: text(price),
        title: text(activeCard.querySelector(".card__title")),
        img: activeCard.querySelector(".card__data img").src,
        qrt: quantity.value
    }
    orderData.push(order);
}

Array.from(document.getElementsByClassName("card__btn")).forEach(btn => {
    btn.addEventListener('click', e => {
        modal.classList.add("active");
    })
})
const increment = () => {
    let qrt = Number(quantity.value);
    let currPrice = text(price).replace("Rs", '');
    currPrice = parseInt(currPrice);

    let proPrice = activeCard.querySelector(".card__price");
    proPrice = text(proPrice).replace("Rs", '');


    if (qrt < 10) {
        quantity.value = ++qrt;
        currPrice = currPrice + Number(proPrice);
        text(price, "Rs " + currPrice)
    }
}

const decrement = () => {
    let qrt = Number(quantity.value);
    --qrt;
    let currPrice = text(price).replace("Rs", '');
    currPrice = parseInt(currPrice);
    let proPrice = activeCard.querySelector(".card__price");
    proPrice = text(proPrice).replace("Rs", '');

    if (qrt <= 0) {
        quantity.value = 1;
        text(price, "Rs " + proPrice);
    } else {
        quantity.value = qrt;
        currPrice = currPrice - Number(proPrice);
        text(price, "Rs " + currPrice);
    }
}