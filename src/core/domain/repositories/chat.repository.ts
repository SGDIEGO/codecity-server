import { GetMessageDto, SaveMessageDto } from "../dto/chat.dto";

export interface IChatRepository {
    saveMessage(data: SaveMessageDto): Promise<void>
    getMessages(from: string, to: string): Promise<GetMessageDto[]>
}