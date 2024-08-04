const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const categoryData = [
  { name: "Elektronik" },
  { name: "Aksesoris" },
  { name: "Kecantikan" },
  { name: "Olahraga" },
  { name: "Fashion" },
  { name: "Pakaian" },
  { name: "Otomotif" },
  { name: "Perlengkapan" },
  { name: "Peralatan" },
];

async function seed() {
  try {
    const existingCategories = await prisma.category.findMany();
    const existingCategoryNames = existingCategories.map((cat) => cat.name);

    const newCategories = categoryData.filter(
      (cat) => !existingCategoryNames.includes(cat.name)
    );

    if (newCategories.length > 0) {
      const result = await prisma.category.createMany({
        data: newCategories,
        skipDuplicates: true,
      });
      console.log(`Success seed ${result.count} categories.`);
    } else {
      console.log("No new categories to add.");
    }
  } catch (e) {
    console.error("Error seeding data:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
