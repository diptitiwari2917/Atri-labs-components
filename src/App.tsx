import React from "react";
import Tree from "./components/Tree";
import {
  default as Timeline,
  EventInterface,
  EventStatusEnum,
  TimelineVariantEnum,
} from "./components/Timeline/Timeline";

const expandIcon: string = require("./assets/plus.svg").default;
const collapseIcon: string = require("./assets/minus.svg").default;
const custom: string = require("./assets/emoji.svg").default;

interface TreeNode {
  id: number;
  label: string;
  children?: TreeNode[];
  disabled: boolean;
}

const data: TreeNode[] = [
  {
    id: 1,
    label: "0-0",
    disabled: false,
    children: [
      {
        id: 11,
        label: "0-0-0",
        disabled: false,
        children: [
          { label: "0-0-0-0", id: 111, disabled: false },
          { label: "0-0-0-1", id: 112, disabled: false },
          { label: "0-0-0-2", id: 113, disabled: true },
        ],
      },
      {
        id: 12,
        label: "0-0-1",
        disabled: false,
        children: [
          { label: "0-0-1-0", id: 121, disabled: false },
          { label: "0-0-1-1", id: 122, disabled: false },
          { label: "0-0-1-2", id: 123, disabled: false },
        ],
      },
      { id: 13, label: "0-0-2", disabled: false },
    ],
  },
  {
    id: 2,
    label: "0-1",
    disabled: false,
  },
  {
    id: 3,
    label: "0-2",
    disabled: true,
    children: [
      {
        id: 31,
        label: "0-2-0",
        disabled: false,
      },
    ],
  },
];

const events: EventInterface[] = [
  {
    title: "Title One",
    time: "01:00 AM",
    status: EventStatusEnum.SUCCESS,
    description: "Create a services site 2015-09-01",
  },
  {
    title: "Title Two",
    time: "02: AM",
    status: EventStatusEnum.SUCCESS,
    description: "Create a services site 2015-09-01",
  },
  {
    title: "Title Three",
    time: "01:30 AM",
    status: EventStatusEnum.DANGER,
    description:
      "Solve initial network problems 1, Solve initial network problems 2, Solve initial network problems 3 2015-09-01 ",
  },
  {
    title: "Title Four",
    time: "02:30 AM",
    status: EventStatusEnum.INFORMATIVE,
    description:
      "Technical testing 1, Technical testing 2, Technical testing 3 2015-09-01",
  },
  {
    title: "Title Five",
    time: "03:00 AM",
    description:
      "Technical testing 1, Technical testing 2, Technical testing 3 2015-09-01",
  },
  {
    title: "Title Six",
    time: "03:30 AM",
    description:
      "Technical testing 1, Technical testing 2, Technical testing 3 2015-09-01",
  },
  {
    title: "Title Seven",
    time: "04:00 AM",
    status: EventStatusEnum.CUSTOM,
    customStatusIcon: custom,
    description: "Custom color testing",
  },
];

const App: React.FC = () => {
  return (
    <>
      <h3> Tree With Single Select </h3>
      <Tree
        data={data} // JSON format data with parent and children
        allowNodeSelection={true} //show checkbox or not
        expanded={[1]} //expand specific node
        multiSelect={false} // allow multi select for node
        handleNodeSelect={(nodeIds: any) => {
          // handler function for
          console.log("Selected Nodes", nodeIds);
        }}
        handleNodeToggle={(nodeIds: any) => {
          console.log("Toggle Nodes", nodeIds);
        }}
        expandIcon={expandIcon}
        collapseIcon={collapseIcon}
      />
      <h3> Tree With No Selection allowed </h3>
      <Tree
        data={data} // JSON format data with parent and children
        allowNodeSelection={false} //show checkbox or not
        expanded={[1, 2, 3, 11]} //expand All
        handleNodeToggle={(nodeIds: any) => {
          console.log("Toggle Nodes", nodeIds);
        }}
        expandIcon={expandIcon}
        collapseIcon={collapseIcon}
      />

      <h3> Tree multiselect and Default expand Icon</h3>
      <Tree
        data={data} // JSON format data with parent and children
        handleNodeToggle={(nodeIds: any) => {
          console.log("Toggle Nodes", nodeIds);
        }}
      />
      <Timeline
        events={events}
        align={"left"}
        alternate={true}
        variant={TimelineVariantEnum.SOLID}
      />
    </>
  );
};

export default App;
