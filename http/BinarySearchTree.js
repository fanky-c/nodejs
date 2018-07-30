/**
 * 二叉搜索树的
 */
function BinarySearchTree() {

    // 首先这里，声明一个node节点，也就是我们树结构中所代表的每一个节点，包括根节点在内。
    var Node = function (key) {
        // 节点的key，也就是键，大家要记住一个事情，我们所有的数据结构，都是为了应对合理适当的场景。
        // 而无论何种数据结构，都需要检索，我记得前面说过，也就是增删改查这种万年不变的操作。
        // 而这里的键（也就是key），是为了依照一定的规则来设置键，以便我们更快速的检索到，提取其值。
        // 当然，我们实现的这个二叉搜索树貌似并没有value，但是我们可以自己去设置一个键值对的映射关系。
        // 既然能检索到key，也就可以找到其对应的值。当然，这里就不都说了。
        // 比如说这里，我们就可以给Node私有构造函数加一个this.value = value。来形成一个映射关系。
        this.key = key;
        // left和right，也就是指向当前节点的左右子节点的指针。
        this.left = null;
        this.right = null;
    };

    //初始化一个二叉搜索树，声明一个私有变量root代表根节点。
    var root = null;

    // 这是插入节点的私有属性，我们会在insert方法中直接调用。那么我们先去看insert方法。
    // 其实这里也不复杂，但是用到了递归，如果大家对递归不太了解，可以去百度搜一下。后面的文章我也会写一些算法的相关内容。
    // 我们回到这里，insertNode有两个参数，在insert方法调用的时候我们传入了root，newNode。以便我们从根节点去查找。
    var insertNode = function (node, newNode) {
        // 这里就分为了两种情况，其实后面的方法也是这样，新插入的key和node（第一次执行的时候是root）相对比。
        // 如果新插入的key小于node的key，我们要插入到left里，如果是大于等于node的key，就插入到right。这是我们二叉搜索树的规则。
        if (newNode.key < node.key) {
            // 那么这里，如果（或者说是‘直到’）node.left是空，也就是没有元素，那么就插入到node.left中。
            // 否则，再调用一下这个函数自身（也就是递归了，这就是为什么上面也可以说是‘直到’，递归必须有递归终止的条件，不然会陷入死循环）。
            // 那么下面的else情况也是同理。
            if (node.left === null) {
                node.left = newNode;
            } else {
                insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                insertNode(node.right, newNode);
            }
        }
    }

    // 中序遍历，首先需要说一下什么是中序遍历。
    // 中序遍历是一种以上行顺序访问BST所有节点的遍历方式（也就是从小到大的顺序访问所有节点），BST就是binary search tree。
    // 那么该方法有两个参数，一个是node，一个是回调函数（这个回调函数，在本文的应用是下面的console每一个节点的值，当然，你也可以用回调函数做一些羞羞的事）。
    var inOrderTraverseNode = function (node, callback) {
        // 我们要递归使用该方法，前面说了，必须有一个终止回调的条件。这里就是如果节点为空，我们就认为元素遍历完成，停止递归。
        if (node !== null) {
            // 这里，递归调用相同的函数来访问左侧子节点，然后对这个节点进行一些操作，最后访问右侧子节点。
            // 到这里，其实中序遍历可以说是，左（左侧子节点），中（该节点），右（右侧子节点）的访问方式。
            inOrderTraverseNode(node.left, callback);
            callback(node.key);
            inOrderTraverseNode(node.right, callback);
        }
    }

    // 先序遍历，其实我们看代码就可以知道了，先序遍历就是中，左，右。也就是先访问节点本身，再访问左侧然后是右侧子节点。
    var preOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            callback(node.key);
            preOrderTraverseNode(node.left, callback);
            preOrderTraverseNode(node.right, callback);
        }
    }

    // 那么后序遍历呢?额......可想而知，也就是左右中的方式，先访问节点的后代节点，再访问节点本身。
    var postOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            postOrderTraverseNode(node.left, callback);
            postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }

    // 搜索树中的最小值，嗯......我们根据前面了解的内容，猜猜看最小的值是哪一个？如果你说不知道，请从头再来！
    // 树中最小的值，就是在树的最底层最左侧的节点。那么最大值就是右侧的节点了。
    // 为什么会这样呢？如果你还是不知道。请从头再......再来！
    var minNode = function (node) {
        // 如果该节点是否是合法值，是->继续，不是，返回null。
        if (node) {
            // 这里就是循环判断node.left是否存在，知道不存在的时候（说明已经得到最左侧的子节点了）就直接返回上一次赋值的node.key。
            while (node && node.left !== null) {
                node = node.left;
            }

            return node.key;
        }

        return null;
    }

    // 同上
    var maxNode = function (node) {
        if (node) {
            while (node && node.right !== null) {
                node = node.right;
            }
            return node.key;
        }

        return null;
    }

    // 其实这里，我真的不想说......但是我还是要'磨叽'一下......
    // 这里第一个的node参数，在search中传入的是root，因为要从root开始执行逻辑。
    // 还有，后面就几乎所有的传入node参数的私有方法，传入的都是root，因为要从root开始。
    var searchNode = function (node, key) {
        // 如果是null了，返回false
        if (node === null) {
            return false;
        }
        // 这里，其实也就是根据不同的值得大小来判断递归时所需要传入的参数是什么，如果即不大也不小。bingo，说明找到了。
        if (key < node.key) {
            return searchNode(node.left, key);
        } else if (key > node.key) {
            return searchNode(node.right, key);
        } else {
            return true;
        }
    }

    // 这个方法稍微复杂并且有意思一点，我们详细来说说。
    var removeNode = function (node, key) {
        // 这个判断没什么好说的了，如果是null说明在树中没有这个键，直接返回null就可以了。
        if (node === null) {
            return null;
        }
        // 那么这里会有三种情况的判断，如果要找的key小于当前的node.key，就递归调用函数，沿着树的左边一直找下去。
        // 那么如果要找的key大于当前的node.key，就沿着树的右边一直找下去。直到找到为止。
        if (key < node.key) {
            node.left = removeNode(node.left, key);
            return node;
        } else if (key > node.key) {
            node.right = removeNode(node.right, key);
            return node;
            // 这里就是找到了匹配的key的时候所处理的逻辑了
        } else {
            // 第一种情况就是该节点是没有左右子节点的，我们直接赋值null来移除就可以了。
            // 虽然该节点没有子节点，但是有一个父节点，我们需要通过返回null，来使对应的父节点的指针指向null。
            // 要记得我们在remove方法中有一个root = removeNode(root,key);赋值语句，可以到下面查看。
            // 就是为了让我们父节点接收到更改的指针。
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            // 这里是第二种情况，移除有一个左侧节点或者右侧节点的节点。
            // 我们只要跳过这个节点，直接将父节点的指针指向子节点就可以了。
            if (node.left === null) {
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left;
                return node;
            }
            // 最后是第三种情况，稍微复杂些，其实也就是我们要做的操作多一些。
            // 首先，我们在找到了需要移除的节点后，需要找到它右边子树种最小的节点。（要移除节点的继承者，也就是说在移除了匹配的节点后，这个值会替换被移除的节点）
            // 这里findMinNode跟min方法是一样的，只不过返回值稍有不同
            var aux = findMinNode(node.right);
            // 然后用aux去更新要移除节点的值，这个时候，我们已经改变了要移除节点的值，也就相应的移除了该节点。
            node.key = aux.key;
            // 但是这个时候就有两个相同的键了，所以我们要移除aux也就是node.right指向的节点。
            node.right = removeNode(node.right, aux.key);
            // 返回更新后的引用。
            return node;
            // 最后，要提醒大家一个需要注意的地方，移除一个树中的节点，并没有移除该节点下的所有子树或者子节点，这是一个比较容易让人迷惑的误区。
            // 比如说,我有一棵下面这样的树
            /*
                        A
                    B       C
                D      E  F    G 
            */
            // 我想要移除C，并没有把F,G也同时移除，只是单纯的移除了C这个节点，所以我们需要依照二叉搜索树的规则，找到一个合理的值代替这个位置（也就是F）。
            // 那么我们用F替换C，并把C移除，更改对应的指针。也就完成了第三种情况的移除操作。
        }
    }

    var findMinNode = function (node) {
        while (node && node.left !== null) {
            node = node.left;
        }
        return node;
    }

    // 其实这个方法很简单，一看就明白了。
    // 如果root是null，说明是一个空树，我们直接让newNode为root就可以了，如果不是,我们再调用insertNode那个私有方法。
    this.insert = function (key) {
        var newNode = new Node(key);

        if (root === null) {
            root = newNode;
        } else {
            insertNode(root, newNode);
        }
    }


    this.inOrderTraverse = function (callback) {
        inOrderTraverseNode(root, callback);
    }

    this.preOrderTraverse = function (callback) {
        preOrderTraverseNode(root, callback);
    }

    this.postOrderTraverse = function (callback) {
        postOrderTraverseNode(root, callback);
    }

    this.min = function () {
        return minNode(root);
    }

    this.max = function () {
        return maxNode(root);
    }

    this.search = function (key) {
        return searchNode(root, key);
    }

    this.has = function(key){

    }

    this.size = function () {
        return root.length;
    }

    this.remove = function (key) {
        root = removeNode(root, key);
    }
}

var tree = new BinarySearchTree();

tree.insert(1);
tree.insert(-1);
tree.insert(4);
tree.insert(2);
tree.insert(10);
console.log(tree.size());