import React from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import path from "path";
import fs from "fs/promises";
import { Product } from "@/models";
import { GetStaticPathsResult } from "next/types";
import { ParsedUrlQuery } from "querystring";

interface ProductDetailPageProps {
  product: Product;
}

const ProductDetailPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ product }) => {

  if (!product) {
    return <div>Loading...</div>;
  }

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
  const products = await getProducts();

  const { params } = context;

  const parameters: Parameters = {};
  Object.assign(parameters, params);

  const productId = parameters.pid;
  if (productId === undefined) {
    return { notFound: true };
  }

  const product = products.find(p => p.id === +productId);

  if (product == undefined) {
    return { notFound: true };
  }

  return {
    props: {
      product: product,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getProducts();

  // const paths = products.map(p => `/products/${p.id}`);

  const paths: GetStaticPathsResult<Parameters>['paths'] = products.filter(p => p.id !== 3).map(p => {
    return {
      params: {
        pid: p.id.toString()
      }
    };
  });

  return {
    paths: paths,
    fallback: true
  }
}


async function getProducts() {
  const filePath = path.join(process.cwd(), 'src/data/dummy-backend.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const response: { products: Product[] } = JSON.parse(data);
  return response.products;
}

export default ProductDetailPage;
