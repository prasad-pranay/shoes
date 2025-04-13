const wrapper = document.querySelector(".slideWrapper")
const menuItems = document.querySelectorAll(".menuItem")

const products = [
  {
    id: 1,
    title: "Air Force",
    price: 24999,
    colors: [
      {
        code: "black",
        img: "/air.png",
      },
      {
        code: "darkblue",
        img: "/air2.png",
      },
    ],
  },
  {
    id: 2,
    title: "Jordan",
    price: 14999,
    colors: [
      {
        code: "lightgray",
        img: "/jordan.png",
      },
      {
        code: "green",
        img: "/jordan2.png",
      },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 19999,
    colors: [
      {
        code: "lightgray",
        img: "/blazer.png",
      },
      {
        code: "green",
        img: "/blazer2.png",
      },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 9999,
    colors: [
      {
        code: "black",
        img: "/crater.png",
      },
      {
        code: "lightgray",
        img: "/crater2.png",
      },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 14999,
    colors: [
      {
        code: "gray",
        img: "/hippie.png",
      },
      {
        code: "black",
        img: "/hippie2.png",
      },
    ],
  },
];

let choosenProduct = products[0];
const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

// menuItems.forEach((item, index) => {
//   item.addEventListener("click", () => {
//     //change the current slide
//     wrapper.style.transform = `translateX(${-100 * index}vw)`;

//     choosenProduct = products[index];

//     currentProductTitle.textContent = choosenProduct.title;
//     currentProductPrice.textContent = "₹" + choosenProduct.price;
//     currentProductImg.src = choosenProduct.colors[0].img;
//     currentProductColors.forEach((color, index) => {
//       color.style.backgroundColor = choosenProduct.colors[index].code;
//     });
//   });
// });


// Changing Product Color
currentProductColors.forEach((color, index) => {
  color.addEventListener("click",()=>{
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});


//Size of shoe selection.
currentProductSizes.forEach((size, index) =>{
  size.addEventListener("click",()=>{
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () =>{
  emptyCartHide()
  let imgSrc = document.querySelector(".productImg").getAttribute("src");
  if(cartItem.hasOwnProperty(imgSrc)){
    cartItem[imgSrc][2] += 1;
    document.getElementsByClassName(itemData[imgSrc][0])[0].children[2].value = cartItem[imgSrc][2];
    document.getElementsByClassName(itemData[imgSrc][0])[0].children[2].dispatchEvent(new Event("change"));
  }else{
    cartItem[imgSrc] = [itemData[imgSrc][0],itemData[imgSrc][1],1];
    makeCartItem(imgSrc,itemData[imgSrc][0],itemData[imgSrc][1]);
  }
  
})

close.addEventListener("click", () =>{
  payment.style.display = "none"
  document.body.style.overflowY = "auto"
})