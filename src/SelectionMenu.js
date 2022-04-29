import React from 'react'

export default function SelectionMenu(props) {
    const {
        options, 
        selectedOption,
        onChangeOption,
    } = props

    return (
        <div>
        <select value={selectedOption} onChange={onChangeOption}>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
        </div>
    )
}