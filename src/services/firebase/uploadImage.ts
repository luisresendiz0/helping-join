import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";

export const uploadImage = async (file: File) => {
  try {
    // Crea una referencia única para la imagen en Firebase Storage
    const imageRef = ref(storage, `images/${file.name}`);

    // Sube la imagen a Firebase Storage
    const snapshot = await uploadBytes(imageRef, file);

    // Obtén la URL de descarga de la imagen
    const imageUrl = await getDownloadURL(snapshot.ref);

    // Haz algo con la URL de la imagen (por ejemplo, guardarla en la base de datos)
    console.log("URL de la imagen:", imageUrl);

    return imageUrl;
  } catch (error) {
    console.error("Error al subir la imagen:", error);
  }

  return "";
};
