const b = require("./binary-tree.js");


test("Tree creation", () => {
  // TODO: More thorough tests

  expect(b.createBinaryTree(1)).toEqual({
    val: 1,
    left: null,
    right: null,
    // TODO: color: b.NodeColor.BLACK,
  });
});


describe("Tree detection", () => {
  test("Empty object is not a tree", () => {
    expect(b.isABinaryTreeLike({})).toBe(false);
  });

  test("Tree with missing right value (on any depth) is not a tree", () => {
    expect(b.isABinaryTreeLike({
      val: 1,
      left: null,
    })).toBe(false);

    expect(b.isABinaryTreeLike({
      val: 1,
      left: {
        val: 0.5,
        left: null,
        right: null,
      },
    })).toBe(false);

    expect(b.isABinaryTreeLike({
      val: 1,
      left: {
        val: 0.5,
        left: null,
      },
      right: null,
    })).toBe(false);
  });

  test("Tree with missing left value (on any depth) is not a tree", () => {
    expect(b.isABinaryTreeLike({
      val: 1,
      right: null,
    })).toBe(false);

    expect(b.isABinaryTreeLike({
      val: 1,
      right: {
        val: 0.5,
        left: null,
        right: null,
      },
    })).toBe(false);
  });

  expect(b.isABinaryTreeLike({
    val: 1,
    left: null,
    right: null,
  })).toBe(true);

  expect(b.isABinaryTreeLike({
    val: 1,
    left: {
      val: 0.5,
      left: null,
      right: null,
    },
    right: null,
  })).toBe(true);

  expect(b.isABinaryTreeLike({
    val: 1,
    left: null,
    right: {
      val: 2,
      left: null,
      right: null,
    },
  })).toBe(true);

  expect(b.isABinaryTreeLike({
    val: 1,
    left: {
      val: 0.5,
      left: null,
      right: null,
    },
    right: {
      val: 2,
      left: null,
      right: null,
    },
  })).toBe(true);


  expect(b.isABinaryTreeLike({
    val: 1,
    excessiveProperty: true,
    left: {
      val: 0.5,
      left: null,
      right: null,
      excessiveProperty: true,
    },
    right: null,
  })).toBe(true);
});

describe("Tree in-order traversal", () => {
  test("Uninterrupted in-order traversal (lookup function returns nothing)", () => {
    const tree = {
      val: 3,
      left: {
        val: 2,
        left: null,
        right: null,
      },
      right: {
        val: 4,
        left: null,
        right: null,
      },
    };

    const list = [];
    b.inorder(tree, (node) => {
      list.push(node.val);
    });

    expect(list).toEqual([2, 3, 4]);
  });


  test("In-order traversal interruption", () => {
    const traversedNodes = [];
    let counter = 0;

    const tree = {
      val: 2,
      left: {
        val: 1,
        left: null,
        right: null,
      },
      right: {
        val: 4,
        left: {
          val: 3,
          left: null,
          right: null,
        },
        right: {
          val: 5,
          left: null,
          right: null,
        },
      },
    };
  
    b.inorder(tree, (node) => {
      counter++;
      traversedNodes.push(node.val);
      return node.val === 4;
    });

    expect(counter).toBe(4);
    expect(traversedNodes).toEqual([1, 2, 3, 4]);
  });
});


describe("Node lookup", () => {
  test("In-order lookup", () => {
    const needle = {
      val: 3,
      left: null,
      right: null,
    };

    const haystack = {
      val: 2,
      left: {
        val: 1,
        left: null,
        right: null,
      },
      right: needle,
    };

    expect(
      b.lookup(haystack, (needleLike) => needleLike.val === 3, b.inorder)
    ).toBe(needle);
  });


  test("Default lookup traversal mode is in-order", () => {
    const needle = {
      val: 3,
      left: null,
      right: null,
    };
  
    const haystack = {
      val: 2,
      left: {
        val: 1,
        left: null,
        right: null,
      },
      right: needle,
    };

    const lookupTrace = [];

    const foundNode = b.lookup(haystack, (needleLike) => {
      lookupTrace.push(needleLike.val);
      return needleLike.val === 3;
    });

    expect(foundNode).toBe(needle);
    expect(lookupTrace).toEqual([1, 2, 3]);
  });

  test("Failed lookup (object is not found in tree) returns null", () => {
    const haystack = {
      val: 2,
      left: {
        val: 1,
        left: null,
        right: null,
      },
      right: {
        val: 3,
        left: null,
        right: null,
      },
    };

    expect(
      b.lookup(haystack, (needleLike) => needleLike.val === "Eternal life")
    ).toBe(null);
  });
});

describe("Binary tree insertion", () => {
  test("Binary insertion without balancing a tree", () => {
    const tree = {
      val: 3,
      left: null,
      right: {
        val: 5,
        left: null,
        right: null,
      },
    };

    expect(b.insertBinary(tree, 4).right.left).toEqual({
      val: 4,
      left: null,
      right: null,
    });
  });
});

describe("Binary tree deletion", () => {
  describe("Deep deletion", () => {
    test("Deep deletion (delete node and all its children without rebalancing)", () => {
      const nodeToDelete = {
        val: 1,
        left: {
          val: 0.5,
          left: null,
          right: null,
        },
        right: null,
      };

      const tree = {
        val: 2,
        left: nodeToDelete,
        right: {
          val: 3,
          left: null,
          right: null,
        },
      };

      expect(b.deleteBinary(tree, nodeToDelete, true).left).toBe(null);
    });

    test("Deep deletion of a root itself returns null", () => {
      const suicideTree = {
        val: 3,
        left: null,
        right: null,
      };

      expect(b.deleteBinary(suicideTree, suicideTree, true)).toBe(null);
    });

    test("Deep deletion is a default mode if third parameter is not passed", () => {
      const nodeToDelete = {
        val: 1,
        left: {
          val: 0.5,
          left: null,
          right: null,
        },
        right: null,
      };

      const tree = {
        val: 2,
        left: nodeToDelete,
        right: {
          val: 3,
          left: null,
          right: null,
        },
      };

      expect(b.deleteBinary(tree, nodeToDelete).left).toBe(null);
    });

    test("Deep deletion stops when its found the node and doesn't traverse the whole tree", () => {
      const nodeToDelete = {
        val: 1,
        left: {
          val: 0.5,
          left: null,
          right: null,
        },
        right: null,
      };

      const tree = {
        val: 2,
        left: nodeToDelete,
        right: {
          val: 3,
          left: null,
          right: null,
        },
      };

      const lookupTrace = [];

      const updatedTree = b.deleteBinary(tree, nodeToDelete, true, (node) => {
        lookupTrace.push(node.val);
      });

      expect(lookupTrace).toEqual([0.5, 1, 2]);
    });
  });
});