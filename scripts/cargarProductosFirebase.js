import { readFile } from "node:fs/promises";
import process from "node:process";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const productosCollection = collection(db, "productos");

const contenido = await readFile("./public/data/productos.json", "utf8");
const productos = JSON.parse(contenido);
const consulta = await getDocs(productosCollection);
const nombresExistentes = new Set(
    consulta.docs.map((documento) => documento.data().nombre)
);

let productosAgregados = 0;

for (const producto of productos) {
    if (!nombresExistentes.has(producto.nombre)) {
        const { nombre, precio, stock, imagen } = producto;
        await addDoc(productosCollection, { nombre, precio, stock, imagen });
        productosAgregados += 1;
        console.log(`Producto agregado: ${nombre}`);
    }
}

console.log(`Migración terminada. Productos agregados: ${productosAgregados}`);
