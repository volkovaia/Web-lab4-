export function str_max_len(str, max_len){
    if(str.length > max_len){
        return str.substring(0, max_len-3)+"..."
    }
    return str
}