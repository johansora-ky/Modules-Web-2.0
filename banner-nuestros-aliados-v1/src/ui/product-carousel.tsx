"use client";

import { useEffect, useState, useMemo } from "react";
import "./product-carousel_nuestros_aliados.css";

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Smartphone",
    category: "Home",
    image:
      "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/nevera.png?width=860&t=1763127083940",
  },
  {
    id: "2",
    name: "Laptop",
    category: "Home",
    image:
      "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/image.png?width=860&t=1763127084258",
  },
  {
    id: "3",
    name: "Headphones",
    category: "Health",
    image:
      "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/salud%20visual.png?width=860&t=1763127084155",
  },
  {
    id: "4",
    name: "Tablet",
    category: "Home",
    image:
      "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/lavadora.png?width=860&t=1763127084215",
  },
  {
    id: "5",
    name: "Camera",
    category: "Home",
    image:
      "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/estufa.png?width=860&t=1763127084404",
  },
  {
    id: "6",
    name: "Watch",
    category: "Home",
    image:
      "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/mobiliario.png?width=860&t=1763127084260",
  },
  {
    id: "7",
    name: "Watch",
    category: "Technology",
    image:
      "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/laptop.png?width=860&t=1763127084443",
  },
  {
    id: "8",
    name: "Watch",
    category: "Technology",
    image:
      "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/Smartphone.png?width=860&t=1763127084386",
  },
  {
    id: "9",
    name: "Watch",
    category: "Technology",
    image:
      "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/tablet.png?width=860&t=1763127084454",
  },
  {
    id: "10",
    name: "Watch",
    category: "LB",
    image:
      "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/tv.png?width=860&t=1763127084753",
  },
  {
    id: "11",
    name: "Watch",
    category: "LB",
    image:
      "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/scooter.png?width=860&t=1763134836079",
  },
  {
    id: "12",
    name: "Watch",
    category: "LB",
    image:
      "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/Speaker.png?width=860&t=1763134836018",
  },
  {
    id: "13",
    name: "Watch",
    category: "LB",
    image:
      "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/Air%20Fryer.png?width=860&t=1763134836083",
  },
  {
    id: "14",
    name: "Watch",
    category: "LB",
    image:
      "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/bike.png?width=860&t=1763134836090",
  },
  {
    id: "15",
    name: "Watch",
    category: "LB",
    image:
      "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/Smartwatch.png?width=860&t=1763134836277",
  },
];

// Divide products into groups in order (5 products per row)
function divideProductsIntoGroups<T>(
  products: T[],
  numberOfGroups: number = 3
): T[][] {
  const groups: T[][] = [];
  const productsPerGroup = Math.ceil(products.length / numberOfGroups);

  for (let i = 0; i < numberOfGroups; i++) {
    const start = i * productsPerGroup;
    const end = Math.min(start + productsPerGroup, products.length);
    groups.push(products.slice(start, end));
  }

  return groups;
}

// Create extended array from a product group for seamless scrolling (no shuffling)
function createExtendedArrayFromGroup<T>(group: T[], copies: number = 4): T[] {
  // Create extended array with multiple copies in order
  const extended: T[] = [];
  for (let i = 0; i < copies; i++) {
    extended.push(...group);
  }

  return extended;
}

export function ProductCarousel() {
  const [sparkles, setSparkles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  useEffect(() => {
    // Generate sparkles randomly
    const interval = setInterval(() => {
      const newSparkle = {
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
      };
      setSparkles((prev) => [...prev, newSparkle]);

      // Remove sparkle after animation
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 1500);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // Divide products into 3 groups in order (5 products per row)
  // Using useMemo to ensure arrays are only generated once on mount
  const productGroups = useMemo(() => {
    // Divide into 3 groups of 5 products each in order
    return divideProductsIntoGroups(PRODUCTS, 3);
  }, []);

  // Create extended arrays for each row from their respective groups
  const extendedProducts1 = useMemo(() => {
    return createExtendedArrayFromGroup(productGroups[0], 4);
  }, [productGroups]);

  const extendedProducts2 = useMemo(() => {
    return createExtendedArrayFromGroup(productGroups[1], 4);
  }, [productGroups]);

  const extendedProducts3 = useMemo(() => {
    return createExtendedArrayFromGroup(productGroups[2], 4);
  }, [productGroups]);

  return (
    <div id="product-carousel-container_nuestros_aliados">
      {/* Sparkle Effects */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="product-carousel-sparkle_nuestros_aliados animate-sparkle_nuestros_aliados"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: "8px",
            height: "8px",
            background: "#fff",
            borderRadius: "50%",
            opacity: 0.8,
          }}
        />
      ))}

      {/* Row 1 - Left to Right */}
      <div className="product-carousel-row_nuestros_aliados">
        <div className="product-carousel-gradient-left_nuestros_aliados"></div>
        <div className="product-carousel-gradient-right_nuestros_aliados"></div>
        <div className="product-carousel-scroll-left_nuestros_aliados animate-scroll-left_nuestros_aliados">
          {extendedProducts1.map((product, idx) => (
            <ProductCard key={`row1-${idx}`} product={product} />
          ))}
        </div>
      </div>

      {/* Row 2 - Right to Left */}
      <div className="product-carousel-row_nuestros_aliados">
        <div className="product-carousel-gradient-left_nuestros_aliados"></div>
        <div className="product-carousel-gradient-right_nuestros_aliados"></div>
        <div className="product-carousel-scroll-right_nuestros_aliados animate-scroll-right_nuestros_aliados">
          {extendedProducts2.map((product, idx) => (
            <ProductCard key={`row2-${idx}`} product={product} />
          ))}
        </div>
      </div>

      {/* Row 3 - Left to Right */}
      <div className="product-carousel-row-last_nuestros_aliados">
        <div className="product-carousel-gradient-left_nuestros_aliados"></div>
        <div className="product-carousel-gradient-right_nuestros_aliados"></div>
        <div className="product-carousel-scroll-left_nuestros_aliados animate-scroll-left_nuestros_aliados">
          {extendedProducts3.map((product, idx) => (
            <ProductCard key={`row3-${idx}`} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card_nuestros_aliados">
      <div className="product-card-inner_nuestros_aliados">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="product-image_nuestros_aliados"
        />
      </div>
    </div>
  );
}
