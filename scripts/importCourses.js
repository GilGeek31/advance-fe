import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, "../serviceAccountKey.json"), "utf-8"),
);

const coursesData = JSON.parse(
  readFileSync(join(__dirname, "../src/data/course.json"), "utf-8"),
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function importCourses() {
  const coursesCollection = db.collection("courses");

  for (const course of coursesData) {
    const { id, ...courseWithoutId } = course;
    await coursesCollection.add(courseWithoutId);
    console.log(`✅ Berhasil import: ${course.title}`);
  }

  console.log("🎉 Semua data course berhasil diimport ke Firestore!");
  process.exit(0);
}

importCourses().catch((err) => {
  console.error("❌ Gagal import:", err);
  process.exit(1);
});
