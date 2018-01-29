# 下拉框组件

## 下拉框组件开发计划

| 日期 | 完成内容 |
|-----|---------|
|1.30 | 完成简化版本的Dropdown开发，并提供使用说明文档|
|2.06 | 基于基础的Dropdown向上扩展组件，包括（下拉单选框，下拉多选框，输入下拉框等组件）|
|2.10| 完成所有组件使用说明文档的编写 |

## 基础Dropdown组件的使用

```javascript
<Dropdown
    className = {"dropdown"}
    titleEle= {<DropTitle />}
    contentEle = {<DropBody />}
>
</Dropdown>
```

### 参数说明

| 参数 | 说明 | 类型 |
|-----|------| ---- |
| titleEle | Dropdown的头部内容 | React组件/DOM结构 |
| contentEle | Dropdown的下拉弹出内容块 | React组件/DOM结构 |

### 对外接口

#### 接口说明

## 基于基础Dropdown扩展的下拉选择框

### 使用示例

```javascript
<RayrDropdown 
    list={list}
    // selected={{value:1, label: '苹果'}}
    placeholder={'请选择'}
    valueChange={(res)=>{
        console.log(res);
        document.querySelector('#result1').innerHTML = `选择结果：value: ${res.value},label: ${res.label}`;
    }}
/>
```
