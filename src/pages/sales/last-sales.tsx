import { NextPage } from "next";
import { useEffect, useState } from "react";

interface sales {
  id: string;
  username: string;
  volume: number
}

const LastSalesPage: NextPage = () => {
  const [sales, setSales] = useState<sales[]>([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://next-js-course-53344-default-rtdb.firebaseio.com/sales.json')
      .then(value => value.json())
      .then(data => {

        const sales: sales[] = [];
        for (const key in data) {
          sales.push({ id: key, ...data[key] })
        }

        setSales(sales);
        setLoading(false);
      });
  }, []);

  if (loading) {
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
