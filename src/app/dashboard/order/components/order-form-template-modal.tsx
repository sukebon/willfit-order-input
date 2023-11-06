import React, { FC } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Button, Modal, Grid } from '@mantine/core';
import { UseFormSetValue } from 'react-hook-form';
import { OrderInputs } from '@/types';

interface Props {
  setValue: UseFormSetValue<OrderInputs>;
}

const OrderFormTemplateModal: FC<Props> = ({ setValue }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const templates = [
    {
      contents: [{
        productCode: 1,
        productNumber: "",
        productName: "",
        price: 0,
        quantity: 0,
        comment: "",
      }, {
        productCode: 2,
        productNumber: "",
        productName: "",
        price: 0,
        quantity: 0,
        comment: ""
      }]
    }, {
      contents: [{
        productCode: 1,
        productNumber: "",
        productName: "",
        price: 0,
        quantity: 0,
        comment: "",
      }]
    }
  ];

  const addTemplate = (template: OrderInputs) => {
    setValue("contents", template.contents);
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="テンプレート">
        <Grid>
          {templates.map((template, idx) => (
            <Grid.Col key={idx} span={4}>
              <Button onClick={() => addTemplate(template)}>テンプレート{idx + 1}</Button>
            </Grid.Col>
          ))}
        </Grid>
      </Modal>

      <Button onClick={open}>テンプレート</Button>
    </>
  );
};

export default OrderFormTemplateModal;