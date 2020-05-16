import React, {FunctionComponent} from 'react';

interface HelloProps {
    user : string,
}

interface HelloHeaderState {
    user : string,
}


// const Header : React.FC<{user:string}> = ({user}) => {
//     return (
//         <header>
//              React.FC
//             <h1>for { user }, React ts Todo</h1>
//         </header>)
// };

// const Header : FunctionComponent<HelloProps> = ({user}) => {
//     return (
//         <header>
//             FunctionComponent and 속성 분리 
//             <h1>for { user }, React ts Todo</h1>
//         </header>)
// };




/*

컴포넌트를 만드는 세가지 방법 
FC<Props> 속성만 갖는 함수형 컴포넌트
PureComponent<Props, State>
Component<Props, State>

*/
class Header extends React.Component<HelloProps,HelloHeaderState> {
    constructor(props : HelloProps){
        super(props)
        this.state = {
            user : 'ss'
        }
    }
    render () {
        return (
            <header>
            React.Component
                <h1>for {this.props.user},React ts Todo </h1>
                <p>my state : {this.state.user}</p>
            </header>)
    }
}

export default Header;