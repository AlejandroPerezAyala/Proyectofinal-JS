/** Declaracion de variables */
let boton;
let productoGuardado;
let productoRecuperado;

/** Declaracion de clases */
class Producto{
    constructor(nombre, precio, imagen, id){
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.id = id;
    }

    agregarCards = () => {
        
        return `<img src="${this.imagen}" alt="${this.imagen}" class="rounded-2xl mx-auto w-3/4 "> 
                <figcaption class="text-center bg-fuchsia-300 rounded-2xl w-80 mx-auto">${this.nombre}</figcaption> 
                <p class="text-center bg-indigo-400 rounded-2xl w-80 mx-auto mb-3">${this.precio}</p>
                `
                
    }
}

/** Declaracion de Arrays */
const Productos = [new Producto("King & Queen", "$1000","img/productos/anillos.jpg","1"),
                   new Producto("Gold Chain", "$1500", "img/productos/arito.jpg","2"),
                   new Producto("Gold Heart", "$1250","img/productos/cadena.jpg","3"),
                   new Producto("Tri Color", "$3000","img/productos/cartera_1.jpg","4"),
                   new Producto("Nombres", "$500","img/productos/pulseras.jpg","5"),
                   new Producto("Angel & Demon", "$1000","img/productos/anillos_2.jpg","6")
];

const carrito = [];

/** Guardo los productos en el sesion storage */
const guardarProductos = (key,valor) => {localStorage.setItem(key,valor)};
const recuperarProductos = (valor) => {localStorage.getItem(valor)};


/** Tomo los elementos del HTML */
cards = document.getElementById("productos");

/** Creo las cards de los productos */
Productos.forEach(producto => {

    let newElement = document.createElement("figure");

    newElement.classList.add("items-center", "flex", "flex-col", "justify-center")

    let btnBuy = document.createElement("button");
    
    let btnText = document.createTextNode("Comprar");

    btnBuy.appendChild(btnText);
    
    btnBuy.classList.add('rounded-md', 'p-1', 'text-white', 'bg-btn', 'btn', 'mb-5')
    
    btnBuy.setAttribute("data-id", producto.id);
    
    newElement.innerHTML = producto.agregarCards();
    
    cards.appendChild(newElement);
    
    newElement.appendChild(btnBuy);
});

/** */
cards.addEventListener("click", (e) => {
    addCarrito(e);
})

const addCarrito = (e) =>{
    if(e.target.classList.contains("btn")){
        setCarrito(e.target.parentElement)
    }
}

const setCarrito = (objeto) =>{

    const producto = {
        id: objeto.querySelector(".btn").dataset.id,
        nombre: objeto.querySelector("figcaption").textContent,
        precio: objeto.querySelector("p").textContent,
        cantidad: 1
    }

    
    guardarProductos(producto.id,JSON.stringify(producto));
    
    if(localStorage.getItem(producto.id)){

        if(carrito.hasOwnProperty(producto.id)){
            producto.cantidad = carrito[producto.id].cantidad + 1;
            guardarProductos(producto.id,JSON.stringify(producto));
        }
        recuperarProductos(JSON.parse(producto.id));
        carrito[producto.id] = {...producto};

    } 
    
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'se agrego el producto al carrito',
        showConfirmButton: false,
        toast: true,
        timer: 3000,
        showClass: {
            popup: 'animate__animated animate__backInUp'
          },
          hideClass: {
            popup: 'animate__animated animate__backOutDown'
          }
    })

    console.log(carrito);
}


