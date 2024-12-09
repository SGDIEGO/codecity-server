class UserDto {
    id: string;
    name: string;
    email: string;
    profile_url: string | null
}

export class MessageFindDto {
    id: string;
    content: string;
    creator: UserDto;
    likes: number;
    dislikes: number;
    creation_date: Date;
    parent_message?: {
        id: string
    } | null;
}