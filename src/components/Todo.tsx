import React, { useState, useRef, useEffect } from 'react';

interface TodoItem{
    value : string,
    id: number,
    doUpdate : boolean
}
interface Todos{
    targetId : number
    input : string,
    list : Array<TodoItem>
}


function Todo (props:any) {
    const [todos, setTodos] = useState<Todos>({targetId : 0,input:'', list: []})

    const ref = useRef<HTMLInputElement | null >(null)
    useEffect(()=>{
        if(ref.current !== null){
            ref.current.focus()
        }
    })
    
    const onChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const value : string = event.target.value
        setTodos((toto) => ({
                ...toto,
                input : value,
            }))
    }

    const onKeyPress = (event : React.KeyboardEvent<HTMLInputElement>) => event.keyCode === 13 && create()
    const addTodo = () => create()
    const create = (id?:number) => {
        if(todos.input.length > 4){
            setTodos(totos => {
                const todoIndex = todos.list.length-1
                const addId = todos.list[todoIndex] ? todos.list[todoIndex].id + 1 : 1
                const item : TodoItem = {
                    value : totos.input,
                    id : addId,
                    doUpdate : false,
                }
                return {
                    ...todos,
                    input : '',
                    list : todos.list.concat(item)
                }
            })
        }
    }
    const removeTodo = (id:number) => {
        const {list } = todos
        const removedList = list.filter(todos => todos.id !== id)
        setTodos((toto) => ({
            ...toto,
            list : [...removedList]
        }))
    }
    const remove = (id : number) => {
        return () => {
            removeTodo(id)
        }
    }
    const updateTodo = (target : number) => {
        todos.list[target].doUpdate = !todos.list[target].doUpdate
        setTodos((toto) => {
            return {
                ...toto,
                targetId : todos.list[target].doUpdate ? target : 0,
                list : [...todos.list]
            }
        })
        
    }
    const onChangeUpdate = (event : React.ChangeEvent<HTMLInputElement>) => {
        const value : string = event.target.value
        setTodos(todos => {
            todos.list[todos.targetId].value = value
            return {
                ...todos,
                list : [...todos.list]
            }
        })
    }
    const onKeyPressUpdate = (event : React.KeyboardEvent<HTMLInputElement>) => {
        if(event.keyCode === 13){
            updateTodo(todos.targetId)
        }
    }
    const update = (id : number) => {
        return () => {
            let target = todos.list.findIndex(item => item.id === id)
            updateTodo(target)
        }
    } 

    const sort = () => {
        setTodos(todos => {
           const sorted = todos.list.map((item, index) => ({
             ...item,
             id : index + 1
            }))
            return {
                ...todos,
                list : sorted
                }
            })
    }

    const {input, list} = todos
    
    return <React.Fragment>
        <h2>Todo</h2>
        <div>
            <input type="text" id={"todoInput"} value={input} onChange={onChange} onKeyUp={onKeyPress} />
            <button type="button" onClick={addTodo}>ADD</button>
            <button type="button" onClick={sort}>SORT LIST</button>
        </div>
        <ul style={{listStyle:'none'}}>
            {
                list && list.map((item,index) => {
                    const {id, value, doUpdate} = item
                    return (
                        <li key={`${id}__value__${index}`}>
                            {
                               !doUpdate ? 
                                <p>
                                    {id} : {value}
                                    <button type="button" onClick={update(id)}>UPDATE</button>
                                    <button type="button" onClick={remove(id)}>REMOVE</button>
                                </p>
                                 :
                                <p>
                                    <input type="text" id={`${id}__value`} value={value} onChange={onChangeUpdate} onKeyUp={onKeyPressUpdate} ref={ref}/>
                                </p>
                            }
                            
                        </li>
                    )
                }) 
            }
        </ul>
    </React.Fragment>
}
export default Todo