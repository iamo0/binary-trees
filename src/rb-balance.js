const b = require("./binary-tree");

const NodeColor = {
  BLACK: 0,
  RED: 1,
};

const colorTree = (node, color) => {
  if (node === null) {
    return;
  }

  if (color === undefined) {
    color = NodeColor.BLACK;
  }

  const savedProperties = Object.assign({}, node);
  delete savedProperties.val;
  delete savedProperties.left;
  delete savedProperties.right;
  delete savedProperties.color;

  const coloredTree = b.createBinaryTree(
    node.val,
    colorTree(
      node.left,
      color === NodeColor.RED ? NodeColor.BLACK : NodeColor.RED,
    ),
    colorTree(
      node.right,
      color === NodeColor.RED ? NodeColor.BLACK : NodeColor.RED,
    ),
    { color, ...savedProperties },
  );

  return coloredTree;
};

const insertNode = (node, val, props) => {
  const insertedNode = b.insertBinary(node, val, props);
  const coloredNode = colorTree(insertedNode, NodeColor.RED);
  return coloredNode;
};

module.exports = {
  colorTree,
  insertNode,
  NodeColor,
};
