// NB! Conceptual Thought
// With this interface, whenever you pass something
// abysmal as left and right, this function would
// create a tree anyway and won't say a word.
// Should it be throwing exceptions like crazy
// if given parameters are out of type?
// Maybe I should have a look into constructors
// and possibly typescript
const createBinaryTree = (val, left, right, additionalProps) => ({
  val: val,
  left: left !== undefined && isBinaryTreeLike(left) ? left : null,
  right: right !== undefined && isBinaryTreeLike(right) ? right : null,
  ...additionalProps,
});

const isBinaryTreeLike = (node) =>
  node !== null &&
  node.hasOwnProperty("val") &&
  node.hasOwnProperty("left") &&
  (node.left === null || isBinaryTreeLike(node.left)) &&
  node.hasOwnProperty("right") &&
  (node.right === null || isBinaryTreeLike(node.right));

const isCorrectBinary = (node) => {
  if (node === null) {
    return true;
  }

  if (node.left !== null && node.left.val > node.val) {
    return false;
  }

  if (node.right !== null && node.right.val < node.val) {
    return false;
  }

  return isCorrectBinary(node.left) && isCorrectBinary(node.right);
};

// TODO: Custom comparison function
const insertBinary = (node, val, props) => {
  const nodeToInsert = createBinaryTree(val, null, null, props);
  
  // TODO: Does traversal method matter?
  inorder(node, (currentNode) => {
    if (nodeToInsert.val < currentNode.val && currentNode.left === null) {
      currentNode.left = nodeToInsert;
      return true;
    }

    if (nodeToInsert.val > currentNode.val && currentNode.right === null) {
      currentNode.right = nodeToInsert;
      return true;
    }

    return false;
  });

  return nodeToInsert;
};

const deleteBinary = (node, nodeToDelete, deep, lookupFn) => {
  if (deep === undefined) {
    deep = true;
  }

  if (node === nodeToDelete) {
    return null;
  }

  // TODO: Should there really be an in-order traversal?
  inorder(node, (soughtForNode) => {
    if (lookupFn !== undefined && typeof lookupFn === "function") {
      lookupFn(soughtForNode);
    }

    if (soughtForNode.left === nodeToDelete) {
      soughtForNode.left = null;
      return true;
    }

    if (soughtForNode.right === nodeToDelete) {
      soughtForNode.right = null;
      return true;
    }
  });

  return node;
};

const preorder = (node, fn) => {
  if (!node) {
    return;
  }

  const shouldInterrupt = fn(node);

  if (shouldInterrupt) {
    return;
  }

  preorder(node.left, fn);
  preorder(node.right, fn);
};

const inorder = (node, fn) => {
  if (!node) {
    return;
  }

  inorder(node.left, fn);

  const shouldInterrupt = fn(node);

  if (shouldInterrupt) {
    return;
  }

  inorder(node.right, fn);
};

const bfs = (node, fn, queue) => {
  if (!node) {
    return;
  }

  if (queue === undefined) {
    queue = [];
  }

  const shouldInterrupt = fn(node);

  if (shouldInterrupt) {
    return;
  }

  if (node.left) {
    queue.push(node.left);
  }

  if (node.right) {
    queue.push(node.right);
  }

  bfs(queue.shift(), fn, queue);
};

// TODO: const preorder = (node, fn) => {}
// TODO: const postorder = (node, fn) => {}
// TODO: const dfs = (node, fn) => {}

const lookup = (node, lookupFn, orderFn) => {
  if (!orderFn) {
    orderFn = inorder;
  }

  let foundNode = null;

  orderFn(node, (soughtForNode) => {
    if (lookupFn(soughtForNode)) {
      foundNode = soughtForNode;
    }

    return foundNode !== null;
  });

  return foundNode;
};

module.exports = {
  bfs,
  createBinaryTree,
  deleteBinary,
  inorder,
  insertBinary,
  isBinaryTreeLike,
  isCorrectBinary,
  lookup,
  preorder,
};
