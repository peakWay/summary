
# 乘性运算符
乘性运算符会将双值都转换成数值类型，有以下三种：乘法运算符、除法运算符、取余运算符

## 乘法运算符
乘法运算符表示方式为x，求值规则如下：
- 正常值之间相乘的结果
- 只有有任一值为NaN，结果为NaN
- Infinity乘0，结果为NaN
- Infinity乘Infinity，结果为Infinity
- 0 乘 0,结果为0

## 除法运算符
除法运算符表示方式为/，求值规则如下：
- 正常值之间相除的结果
- 只有有任一值为NaN，结果为NaN
- Infinity除以Infinity，结果为NaN(第一次判断错了)
- Infinity除以0，结果为Infinity
- 正常值除以0，结果为Infinity
- 0除以Infinity, 结果为0
- 正常值除以Infinity，结果为Infinity
- 0除以0，结果为Nan

## 除(取余)运算符
除(取余)运算符表示方式为%，求商值规则如下：
- 正常值之间取余的结果
- 只有有任一值为NaN，结果为NaN
- 当除数为0，结果为NaN
- 当被除数为0，除数为非NaN值，结果为0
- 当被除数为Infinity，结果为NaN
- 当除数为Infinity， 结果为被除数
