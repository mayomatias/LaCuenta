import { db, collection, doc, getDocs, query, getDoc } from "../firebase";
import { getArrayFromCollection } from "../utils/getArrayFromCollection";

// Obtener sharedExpenses de todos los usuarios en un mes y año específico
export const getSharedExpensesByMonth = async (year, monthName) => {
  try {
    // 1️⃣ Obtener todos los usuarios
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(query(usersCollection));
    const users = getArrayFromCollection(usersSnapshot); // Convertimos en array

    let sharedExpenses = [];

    // 2️⃣ Recorrer cada usuario y obtener su sharedExpense del mes
    for (const user of users) {
      const userId = user.id; // ID del usuario en Firestore
      const monthRef = doc(db, "users", userId, "sharedExpenses", year, "months", monthName);
      
      const monthSnap = await getDoc(monthRef);
      
      if (monthSnap.exists()) {
        sharedExpenses.push({
          user: userId,
          ...monthSnap.data(),
        });
      }
    }

    return sharedExpenses;
  } catch (error) {
    console.error("Error al obtener shared expenses:", error);
    throw error;
  }
};
