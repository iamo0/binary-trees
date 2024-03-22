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
  left: left !== undefined && isABinaryTreeLike(left) ? left : null,
  right: right !== undefined && isABinaryTreeLike(right) ? right : null,
  ...additionalProps,
});

const isABinaryTreeLike = (node) =>
  node !== null &&
  node.hasOwnProperty("val") &&
  node.hasOwnProperty("left") &&
  (node.left === null || isABinaryTreeLike(node.left)) &&
  node.hasOwnProperty("right") &&
  (node.right === null || isABinaryTreeLike(node.right));

const insertBinary = (node, val) => {
  let left = node.left;
  let right = node.right;

  if (val < node.val) {
    left = isABinaryTreeLike(left)
      ? insertBinary(left, val)
      : createBinaryTree(val);
  }

  if (val > node.val) {
    right = isABinaryTreeLike(right)
      ? insertBinary(right, val)
      : createBinaryTree(val);
  }

  return createBinaryTree(node.val, left, right);
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
  isABinaryTreeLike,
  lookup,
};
