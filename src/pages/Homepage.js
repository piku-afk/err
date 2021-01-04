import { useEffect, useState } from "react";
import HomepageForm from "../components/HomepageForm";
import DrugsTable from "../components/DrugsTable";
import SelectedTable from "../components/SelectedTable";

// const data = [
//   {
//     "drug_id": 1,
//     "name": "Symbiotik",
//     "type": "capsules",
//     "manufacturer": "Cadila Pharmaceutical Ltd",
//     "quantity_in_stock": 40,
//     "unit_price": 33.15
//   },
//   {
//     "drug_id": 2,
//     "name": "Soframycin",
//     "type": "ointments",
//     "manufacturer": "Sanofi India Limited",
//     "quantity_in_stock": 34,
//     "unit_price": 45.76
//   }
// ];

export default function Homepage({selectedItems, setSelectedItems}) {

  const [search, setSearch] = useState('');
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/drugs/?search=${search}`)
      .then(res => res.json())
      .then(data => {
        data.pop();
        setListItems(data[0])
      });

    // const res = await fetch(`http://localhost:3001/drugs/?search=${search}`);
    // const data = await res.json();

  }, [search]);

  return (
    <>
      <HomepageForm setSearch={setSearch} />
      { selectedItems.length > 0 && <SelectedTable selectedItems={selectedItems} setSelectedItems={setSelectedItems} />}
      <DrugsTable rows={listItems} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
    </>
  );
}

// async function getData() {
//   const res = await fetch('http://192.168.137.1:3001/drugs/?search=');
//   const data = await res.json();
//   console.log(await data)
// }