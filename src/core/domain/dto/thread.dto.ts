class UserDto {
    id: string;
    name: string;
    email: string;
}

class MessageDto {
    id: string;
    content: string;
    creation_date: Date;
    user: UserDto;
}

export class ThreadDto {
    id: string;
    name: string;
    creator: UserDto;
    image_url: string | null;
    creation_date: Date;
    numberOfMessages: number;
    lastMessage: MessageDto | null;
    private: boolean;
}