'use client';

import React from 'react';
import { ChatProvider } from '@/contexts/chatProvider/Chat.provider';

export default function VolunteerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChatProvider>{children}</ChatProvider>;
}
