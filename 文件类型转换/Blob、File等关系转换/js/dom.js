

const $ = (function(){
    return function(selector) {
        let dom = document.querySelector(selector);
        if (!dom) throw new Error('未选中Dom')

        /**
         * 
         * @param  {...Element, text/HTML} elements 
         */
        function append(...elements) {

            if (!elements || !elements.length) throw new Error('参数不能为空')

            let html = dom.innerHTML;
            
            elements.forEach(item => {
                html += item
            })

            dom.innerHTML = html;
        }

        dom.append = append;
        return dom;
    }
})();

