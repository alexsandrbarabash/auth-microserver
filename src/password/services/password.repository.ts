import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { Password } from '../password.entity';
import { PasswordDto } from '../dto/password.dto';

@EntityRepository(Password)
export class PasswordRepository extends Repository<Password> {
  async savePassword(authCredentialsDto: PasswordDto): Promise<void> {
    const { userId, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const passwordRow = this.create({ userId, hash: hashedPassword, salt });
    await this.save(passwordRow);
  }
}
