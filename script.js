//ConstVariable start
function Const(value){
    this.value=value;
}


Const.prototype.evaluate = function(){
    return this.value;
}    

Const.prototype.diff = function(){
    return new Const(0);
}

Const.prototype.toString = function(){
    return String(this.value)+" ";
}


function Variable(varName){
    this.varName = varName;
}


Variable.prototype.evaluate = function(x,y,z){
    if(this.varName=='x'){
        return x;
    }
    if(this.varName=='y'){
        return y;
    }
    if(this.varName=='z'){
        return z;
    }
}   

Variable.prototype.diff = function(varName){
    if(this.varName == varName){
        return new Const(1);
    }else{
        return new Const(0);
    }
}

Variable.prototype.toString = function(){
    return String(this.varName)+" ";
}
//ConstVariable finish

function BinaryOperation(){
}


BinaryOperation.prototype.evaluate = function(x,y,z) {
    return this.calc(this.arguments[0].evaluate(x,y,z),this.arguments[1].evaluate(x,y,z));
}

BinaryOperation.prototype.toString = function() {
    return this.arguments[0].toString()+this.arguments[1].toString()+String(this.operationIdetificalString)+' ';    
}



function UnaryOperation(){
}


UnaryOperation.prototype.evaluate = function(x,y,z) {
    return this.calc(this.arguments[0].evaluate(x,y,z));
}

UnaryOperation.prototype.toString = function() {
    return this.arguments[0].toString()+' '+String(this.operationIdetificalString)+' ';    
}



function Add(){
    this.arguments = arguments;
}

Add.prototype = new BinaryOperation();
Add.prototype.operationIdetificalString = '+';
Add.prototype.calc = function(){
        return arguments[0]+arguments[1];
}
Add.prototype.diff = function(varName) {
    return new Add(this.arguments[0].diff(varName),this.arguments[1].diff(varName)); 
}


function Subtract(){
    this.arguments = arguments;
}

Subtract.prototype = new BinaryOperation();
Subtract.prototype.operationIdetificalString = '-';
Subtract.prototype.calc = function(){
        return arguments[0]-arguments[1];
}
Subtract.prototype.diff = function(varName) {
    return new Subtract(this.arguments[0].diff(varName),this.arguments[1].diff(varName)); 
}


function Multiply(){
    this.arguments = arguments;
}

Multiply.prototype = new BinaryOperation();
Multiply.prototype.operationIdetificalString = '*';
Multiply.prototype.calc = function(){
        return arguments[0]*arguments[1];
}
Multiply.prototype.diff = function(varName) {
    return new Add(new Multiply(this.arguments[0].diff(varName),this.arguments[1]),new Multiply(this.arguments[0],this.arguments[1].diff(varName))); 
}

function Divide(){
    this.arguments = arguments;
}

Divide.prototype = new BinaryOperation();
Divide.prototype.operationIdetificalString = '/';
Divide.prototype.calc = function(){
        return arguments[0]/arguments[1];
}
Divide.prototype.diff = function(varName) {
    return new Divide(new Subtract(new Multiply(this.arguments[0].diff(varName),this.arguments[1]),
                                    new Multiply(this.arguments[0],this.arguments[1].diff(varName))),
                    new Multiply(this.arguments[1],this.arguments[1]));
}


function Sin () {
    this.arguments = arguments;
}
Sin.prototype = new UnaryOperation();
Sin.prototype.calc = function() {
    return Math.sin(arguments[0]);
};
Sin.prototype.operationIdetificalString = 'sin';
Sin.prototype.diff = function(varName) {
    return new Multiply(new Cos(this.arguments[0]), this.arguments[0].diff(varName));
}


function Cos () {
    this.arguments = arguments;
}
Cos.prototype = new UnaryOperation();
Cos.prototype.calc = function() {
    return Math.cos(arguments[0]);
};
Cos.prototype.operationIdetificalString = 'cos';
Cos.prototype.diff = function(varName) {
    return new Multiply(new Subtract(new Const(0),new Sin(this.arguments[0])), this.arguments[0].diff(varName));
}