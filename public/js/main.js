/** Declaracion de variables */
let boton;
let productoGuardado;
let productoRecuperado;
let vaciarCarrito;
let cantCarrito;
let zona1;
let zona2;
let zona3;
let zona4;
let nombre;
let apellido;
let email;
let enviar;

/**Declaracion de arrays */
let carrito = [];

/** Guardo los productos en el sesion storage */
const guardarProductos = (key, valor) => { localStorage.setItem(key, valor); }


/** Tomo los elementos del HTML */
cards = document.getElementById("productos");
productosCarrito = document.getElementById("carrito");
precioTotal = document.getElementById("total");
vaciarCarrito = document.getElementById("vaciar");
cantCarrito = document.getElementById("cant");
zona1 = document.getElementById("zona1");
zona2 = document.getElementById("zona2");
zona3 = document.getElementById("zona3");
zona4 = document.getElementById("zona4");
nombre = document.getElementById("nombre");
apellido = document.getElementById("apellido");
email = document.getElementById("email");
enviar = document.getElementById("enviar");


/**tomo el .json local */
fetch('stock.json')
.then((resp) => resp.json())
.then((data) => crearProductosHTML(data))

/** Creo las cards de los productos */
const crearProductosHTML = data => {
    data.forEach(producto => {

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
        newElement.innerHTML = `<img src="${producto.imagen}" alt="${producto.imagen}" class="rounded-2xl mx-auto w-3/4 "> 
                                <figcaption class="text-center bg-fuchsia-300 rounded-2xl w-80 mx-auto">${producto.nombre}</figcaption> 
                                `
        
        /**Agrego al figure todos los elementos creadois anterriormente */
        newElement.appendChild(precio);
        newElement.querySelector("p").textContent = producto.precio;
        newElement.appendChild(btnBuy);

        /**pinto las cards en el html */
        cards.appendChild(newElement);
    });
}


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
    let producto = {
        id: objeto.querySelector(".btn").dataset.id,
        nombre: objeto.querySelector("figcaption").textContent,
        precio: objeto.querySelector("p").textContent,
        cantidad: 1
    }

    /**recorro el array y pregunto si el ID que estoy agregando al carrito ya existe en el array */
    for(let i = 0; i < carrito.length ; i++){
        if(carrito[i].id.trim() === producto.id.trim()){
            carrito[i].cantidad ++;
            crearProductosCarrito()
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
            /**con esto soluciono el problema de que se pinte nuevamente toda la info en el carrito  */
            return null;
        } 
    }
    
    /**agrego el producto al array  */   
    carrito.push(producto);
    
    
    /**Alerta para cuando agrego el producto en el carrito */
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
    
    /**creo los productos en el carrito */
    crearProductosCarrito()
}

/** Funcion para crear los productos en el carrito  */
const crearProductosCarrito = () =>{
    productosCarrito.innerHTML = "";
    carrito.forEach((producto) => {
        let divCarrito = document.createElement("div");
        divCarrito.classList.add("flex", "justify-between");
        divCarrito.innerHTML = `<p>${producto.nombre}</p>
                                <p>${producto.cantidad}</p>
                                <p>$${producto.precio * producto.cantidad}</p>
                                <button onclick="eliminarProducto(${producto.id})" class='mb-5 btn bg-btn text-white p-1 rounded-md'>Eliminar</button>`;

        productosCarrito.append(divCarrito);

        guardarProductos("carrito", JSON.stringify(carrito));
    })

    /**operacion para sumar los precios multiplicados por la cantidad de produtos y lo muestro en el carrito  */
    precioTotal.innerText = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);

    cantCarrito.querySelector("p").textContent = carrito.length;

}

/**Espero a que cargue todo el DOM para mostrar los productos en el carrito */
document.addEventListener("DOMContentLoaded", () => {
    /**pregunto si hay productos del carrito en el local storage y que los muestre en el HTML */
    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"))
        crearProductosCarrito()
    }
})

/** Vacio el carrito y elimino todo del local storage */
vaciarCarrito.addEventListener("click", () => {
    carrito = [];
    localStorage.clear();
    crearProductosCarrito();
})


/**elimino los productos del html y del localstorage */
const eliminarProducto = (id) => {
    const item = carrito.find((prod) => prod.id == id);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
    localStorage.removeItem("carrito");
    crearProductosCarrito()
}

/** Evento para tomar los datos colocados en el form */
enviar.addEventListener("click", (e) => {
    
    e.preventDefault();
    let zona;

    if(zona1.checked){
        zona = "Gutierrez";
        zonasDeEncuentro(zona);
    }else if(zona2.checked){
        zona = "Ing. Allan";
        zonasDeEncuentro(zona);
    } else if(zona3.checked){
        zona = "Berazategui";
        zonasDeEncuentro(zona);
    } else if(zona4.checked){
        zona = "F. Varela";
        zonasDeEncuentro(zona);
    }else{
        Swal.fire('Por favor completar todos los campos')
    }
} )

/**funcion para el alerta con los datos tomados del Form en el html */
const zonasDeEncuentro = (zona) =>{
    Swal.fire({
        title: 'DATOS A ENVIAR',
        text: `Nombre: ${nombre.value}          
               Apellido: ${apellido.value}       
               Email: ${email.value}       
               Punto de encuentro: ${zona}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Correcto'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Enviado!',
            'Por favor espera que te contactemos con los datos proporcionados, Gracias!',
            'success'
          )
        }
      })
}