import React, {useState} from "react";
import styled from "styled-components";
const arrowIcon: string = require("../assets/arrow.svg").default;

interface NodeProps {
  label: string;
  children?: NodeProps[];
  id: never;
  disabled: boolean;
}

interface TreeNodeProps extends TreeProps{
  node: NodeProps;
  setSelectedNodes?: Function;
  selectedNodes?: string[]|number[];
  setExpandedNodes: Function;
  expandedNodes: string[]|number[];
}

const TreeNode: React.FC<TreeNodeProps> = (props) => {
  const {
    node,
    allowNodeSelection,
    expanded,
    selectedNodes = [],
    setSelectedNodes,
    handleNodeSelect,
    expandIcon,
    collapseIcon,
    multiSelect,
    expandedNodes,
    setExpandedNodes,
    handleNodeToggle,
  } = props;
  const [isExpanded, setIsExpanded] = useState(
    expandedNodes.includes(node?.id) || false
  );

  const TreeViewContainer = styled.div`
    margin: 0 0 0 28px;
    &.isChild {
      margin: 0 0 0 10px;
    }
    &.disabled {
      color: gray;

      img {
        opacity: 0.2;
      }
    }
  `;

  const ExpandableIcon = styled.img`
    height: 18px;
    width: 18px;
    &.close {
      transform: rotate(270deg);
    }
  `;

  const toggleExpand = (id: any) => {
    if (node?.disabled) return;
    let nodesClone: any = [...expandedNodes];
    const index = nodesClone.indexOf(id);
    index > -1 ? nodesClone.splice(index, 1) : nodesClone.push(id);
    setIsExpanded(nodesClone.includes(id) || false);
    setExpandedNodes(nodesClone);
    if (handleNodeSelect) {
      handleNodeSelect(nodesClone);
    }
  };

  const handleNodeSelection = (id: any, checked: boolean) => {
    if (setSelectedNodes) {
      let nodesClone = [...selectedNodes];
      if (checked) {
        multiSelect ? nodesClone.push(id) : (nodesClone = [id]);
      } else {
        nodesClone.splice(nodesClone.indexOf(id), 1);
      }
      setSelectedNodes(nodesClone);
      if (handleNodeToggle) {
        handleNodeToggle(nodesClone);
      }
    }
  };

  const getExpandIconClassname = () => {
    if (!node?.disabled && isExpanded && !expandIcon) return;
    if (!isExpanded && !collapseIcon) {
      return "close";
    }
  };

  const getExpandCollapseIcon = () => {
    if (isExpanded && expandIcon) {
      return collapseIcon;
    } else if (!isExpanded && collapseIcon) {
      return expandIcon;
    }
    return arrowIcon;
  };

  return (
    <TreeViewContainer
      className={
        (node?.disabled ? "disabled " : "") +
        (node?.children?.length ? "isChild " : "")
      }
    >
      <div style={{display: "flex", alignItems: "center"}}>
        {node?.children?.length && (
          <ExpandableIcon
            src={getExpandCollapseIcon()}
            onClick={() => toggleExpand(node?.id)}
            className={getExpandIconClassname()}
          />
        )}
        {allowNodeSelection && (
          <input
            type="checkbox"
            checked={selectedNodes?.includes(node?.id)}
            onChange={() =>
              handleNodeSelection(
                node?.id,
                !selectedNodes?.includes(node?.id)
              )
            }
            disabled={node?.disabled}
          />
        )}
        <span
          onClick={() => toggleExpand(node?.id)}
          className={``}
        >{node?.label}</span>
      </div>

      {isExpanded &&
        node?.children?.map((child: NodeProps, index: number) => (
          <TreeNode
            {...props}
            key={index}
            allowNodeSelection={allowNodeSelection}
            expanded={expanded}
            node={{
              label: child?.label,
              children: child?.children,
              id: child?.id,
              disabled: child?.disabled,
            }}
          />
        ))
      }
    </TreeViewContainer>
  );
};

interface TreeProps {
  data: any[];
  allowNodeSelection?: boolean;
  expanded?: string[]|number[];
  nodeId?: string;
  handleNodeSelect?: Function;
  expandIcon?: string;
  collapseIcon?: string;
  multiSelect?: boolean;
  handleNodeToggle?: Function;
}

const Tree: React.FC<TreeProps> = (props) => {
  const {
    data = [],
    nodeId = "id",
    expanded = [],
  } = props;
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState(expanded);

  return (
    <>
      {data &&
      data?.map((nodeData: any, index) => (
        <TreeNode
          {...props}
          key={index}
          node={{
            label: nodeData?.label,
            children: nodeData?.children,
            id: nodeData[nodeId],
            disabled: nodeData?.disabled,
          } as NodeProps}
          selectedNodes={selectedNodes}
          setSelectedNodes={setSelectedNodes}
          expandedNodes={expandedNodes}
          setExpandedNodes={setExpandedNodes}
        />
      ))}
    </>
  );
};

Tree.defaultProps = {
  nodeId: "id",
  multiSelect: true,
  allowNodeSelection: true,
}

export default Tree;
