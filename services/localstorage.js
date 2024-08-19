import { v4 } from "uuid";


export function salvarLocalStorage (key,data){
    //verificando se já tem item:
    let have = localStorage.getItem(key)
    if(have){
        //se tiver, pega o item
        let item = localStorage.getItem(key)
        item = JSON.parse(item)
        data.id = v4()
        item.push(data)

        //salva o item
        item = JSON.stringify(item)
        localStorage.setItem(key,item)
    }else{
        //se não tiver, cria um array vazio
        data.id = v4()
        let toSave = JSON.stringify([data])
        localStorage.setItem(key,toSave)
    }
}

export function pegarLocalStorage(key){
    let item = localStorage.getItem(key)
    item = JSON.parse(item)
    return item
}
export function deletarLocalStorage(key,id){
    let item = localStorage.getItem(key)
    item = JSON.parse(item)
    item = item.filter((item)=>item.id !== id)
    item = JSON.stringify(item)
    localStorage.setItem(key,item)
}
export function editarLocalStorage(key,id,newdata){
    let item = localStorage.getItem(key)
    item = JSON.parse(item)
    item = item.map((item)=>{
        if(item.id == id){
            
            return newdata
        }else{

            return item
        }
    })
    item = JSON.stringify(item)
    localStorage.setItem(key,item)
}