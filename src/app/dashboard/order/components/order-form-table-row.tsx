import { OrderInputs } from '@/types';
import { Box, Flex, Input, Table } from '@mantine/core';
import React, { FC, useEffect } from 'react';
import { UseFieldArrayRemove, UseFormReturn, UseFormWatch } from "react-hook-form";
import { AiFillPlusSquare, AiFillMinusSquare, AiOutlineClose } from "react-icons/ai";

interface Props {
  methods: UseFormReturn<OrderInputs, any, undefined>;
  watch: UseFormWatch<OrderInputs>;
  remove: UseFieldArrayRemove;
  idx: number;
}

const products = [
  { id: 1, productNumber: "SP110", price: 1500 },
  { id: 2, productNumber: "SP104", price: 1200 },
  { id: 3, productNumber: "SP123", price: 1000 },
  { id: 4, productNumber: "SP130", price: 1800 },
];

const OrderFormTableRow: FC<Props> = ({ methods, idx, watch, remove }) => {
  const { register, setValue, getValues } = methods;


  const productCode = (watch(`contents.${idx}.productCode`));

  useEffect(() => {
    let intervalId = setTimeout(() => {
      const singleProduct = products.find((product) => (
        product.id === Number(productCode)
      ));
      if (singleProduct) {
        setValue(`contents.${idx}.productNumber`, singleProduct.productNumber);
        setValue(`contents.${idx}.price`, singleProduct.price);
      } else {
        setValue(`contents.${idx}.productNumber`, "");
        setValue(`contents.${idx}.price`, 0);
      }
    }, 500);
    return () => {
      clearTimeout(intervalId);
    };
  }, [productCode, idx, setValue]);

  const calcQuantity = (quantity: number) => {
    const prevValue = getValues(`contents.${idx}.quantity`);
    setValue(`contents.${idx}.quantity`, Number(prevValue) + quantity);
  };

  const calcPrice = (quantity: number) => {
    const prevValue = getValues(`contents.${idx}.price`);
    setValue(`contents.${idx}.price`, Number(prevValue) + quantity);
  };

  const removeRow = (idx: number) => {
    remove(idx);
  };

  return (
    <Table.Tr>
      <Table.Td>
        <Input {...register(`contents.${idx}.productCode`)} />
      </Table.Td>
      <Table.Td>
        <Input {...register(`contents.${idx}.productNumber`)} />
      </Table.Td>
      {/* <Table.Td>
        <Input {...register(`contents.${idx}.productName`)} />
      </Table.Td> */}
      <Table.Td w={110}>
        <Flex align="center" gap={6}>
          <AiFillMinusSquare style={{ fontSize: 42, cursor: "pointer" }}
            onClick={() => calcPrice(-1)}
          />
          <Input type="number" {...register(`contents.${idx}.price`)} />
          <AiFillPlusSquare style={{ fontSize: 42, cursor: "pointer" }}
            onClick={() => calcPrice(1)}
          />
        </Flex>
      </Table.Td>
      <Table.Td w={110}>
        <Flex align="center" gap={6}>
          <AiFillMinusSquare style={{ fontSize: 42, cursor: "pointer" }}
            onClick={() => calcQuantity(-1)}
          />
          <Input type="number" {...register(`contents.${idx}.quantity`)} />
          <AiFillPlusSquare style={{ fontSize: 42, cursor: "pointer" }}
            onClick={() => calcQuantity(1)}
          />
        </Flex>
      </Table.Td>
      <Table.Td w={100}>
        <Box ta="right">
          {(watch(`contents.${idx}.quantity`) * watch(`contents.${idx}.price`)).toLocaleString()}
        </Box>
      </Table.Td>
      <Table.Td>
        <Input />
      </Table.Td>
      <Table.Td w={50} ta="center">
        <AiOutlineClose style={{ cursor: "pointer" }} onClick={() => removeRow(idx)} />
      </Table.Td>
    </Table.Tr>
  );
};

export default OrderFormTableRow;