import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Req,
} from '@nestjs/common';
import { CreateCreditDto } from 'src/dto/createCredit.dto';
import { EndCreditsDto } from 'src/dto/endCredits.dto';
import { FindCreditDto } from 'src/dto/findCredit.dto';
import { UpdateStatusDto } from 'src/dto/updateStatus.dto';
import { Classes } from 'src/entity/classes.entity';
import { Credits } from 'src/entity/credits.entity';
import { Users } from 'src/entity/users.entity';

@Injectable()
export class CreditsService {
  async createCredit(@Req() req, createCreditDto: CreateCreditDto) {
    const sessionData = await req.session[req.headers.authorization];
    const user = await Users.findOneUserWithPWById(sessionData.id);
    const classes = await Classes.findClassByClassId(createCreditDto.classId);
    const exist = await Credits.isCredit(
      createCreditDto.classId,
      sessionData.id,
    );
    const count = await Credits.countCredit(createCreditDto.classId);
    if (count > 4)
      throw new BadRequestException('Over 4 people reserved this class');
    if (exist) throw new ConflictException();
    return await Credits.createCredit(user, classes, createCreditDto.status);
  }
  async endCredits(endCreditsDto: EndCreditsDto) {
    return await Credits.endCredits(endCreditsDto.classAt);
  }

  async findCredit(@Req() req, findCreditDto: FindCreditDto) {
    const sessionData = await req.session[req.headers.authorization];
    return await Credits.findCredit(sessionData.id, findCreditDto.date);
  }

  async updateStatus(creditId: number, updateStatusDto: UpdateStatusDto) {
    const result = await Credits.updateStatus(creditId, updateStatusDto.status);
    if (result.affected > 0) {
      return 'Status Updated Successfully';
    } else {
      throw new InternalServerErrorException();
    }
  }
}
