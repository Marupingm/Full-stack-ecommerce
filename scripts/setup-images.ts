const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');

// Product directories to create
const productDirs = [
  'men',
  'women',
  'teens'
];

function createProductDirectories() {
  productDirs.forEach(dir => {
    const fullPath = path.join(publicDir, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`Created directory: ${fullPath}`);
    } else {
      console.log(`Directory already exists: ${fullPath}`);
    }
  });
}

// Create a placeholder file to remind users to add images
function createPlaceholderFile(dir: string) {
  const placeholderPath = path.join(publicDir, dir, 'README.md');
  const content = `# ${dir.charAt(0).toUpperCase() + dir.slice(1)} Product Images

Please add the following product images to this directory:

## Required Image Pairs
Each product requires two images (e.g., product-1.jpg and product-2.jpg)

### For ${dir} products:
${getProductList(dir)}

Note: Images should be in JPG or WEBP format and should be high quality product photos.
`;
  fs.writeFileSync(placeholderPath, content);
  console.log(`Created placeholder file: ${placeholderPath}`);
}

function getProductList(category: string) {
  const products: { [key: string]: string[] } = {
    men: [
      "vapormax (Air VaporMax 2023)",
      "windrunner (Windrunner Jacket)",
      "training-shirt (Dri-FIT Training)",
      "tech-pants (Tech Fleece Pants)",
      "metcon (Metcon 8)",
      "jersey (Basketball Jersey)",
      "boots (ACG Hiking Boots)",
      "tights (Pro Compression)",
      "polo (Golf Polo)",
      "skate (SB Skate Shoes)"
    ],
    women: [
      "pegasus (Air Zoom Pegasus)",
      "leggings (One Leggings)",
      "bra (Sports Bra)",
      "yoga (Yoga Flow Top)",
      "shorts (Running Shorts)",
      "jacket (Training Jacket)",
      "free (Free Run)",
      "dress (Tennis Dress)",
      "hoodie (Fleece Hoodie)",
      "studio (Studio Shoes)"
    ],
    teens: [
      "af1 (Air Force 1)",
      "tee (Graphic Tee)",
      "hoodie (Tech Fleece)",
      "shorts (Training Shorts)",
      "zoom (Basketball Shoes)",
      "backpack (Backpack)",
      "cleats (Soccer Cleats)",
      "pants (Training Pants)",
      "running (Running Shoes)",
      "bag (Sports Bag)"
    ]
  };

  return products[category]
    .map(item => `- ${item}`)
    .join('\n');
}

try {
  // Create the product directories
  createProductDirectories();
  
  // Create placeholder files in each directory
  productDirs.forEach(dir => createPlaceholderFile(dir));
  
  console.log('\nSetup complete! Please add your product images to the respective directories.');
  console.log('\nEach product requires two images:');
  console.log('- product-name-1.jpg');
  console.log('- product-name-2.jpg');
} catch (error) {
  console.error('Error setting up image directories:', error);
  process.exit(1);
} 