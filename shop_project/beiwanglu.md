### 全局事件总线实现组件间交流
在将vm作为全局事件总线，在vm实例中的beforeCreate()钩子中添加Vue.prototype.$bus = this   //this就是vm本身