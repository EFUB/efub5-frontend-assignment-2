function forEach <T>(arr:T[],callback:(item:T)=>void){
    for(let i=0;i<arr.length;i++){
        callback(arr[i]);
    }
}