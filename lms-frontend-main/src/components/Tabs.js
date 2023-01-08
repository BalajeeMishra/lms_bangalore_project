import React, { useState } from 'react';
import { useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function TabLayout(props) {
  const [key, setKey] = useState(props.tabName1);
  function onClickKey(k) {
    setKey(k)
    if (props && props.setTabName) {
      props.setTabName(k)
    }
  }
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => onClickKey(k)}
      className="mb-3"
    >
      <Tab eventKey={props.tabName1} title={props.tabName1}>
        {props.tab1}
      </Tab>
      <Tab eventKey={props.tabName2} title={props.tabName2}>
        {props.tab2}
      </Tab>
      <Tab eventKey={props.tabName3} title={props.tabName3}>
        {props.tab3}
      </Tab>

    </Tabs>
  );
}

export default TabLayout;