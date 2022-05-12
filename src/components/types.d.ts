

export interface IContentChatProps {
  setContentChat: React.Dispatch<React.SetStateAction<{
    open: boolean;
    self: ISelf | null;
    dialog: IDialog | null;
    channel: IChannel | null;
    chat: IChat | null;
  }>>;
  contentChat: {
    open: boolean;
    self: ISelf | null;
    dialog: IDialog | null;
    channel: IChannel | null;
    chat: IChat | null;
  }
}

export type ContentChatInfoProps = Pick<IContentChatProps, "contentChat">