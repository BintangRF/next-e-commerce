"use client";

import { useProduct } from "@/hooks/useProducts";
import { ProductCard } from "../ProductsComponents/ProductCard";
import { Section } from "../Section";
import { Loading } from "../Loading";

export const ProductList = () => {
  const { data, isLoading, isError } = useProduct.useGet();

  return (
    <Section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading && <Loading />}

        {isError && (
          <p className="text-red-500 col-span-full text-center">
            Failed to load products. Please try again later.
          </p>
        )}

        {data?.map((p: any, i: number) => (
          <div key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </Section>
  );
};
