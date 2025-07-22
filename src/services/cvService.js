import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";

const CV_COLLECTION = "cvs";

// Generate a unique slug for the CV
function generateSlug(fullName) {
  const base = fullName
    ? fullName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    : "untitled";

  return `${base}-${uuidv4().slice(0, 8)}`;
}

// Create a new CV
export async function createCV(userId, cvData, isPublic = false) {
  try {
    const slug = generateSlug(cvData.personalInfo?.fullName);

    const cv = {
      userId,
      data: cvData,
      slug,
      isPublic,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, CV_COLLECTION), cv);
    return { id: docRef.id, ...cv };
  } catch (error) {
    console.error("Error creating CV:", error);
    throw error;
  }
}

// Update an existing CV
export async function updateCV(cvId, cvData, isPublic) {
  try {
    const cvRef = doc(db, CV_COLLECTION, cvId);
    const updateData = {
      data: cvData,
      updatedAt: serverTimestamp(),
    };

    if (typeof isPublic !== "undefined") {
      updateData.isPublic = isPublic;
    }

    await updateDoc(cvRef, updateData);
    return true;
  } catch (error) {
    console.error("Error updating CV:", error);
    throw error;
  }
}

// Delete a CV
export async function deleteCV(cvId) {
  try {
    await deleteDoc(doc(db, CV_COLLECTION, cvId));
    return true;
  } catch (error) {
    console.error("Error deleting CV:", error);
    throw error;
  }
}

// Get all CVs for a user
export async function getUserCVs(userId) {
  try {
    const q = query(
      collection(db, CV_COLLECTION),
      where("userId", "==", userId),
      orderBy("updatedAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching user CVs:", error);
    throw error;
  }
}

// Get a single CV by ID (for editing)
export async function getCV(cvId) {
  try {
    const cvRef = doc(db, CV_COLLECTION, cvId);
    const cvSnap = await getDoc(cvRef);

    if (cvSnap.exists()) {
      return { id: cvSnap.id, ...cvSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching CV:", error);
    throw error;
  }
}

// Get a public CV by slug
export async function getPublicCV(slug) {
  try {
    const q = query(
      collection(db, CV_COLLECTION),
      where("slug", "==", slug),
      where("isPublic", "==", true)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching public CV:", error);
    throw error;
  }
}

// Toggle CV visibility (public/private)
export async function toggleCVVisibility(cvId) {
  try {
    const cv = await getCV(cvId);
    if (cv) {
      await updateCV(cvId, cv.data, !cv.isPublic);
      return !cv.isPublic;
    }
    return false;
  } catch (error) {
    console.error("Error toggling CV visibility:", error);
    throw error;
  }
}

// Get public CV URL
export function getPublicCVUrl(slug) {
  return `${window.location.origin}/cv/${slug}`;
}
