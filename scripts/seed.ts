import bcrypt from "bcryptjs";
import AppDataSource from "@/lib/db/cli-data-source";
import { Category } from "@/lib/db/entities/category.entity";
import { Product } from "@/lib/db/entities/product.entity";
import { User } from "@/lib/db/entities/user.entity";

function unsplash(id: string) {
  return `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`;
}

const DEMO_USER = {
  name: "Demo Shopper",
  email: "demo@commerceeveryday.com",
  password: "Demo1234!",
};

const CATEGORIES = [
  {
    name: "Kitchen & Home",
    slug: "kitchen-home",
    description: "Everyday tools and tableware for a well-used kitchen.",
  },
  {
    name: "Style & Accessories",
    slug: "style-accessories",
    description: "Considered basics for wearing and carrying, day to day.",
  },
  {
    name: "Tech & Everyday Carry",
    slug: "tech-everyday-carry",
    description: "The small tech that rides along with you every day.",
  },
] as const;

const PRODUCTS: {
  name: string;
  slug: string;
  description: string;
  priceInCents: number;
  imageId: string;
  stock: number;
  categorySlug: (typeof CATEGORIES)[number]["slug"];
}[] = [
  // Kitchen & Home
  {
    name: "Speckled Ceramic Mug",
    slug: "speckled-ceramic-mug",
    description:
      "A hand-glazed stoneware mug with a soft speckled finish. Holds 350ml, microwave and dishwasher safe.",
    priceInCents: 1800,
    imageId: "photo-1616241673111-508b4662c707",
    stock: 42,
    categorySlug: "kitchen-home",
  },
  {
    name: "Cast Iron Skillet",
    slug: "cast-iron-skillet",
    description:
      "A 10-inch pre-seasoned cast iron skillet that goes from stovetop to oven. Builds a better patina with every use.",
    priceInCents: 6500,
    imageId: "photo-1603038124597-2c5c207edf47",
    stock: 0,
    categorySlug: "kitchen-home",
  },
  {
    name: "Walnut Cutting Board",
    slug: "walnut-cutting-board",
    description:
      "End-grain walnut board that's gentle on knife edges and finished with food-safe mineral oil.",
    priceInCents: 4200,
    imageId: "photo-1690983322029-eee73c0afa14",
    stock: 27,
    categorySlug: "kitchen-home",
  },
  {
    name: "Classic French Press",
    slug: "classic-french-press",
    description:
      "Borosilicate glass carafe with a stainless mesh filter. Brews a full-bodied 1-litre pot.",
    priceInCents: 3800,
    imageId: "photo-1708127368781-cd5f069a90a5",
    stock: 15,
    categorySlug: "kitchen-home",
  },
  {
    name: "Linen Tea Towel Set",
    slug: "linen-tea-towel-set",
    description:
      "Set of three stonewashed linen towels that get softer with every wash. Generously sized at 50x70cm.",
    priceInCents: 2800,
    imageId: "photo-1762539747176-5d8f166346de",
    stock: 60,
    categorySlug: "kitchen-home",
  },
  {
    name: "Stoneware Dinner Plate Set",
    slug: "stoneware-dinner-plate-set",
    description:
      "Set of four reactive-glaze stoneware dinner plates, each one subtly unique.",
    priceInCents: 7200,
    imageId: "photo-1740811620405-8a505f3eb13c",
    stock: 9,
    categorySlug: "kitchen-home",
  },
  {
    name: "Glass Pour-Over Carafe",
    slug: "glass-pour-over-carafe",
    description:
      "Hourglass-shaped borosilicate carafe with a walnut collar, designed for slow, even extraction.",
    priceInCents: 3400,
    imageId: "photo-1442512595331-e89e73853f31",
    stock: 21,
    categorySlug: "kitchen-home",
  },
  // Style & Accessories
  {
    name: "Leather Crossbody Bag",
    slug: "leather-crossbody-bag",
    description:
      "Full-grain leather crossbody with an adjustable strap and brass hardware. Ages into a rich patina.",
    priceInCents: 12800,
    imageId: "photo-1605733513597-a8f8341084e6",
    stock: 8,
    categorySlug: "style-accessories",
  },
  {
    name: "Canvas Tote Bag",
    slug: "canvas-tote-bag",
    description:
      "Heavyweight cotton canvas tote with reinforced stitching, built to carry groceries or a laptop alike.",
    priceInCents: 3200,
    imageId: "photo-1544816155-12df9643f363",
    stock: 50,
    categorySlug: "style-accessories",
  },
  {
    name: "Merino Wool Scarf",
    slug: "merino-wool-scarf",
    description:
      "Lightweight merino wool scarf, woven in a classic herringbone pattern for year-round warmth.",
    priceInCents: 4500,
    imageId: "photo-1565259119139-11af766445aa",
    stock: 33,
    categorySlug: "style-accessories",
  },
  {
    name: "Minimalist Leather Watch",
    slug: "minimalist-leather-watch",
    description:
      "Slim stainless case with a clean dial and genuine leather strap. Everyday water resistance.",
    priceInCents: 14500,
    imageId: "photo-1716399201049-60835e27c843",
    stock: 6,
    categorySlug: "style-accessories",
  },
  {
    name: "Classic Wayfarer Sunglasses",
    slug: "classic-wayfarer-sunglasses",
    description:
      "Acetate frames with polarized UV400 lenses. A shape that hasn't gone out of style in seventy years.",
    priceInCents: 5500,
    imageId: "photo-1584036553516-bf83210aa16c",
    stock: 24,
    categorySlug: "style-accessories",
  },
  {
    name: "Leather Bifold Wallet",
    slug: "leather-bifold-wallet",
    description:
      "Vegetable-tanned leather bifold with six card slots and a bill compartment. Slim by design.",
    priceInCents: 4800,
    imageId: "photo-1601592996763-f05c9c80a7f1",
    stock: 38,
    categorySlug: "style-accessories",
  },
  {
    name: "Ribbed Knit Beanie",
    slug: "ribbed-knit-beanie",
    description:
      "Chunky ribbed-knit beanie in brushed wool blend, fleece-lined for cold-weather commutes.",
    priceInCents: 2400,
    imageId: "photo-1544967919-44c1ef2f9e7a",
    stock: 45,
    categorySlug: "style-accessories",
  },
  // Tech & Everyday Carry
  {
    name: "Wireless Earbuds",
    slug: "wireless-earbuds",
    description:
      "True wireless earbuds with active noise cancellation and a 24-hour charging case.",
    priceInCents: 8900,
    imageId: "photo-1606220945770-b5b6c2c55bf1",
    stock: 19,
    categorySlug: "tech-everyday-carry",
  },
  {
    name: "Mechanical Keyboard",
    slug: "mechanical-keyboard",
    description:
      "Hot-swappable 75% mechanical keyboard with tactile switches and per-key backlighting.",
    priceInCents: 10900,
    imageId: "photo-1589578228447-e1a4e481c6c8",
    stock: 11,
    categorySlug: "tech-everyday-carry",
  },
  {
    name: "Portable Power Bank",
    slug: "portable-power-bank",
    description:
      "20,000mAh power bank with dual USB-C PD output, fast enough to top up a laptop.",
    priceInCents: 4900,
    imageId: "photo-1566554738544-d962991c3fee",
    stock: 31,
    categorySlug: "tech-everyday-carry",
  },
  {
    name: "Leather Laptop Bag",
    slug: "leather-laptop-bag",
    description:
      "Structured leather laptop bag with a padded 15-inch sleeve and a detachable shoulder strap.",
    priceInCents: 9500,
    imageId: "photo-1763034179057-acad3a072568",
    stock: 7,
    categorySlug: "tech-everyday-carry",
  },
  {
    name: "Fitness Smartwatch",
    slug: "fitness-smartwatch",
    description:
      "AMOLED smartwatch with heart-rate and sleep tracking, and a 10-day battery life.",
    priceInCents: 15900,
    imageId: "photo-1461141346587-763ab02bced9",
    stock: 14,
    categorySlug: "tech-everyday-carry",
  },
  {
    name: "Cantilever LED Desk Lamp",
    slug: "cantilever-led-desk-lamp",
    description:
      "Adjustable cantilever desk lamp with stepless dimming and a matte black finish.",
    priceInCents: 5400,
    imageId: "photo-1543512214-4f76e81f8bfc",
    stock: 16,
    categorySlug: "tech-everyday-carry",
  },
];

async function seed() {
  const dataSource = await AppDataSource.initialize();

  const categoryRepo = dataSource.getRepository(Category);
  const productRepo = dataSource.getRepository(Product);

  await categoryRepo.upsert(
    CATEGORIES.map((category) => ({ ...category })),
    ["slug"],
  );
  const categories = await categoryRepo.find();
  const categoryIdBySlug = new Map(categories.map((c) => [c.slug, c.id]));

  await productRepo.upsert(
    PRODUCTS.map(({ imageId, categorySlug, ...product }) => {
      const categoryId = categoryIdBySlug.get(categorySlug);
      if (!categoryId) {
        throw new Error(`Unknown category slug: ${categorySlug}`);
      }
      return {
        ...product,
        imageUrl: unsplash(imageId),
        categoryId,
      };
    }),
    ["slug"],
  );

  const userRepo = dataSource.getRepository(User);
  const passwordHash = await bcrypt.hash(DEMO_USER.password, 12);
  await userRepo.upsert(
    [{ name: DEMO_USER.name, email: DEMO_USER.email, passwordHash }],
    ["email"],
  );

  console.log(
    `Seeded ${categories.length} categories, ${PRODUCTS.length} products, and demo user ${DEMO_USER.email}.`,
  );
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
