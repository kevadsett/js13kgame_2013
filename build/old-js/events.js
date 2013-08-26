function Events() {
  var events = {};
  return {
    on: function (type, func, context) {
      var list = events[type] || (events[type] = []);
      return !!list.push({func:func, context:context});
    },
    off: function (type, funct, context) {
      var list = events[type], i, j;
      if(!funct) return delete events[type];
      for (i=0, j=list.length; i<j; i++) {
        with(list[i]) {
          if(func === funct) delete list[i];
        }
      } 
    },
    trigger: function (type, args) {
      if(!events[type]) return false              
      if(args && !args instanceof Array) args = [args]
      var list = events[type], i, j;
      for(i=0, j=list.length; i<j; i++){
        list[i].func.apply(list[i].context, args);
      }
    }
  }
}
