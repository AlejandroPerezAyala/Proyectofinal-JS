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
                `
                
    }
}

/** Declaracion de Arrays */
const Productos = [new Producto("King & Queen", 1000,"img/productos/anillos.jpg", 1),
                   new Producto("Gold Chain", 1500, "img/productos/arito.jpg", 2),
                   new Producto("Gold Heart", 1250,"img/productos/cadena.jpg", 3),
                   new Producto("Tri Color", 3000,"img/productos/cartera_1.jpg", 4),
                   new Producto("Nombres", 500,"img/productos/pulseras.jpg", 5),
                   new Producto("Angel & Demon", 1000,"img/productos/anillos_2.jpg", 6)
];

const carrito = [];

/** Guardo los productos en el sesion storage */
const guardarProductos = (key,valor) => {localStorage.setItem(key,valor)};
const recuperarProductos = (valor) => {localStorage.getItem(valor)};


/** Tomo los elementos del HTML */
cards = document.getElementById("productos");
productosCarrito = document.getElementById("carrito");
precioTotal = document.getElementById("total")

/** Creo las cards de los productos */
Productos.forEach(producto => {

    let newElement = document.createElement("figure");
    /** Le agrego clases al figure que cree */
    newElement.classList.add("items-center", "flex", "flex-col", "justify-center")
    /** Creo elementos adicionales para las cards */
    let precio = document.createElement("p");
    let btnBuy = document.createElement("button");

    /**creo tecto dentro del boton de comprar */
    let btnText = document.createTextNode("Comprar");

    /**le agrego clases al elemento <p> donde guardo el precio de la card */
    precio.classList.add('text-center', 'bg-indigo-400', 'rounded-2xl', 'w-80', 'mx-auto', 'mb-3')

    /** Agrego el texto al boton */
    btnBuy.appendChild(btnText);

    /**Le agrego clases al boton de comprar */
    btnBuy.classList.add('rounded-md', 'p-1', 'text-white', 'bg-btn', 'btn', 'mb-5')

    /** Le seteo el id de los productos a los botones */
    btnBuy.setAttribute("data-id", producto.id);

    /**Agrego mediante el metodo creado en el objeto los elementos para la card que se almacena en el figure */
    newElement.innerHTML = producto.agregarCards();
    
    /**Agrego al figure todos los elementos creadois anterriormente */
    newElement.appendChild(precio);
    newElement.querySelector("p").textContent = producto.precio;
    newElement.appendChild(btnBuy);

    /**pinto las cards en el html */
    cards.appendChild(newElement);
});

/** tomo el evento del boton carrito */
cards.addEventListener("click", (e) => {
    addCarrito(e);
})

/** funcion para validar que lo que clickeo tenga la clase "btn" */
const addCarrito = (e) =>{
    if(e.target.classList.contains("btn")){
        setCarrito(e.target.parentElement)
    }
}


/** Funcion para agrgar los productos al carrito */
const setCarrito = (objeto) =>{

    const producto = {
        id: objeto.querySelector(".btn").dataset.id,
        nombre: objeto.querySelector("figcaption").textContent,
        precio: objeto.querySelector("p").textContent,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)){
            
        producto.cantidad = carrito[producto.id].cantidad + 1;
            
    }
        
    carrito[producto.id] = {...producto};

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
    crearProductosCarrito()
}

/** Funcion para crear los productos en el carrito  */
const crearProductosCarrito = () =>{
    console.log(carrito);
    productosCarrito.innerHTML = "";
    Object.values(carrito).forEach(producto =>{
        let divCarrito = document.createElement("div");
        let btnEliminar = document.createElement("button");
        divCarrito.classList.add("flex", "justify-between")
        btnEliminar.textContent = "Eliminar";
        btnEliminar.setAttribute("id", "eliminar");
        btnEliminar.classList.add('rounded-md', 'p-1', 'text-white', 'bg-btn', 'btn', 'mb-5')
        divCarrito.innerHTML = `<p>${producto.nombre}</p>
                                <p>${producto.cantidad}</p>
                                <p>$${producto.precio * producto.cantidad}</p>`
        
        divCarrito.appendChild(btnEliminar);
        productosCarrito.appendChild(divCarrito); 
        
        guardarProductos("carrito", JSON.stringify(carrito));
    })
 
    
}
