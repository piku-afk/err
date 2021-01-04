import { useEffect, useRef, useState } from "react";
import OrdersPageForm from "../components/OrdersPageForm";
import OrdersTable from "../components/OrdersTable";

const initialState =  {
  search: '',
  date: ''
};

export default function OrdersPage() {
  const [search, setSearch] = useState(initialState.search);
  const [date, setDate] = useState(initialState.date);
  const [listItems, setListItems] = useState([]);
  const prev = useRef(date);

  function handleClearFilter() {
    setSearch(initialState.search);
    setDate(initialState.date);
    prev.current =initialState.date;
  }
  
  useEffect(() => {
    let url = 'http://localhost:3001/drugs/orders/';
    if(search) {
      url += `?search=${search}`;
    }
    if(date && date !== prev.current) {
      url += `?date=${date}`;
      prev.current = date;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        data.pop();
        setListItems(data[0])
      });
  }, [search, date]);

  return (
    <>
      <OrdersPageForm setSearch={setSearch} date={date} setDate={setDate} handleClearFilter={handleClearFilter} />
      <OrdersTable rows={listItems} />
    </>
  );
}

// function getDate(d) {
//   const year = d.getFullYear();
//   const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
//   const date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
//   return `${year}-${month}-${date}`
// }