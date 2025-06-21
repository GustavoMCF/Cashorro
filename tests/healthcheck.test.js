import request from 'supertest'
import app from '../src/server.js'

describe('Healthcheck', () => {
  it('deve retornar status 200 e mensagem correta', async () => {
    const res = await request(app).get('/healthcheck')
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('API Ca$horro está no ar 🚀')
  })
})