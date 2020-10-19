import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { QuizHttpModule } from '../../../../src/apps/feedback/quiz/quiz.http.module';

describe('QuizPostController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [QuizHttpModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('OK')
      .end(() => done());
  });
});
