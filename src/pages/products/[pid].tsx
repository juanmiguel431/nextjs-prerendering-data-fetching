import React from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import path from "path";
import fs from "fs/promises";
import { Product } from "@/models";
import { GetStaticPathsResult } from "next/types";
import { ParsedUrlQuery } from "querystring";

interface ProductDetailPageProps {
  product: Product;
}

const ProductDetailPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ product}) => {
  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </div>
  );
};

interface Parameters extends ParsedUrlQuery {
  pid?: string;
}

export const getStaticProps: GetStaticProps<ProductDetailPageProps> = async (context) => {
  const filePath = path.join(process.cwd(), 'src/data/dummy-backend.json');
  const data = await fs.readFile(filePath, 'utf-8');

  const { params } = context;

  const parameters: Parameters = {};
  Object.assign(parameters, params);

  const productId = parameters.pid;
  if (productId === undefined) {
    return { notFound: true };
  }

  const response = JSON.parse(data) as any;
  const product = response.products.find((p: Product) => p.id === +productId);

  return {
    props: {
      product: product
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), 'src/data/dummy-backend.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const response = JSON.parse(data) as any;
  const product: Product[] = response.products;

  // const paths = product.map(p => `/products/${p.id}`);

  const paths: GetStaticPathsResult<Parameters>['paths'] = product.map(p => {
    return {
      params: {
        pid: p.id.toString()
      }
    };
  });

  return {
    paths: paths,
    fallback: false
  }
}

export default ProductDetailPage;
