import { useChat } from '@/contexts/chatProvider/Chat.provider';
import styles from './ChatWindow.module.scss';
import ChatMessage from './chatMessage/ChatMessage.component';
import ChatShortcut from './chatShortcut/ChatShortcut.component';
import { FormEvent, useEffect, useState } from 'react';
import { Chat, ChatData, Messages } from '@/utils/chatTypes';
import { User, useAuth } from '@/contexts/authProvider/Auth.provider';
import Image from 'next/image';
import LoadingIcon from '../../../images/static/loading.svg';
import 'react-toastify/dist/ReactToastify.css';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import Roles from '@/utils/roles';

const ChatWindow = () => {
  const { getChats, getMessages, sendMessage } = useChat();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState<ChatData | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Messages | null>(null);
  const [newMessage, setNewMessage] = useState<string | null>();

  const readChats = async (page: number) => {
    setIsLoading(true);
    try {
      const data: ChatData = await getChats(page, 30);
      setChats(data);
      console.log(data);
      user && successPopUp('Wczytano dostępne czaty!');
    } catch (error) {
      console.log('Error retrieving data ', error);
      failurePopUp('Wystąpił błąd podczas wczytywania czatów...');
    }
    setIsLoading(false);
  };

  const handleReadMessages = async (chat: Chat) => {
    try {
      const data = await getMessages(1, 100, chat?.id);
      setMessages(data);
      console.log(messages);
    } catch (error) {
      console.log('ERROR while retrieving data ', error);
    }
  };

  const getUserRole = (participant: User) => {
    switch (participant.user_role) {
      case Roles.admin:
        return (
          <span
            className={
              styles.chatWindow__chat__participants__participant__roleAdmin
            }
          >
            [Admin]
          </span>
        );
      case Roles.volunteer:
        return (
          <span
            className={
              styles.chatWindow__chat__participants__participant__roleVolunteer
            }
          >
            [Wolontariusz]
          </span>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    // == WARNING !!! WARNING !!! WARNING !!! WARNING !!! WARNING !!! WARNING !!! WARNING !!! ==
    // THIS CODE BELOW IS AN NON-OPTIMIZED PROTOTYPE USED ONLY FOR EARLY-ACCESS VERSION OF CHAT
    // THE REASON FOR THIS SOLUTION IS BACKEND WHICH CURRENTLY DOESN'T SUPPORT WEBSOCKETS.
    readChats(1);
    if (selectedChat) {
      const interval = setInterval(() => {
        handleReadMessages(selectedChat);
        console.log('downloading...');
      }, 5000);
      return () => clearInterval(interval);
    }
    // == END == == END == == END == == END == == END == == END == == END == == END == == END ==
  }, [selectedChat]);

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedChat && newMessage) {
      setIsLoading(true);
      try {
        console.log('New message: ', newMessage);
        await sendMessage(selectedChat.id, newMessage);
        handleReadMessages(selectedChat);
      } catch (error) {
        console.log('ERROR: while sending a message ', error);
      }
      setIsLoading(false);
    } else {
      console.log('ERROR: Chat is not selected or message is not a string!');
    }
  };

  return (
    <div className={styles.chatWindow}>
      <h2 className={styles.chatWindow__heading}>Chat</h2>
      <ul className={styles.chatWindow__chatsList}>
        {chats?.items?.map((chat, index) => {
          return (
            <ChatShortcut
              handleReadMessages={handleReadMessages}
              setSelectedChat={setSelectedChat}
              key={index}
              chat={chat}
              participants={chat.participants}
            />
          );
        })}
      </ul>
      <div className={styles.chatWindow__chat}>
        <div className={styles.chatWindow__chat__heading}>
          <h3 className={styles.chatWindow__chat__name}>
            {selectedChat?.name}
          </h3>
          <ul className={styles.chatWindow__chat__participants}>
            {selectedChat
              ? selectedChat.participants?.map((user, index) => {
                  return (
                    <li
                      className={
                        styles.chatWindow__chat__participants__participant
                      }
                      key={index}
                    >
                      {getUserRole(user)}
                      <p
                        className={
                          styles.chatWindow__chat__participants__participant__name
                        }
                      >
                        {user.full_name ? user.full_name : 'Anonim'}
                      </p>
                      <p
                        className={
                          styles.chatWindow__chat__participants__participant__id
                        }
                      >
                        ({user.id})
                      </p>
                    </li>
                  );
                })
              : 'Wybierz czat, aby rozpocząć rozmowę'}
          </ul>
        </div>
        <ul className={styles.chatWindow__chat__messages}>
          {messages && !isLoading ? (
            messages.items.map((message, index) => {
              return (
                <ChatMessage
                  key={index}
                  senderIsAuthor={message.sender.id === user?.id}
                  author={message.sender.full_name}
                  content={message.content}
                  date={message.creation_date}
                />
              );
            })
          ) : (
            <Image
              alt="Ikona ładowania"
              src={LoadingIcon}
              width={64}
              height={64}
            />
          )}
        </ul>
        <form
          onSubmit={(e) => handleSendMessage(e)}
          className={styles.chatWindow__chat__chatForm}
        >
          <textarea
            onChange={(e) => setNewMessage(e.target.value)}
            className={styles.chatWindow__chat__chatForm__input}
            placeholder="wiadomość..."
          />
          <input
            className={styles.chatWindow__chat__chatForm__send}
            type="submit"
            value="wyślij"
          />
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
