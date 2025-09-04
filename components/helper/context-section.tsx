import React from 'react'
import ChatSection from '../chats/chat-section'
import ContextArea from './context-area'

export default function ContextSection() {
    return (
    <div className="h-screen bg-gray-50 flex flex-col p-0 gap-6">
        <div className="flex-1 flex">
            <ChatSection />
            <ContextArea />
        </div>
    </div>
    )
}
