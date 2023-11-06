import { Table, TableThead } from '@mantine/core';
import React from 'react';

const OrderFormTableHead = () => {
  return (
    <Table.Tr>
      <Table.Th>
        商品コード
      </Table.Th>
      <Table.Th>
        品番/品名
      </Table.Th>
      {/* <Table.Th>
        品名
      </Table.Th> */}
      <Table.Th>
        単価
      </Table.Th>
      <Table.Th>
        数量
      </Table.Th>
      <Table.Th>
        金額
      </Table.Th>
      <Table.Th>
        備考
      </Table.Th>
      <Table.Th>
        削除
      </Table.Th>
    </Table.Tr>
  );
};

export default OrderFormTableHead;