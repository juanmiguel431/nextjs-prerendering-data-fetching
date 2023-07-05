import React from "react";
import * as fs from "fs/promises";
import path from "path";


interface Product {
  id: number;
  title: string;
}

interface JmpcProps {
  products: Product[];
}

const Jmpc: React.FC<JmpcProps> = (props) => {
  return (
    <div className="jmpc">
      <ul>
        {props.products.map(p => <li key={p.id}>{p.title}</li>)}
      </ul>
    </div>
  );
};

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'src/data/dummy-backend.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const response = JSON.parse(data) as JmpcProps;

  return {
    props: response
  }
}

export default Jmpc;
