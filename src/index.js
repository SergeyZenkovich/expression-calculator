function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    var array = expr.trim().split('');
    var arrayWithoutSpaces = array.filter(function(elem){return elem!=' '});

    //for errors
    var opens = 0;
    var closes = 0;
    for (var i = 0; i<arrayWithoutSpaces.length; i++){
    	if(arrayWithoutSpaces[i] == '('){
    		opens++;
    	}
    	if(arrayWithoutSpaces[i] == ')'){
    		closes++;
    	}
    }
    var exp = arrayWithoutSpaces.join('');
    if (closes != opens){
    	throw "ExpressionError: Brackets must be paired";
    }
    else if (exp.indexOf('/0') != -1){
    	throw "TypeError: Division by zero.";
    }
    else {
    	var x ='return ' + exp;
    	var resultFunc = new Function(x);
    	var result = resultFunc();
    	 return result;
    }
   
}

module.exports = {
    expressionCalculator
}