---
title: 测试 MD 样式
slug: test-md-style
description: test markdown style
draft: false
tags:
  - test
  - astro
categories: []
created_at: 2025-05-31T16:51:28.232Z
updated_at: 2025-06-12T12:44:18.067Z
fmContentType: blog
---

Hello! :tada:

**Test markdown features...**

## H2

followed by some text

### H3

followed by some text

#### H4

followed by some text

##### H5

followed by some text

###### H6

*italics*, **strong**, ~one~ or ~~two~~ tildes, :smile:

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id sem purus, eu commodo tortor. Donec malesuada ultricies dolor a eleifend. In hac habitasse platea dictumst. Vivamus a faucibus ligula. Nullam molestie tristique arcu, eu elementum metus ultricies sed. Aenean luctus congue lectus, vitae semper erat rhoncus non. Nulla facilisi.

## Test Footnote

A note[^1]

[^1]: Big note.

## List

### Ordered

1. A
   1. A.A
   2. A.B
2. B
3. C

### UnOrdered

- A
  - A.A
    - A.A.A
    - A.A.B
  - A.B
- B
- C

## Tasklist

- [ ] to do
- [x] done

## Image

![image link](https://octodex.github.com/images/hula_loop_octodex03.gif)

![test](./assets/test.jpg)

## Links

<https://google.com>, <https://github.com>

<www.example.com>, <https://example.com>, and <contact@example.com>.

## Blockquote

> here is blockquote
> test `inline code` *italics* **strong** :smile:

## Code

```js
var test = function this_is(){
  console.log("language declared as 'js' instead");
}
```

```diff
- print('hello world')
+ print('Hello, world!')
```

Can render `inline code`, `console.log("Hello World"){:js}`.

## Mermaid

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

## HR

------

## Table

| a   | b    |    c |   d   |
| --- | :--- | ---: | :---: |

| Table Header 1 | Table Header 2                        |
| -------------- | ------------------------------------- |
| Content        | <https://github.com/laymonage/giscus> |
| Content        | <http://github.com:\><te>             |
I'm below the table.

A table with an empty cell and unaligned indenting.

| Table Header 1 | Table Header 2 |
| -------------- | -------------- |
| Content        | Content        |
| Content        |                |

## Math

```math
L = \frac{1}{2} \rho v^2 S C_L
```

## 中英文混排、标点挤压

Hello, world!古代称用以书写的小幅绢帛 with_spaces 后no_space亦以借指纸。《汉书·外戚传下·孝成赵皇后》：「武（籍武）发篋中，有裹药二枚，赫蹏书。」颜师古注：「邓展曰：『赫音兄弟鬩墙之鬩。』应劭曰：『赫蹏，薄小纸也。』」宋赵彦卫《云麓漫钞》卷七：「《赵后传》所谓『赫蹏』者，注云『薄小纸』，然其寔亦縑帛。」
