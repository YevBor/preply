export default function Memory(cards){
    this.cards = cards;
    this.currentActiveCard=0;   
}


Memory.prototype.increaseCurrent= function(){
    this.currentActiveCard ++;
}
Memory.prototype.decreaseCurrent= function(){
    this.currentActiveCard --;
}

// export default Memory