const sliderItem = document.getElementsByClassName("sliderItem")[0]
// sliderItem.addEventListener("mousemove",(e)=>{
//     console.log(e.clientX,e.clientY)
//     console.log("hey there",sliderItem.clientHeight,sliderItem.clientWidth)
// })



const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    // effect: 'flip',
    effect: 'coverflow',
    // effect: 'cube',
    // effect: 'fade',
    // effect: 'slide',
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });



const buyButton = document.querySelectorAll(".buyButton");
buyButton.forEach((ele)=>{
  ele.addEventListener("click",()=>{
    let imgSrc = ele.parentElement.parentElement.children[0].getAttribute("src")
    let name = ele.parentElement.parentElement.children[2].innerHTML.split("<br>")[0]
    let price = ele.parentElement.parentElement.children[3].textContent
    document.querySelector(".productImg").setAttribute("src",imgSrc)
    document.querySelector(".productTitle").textContent = name
    document.querySelector(".productPrice").textContent = price
  })
})


const listOfItem = ["AIR FORCE","BLAZER","JORDAN","CRATER","HIPPIE"]
// #search on navbar here
document.querySelector(".searchInput").addEventListener("keydown",(event)=>{
  if(event.key == "Enter"){
    // if(listOfItem.includes(event.target.value)){
    let value = event.target.value.toUpperCase()
    for(let i = 0;i<listOfItem.length;i++){
      if(listOfItem[i].includes(value)){
        swiper.slideTo(i)
        event.target.value = ""
        event.target.blur()
        return;
      }
    }

      
      alert(`Sorry, we currently do not have any item named '${event.target.value}'`)

  }
})

// false means signin in and true means sign up
var singStatus = false;
function signIn(){
  singStatus = false;
  document.querySelector(".login").style.display = "grid"
  document.querySelector(".login h1").textContent = "Login";
  document.querySelectorAll(".login input")[1].style.display = "none";
  document.querySelectorAll(".login button")[1].textContent = "Sign In";
  document.getElementById("forgot").style.display = "block"

}
function signUp(){
  singStatus = true;
  document.querySelector(".login").style.display = "grid"
  document.querySelector(".login h1").textContent = "Sign Up";
  document.querySelectorAll(".login input")[1].style.display = "block";
  document.getElementById("forgot").style.display = "none"
  document.querySelectorAll(".login button")[1].textContent = "Sign Up";
}

function closeLogin(){
  document.querySelector(".login").style.display = "none"
}


const imageChnager = setInterval(() => {
  document.getElementById("next").click();
}, 4000);


// pinky promise here
document.getElementById("pinky-no").addEventListener("click",()=>{
  document.querySelector(".pinky").style.display = "none";
})
document.getElementById("pinky-yes").addEventListener("click",()=>{
  // uesr login hereeeee
  const name = document.querySelector(".login input").value.toLocaleLowerCase();
  if(name.length < 3){
    alert("The username should be greater than 3 alphabets");
  }else{
    fetch(`/exists?name=${name}`).then(response=>response.json()).then(result=>{
      if(result["status"]=="false"){
        alert("User does not exist")
      }else{
        alert(`Your Password is : ${result["password"]}`);
      }
    })
  }
  document.querySelector(".pinky").style.display = "none";

})
document.getElementById("forgot").addEventListener("click",()=>{
  document.querySelector(".pinky").style.display = "flex";
})

// pinky promise here


function saveData(){
  const input = document.querySelectorAll(".login input");
  const name = input[0].value.toLocaleLowerCase();
  const age = input[1].value;
  const password = input[2].value;
  if(name.length < 3){
    alert("Name should be greater than 3 alphabets")
    return
  }
  if(singStatus && password.length < 5){
    alert("Password length should be greater than 5")
    return
  }

  fetch(`/exists?name=${name}`).then(response=>response.json()).then(result=>{
    
    if(singStatus){
      // means sign up is happening
      if(result["status"]=="false"){
        // means that the user does not exist at all
        fetch(`/signup?name=${name}&age=${age}&password=${password}&cart=${JSON.stringify(cartItem)}`)
        localStorage.setItem("name",name)
        localStorage.setItem("age",age)
        localStorage.setItem("password",password)
        localStorage.removeItem("cart")
        window.location.reload()
      }else{
        alert("User already exist, Please sign in");
        return;
      }
    }else{
      // means sign in is happening
      if(result["status"]=="false"){
        alert("User does not exists");
      }else{
        if (password == result["password"]){
          // sign in the user
          localStorage.setItem("name",name)
          localStorage.setItem("age",age)
          localStorage.setItem("password",password)
          localStorage.removeItem("cart")
          window.location.reload()
        }else{
          alert("Wrong Password|")
        }
      }
    }
  })

  
  
}

var USERNAME = null;

