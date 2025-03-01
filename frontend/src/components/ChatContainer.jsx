import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
      return () => unsubscribeFromMessages();
    }
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader onProfileClick={() => setIsModalOpen(true)} />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      {/* Chat Header with Modal Trigger */}
      <ChatHeader selectedUser={selectedUser} onProfileClick={() => setIsModalOpen(true)} />
      
      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar relative">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser?.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />

      {/* Stylish Full Profile Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
          <div className="bg-gray-300 rounded-2xl shadow-lg w-full max-w-md p-6 relative transform transition-all duration-300 scale-95 animate-fadeIn">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ❌
            </button>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="size-24 rounded-full object-cover border-4 border-gray-200"
                />
                <span
                  className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 ${selectedUser.isOnline ? "bg-green-500 border-white" : "bg-gray-400 border-white"}`}
                ></span>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">{selectedUser.fullName}</h2>
                <p className="text-gray-500 text-sm">{selectedUser.username}</p>
              </div>

              <div className="w-full px-6 space-y-3 text-gray-700">
                <div className="flex justify-between border-b py-2">
                  <span className="text-gray-500">Email:</span>
                  <span className="font-medium">{selectedUser.email}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="text-gray-500">Joined:</span>
                  <span className="font-medium">{new Date(selectedUser.createdAt).toDateString()}</span>
                </div>
                {selectedUser.bio && (
                  <div className="mt-2 text-center">
                    <h3 className="font-semibold text-gray-600">Bio</h3>
                    <p className="text-gray-700 text-sm">{selectedUser.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
