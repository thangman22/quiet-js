(function(root,factory){if(typeof define === 'function' && define.amd){define([],factory);}else if(typeof module === 'object' && module.exports){module.exports = factory();}else{root.quiet_emscripten = factory().init(root.quiet_emscripten_config);}}(this,function(){