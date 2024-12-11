export interface SaveMessageDto {
    message: string;
    from: string;
    to: string;
}

export interface GetMessageDto {
    from: string;
    to: string;
    content: string;
    date: Date
}