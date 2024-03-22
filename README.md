# Binary trees

Research project on Computer Science. A little library that works with binary trees. Written in pure Node.js (even with Common.js modules), tested with Jest.

Functionality
- Create trees
- Insert items in a correct order
- Traverse trees
  - Inorder
  - Preorder
  - Breadth-first search
- Lookup nodes in a tree
- Delete nodes from tree
- Balancing tree using Black-Red Tree (Work in Progress)

All code is written in TDD, so there's a unit-test for each function. Works great as a documentation.

TODO:
- [ ] Black-Red Tree implementation for balancing trees
  - [x] Colouring nodes to black and white
  - [ ] Checking if tree is correctly balanced
  - [ ] Inserting a node with rebalancing the tree afterwards
  - [ ] Deleting a node with rebalancing the tree afterwards
- [ ] Speed tests
- [ ] Custom comparison functions (now it uses standard JS comparison operator)
