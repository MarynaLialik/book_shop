document.body.className = "main-background";
let fragment = new DocumentFragment();
fragment.append(addHeader(), addMain());
document.body.append(fragment);
let cartItems = [];
let cartSumValue = 0;

function addHeader() {
    let header = document.createElement('header');
    header.className = "header";
    header.innerHTML = "<h1>Maryna's online book shop</h1>";
    return header;
}

function addMain() {
    let main = document.createElement('main');
    main.className = "main";
    let containerMain = document.createElement('div');
    containerMain.className = "containerMain";
    let info = document.createElement('div');
    info.className = "info";

    let cartContainer = document.createElement('div');
    cartContainer.className = "cartContainer";

    let cart = document.createElement('div');
    cart.className = "cart";

    let title1 = document.createElement('h2');
    title1.innerHTML = "Book's catalog:";

    let title2 = document.createElement('h2');
    title2.innerHTML = "My Cart:";
    let titlePrice = document.createElement('h2');
    titlePrice.innerHTML = "Total sum: ";
    let cartSum = document.createElement('h2');
    cartSum.className = "cartSum";
    cartSum.innerHTML = '0$';

    let confirmation = document.createElement('div');
    confirmation.className = "confirmation";
    let confirmationAnchor = document.createElement('a');
    confirmationAnchor.setAttribute('href',"confirmForm.html");

    let confirmButton= document.createElement('div');
    confirmButton.className = "confirmButton";
    confirmButton.textContent = 'Confirm order';

    //confirmButton.onclick = () => confirmOrder();

    info.append(title1);
    cartContainer.append(cart);
    cart.append(title2);
    cart.append(titlePrice);
    cart.append(cartSum);
    cartContainer.append(confirmation);
    confirmation.append(confirmationAnchor); 
    confirmationAnchor.append(confirmButton);
    containerMain.append(info); 
    containerMain.append(cartContainer);
    main.append(containerMain);
    return main;
}

function addBook(item, index) {
   // console.log(item);
    let book = document.createElement('div');
    book.classList.add('book');
    book.classList.add('book-'+index);
    let bookIcon = document.createElement('div');
    bookIcon.className = "bookIcon";
    let bookOptions = document.createElement('div'); 
    bookOptions.className = "bookOptions";
    let bookCart = document.createElement('div');
    bookCart.className = "bookCart";
    let bookShowMore= document.createElement('div');
    bookShowMore.className = "bookShowMore";
     
    bookCart.addEventListener("click", () => addToCart(item, index));
    bookShowMore.append(createPopupDescription(item, index)); 

    book.append(bookIcon);
    book.append(createBookInfo(item));
    bookOptions.append(bookCart);
    bookOptions.append(bookShowMore);
    book.append(bookOptions);
    return book;
}

function createPopupDescription(item, index){
    let popup = document.createElement('div');
    popup.classList.add('popup');
    popup.onclick = ()=>openPopUp(index);
    popup.textContent = 'Show more';
    let popupText = document.createElement('span');
    popupText.classList.add('book-desc-'+index);
    popupText.classList.add('popupText');
    popupText.innerHTML = item["description"]+"<br/>";
    let button = document.createElement('button');
    button.innerHTML = 'Close';
    button.addEventListener("click", (e)=>{
        console.log('closed button'+index);
        closePopUp(e, index);
    })
    popupText.append(button);  
    popup.append(popupText);
    return popup;
}

function createBookInfo(item) {
    
    let bookInfo = document.createElement('div');
    let bookTitle = document.createElement('h4');
    let bookAuthor = document.createElement('h5');
    let bookPrice = document.createElement('h5');
    bookInfo.className = "bookInfo";
    bookTitle.className = "bookTitle";
    bookAuthor.className = "bookAuthor";
    bookPrice.className = "bookPrice";
    bookTitle.innerHTML = item["title"];
    bookAuthor.innerHTML = item["author"];
    bookPrice.innerHTML = `Price: ${item["price"]}\$`;
    bookInfo.append(bookTitle); 
    bookInfo.append(bookAuthor);
    bookInfo.append(bookPrice);
    return bookInfo;
}

function openPopUp(index) {
    let popupText = document.querySelector('.book-desc-'+index);
    popupText.classList.add("show");
}

function closePopUp(e, index) {
    let popupText = document.querySelector('.book-desc-'+index);
    popupText.classList.remove("show");
    e.stopPropagation();
}

function addToCart(item) { 

    console.log('click to cart');
    cartItems.push(item);
    let cartIndex = cartItems.length -1;
    console.log(cartItems);
    cartSumValue += item["price"];
    console.log(cartSumValue);
    
    let book = document.createElement('div');
    book.classList.add("book");
    book.classList.add('bookInCart-' + cartIndex);
    let bookIcon = document.createElement('div');
    bookIcon.className = "bookIcon";
    let bookOptions = document.createElement('div'); 
    bookOptions.className = "bookOptions";
    let bookRemove= document.createElement('div');
    bookRemove.className = "bookRemove";
    bookRemove.textContent = 'X';
    
    bookRemove.addEventListener("click", () => removeItem(item, cartIndex));
    
    book.append(bookIcon);
    book.append(createBookInfo(item));
    bookOptions.append(bookRemove);
    book.append(bookOptions);
    document.querySelector('.cart').append(book);
    document.querySelector('.cartSum').innerHTML = `${cartSumValue}\$`;
    console.log('in cart book-' +cartIndex);
    return
}

function removeItem (item, cartIndex) {
    //console.log ('removeItem  .book'+cartIndex);
    document.querySelector('.bookInCart-'+cartIndex).remove();
    cartItems[cartIndex]=null;
    cartSumValue -= item["price"];
    //console.log(cartSumValue);
    document.querySelector('.cartSum').innerHTML = `${cartSumValue}\$`;
}

function confirmOrder() {


}
