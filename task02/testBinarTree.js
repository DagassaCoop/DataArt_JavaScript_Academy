class Node {
    constructor(data) {
        this.data = data; // node value
        this.left = null;   // left node child reference
        this.right = null; // right node child reference
    }
}
class BinarySearchTree {
    constructor() {
        this.root = null; // корень bst
    }
    insert(data) {
	    let newNode = new Node(data);

	    if (this.root === null) {
	        this.root = newNode;
	    } else {
	        this.insertNode(this.root, newNode); // helper method below
	    }
	}

	insertNode(node, newNode) {
	    if (newNode.data < node.data) {
	        if (node.left === null) {
	            node.left = newNode;
	        } else {
	            this.insertNode(node.left, newNode);
	        }
	    } else {
	        if (node.right === null) {
	            node.right = newNode;
	        } else {
	            this.insertNode(node.right, newNode);
	        }
	    }
	}
}

const BST = new BinarySearchTree();
BST.insert(11); // establishes root node 
BST.insert(7);
BST.insert(9);
BST.insert(15);

BST.insert(6);

console.log(BST);