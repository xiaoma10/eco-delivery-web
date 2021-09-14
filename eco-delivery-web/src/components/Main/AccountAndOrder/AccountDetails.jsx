import React from "react";
import { Tabs, Space } from 'antd';
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";

const { TabPane } = Tabs

function AccountDetails() {
  return (
    <>
      <Space style={{ marginBottom: 24 }} />
      <Tabs 
        tabPosition='left'>
        <TabPane 
          tab="Email and Username" 
          key="1">
          <Form1 />
        </TabPane>
        <TabPane 
          tab="Password" 
          key="2">
          <Form2 />
        </TabPane>
        <TabPane 
          tab="Contact and Address" 
          key="3">
          <Form3 />
        </TabPane>
      </Tabs>
    </>
  )
}

export default AccountDetails