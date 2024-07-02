// Function to toggle cart popup
function toggleCartPopup() {
    const cartPopup = document.querySelector('.cart-popup');
    cartPopup.style.display = (cartPopup.style.display === 'none' || cartPopup.style.display === '') ? 'block' : 'none';
}

// Function to close cart popup
function closeCart() {
    document.querySelector('.cart-popup').style.display = 'none';
}

// Function to add item to cart
function addToCart(itemName, itemPrice) {
    const cartItems = document.querySelector('#cart-items tbody');
    const newRow = document.createElement('tr');

    const itemCell = document.createElement('td');
    itemCell.textContent = itemName;
    newRow.appendChild(itemCell);

    const quantityCell = document.createElement('td');
    quantityCell.textContent = 1;
    newRow.appendChild(quantityCell);

    const priceCell = document.createElement('td');
    priceCell.textContent = itemPrice.toFixed(2);
    newRow.appendChild(priceCell);

    const totalCell = document.createElement('td');
    totalCell.textContent = itemPrice.toFixed(2);
    newRow.appendChild(totalCell);

    cartItems.appendChild(newRow);

    updateCartTotal();
}

// Function to update cart total
function updateCartTotal() {
    const cartItems = document.querySelectorAll('#cart-items tbody tr');
    let total = 0;

    cartItems.forEach(item => {
        const itemTotal = parseFloat(item.cells[3].textContent);
        total += itemTotal;
    });

    document.querySelector('#cart-total').textContent = total.toFixed(2);
    document.querySelector('#cart-count').textContent = cartItems.length;
}

// Initializing event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#search-btn').addEventListener('click', () => {
        alert('Search functionality to be implemented.');
    });

    document.querySelector('.menu-toggle').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('active');
    });
});




// Eveniment de căutare pentru bara de căutare
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');

searchButton.addEventListener('click', updateCartCountAndTotal);
searchInput.addEventListener('input', updateCartCountAndTotal);

// Updatează numărul total de articole din coș și suma totală
function updateCartCountAndTotal() {
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartItems = document.querySelectorAll('#cart-items tbody tr');
    let totalCount = 0;
    let total = 0;
    cartItems.forEach(item => {
        const itemCount = parseInt(item.querySelector('.item-count').textContent);
        const itemTotal = parseFloat(item.querySelector('.item-total').textContent);
        totalCount += itemCount;
        total += itemTotal;
    });
    cartCount.textContent = totalCount;
    cartTotal.textContent = total.toFixed(2);

    // Filtrare meniu în funcție de termenul introdus în bara de căutare
    const searchTerm = searchInput.value.toLowerCase();
    const menuItems = document.querySelectorAll('.detail-card');
    menuItems.forEach(item => {
        const itemName = item.querySelector('.detail-name h4').textContent.toLowerCase();
        if (itemName.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Funcție pentru adăugarea unui produs la favorite
function addToFavorites(button) {
    const card = button.closest('.detail-card');
    card.classList.toggle('favorite');
}

// Funcție pentru afișarea sau ascunderea secțiunii de favorite
function toggleFavoritesSection() {
    const favoritesSection = document.querySelector('.favorites');
    favoritesSection.classList.toggle('active');
}

// Eveniment de clic pentru adăugarea la favorite
const addToFavoritesButtons = document.querySelectorAll('.add-to-favorites-btn');
addToFavoritesButtons.forEach(button => {
    button.addEventListener('click', function() {
        addToFavorites(button);
    });
});

// Eveniment de clic pentru afișarea sau ascunderea secțiunii de favorite
// const favoritesButton = document.querySelector('.dashboard-menu a[href="#Favorites"]');
// favoritesButton.addEventListener('click', toggleFavoritesSection);


// Funcție pentru a face request-ul AJAX
function fetchCategories() {
    // Folosește funcția fetch pentru a face request-ul
    fetch('https://localhost:7077/api/Categorii')
        .then(response => response.json()) // Transformă răspunsul în format JSON
        .then(data => {
            // Apelată când primim datele JSON
            buildCards(data); // Trimite datele către funcția de construire a cardurilor
        })
        .catch(error => {
            console.error('Error fetching categories:', error); // În caz de eroare, afișează-o în consolă
        });
}

// Funcție pentru a construi cardurile pe baza datelor JSON primite
function buildCards(categories) {
    const filterWrapper = document.querySelector('.filter-wrapper'); // Obține elementul cu clasa 'filter-wrapper'

    // Pentru fiecare categorie din array-ul JSON
    categories.forEach(category => {
        // Creează un element div pentru cardul de filtru
        const filterCard = document.createElement('div');
        filterCard.classList.add('filter-card');

        // Creează elementul pentru iconița categoriei
        const filterIcon = document.createElement('div');
        filterIcon.classList.add('filter-icon');
        filterIcon.innerHTML = `<ion-icon name="${category.imagine}"></ion-icon>`; // Folosește numele imaginii din JSON

        // Creează un element p pentru numele categoriei
        const categoryName = document.createElement('p');
        categoryName.textContent = category.nume; // Folosește numele categoriei din JSON

        // Adaugă iconița și numele categoriei la cardul de filtru
        filterCard.appendChild(filterIcon);
        filterCard.appendChild(categoryName);

        // Adaugă cardul de filtru în containerul filterWrapper
        filterWrapper.appendChild(filterCard);
    });
}

// Apelează funcția pentru a începe procesul de fetch și construire a cardurilor
fetchCategories();

document.getElementById('showSignup').addEventListener('click', function() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupForm').classList.remove('hidden');
});

document.getElementById('showLogin').addEventListener('click', function() {
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
});

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".sidebar .sidebar-menu a");
    const content = document.getElementById("content");

    function loadPage(page) {
        fetch(`${page}.html`)
            .then(response => response.text())
            .then(data => {
                content.innerHTML = data;
            })
            .catch(error => console.error('Error loading page:', error));
    }

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetPage = e.currentTarget.getAttribute("data-page");
            loadPage(targetPage);
        });
    });

    // Load the home page by default
    loadPage('home');
});


navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetPage = e.currentTarget.getAttribute("data-page");
        loadPage(targetPage); // Utilizați această valoare pentru a încărca pagina corespunzătoare
    });
});
















// showing navbar when click menu on mobile view
const mobile = document.querySelector('.menu-toggle');
const mobileLink = document.querySelector('.siderbar');

mobile.addEventListener("click", function(){
    mobile.classList.toggle("is-active");
    mobileLink.classList.toggle("active");
})

// close menu when click
mobileLink.addEventListener("click", function(){
    const menuBars = document.querySelector(".is-active");
    if (window.innerWidth <= 768 && menuBars) {
        mobile.classList.toggle("is-active");
        mobileLink.classList.toggle("active");
    }
})

// move the menu to right and left when click back and next
var step = 100;
var stepFilter = 60;
var scrolling = true;

$(".back").bind("click", function(e){
    e.preventDefault();
    $(".highlight-wrapper").animate({
        scrollLeft: "-=" + step + "px"
    });
});

$(".next").bind("click",function(e){
    e.preventDefault();
    $(".highlight-wrapper").animate({
        scrollLeft: "+=" + step + "px"
    })
});

// when click back and next on menu filters
$(".back-menus").bind("click", function(e){
    e.preventDefault();
    $(".filter-wrapper").animate({
        scrollLeft: "-=" + stepFilter + "px"
    });
});

$(".next-menus").bind("click", function(e){
    e.preventDefault();
    $(".filter-wrapper").animate({
        scrollLeft: "+=" + stepFilter + "px" 
    });
});



