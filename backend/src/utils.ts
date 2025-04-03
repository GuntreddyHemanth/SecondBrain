

export function random(len:number){
    let options = "n3neiueiu4irinrjinu847y84hfbffnfjknkjnejncin";
    let length = options.length;
    let ans = ""

    for (let i=0; i < len; i++){
        ans += options[Math.floor((Math.random() * length))]
    }
    return ans
}