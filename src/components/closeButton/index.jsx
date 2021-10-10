import React from 'react'

import './CloseButton.scss'
export default function CloseButton({ handleSubmit }) {
    
    return (
        <div class="close-button" onClick={handleSubmit}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3536 0.646447C13.5488 0.841709 13.5488 1.15829 13.3536 1.35355L1.35355 13.3536C1.15829 13.5488 0.841709 13.5488 0.646447 13.3536C0.451184 13.1583 0.451184 12.8417 0.646447 12.6464L12.6464 0.646447C12.8417 0.451184 13.1583 0.451184 13.3536 0.646447Z" fill="#25282B"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L13.3536 12.6464C13.5488 12.8417 13.5488 13.1583 13.3536 13.3536C13.1583 13.5488 12.8417 13.5488 12.6464 13.3536L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z" fill="#25282B"/>
            </svg>
        </div>
    )
}