// check login details
function checkLogin(){
  const name = localStorage.getItem("name");
  if(name!=null){
    document.getElementById("logged-out").style.display = "none"
    document.getElementById("logged-in").style.display = "flex"
    document.querySelector("#logged-in h1 span").textContent = name;
    USERNAME = name;
    fetch(`/cart?name=${USERNAME}`).then(response=>response.json()).then(result=>{
      cartItem = JSON.parse(result["value"]);
      for(let i in cartItem){
        emptyCartHide()
        makeCartItem(i,cartItem[i][0],cartItem[i][1],cartItem[i][2])
      }
    })
  }else{
    // getting previoous cart datas
    let c = localStorage.getItem("cart")
    if(c!=undefined && c!=null){
      cartItem = JSON.parse(c)
      for(let i in cartItem){
        emptyCartHide()
        makeCartItem(i,cartItem[i][0],cartItem[i][1],cartItem[i][2])
      }
    }
  }
}

function signOut(){
  localStorage.removeItem("name")
  localStorage.removeItem("age")
  localStorage.removeItem("password")
  localStorage.removeItem("cart")
  window.location.reload()
}


function savedCardSaveOrder(){
  if(USERNAME==null){
    alert("You have to login first!!!")
    return;
  }
  let name = document.querySelector(".address h1").textContent
  let phone = document.querySelector(".address h2").textContent
  let address = document.querySelector(".address h3").textContent

   // for now 
   document.querySelector(".payment").style.display = "none"
   document.querySelector(".order").style.display = "flex"
   setTimeout(() => {
     document.querySelector(".order span").textContent = "2"
   }, 1000);
   setTimeout(() => {
     document.querySelector(".order span").textContent = "1"
   }, 2000);
   setTimeout(() => {
     document.querySelector(".order span").textContent = "0"
     document.querySelector(".order").style.display = "none"
     document.querySelector(".order span").textContent = "3"
     window.location.reload()
   }, 3000);
  fetch(`/order?name=${USERNAME}&items=${JSON.stringify(cartItem)}&address=${name + ";;;" + phone + ";;;" + address}}`)
  cartItem = {}
  updateCartItem();
}

function saveOrder(){
  if(USERNAME==null){
    alert("You have to login first!!!")
    return;
  }
  const paymentInput = document.querySelectorAll(".payment input");
  
  let values = {
      "name" : [paymentInput[1].value,4],
     "Phone Number" : [paymentInput[2].value,12],
     "address" : [paymentInput[3].value,20],
     "cardNumber" : [paymentInput[4].value,16],
     "expiryMonth" : [paymentInput[5].value,2],
     "expiryYear" : [paymentInput[6].value,2],
     "cvv" : [paymentInput[7].value,3]
  }
  for (const [key, value] of Object.entries(values)) {
    if(value[0].length < value[1]){
      alert(`The ${key} should be minimum of the length ${value[1]}`)
      return;
    }
  }
  localStorage.setItem("address",`${values["name"][0]};-;${values["Phone Number"][0]};-;${values["address"][0]}`)
  localStorage.setItem("card",`${values["cardNumber"][0]};-;${values["expiryMonth"][0]};-;${values["expiryYear"][0]};-;${values["cvv"][0]}`)



  // for now 
  document.querySelector(".payment").style.display = "none"
  document.querySelector(".order").style.display = "flex"
  setTimeout(() => {
    document.querySelector(".order span").textContent = "2"
  }, 1000);
  setTimeout(() => {
    document.querySelector(".order span").textContent = "1"
  }, 2000);
  setTimeout(() => {
    document.querySelector(".order span").textContent = "0"
    document.querySelector(".order").style.display = "none"
    document.querySelector(".order span").textContent = "3"
    window.location.reload()
  }, 3000);


  fetch(`/order?name=${USERNAME}&items=${JSON.stringify(cartItem)}&address=${values["name"][0] + ";;;" + values["Phone Number"][0] + ";;;" + values["address"][0]}}`)
  cartItem = {}
  updateCartItem();
}



// validation
function checkValidation(event,number,lessthan=null){
  if(lessthan!=null && parseInt(event.target.value)>lessthan){
    event.target.style.color = "red"
    setTimeout(() => {
      event.target.style.color = "var(--text-color)"
    }, 1000);
    event.target.value = lessthan;
  }else{
    event.target.style.color = "var(--text-color)"
  }
  if(event.code == "Backspace" || event.code == "Delete"){

  }
  else if(event.target.value.length > number){
    event.preventDefault()
    event.target.value = event.target.value.slice(0,number);
  }

}



// theme 0 means light theme and 1 means vice verca
var theme = 0;
function switchTheme(){
  if(theme==0){
    localStorage.setItem("theme",'1')
    theme = 1;
    document.getElementById("theme").children[0].setAttribute("d","M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z")
    document.documentElement.style.setProperty('--bg-color', '#000');
    document.documentElement.style.setProperty('--text-color', '#fff');
  }else{
    localStorage.setItem("theme",'0')
    theme = 0;
    document.getElementById("theme").children[0].setAttribute("d","M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z")
    document.documentElement.style.setProperty('--bg-color', '#fff');
    document.documentElement.style.setProperty('--text-color', '#000');
  }
}
if(localStorage.getItem("theme")=="1"){
  switchTheme();
}



