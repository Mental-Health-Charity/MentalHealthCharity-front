'use client';
import { useAdmin } from '@/contexts/adminProvider/Admin.provider';
import styles from './ChatEditor.module.scss';
import { useEffect, useState } from 'react';
import { ChatData } from '@/utils/chatTypes';
import Table from '../../common/table/Table.component';
import Image from 'next/image';
import LoadingIcon from '../../../images/static/loading.svg';
import ChatItem from './chatItem/ChatItem.component';
import { MouseEvent } from 'react';
import {
  failurePopUp,
  infoPopUp,
  successPopUp,
} from '@/utils/defaultNotifications';

const ChatEditor = () => {
  const { getChats, createChat } = useAdmin();
  const [chats, setChats] = useState<ChatData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [chatName, setChatName] = useState<string | undefined>();

  const readChats = async (page: number) => {
    setIsLoading(true);
    try {
      const data: ChatData = await getChats(page, 5);
      setChats(data);
    } catch (error) {
      console.log('Error retrieving data ', error);
    }
    setIsLoading(false);
  };

  const handleCreatingChat = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (chatName && chatName?.length > 0 && chatName != '' && chatName != ' ') {
      try {
        createChat(chatName);
        successPopUp('Utworzono nowy chat: ' + chatName);
      } catch (error) {
        console.log('Error while creating new chat ', error);
        failurePopUp('Wystąpił błąd podczas utworzenia nowego chatu!');
      }
    } else {
      failurePopUp('Niepoprawna nazwa chatu!');
    }
  };

  useEffect(() => {
    readChats(chats?.page ? chats?.page : 1);
    console.log('downloading chats...');
    infoPopUp('Pobieram czaty...');
  }, []);

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.wrapper__heading}>Zarzadzaj Chatami</h1>
      <div className={styles.wrapper__creator}>
        <h2>Utwórz nowy chat</h2>
        <form className={styles.wrapper__creator__form}>
          <input
            className={styles.wrapper__creator__form__input}
            id="name"
            type="text"
            autoComplete="none"
            aria-autocomplete="none"
            placeholder="Nazwa nowego chatu"
            onChange={(e) => setChatName(e.target.value)}
          />
          <input
            className={styles.wrapper__creator__form__submit}
            type="submit"
            value={'Utwórz'}
            onClick={(e) => handleCreatingChat(e)}
          />
        </form>
      </div>
      <Table
        handleReads={readChats}
        page={chats ? chats?.page : 1}
        pages={chats ? chats?.pages : 1}
      >
        {isLoading ? (
          <Image
            alt="ikona ładowania"
            width={64}
            height={64}
            src={LoadingIcon}
          />
        ) : (
          chats?.items?.map((elem, index) => {
            return (
              <ChatItem
                page={chats.page}
                readChats={readChats}
                key={index}
                chat={elem}
              />
            );
          })
        )}
      </Table>
    </section>
  );
};

export default ChatEditor;
