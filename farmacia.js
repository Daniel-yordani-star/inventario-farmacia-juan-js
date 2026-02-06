const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// globales
let inventario = [];
let totalVentas = 0;

// leer los pedidos
function preguntar(texto) {
  return new Promise((resolve) => {
    rl.question(texto, (respuesta) => {
      resolve(respuesta);
    });
  });
}

// Registrar medicamento
async function registrarMedicamento() {
  console.log("\nRegistrar medicamento");

  let nombre = await preguntar("Nombre: ");
  let cantidad = parseInt(await preguntar("Cantidad: "));
  let precio = parseFloat(await preguntar("Precio: "));

  inventario.push({
    nombre: nombre.toLowerCase(),
    stock: cantidad,
    precio: precio
  });

  console.log("Medicamento registrado");
}

// consulta 
function consultarInventario() {
  console.log("\nInventario");

  if (inventario.length === 0) {
    console.log("No hay medicamentos");
    return;
  }

  for (let i = 0; i < inventario.length; i++) {
    console.log(
      "Nombre:", inventario[i].nombre,
      "Stock:", inventario[i].stock,
      "Precio:", inventario[i].precio
    );
  }
}

// Venta medicamentos
async function venderMedicamento() {
  console.log("\nVender medicamento");

  let nombre = await preguntar("Nombre: ");
  let cantidad = parseInt(await preguntar("Cantidad a vender: "));

  let medicamento = inventario.find(
    m => m.nombre === nombre.toLowerCase()
  );

  if (!medicamento) {
    console.log("El medicamento no existe");
    return;
  }

  if (cantidad > medicamento.stock) {
    console.log("No hay suficiente stock");
    return;
  }

  medicamento.stock -= cantidad;
  let venta = cantidad * medicamento.precio;
  totalVentas += venta;

  console.log("Venta realizada");
}

// Mostrar total de productos vendidos
function mostrarTotalVentas() {
  console.log("\nTotal de ventas:", totalVentas);
}

// Menú 
async function menu() {
  let opcion;

  do {
    console.log(`
MENU
1. Registrar medicamento
2. Consultar inventario
3. Vender medicamento
4. Total de ventas
5. Salir
    `);

    opcion = await preguntar("Opcion: ");

    switch (opcion) {
      case "1":
        await registrarMedicamento();
        break;
      case "2":
        consultarInventario();
        break;
      case "3":
        await venderMedicamento();
        break;
      case "4":
        mostrarTotalVentas();
        break;
      case "5":
        rl.close();
        break;
      default:
        console.log("Opcion incorrecta");
    }
  } while (opcion !== "5");
}

menu();