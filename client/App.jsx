import React from "react"

export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            name: 'lixingyang'
        }
    }
    render() {
        return (
            <div>this is a { this.state.name }'s app </div>
        )
    }
}