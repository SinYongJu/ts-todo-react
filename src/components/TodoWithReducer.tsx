import React, { useState, useRef, useEffect } from 'react';

interface TodoLists {
    list : Array<TodoChild>
}

interface TodoChild{
    value : string,
    id: number,
    doUpdate : boolean
}

interface TodoAction {
    type : string,
    payload : {
        target? : number
        value : string, 
    }
}

enum todoType {
    CREATE = 'CREATE',
    DELETE = 'DELETE',
    UPDATE = 'UPDATE',
    MODIFY = 'MODIFY'
}


function TodoReducer (state:TodoLists, action:TodoAction) {
    const { value,target } = action.payload
    const todoListlength = state.list.length < 1 ? 1 : state.list.length
    switch (action.type) {
        case todoType.CREATE:
            let id =  state.list[todoListlength-1] ? state.list[todoListlength-1].id + 1: todoListlength 
            return {
                ...state,
                list : state.list.concat({
                    value,
                    id,
                    doUpdate : false, 
                })
              
            }
        case todoType.DELETE:
            return {
                ...state,
                list : state.list.filter(({id}) => id !== target)
               
            }   
        case todoType.MODIFY : 
            let modifyTargetIndex = state.list.findIndex(({id}) => id === target)
            let modifyList = state.list 
            let {doUpdate}  = modifyList[modifyTargetIndex]
            modifyList[modifyTargetIndex].doUpdate = !doUpdate
            console.log(modifyList)
            return {
                ...state,
                list : [...modifyList]

            }    
        case todoType.UPDATE:
            let updateTargetIndex = state.list.findIndex(({id}) => id === target)
            // let targetIndex = state.list.findIndex(({id}) => id === target)
            let updateList = state.list 
            updateList[updateTargetIndex].value = value
            updateList[updateTargetIndex].doUpdate = false
            return {
                ...state,
                list : [...updateList]
            }     
        default:
            console.log('default')
            return {
                ...state
            }
    }

}

const initTodos : TodoLists = {
    list:[]
}
function TodoWithReducer (props:any){
    const [todos, dispatchTodos] = React.useReducer<React.Reducer<TodoLists, TodoAction>>(TodoReducer,initTodos)
    const [value , setValue] = useState('')
    const [modifyValue , setModifyValue] = useState('')

    const onChange = (event : React.ChangeEvent<HTMLInputElement>) => {
      const value : string = event.target.value 
      setValue(value)
    }

    const onKeyUpEnter = (callback : Function) => (event : React.KeyboardEvent<HTMLInputElement>) => {
        if(event.keyCode === 13){
            callback()
        }
    }
    const addTodo = () => {
        if(value.length > 4) setValue(():string => {
            dispatchTodos({
                type : todoType.CREATE,
                payload : {
                   value : value, 
               }
            })
            return ''
        })
    }
    const removeTodo = (id : number) => () => dispatchTodos({
        type : todoType.DELETE,
        payload : {
           target : id,
           value : ''
       }
    })
    const updateTodo = (id : number) => () => dispatchTodos({
        type : todoType.UPDATE,
        payload : {
           target : id,
           value : modifyValue
       }
    })
    const modifyTodo = (id : number) =>  () =>{
        console.log(id)
        setModifyValue(() : string=>{
            dispatchTodos({
                type : todoType.MODIFY,
                payload : {
                   target : id,
                   value : ''
               }
            })
            let targetIndex : number = todos.list.findIndex((todo) => todo.id === id)
            let modifyValue : string = todos.list[targetIndex].value
            return modifyValue
        })
    } 

    const onChangeModify = (event : React.ChangeEvent<HTMLInputElement>) => {
        const value : string = event.target.value 
        setModifyValue(value)
      }
    const list = todos.list
    return <React.Fragment>
        <h2> TodoWithReducer </h2>
        <input type="text" id={"todo_id_input"} value={value} onChange={onChange} onKeyUp={onKeyUpEnter(addTodo)}/>
        <button type="button" onClick={addTodo}>ADD TODO</button>
        <ul>
            {list.map(item => {
               
                    return (
                        <li  key={`TodoWithReducer__${item.id}`}>
                         {!item.doUpdate ? 
                            <>         
                                {item.id} : {item.value}
                                <button type="button" onClick={removeTodo(item.id)}>REMOVE</button>
                                <button type="button" onClick={modifyTodo(item.id)}>MODIFY</button>
                            </>
                         :
                            <>
                                <input type="text" id={`modify_taregt__${item.id}`} value={modifyValue} onChange={onChangeModify} onKeyUp={onKeyUpEnter(updateTodo(item.id))}/>
                                <button type="button" onClick={updateTodo(item.id)}>UPDATE</button>
                            </>
                         } 
                    </li>
                    )
                
                
            })}
        </ul>
    </React.Fragment>
}

export default TodoWithReducer