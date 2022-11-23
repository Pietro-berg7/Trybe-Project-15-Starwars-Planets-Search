import React from 'react';
import NameFilter from '../components/NameFilter';
import NumberFilter from '../components/NumberFilter';
import Table from '../components/TableHeader';

export default function Home() {
  return (
    <>
      <NameFilter />
      <NumberFilter />
      <Table />
    </>
  );
}
