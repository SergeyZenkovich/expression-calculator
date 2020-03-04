function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    function expressionCalculator(expr) {
        const objectWithAction = {
            '+': (a,b)=>a+b,
            '-': (a,b)=>a-b,
            '*': (a,b)=>a*b,
            '/': (a,b)=>{
                if(b === 0){
                    throw new Error('TypeError: Division by zero.');
                }
                return a/b
            }
    
        }
        let expressionWithoutSpaces = expr.split(' ').join('');
    
        let expressionArr = expressionWithoutSpaces.split('').map(el=>{
            if(el === '+' ||el === '-' ||el === '*' ||el === '/' || el == '(' || el === ')'){
                return ` ${el} `;
            }
            return el;
        });
            expressionArr = expressionArr.join('').split(' ');
            let opensBrackets = expressionArr.filter(el=>el==='(');
            let closesBrackets = expressionArr.filter(el=>el===')');
            if(opensBrackets.length!==closesBrackets.length && opensBrackets.length!==0 || closesBrackets.length!==0){
                throw new Error('ExpressionError: Brackets must be paired');
            }
    
            
        while(expressionArr.includes('+')||expressionArr.includes('-')||expressionArr.includes('*')||expressionArr.includes('/')){
            let Action;
            if(expressionArr.includes('*') && expressionArr.includes('/')){
                Action = expressionArr.indexOf('*')<expressionArr.indexOf('/')? ['*', expressionArr.indexOf('*')] : ['/', expressionArr.indexOf('/')];
            }
            else if(expressionArr.includes('*')){
                Action = ['*', expressionArr.indexOf('*')];
            }
            else if(expressionArr.includes('/')){
                Action = ['/', expressionArr.indexOf('/')];
            }
            else if(expressionArr.includes('+') && expressionArr.includes('-')){
                Action = expressionArr.indexOf('+')<expressionArr.indexOf('-')? ['+', expressionArr.indexOf('+')] : ['-', expressionArr.indexOf('-')];
            }
            else if(expressionArr.includes('+')){
                Action = ['+', expressionArr.indexOf('+')];
            }
            else if(expressionArr.includes('-')){
                Action = ['-', expressionArr.indexOf('-')];
            }
            let a = +expressionArr[Action[1]-1];
            let b = +expressionArr[Action[1]+1];
            let actionStr = a + Action[0] + b;
    
            let result = objectWithAction[Action[0]](a, b);
            expressionArr.splice(Action[1]-1,3,result); 
        }
    
        return Number(expressionArr);
    }
}

module.exports = {
    expressionCalculator
}