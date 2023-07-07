import { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface Sale {
  id: string;
  username: string;
  volume: number
}

interface LastSalesPageProps {
  sales: Sale[];
}

const LastSalesPage: NextPage<LastSalesPageProps> = (props) => {
  const [sales, setSales] = useState<Sale[]>(props.sales)
  // const [loading, setLoading] = useState(false);

  const { data, error } = useSWR('https://next-js-course-53344-default-rtdb.firebaseio.com/sales.json', url => fetch(url).then(res => res.json()));

  useEffect(() => {
    if (!data) return;

    const sales: Sale[] = [];
    for (const key in data) {
      sales.push({ id: key, ...data[key] })
    }

    setSales(sales);
  }, [data]);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch('https://next-js-course-53344-default-rtdb.firebaseio.com/sales.json')
  //     .then(value => value.json())
  //     .then(data => {
  //
  //       const sales: Sale[] = [];
  //       for (const key in data) {
  //         sales.push({ id: key, ...data[key] })
  //       }
  //
  //       setSales(sales);
  //       setLoading(false);
  //     });
  // }, []);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  return (
    <div className="last-sales">
      <ul>
        {sales.map(s => <li key={s.id}>{s.username} - ${s.volume}</li>)}
      </ul>
    </div>
  );
}

export default LastSalesPage;

export const getStaticProps: GetStaticProps<LastSalesPageProps> = async (context) => {
  const response = await fetch('https://next-js-course-53344-default-rtdb.firebaseio.com/sales.json');
  const data = await response.json();

  const sales: Sale[] = [];
  for (const key in data) {
    sales.push({ id: key, ...data[key] })
  }

  return {
    props: {
      sales: sales,
    },
    revalidate: 10
  };
}
