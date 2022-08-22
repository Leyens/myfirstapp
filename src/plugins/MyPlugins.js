let myPlugins = {}
myPlugins.install = function(Vue,options){
    Vue.directive(options.name,(element,parmas) => {
      element.innerHTML = parmas.value.toUpperCase()
    })
}
export default myPlugins