import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, Roles } from 'src/auth/auth.guard';
import { CreateCreditDto } from 'src/dto/createCredit.dto';
import { EndCreditsDto } from 'src/dto/endCredits.dto';
import { FindCreditDto } from 'src/dto/findCredit.dto';
import { UpdateStatusDto } from 'src/dto/updateStatus.dto';
import { CreditsService } from 'src/service/credits.service';

@Controller('credits')
export class CreditsController {
  constructor(private readonly creditsService: CreditsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles('member', 'tutor', 'admin')
  createCredit(@Req() req, @Body() createCreditDto: CreateCreditDto) {
    try {
      return this.creditsService.createCredit(req, createCreditDto);
    } catch (err) {
      throw err;
    }
  }
  @Get('end')
  @UseGuards(AuthGuard)
  @Roles('admin')
  endClass(@Body() endCreditsDto: EndCreditsDto) {
    return this.creditsService.endCredits(endCreditsDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles('member', 'tutor', 'admin')
  findCredit(@Req() req, @Body() findCreditDto: FindCreditDto) {
    return this.creditsService.findCredit(req, findCreditDto);
  }

  @Patch(':creditId')
  @UseGuards(AuthGuard)
  @Roles('tutor', 'admin')
  updateStatus(
    @Param('creditId') creditId: number,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.creditsService.updateStatus(creditId, updateStatusDto);
  }
}
