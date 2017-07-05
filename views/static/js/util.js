define(function() {
    return {
        getQueryObj: function (){
            var queryString = location.search;
            queryString = queryString.slice(1);
            var obj = {};
            var kvPairs = queryString.split("&");
            for (var i = 0; i < kvPairs.length; i++) {
                var kvPair = kvPairs[i];
                var kvArr = kvPair.split("=");
                obj[kvArr[0]] = decodeURI(kvArr[1]);
            } 
            return obj;       
        },
		getQuery: function (key){
			return this.getQueryObj()[key];
		}	
    } 
});


// return {
// 	getQueryObj: function (){
// 		var queryString = location.search;
// 		//?key=value&key=value&key=value
// 		queryString = queryString.slice(1);

// 		var obj = {};
// 		var kvPairs = queryString.split("&");
// 		for(var i = 0; i < kvPairs.length; i++){
// 			var kvPair = kvPairs[i];
// 			//key=value
// 			var kvArr = kvPair.split("=");
// 			obj[kvArr[0]] = decodeURI(kvArr[1]);
// 		}
// 		return obj;
// 	},
// 	getQuery: function (key){
// 		return getQueryObj()[key];
// 	}	
// };

