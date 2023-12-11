// 单个节点生成
export class listNode {
  value: any;
  next: listNode | null;
  constructor(value: any, next?: listNode) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }

  // 链表本质是 每个节点保存他相邻节点的内存地址从而实现不同节点的相互关联
  // JS由于没有指针这个概念所以直接保存下一个节点作为标识进行关联
}
