---
title: test1
slug: test
description: test
draft: false
tags:
  - test
  - react
  - astro
categories: []
created_at: 2025-05-31T16:51:28.232Z
updated_at: 2025-06-05T16:38:24.916Z
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

*italics*, **strong**, :smile:

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id sem purus, eu commodo tortor. Donec malesuada ultricies dolor a eleifend. In hac habitasse platea dictumst. Vivamus a faucibus ligula. Nullam molestie tristique arcu, eu elementum metus ultricies sed. Aenean luctus congue lectus, vitae semper erat rhoncus non. Nulla facilisi.

## Autolink literals

<www.example.com>, <https://example.com>, and <contact@example.com>.

## Test Footnote

A note[^1]

[^1]: Big note.

## Strikethrough

~one~ or ~~two~~ tildes.

## Tasklist

- [ ] to do
- [x] done

## Image

![image link](https://octodex.github.com/images/hula_loop_octodex03.gif)

## Links

Auto-detected link: <https://giscus.vercel.app>

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

### Math

```math
L = \frac{1}{2} \rho v^2 S C_L
```
