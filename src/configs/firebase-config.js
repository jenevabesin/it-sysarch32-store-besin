import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDmMou4ny5AS3GCmSfrwAL_z69E04pSUx0",
    authDomain: "it-sysarch32-store-besin.firebaseapp.com",
    projectId: "it-sysarch32-store-besin",
    storageBucket: "it-sysarch32-store-besin.appspot.com",
    messagingSenderId: "170209984436",
    appId: "1:170209984436:web:2a9ddfc3e7a3ab1d227ce1",
    measurementId: "G-X535ZGPDHH"
  };
  

  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);
  
  export { firestore };