// 0 means menu is closed
var menu = 0;
function openMenu(){
  if(menu==0){
    menu=1;
    document.querySelector(".navBottom").style.display = "flex"
    document.getElementById("menu").children[0].children[0].setAttribute("d","M6 18 18 6M6 6l12 12");
  }else{
    menu=0;
    document.querySelector(".navBottom").removeAttribute("style")
    document.getElementById("menu").children[0].children[0].setAttribute("d","M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5");

  }
}





function checkSavedCard(){
  if(localStorage.getItem("card")==null){
    return;
  }
  document.querySelector(".savedAddresses").style.display = "flex"
  // localStorage.setItem("address",`${values["name"][0]};-;${values["Phone Number"][0]};-;${values["address"][0]}`)
  // localStorage.setItem("card",`${values["cardNumber"][0]};-;${values["expiryMonth"][0]};-;${values["expiryYear"][0]};-;${values["cvv"][0]}`)
  const address = localStorage.getItem("address").split(";-;")
  const card = localStorage.getItem("card").split(";-;")

  const addressContainer = document.querySelector(".address").children
  const cardContainer = document.querySelector(".card").children

  addressContainer[1].textContent = address[0]
  addressContainer[2].textContent = address[1]
  addressContainer[3].textContent = address[2]

  cardContainer[1].textContent = card[0]
  cardContainer[2].textContent = `${card[1]} / ${card[2]}`
  cardContainer[3].textContent = address[0];
  cardContainer[4].textContent = card[3]
}

function emptyCartShow(){
  document.querySelectorAll(".cart-container .empty")[0].style.display = "block";
  document.querySelectorAll(".cart-container .empty")[1].style.display = "block";
  document.querySelector(".cart-container").classList.add("cart-empty")
}
function emptyCartHide(){
  document.querySelectorAll(".cart-container .empty")[0].style.display = "none";
  document.querySelectorAll(".cart-container .empty")[1].style.display = "none";
  document.querySelector(".cart-container").classList.remove("cart-empty")
}

function proceedPayment(){
  checkSavedCard()
  window.location.href = "#product";
  document.body.style.overflow = "hidden"
  payment.style.display = "flex"
}

var itemData = {
  "/air.png": ["AIR_FORCE",24999],
"/jordan.png": ["JORDAN",14999],
"/blazer.png": ["BLAZER",19999],
"/crater.png": ["CRATER",9999],
"/hippie.png": ["HIPPIE",14999],
}

var cartItem = {}

function updateCartItem(){
  var saveData = JSON.stringify(cartItem);

  if(USERNAME!=null){
    // it means the user is logged in
    fetch( `/update?name=${USERNAME}&cart=${saveData}`)
  }else{
    // this means the user is logged out so getting data from the local storage
    localStorage.setItem("cart",saveData);
  }
}
const cartItemContainer = document.querySelector(".cart-container .items")

const totalPrice = document.getElementById("total")

function refreshTotal(){
  const totalPriceEachItem = document.querySelectorAll(".total-count")
  let total = 0;
  totalPriceEachItem.forEach(ele=>{
    total += parseInt(ele.textContent.slice(1))
  })
  totalPrice.textContent = "₹ "+parseInt(total)
  document.getElementById("cart-count").textContent = Object.keys(cartItem).length
  if(Object.keys(cartItem).length < 1){
    emptyCartShow()
  }
  updateCartItem()
}

function makeCartItem(image,name,prices,count=1){
  const container = document.createElement("div");
  container.setAttribute("class",name)

  // Create and append image
  const img = document.createElement("img");
  img.src = image;
  img.alt = "";
  container.appendChild(img);

  // Create and append heading
  const heading = document.createElement("h3");
  heading.textContent = name;
  container.appendChild(heading);

  // Create and append select
  const select = document.createElement("select");

  for (let i = 1; i <= 9; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    select.appendChild(option);
  }

 

  select.addEventListener("change", function () {
    span1.textContent = "₹"+ parseInt( prices * this.value);
    cartItem[image][2] = select.value;
    refreshTotal()
  });

  setTimeout(() => {
    select.value = count;
  select.dispatchEvent(new Event("change"));
  }, 1000);

  container.appendChild(select);

  // Create and append price paragraph
  const price = document.createElement("p");
  const span = document.createElement("span");
  const span1 = document.createElement("span");
  span1.setAttribute("class","total-count")
  span.textContent = "₹"+prices;
  span1.textContent ="₹"+ prices;

  price.appendChild(span);
  price.appendChild(span1);
  container.appendChild(price)

  const svgNS = "http://www.w3.org/2000/svg";

  // Create <svg> element
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("xmlns", svgNS);
  svg.setAttribute("fill", "none");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("stroke-width", "1.5");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("class", "size-6");

  // Create <path> element
  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("d", "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0");

  // Append <path> to <svg>
  svg.appendChild(path);
  container.appendChild(svg)
  svg.addEventListener("click",()=>{
    container.remove();
    cartItem = Object.fromEntries(
      Object.entries(cartItem).filter(([key]) => key !== image)
    );
    refreshTotal();
  })
  cartItemContainer.appendChild(container)
  refreshTotal()
}




checkLogin()