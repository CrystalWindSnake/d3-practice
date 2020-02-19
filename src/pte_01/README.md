
# 说明
任务：
- 横向柱状图


知识点：
- data join 的使用


# 关键点
```ts
svg.selectAll('.bar')
        .data(input, d => d.name)
        .join('rect')
```

- .data 第二参数指定匹配key，下次数据更新时就能按key匹配起来
- .join 能代替 enter ，exit 等方法，当传入字符串参数，表示新数据append rect，旧数据自动remove



```ts
svg.selectAll('.bar')
        .data(input, d => d.name)
        .join('rect')
        .attr('class', 'bar')
        .attr('x', 0)
        .attr('y', d => y(d.name) + barWidth / 2)
        .attr('height', barWidth)
```

- 同样，join 之后的操作会应用在 update 和 enter 集合上。因为 join 的返回结果是 update 和 enter 的合并

```ts
    svg.selectAll('.bar')
        .data(input, d => d.name)
        .join(
            enter => enter.append('rect').lower()
                .attr('class', 'bar')
                .attr('x', 0)
                .attr('y', d => y(d.name) + barWidth / 2)
                .attr('height', barWidth)

        )
```

- 也能传入回调，第一个回调是 enter ，注意此回调要返回 enter 的集合，就是上面代码的结果



如果 回调执行多句，记得 return,而且不要返回不是这个选择集的结果：

```ts
    svg.selectAll('.bar')
        .data(input, d => d.name)
        .join(
            enter =>{
                var res=enter.append('rect').lower()
                res.selectAll('xxxxx')
                	.append('other')
                
                return res
            }
        )
```

- 如上，res之后选择了其他，不能返回这种操作的结果，因为join会把这个回调的返回选集合并
- 因此，上面代码特意定义 res 变量，保存 enter 结果集，最后返回

