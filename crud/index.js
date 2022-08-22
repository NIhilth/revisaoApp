const { initializeApp } = require('firebase/app');
const {
    getFirestore,
    collection,
    doc,
    setDoc,
    addDoc,
    query,
    where,
    getDocs,
    getDoc,
    deleteDoc
} = require('firebase/firestore/lite');

const firebaseConfig = {
    apiKey: "AIzaSyAxJvrsf1dHn_GGATbv81z3vHDt5uSg874",
    authDomain: "revisaojoao-ca52b.firebaseapp.com",
    projectId: "revisaojoao-ca52b",
    storageBucket: "revisaojoao-ca52b.appspot.com",
    messagingSenderId: "1069463270748",
    appId: "1:1069463270748:web:63830f64047797f42cbd99",
    measurementId: "G-SS19J8LC2Q"
  };


const app = initializeApp(firebaseConfig);

const db = getFirestore();

async function save(Tablename, id, dado) {
    if (id) {
        const referenceEntity = await setDoc(doc(db, Tablename, id), dado);
        const savedData = {
            ...dado,
            id: id
        }
        return savedData;
    } else {
        const referenceEntity = await addDoc(collection(db, Tablename), dado);
        const savedData = {
            ...dado,
            id: referenceEntity.id
        }
        return savedData;
    }
}

async function get(Tablename) {
    const TableRef = collection(db, Tablename);

    const q = query(TableRef);

    const querySnapshot = await getDocs(q);

    const lista = [];

    querySnapshot.forEach((doc) => {
        const data = {
            ...doc.data(),
            id: doc.id
        }
        lista.push(data);

    });
    return lista;
}

async function getWithFilter(Tablename, propertie, operator, value) {
    const TableRef = collection(db, Tablename);

    const q = query(TableRef, where(propertie, operator, value));

    const querySnapshot = await getDocs(q);

    const lista = [];

    querySnapshot.forEach((doc) => {
        const data = {
            ...doc.data(),
            id: doc.id
        }
        lista.push(data);

    });
    return lista;
}

async function getById(Tablename, id) {
    const docRef = doc(db, Tablename, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return new Error("404 - not found");
    }

}

async function remove(Tablename, id) {
    const dado = await deleteDoc(doc(db, Tablename, id));
    return {
        message: `${id} deleted`
    }
}

module.exports = {
    save,
    get,
    getWithFilter,
    getById,
    remove
}