import React from "react";
import * as fs from "fs/promises";
import path from "path";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Product } from "@/models";
import Link from "next/link";

interface JmpcProps {
  products: Product[];
}

const ProductPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  return (
    <div className="jmpc">
      <ul>
        {props.products.map(p => <li key={p.id}>
          <Link href={`/products/${p.id}`}>{p.title}</Link>
        </li>)}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<JmpcProps> = async (context) => {
  console.log('jmpc (Re-)Generating...');
  const filePath = path.join(process.cwd(), 'src/data/dummy-backend.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const response = JSON.parse(data) as JmpcProps;

  return {
    props: response,
    revalidate: 10,
    notFound: false,
    redirect: undefined
  }
}

export default ProductPage;
