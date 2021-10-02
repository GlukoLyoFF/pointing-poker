import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppGateway } from 'src/gateway/app.gateway';
import { ChatDto } from './dto/chat.dto';
import { Chat, ChatDocument } from './schemas/chat.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @Inject(forwardRef(() => AppGateway))
    private gateway: AppGateway,
  ) {}
  async create(chatDto: ChatDto): Promise<Chat> {
    try {
      const newChat = new this.chatModel(chatDto);
      return await newChat.save();
    } catch {
      throw new NotFoundException("Chat doesn't exist!");
    }
  }
}
