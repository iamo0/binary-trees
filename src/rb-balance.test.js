const b = require("./binary-tree.js");
const rb = require("./rb-balance.js");

describe("Coloring tree red and black", () => {
  test("Tree coloring function creates new tree instance by default", () => {
    const tree = b.createBinaryTree(1);
    const RBTree = rb.colorTree(tree);

    expect(RBTree).not.toEqual(tree);
  });

  test("Root node is always black by default", () => {
    const tree = b.createBinaryTree(1);
    const RBTree = rb.colorTree(tree);

    expect(RBTree).toEqual({
      val: 1,
      left: null,
      right: null,
      color: rb.NodeColor.BLACK,
    });
  });

  test("Node colors switch on each level from black to red", () => {
    const tree = b.createBinaryTree(
      4,
      b.createBinaryTree(
        2,
        b.createBinaryTree(1, b.createBinaryTree(0.5)),
        b.createBinaryTree(3),
      ),
      b.createBinaryTree(6, b.createBinaryTree(5), b.createBinaryTree(7)),
    );
    const RBTree = rb.colorTree(tree);

    expect(RBTree).toEqual({
      val: 4,
      color: rb.NodeColor.BLACK,

      left: {
        val: 2,
        color: rb.NodeColor.RED,

        left: {
          val: 1,
          color: rb.NodeColor.BLACK,
          left: {
            val: 0.5,
            color: rb.NodeColor.RED,
            left: null,
            right: null,
          },
          right: null,
        },

        right: {
          val: 3,
          color: rb.NodeColor.BLACK,
          left: null,
          right: null,
        },
      },

      right: {
        val: 6,
        color: rb.NodeColor.RED,

        left: {
          val: 5,
          color: rb.NodeColor.BLACK,
          left: null,
          right: null,
        },
        right: {
          val: 7,
          color: rb.NodeColor.BLACK,
          left: null,
          right: null,
        },
      },
    });
  });

  test("During tree coloring all additional properties are transfered to cloned tree", () => {
    const tree = b.createBinaryTree(
      2,
      b.createBinaryTree(1, null, null, { deepProp: true }),
      b.createBinaryTree(3),
      { foo: "bar" },
    );

    const RBTree = rb.colorTree(tree);

    expect(RBTree).toEqual({
      val: 2,
      color: rb.NodeColor.BLACK,
      foo: "bar",
      left: {
        val: 1,
        color: rb.NodeColor.RED,
        deepProp: true,
        left: null,
        right: null,
      },
      right: {
        val: 3,
        color: rb.NodeColor.RED,
        left: null,
        right: null,
      },
    });
  });
});
