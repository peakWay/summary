

/* react && list.map 返回0 */
const App = () => {
    const data = [1, 2]
    return (
        <div>{ this.data.length && data.map(item => item) }</div>
    )
}

ReactDOM.render(App(), window.document.getElementById('app'))


/* 使用按位非操作符判断index != -1 */
