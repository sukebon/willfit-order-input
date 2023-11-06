"use client";
import { Box, Button, Flex, Input, Paper, Table, TableTbody, TableThead } from '@mantine/core';
import { addDays, format, subDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from "react-icons/bs";
import OrderFormTableHead from './order-form-table-head';
import OrderFormTableRow from './order-form-table-row';
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import OrderFormTemplateModal from './order-form-template-modal';
import { OrderInputs } from '@/types';
const currentDate = format(new Date(), "yyyy-MM-dd");

const customers = [
  { id: 1, name: "大丸白衣" },
  { id: 2, name: "ウィルフィット" },
];

const OrderForm = () => {
  const [selectDate, setSelectDate] = useState(currentDate);
  const [customeName, setCustomerName] = useState("");
  const [customerCode, setCustomerCode] = useState("");
  const methods = useForm<OrderInputs>({
    defaultValues: {
      contents: [{
        productCode: "",
        productNumber: "",
        productName: "",
        price: 0,
        quantity: 0,
        comment: "",
      }]
    }
  });

  const { handleSubmit, control, watch, setValue, reset } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contents"
  });
  const onSubmit: SubmitHandler<OrderInputs> = (data) => {
    const result = confirm('登録して宜しいでしょうか');
    if (!result) return;
  };

  const dateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectDate(e.target.value);
  };

  const prevDateHandler = () => {
    const prev = subDays(new Date(selectDate), 1);
    setSelectDate(format(new Date(prev), "yyyy-MM-dd"));
  };

  const nextDateHandler = () => {
    const add = addDays(new Date(selectDate), 1);
    setSelectDate(format(new Date(add), "yyyy-MM-dd"));
  };

  const customerChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerCode(e.target.value);
  };

  useEffect(() => {
    const singleCustomer = customers.find(({ id }) => (
      id === Number(customerCode)
    ));
    if (singleCustomer) {
      setCustomerName(singleCustomer.name);
    } else {
      setCustomerName("");
    }
  }, [customerCode]);

  const addContent = () => {
    append({
      productCode: "",
      productNumber: "",
      productName: "",
      price: 0,
      quantity: 0,
      comment: "",
    });
  };

  const removeContent = () => {
    reset();
  };
  const removeQuantity = () => {
    contents.forEach((_, idx) => {
      setValue(`contents.${idx}.quantity`, 0);
    });
  };

  const contents = watch("contents");
  let sumArray: number[] = [];
  contents.forEach((content) => (
    sumArray.push(content.price * content.quantity)
  ));
  const total = sumArray.reduce((a, b) => (b = a + b), 0);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper p="md" w={1000} shadow='md'>
        <Flex align="center" justify="space-between">
          <Flex gap={24}>
            <Flex justify="center" align="center" gap={6}>
              <BsFillArrowLeftSquareFill
                style={{ cursor: "pointer", fontSize: 32 }}
                onClick={prevDateHandler}
              />
              <Input type="date"
                value={selectDate}
                onChange={dateChangeHandler}
              />
              <BsFillArrowRightSquareFill
                style={{ cursor: "pointer", fontSize: 32 }}
                onClick={nextDateHandler}
              />
            </Flex>
            <Flex gap={6} align="end">
              <Input
                maw={150}
                value={customerCode}
                placeholder='得意先コード'
                onChange={customerChangeHandler}
              />
              <Button>検索</Button>
            </Flex>
          </Flex>
          <Flex gap={6} fz={24} fw="bold">
            <Box>合計金額</Box>
            <Box>{total.toLocaleString()}円</Box>
          </Flex>
        </Flex>
        <Box mt={24} h={48}>
          {customeName && (
            <>
              <Box fz={12}>得意先名</Box>
              <Flex align="center" gap={12}>
                <Box fz={20}>{customeName}</Box>
                <OrderFormTemplateModal setValue={setValue} />
              </Flex>
            </>
          )}
        </Box>

        <Table mt={24} withTableBorder withColumnBorders>
          <TableThead>
            <OrderFormTableHead />
          </TableThead>
          <TableTbody>
            {fields.map((field, idx) => (
              <OrderFormTableRow
                key={field.id}
                methods={methods}
                watch={watch}
                remove={remove}
                idx={idx}
              />
            ))}
          </TableTbody>
        </Table>
        <Flex mt={24} gap={12} justify="center">
          <Button onClick={addContent}>追加</Button>
        </Flex>
        <Flex mt={24} gap={12}>
          <Button variant='outline' fullWidth onClick={removeQuantity}>数量削除</Button>
          <Button variant='outline' fullWidth onClick={removeContent}>全削除</Button>
          <Button type="submit" fullWidth>登録</Button>
        </Flex>
      </Paper>
    </form>
  );
};

export default OrderForm;